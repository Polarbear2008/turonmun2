import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Calendar,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Flag,
  Users
} from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function Overview() {
  const { user } = useAuth();
  const [application, setApplication] = useState<Tables<'applications'> | null>(null);
  const [committee, setCommittee] = useState<Tables<'committees'> | null>(null);
  const [assignment, setAssignment] = useState<any>(null);
  const [events, setEvents] = useState<Tables<'schedule_events'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [flagError, setFlagError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        console.log('Overview querying applications for email:', user.email);
        const { data: app, error } = await supabase
          .from('applications')
          .select('*')
          .eq('email', user.email)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        console.log('Overview applications response:', { data: app, error });
        if (!error && app) {
          setApplication(app);

          if (app.assigned_committee_id) {
            const { data: comm } = await supabase
              .from('committees')
              .select('*')
              .eq('id', app.assigned_committee_id)
              .single();
            if (comm) setCommittee(comm);
          }

          // Fetch country assignment
          const { data: assign } = await supabase
            .from('country_assignments')
            .select('*')
            .eq('application_id', app.id)
            .single();

          if (assign) setAssignment(assign);
        }

        const { data: upcoming } = await supabase
          .from('schedule_events')
          .select('*')
          .order('event_date', { ascending: true })
          .order('start_time', { ascending: true })
          .limit(5);

        setEvents(upcoming || []);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  const displayName = (application?.full_name || (user?.user_metadata as any)?.full_name || user?.email || 'Delegate');
  const displayCountry = assignment?.country_name || 'Not assigned yet';
  const committeeName = committee?.name || 'Not assigned yet';
  const badgeNumber = application?.id || 'Pending';
  const status = application?.status || 'pending';

  const applicationSteps = [
    { name: 'Submitted', status: status ? 'completed' : 'pending', date: application?.created_at || null },
    { name: 'Reviewed', status: status && status !== 'pending' ? 'completed' : 'pending', date: application?.reviewed_at || null },
    { name: 'Payment', status: application?.payment_status === 'paid' ? 'completed' : 'pending', date: null },
    { name: 'Confirmed', status: status === 'approved' ? 'current' : 'pending', date: null },
    { name: 'Allocated', status: assignment ? 'completed' : 'pending', date: null },
  ];

  const conferenceDate = new Date('2025-03-15T09:00:00');

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Header */}
      <motion.div
        variants={itemVariants}
        className="glass-card p-6 relative overflow-hidden border border-white/15"
      >
        {/* Background halo + noise for premium feel */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 w-56 h-56 bg-gold-400/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-diplomatic-400/15 blur-3xl rounded-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
          <div className="absolute inset-0 bg-noise opacity-10 mix-blend-soft-light" />
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium uppercase tracking-wide text-white/70">Delegate Dashboard</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
              Welcome back, {displayName}! 👋
            </h1>
            <p className="text-white/70 text-sm md:text-base">
              Ready to make your mark at TuronMUN Season 6?
            </p>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-gold-400/40 via-transparent to-diplomatic-400/40 blur-lg" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-500 rounded-full flex items-center justify-center shadow-glow">
                <User className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Top Row - Profile & Countdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Card */}
        <motion.div variants={itemVariants} className="glass-card p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-diplomatic-400 to-diplomatic-500 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Delegate Profile</h3>
              <p className="text-white/60 text-sm">Your conference details</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Name:</span>
              <span className="text-white font-medium">{displayName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Committee:</span>
              <span className="text-gold-400 font-medium">{committeeName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Country:</span>
              <div className="flex items-center space-x-2">
                {assignment?.country_code && !flagError ? (
                  <img
                    src={`https://flagcdn.com/w40/${assignment.country_code.toLowerCase()}.png`}
                    alt="Flag"
                    className="w-5 h-auto rounded shadow-sm"
                    onError={() => setFlagError(true)}
                    loading="lazy"
                  />
                ) : (
                  <Flag className="h-4 w-4 text-white/70" />
                )}
                <span className="text-white font-medium">{displayCountry}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Badge #:</span>
              <span className="text-white/90 font-mono text-sm">{badgeNumber}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">Status: {status || 'pending'}</span>
            </div>
          </div>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div variants={itemVariants} className="glass-card p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-500 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Conference Countdown</h3>
              <p className="text-white/60 text-sm">Time until TuronMUN Season 6</p>
            </div>
          </div>

          <CountdownTimer targetDate={conferenceDate} />
        </motion.div>
      </div>

      {/* Middle Row - Application Status & Committee Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Status Tracker */}
        <motion.div variants={itemVariants} className="glass-card p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Application Progress</h3>
              <p className="text-white/60 text-sm">Track your application status</p>
            </div>
          </div>

          <div className="space-y-4">
            {applicationSteps.map((step, index) => (
              <div key={step.name} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.status === 'completed'
                  ? 'bg-green-500'
                  : step.status === 'current'
                    ? 'bg-gold-500'
                    : 'bg-white/20'
                  }`}>
                  {step.status === 'completed' ? (
                    <CheckCircle className="h-4 w-4 text-white" />
                  ) : step.status === 'current' ? (
                    <AlertCircle className="h-4 w-4 text-white" />
                  ) : (
                    <div className="w-2 h-2 bg-white/50 rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${step.status === 'completed' || step.status === 'current'
                    ? 'text-white'
                    : 'text-white/50'
                    }`}>
                    {step.name}
                  </p>
                  {step.date && (
                    <p className="text-xs text-white/40">{step.date}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Committee & Country Assignment */}
        <motion.div variants={itemVariants} className="glass-card p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Assignment Details</h3>
              <p className="text-white/60 text-sm">Your committee and country</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass-panel p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 text-sm">Committee</span>
                <span className="text-gold-400 font-semibold">{committeeName}</span>
              </div>
              <p className="text-white/60 text-xs line-clamp-2">
                {committee?.description || 'Committee details will be available soon.'}
              </p>
              <div className="mt-3 flex space-x-2">
                <button className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full transition-colors">
                  Background Guide
                </button>
                <button className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full transition-colors">
                  Rules of Procedure
                </button>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 text-sm">Representing</span>
                <div className="flex items-center space-x-2">
                  <Flag className="h-4 w-4 text-white/70" />
                  <span className="text-white font-semibold">{displayCountry}</span>
                </div>
              </div>
              <p className="text-white/60 text-xs">
                Research your country's stance on committee topics
              </p>
              <div className="mt-3">
                <button className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full transition-colors">
                  Country Profile
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Row - Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <motion.div variants={itemVariants} className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Upcoming Events</h3>
              <p className="text-white/60 text-sm">Your conference schedule</p>
            </div>
          </div>

          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="glass-panel p-3 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-medium text-sm">{event.title}</span>
                  <span className="text-gold-400 text-xs font-medium">{event.start_time}</span>
                </div>
                <p className="text-white/60 text-xs">{event.event_date}</p>
              </div>
            ))}
            {!loading && events.length === 0 && (
              <div className="glass-panel p-3 rounded-lg text-white/60 text-sm">
                No upcoming events found yet.
              </div>
            )}
          </div>

          <div className="mt-4">
            <button className="w-full text-center text-gold-400 hover:text-gold-300 text-sm font-medium transition-colors">
              View Full Schedule →
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default React.memo(Overview);
