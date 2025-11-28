import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Users, 
  Flag, 
  X,
  LogOut
} from 'lucide-react';
interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'My Application', href: '/dashboard/application', icon: FileText },
  { name: 'My Committee', href: '/dashboard/committee', icon: Users },
  { name: 'My Country', href: '/dashboard/country', icon: Flag },
];

export default function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const location = useLocation();

  const handleLogout = async () => {
    // Mock logout for UI preview
    console.log('Logout clicked - would redirect to login');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        className={`hidden lg:flex lg:flex-col lg:w-64 glass-nav border-r border-white/10`}
        initial={false}
      >
        <div className="flex-1 flex flex-col min-h-0">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-white/10">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-white font-display font-bold text-lg">TuronMUN</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-gold-400/20 text-gold-300 shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-gold-300' : 'text-white/50 group-hover:text-white/70'}`} />
                  {item.name}
                  {isActive && (
                    <motion.div
                      className="ml-auto w-1 h-4 bg-gold-400 rounded-full"
                      layoutId="activeIndicator"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="px-4 py-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-red-500/20 transition-all duration-200 group"
            >
              <LogOut className="mr-3 h-5 w-5 text-white/50 group-hover:text-red-400" />
              Logout
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-50 w-64 glass-nav border-r border-white/10 lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="flex-1 flex flex-col min-h-0">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-white font-display font-bold text-lg">TuronMUN</span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-gold-400/20 text-gold-300 shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-gold-300' : 'text-white/50 group-hover:text-white/70'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="px-4 py-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-red-500/20 transition-all duration-200 group"
            >
              <LogOut className="mr-3 h-5 w-5 text-white/50 group-hover:text-red-400" />
              Logout
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
