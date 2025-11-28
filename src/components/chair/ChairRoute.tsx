import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface ChairRouteProps {
  children: React.ReactNode;
}

export default function ChairRoute({ children }: ChairRouteProps) {
  const [loading, setLoading] = useState(true);
  const [isChair, setIsChair] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkChairRole = async () => {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setIsChair(false);
          setLoading(false);
          return;
        }

        // Temporary override: allow specific superadmin email to always access chair dashboard
        if (user.email === 'numonovsamandarferps@gmail.com') {
          setIsChair(true);
          setLoading(false);
          return;
        }

        // Check if user is an admin with chair role
        const { data: adminUser, error } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', user.email)
          .single();

        if (error || !adminUser) {
          setIsChair(false);
          setLoading(false);
          return;
        }

        // Check if user has chair assignments OR is superadmin
        const { data: chairAssignments } = await supabase
          .from('chair_assignments')
          .select('*')
          .eq('admin_user_id', adminUser.id)
          .eq('is_active', true);

        const isSuperAdmin = adminUser.role === 'superadmin';
        const hasChairAssignments = chairAssignments && chairAssignments.length > 0;
        
        setIsChair(isSuperAdmin || hasChairAssignments);
        setLoading(false);
      } catch (error) {
        console.error('Error checking chair role:', error);
        setIsChair(false);
        setLoading(false);
      }
    };

    checkChairRole();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-diplomatic-900 via-diplomatic-800 to-diplomatic-700 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-gold-400 animate-spin mx-auto mb-4" />
          <p className="text-white">Checking authorization...</p>
        </div>
      </div>
    );
  }

  if (!isChair) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-diplomatic-900 via-diplomatic-800 to-diplomatic-700 flex items-center justify-center">
        <div className="glass-card p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-white/80 mb-6">
            You don't have permission to access the Chair Dashboard. This area is restricted to committee chairs only.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
