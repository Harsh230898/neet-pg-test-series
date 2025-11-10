// src/components/Sidebar.jsx
import React, { useContext } from 'react';
import { 
  Home, BookOpen, Target, Clock, Trophy, FileText, User, Star, Brain, Zap, 
  Microscope, LogOut, Bell, Settings, TrendingDown, RefreshCw, BarChart3, 
  CheckSquare, CheckCircle, MessageSquare, UserCheck, Video, LayoutList
} from 'lucide-react';
import AuthContext from '../context/AuthContext';
import UIContext from '../context/UIContext';

const Sidebar = () => {
  const { user, handleLogout, authLoading } = useContext(AuthContext);
  const { currentView, setCurrentView, setIsMobileMenuOpen } = useContext(UIContext);

  const handleNavigation = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  // Redefined Navigation Structure (Grouped for Clarity)
  const navigationItems = [
    // Core Navigation
    { view: 'home', icon: Home, label: 'Home' },
    { view: 'qbank', icon: BookOpen, label: 'Custom Test' },
    
    // Personalized Practice Tools
    { view: 'smart-practice', icon: Zap, label: 'Smart Practice', badge: 'AI' },
    { view: 'revision-calendar', icon: RefreshCw, label: 'Revision Calendar' },
    { view: 'mistake-notebook', icon: Star, label: 'Mistake Notebook' },
    
    // Full Exams & Assessments
    { view: 'mock-test', icon: CheckSquare, label: 'Full Mock Test' },
    { view: 'grand-tests', icon: Trophy, label: 'Grand Tests' },
    { view: 'subject-test', icon: Target, label: 'Subject Tests' },

    // Learning Resources
    { view: 'deep-dive', icon: Microscope, label: 'Deep Dive Hubs' }, 
    { view: 'flashcards', icon: LayoutList, label: 'Flashcards' },
    { view: 'patient-encounters', icon: UserCheck, label: 'Patient Encounters' }, 
    { view: 'offline-mode', icon: Video, label: 'Offline Mode' }, 
    { view: 'ai-chat', icon: Brain, label: 'AI Assistant' } 
  ];
  
  // Bottom Items
  const utilityItems = [
    { view: 'analytics', icon: BarChart3, label: 'Performance Analytics' },
    { view: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-72 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 h-screen flex flex-col shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-10 -mr-32 -mt-32"></div>
            
      <div className="relative z-10 p-6 border-b border-purple-800/50">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 rounded-2xl shadow-2xl">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black">
              <span className="bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">MedVanshi</span>
            </h1>
            <p className="text-xs text-purple-300 font-semibold">NEET PG Excellence</p>
          </div>
        </div>
      </div>
            
      <nav className="relative z-10 flex-1 p-4 space-y-2 overflow-y-auto">
        {navigationItems.map((item) => (
          <button
            key={item.view}
            onClick={() => handleNavigation(item.view)}
            className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
              currentView === item.view
                ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white shadow-xl scale-[1.02]'
                : 'text-purple-200 hover:bg-purple-800/50 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
            </div>
            {item.badge && (
                <span className="px-2 py-0.5 text-xs bg-white/20 rounded-full font-extrabold text-white">
                    {item.badge}
                </span>
            )}
          </button>
        ))}

        {/* Utility Section */}
        <div className="pt-4 border-t border-purple-800/50 mt-4 space-y-2">
            {utilityItems.map((item) => (
                <button
                    key={item.view}
                    onClick={() => handleNavigation(item.view)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
                        currentView === item.view
                          ? 'bg-purple-700 text-white shadow-lg'
                          : 'text-purple-300 hover:bg-purple-800/50 hover:text-white'
                      }`}
                >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                </button>
            ))}
        </div>
      </nav>
            
      <div className="relative z-10 p-4 border-t border-purple-800/50">
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-4 border border-slate-600/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user.name || 'User'}</p>
              <div className="flex items-center gap-1 text-xs text-purple-300">
                <Bell className="w-3 h-3 text-yellow-400" />
                <span className="font-semibold">{user.notifications || 3} New Alerts</span>
              </div>
            </div>
            <button
                onClick={handleLogout}
                title="Logout"
                disabled={authLoading}
                className="p-2 ml-2 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition-colors disabled:opacity-50"
            >
                <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;