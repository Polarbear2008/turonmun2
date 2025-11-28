import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useEffect, useState } from 'react';
import { SecretMessage, useSecretMessage } from "@/components/easter-egg/SecretMessage";
import AIAssistant from "@/components/ai/AIAssistant";

// Import animations
import '@/styles/animations.css';
import Index from "./pages/Index";
import About from "./pages/About";
import Committees from "./pages/Committees";
import Registration from "./pages/Registration";
import Schedule from "./pages/Schedule";
import ResourcesPage from "./pages/Resources";
import Contact from "./pages/Contact";
import PastConferences from "./pages/PastConferences";
import EventUpdates from "./pages/EventUpdates";
import Season1 from "./pages/seasons/Season1";
import Season2 from "./pages/seasons/Season2";
import Season3 from "./pages/seasons/Season3";
import Season4 from "./pages/seasons/Season4";
import Season5 from "./pages/seasons/Season5";
import SeasonCAMU from "./pages/seasons/SeasonCAMU";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordChange from "./pages/ResetPasswordChange";
import AuthCallback from "./pages/AuthCallback";
import RegistrationSelection from "./pages/RegistrationSelection";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCommittees from "./pages/admin/AdminCommittees";
import AdminSchedule from "./pages/admin/AdminSchedule";
import AdminResources from "./pages/admin/AdminResources";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminRoute from "./components/admin/AdminRoute";
import DelegateManagement from "./pages/admin/DelegateManagement";
import CountryMatrix from "./pages/admin/CountryMatrix";
import ResourceManagement from "./pages/admin/ResourceManagement";
import ChairManagement from "./pages/admin/ChairManagement";
import AdminAnalytics from "./pages/admin/Analytics";
import SystemSettings from "./pages/admin/SystemSettings";
import ImagePreloader from "./components/ImagePreloader";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/dashboard/Overview";
import MyApplication from "./pages/dashboard/MyApplication";
import MyCommittee from "./pages/dashboard/MyCommittee";
import MyCountry from "./pages/dashboard/MyCountry";
import ChairDashboardLayout from "./pages/dashboard/ChairDashboard";
import ChairOverview from "./pages/dashboard/chair/Overview";
import ChairAnnouncements from "./pages/dashboard/chair/Announcements";
import ChairPositionPapers from "./pages/dashboard/chair/PositionPapers";
import ChairMessaging from "./pages/dashboard/chair/Messaging";
import ChairSchedule from "./pages/dashboard/chair/Schedule";
import ChairDelegates from "./pages/dashboard/chair/Delegates";
import ChairRoute from "./components/chair/ChairRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const { openMessage } = useSecretMessage();

  // Add keyboard event listener for question mark key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '?' && (e.ctrlKey || e.metaKey)) {
        openMessage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openMessage]);

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo(0, 0);
    
    // Log page view for analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'YOUR_GA_MEASUREMENT_ID', {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
};

const App = () => {
  const { isOpen, closeMessage } = useSecretMessage();
  
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <ImagePreloader />
            
            {/* Secret Message Easter Egg */}
            <SecretMessage isOpen={isOpen} onClose={closeMessage} />
            
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/event-updates" element={<EventUpdates />} />
              <Route path="/committees" element={<Committees />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/registration" element={<RegistrationSelection />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/reset-password-change" element={<ResetPasswordChange />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/past-conferences" element={<PastConferences />} />
                            <Route path="/seasons/1" element={<Season1 />} />
              <Route path="/seasons/2" element={<Season2 />} />
              <Route path="/seasons/3" element={<Season3 />} />
              <Route path="/seasons/4" element={<Season4 />} />
              <Route path="/seasons/Season5" element={<Season5 />} />
              <Route path="/seasons/camu" element={<SeasonCAMU />} />
              
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/committees" element={<AdminRoute><AdminCommittees /></AdminRoute>} />
              <Route path="/admin/schedule" element={<AdminRoute><AdminSchedule /></AdminRoute>} />
              <Route path="/admin/resources" element={<AdminRoute><AdminResources /></AdminRoute>} />
              <Route path="/admin/applications" element={<AdminRoute><AdminApplications /></AdminRoute>} />
              <Route path="/admin/messages" element={<AdminRoute><AdminMessages /></AdminRoute>} />
              <Route path="/admin/delegates" element={<AdminRoute><DelegateManagement /></AdminRoute>} />
              <Route path="/admin/country-matrix" element={<AdminRoute><CountryMatrix /></AdminRoute>} />
              <Route path="/admin/resource-management" element={<AdminRoute><ResourceManagement /></AdminRoute>} />
              <Route path="/admin/chairs" element={<AdminRoute><ChairManagement /></AdminRoute>} />
              <Route path="/admin/analytics" element={<AdminRoute><AdminAnalytics /></AdminRoute>} />
              <Route path="/admin/settings" element={<AdminRoute><SystemSettings /></AdminRoute>} />
              
              {/* Chair Dashboard Routes */}
              <Route path="/chair-dashboard" element={<ChairRoute><ChairDashboardLayout /></ChairRoute>}>
                <Route index element={<ChairOverview />} />
                <Route path="announcements" element={<ChairAnnouncements />} />
                <Route path="papers" element={<ChairPositionPapers />} />
                <Route path="messaging" element={<ChairMessaging />} />
                <Route path="schedule" element={<ChairSchedule />} />
                <Route path="delegates" element={<ChairDelegates />} />
              </Route>

              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<Overview />} />
                <Route path="application" element={<MyApplication />} />
                <Route path="committee" element={<MyCommittee />} />
                <Route path="country" element={<MyCountry />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <AIAssistant />
            <Analytics />
            <SpeedInsights />
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
