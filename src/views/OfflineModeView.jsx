// src/views/OfflineModeView.jsx
import React, { useState, useContext } from 'react';
import { Zap } from 'lucide-react';
import UIContext from '../context/UIContext';

const OfflineModeView = () => {
  const { getTextColor } = useContext(UIContext);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className={`text-4xl lg:text-6xl font-black mb-3 ${getTextColor('text-slate-900', 'text-white')}`}>Offline Mode Status</h2>
        <p className={getTextColor('text-xl text-slate-600', 'text-slate-400')}>Manage your Progressive Web App (PWA) installation status for offline access.</p>
      </div>
      <div className={`p-8 rounded-3xl mb-8 border-2 border-dashed ${isPWAInstalled ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' : 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Zap className={`w-10 h-10 ${isPWAInstalled ? 'text-emerald-500' : 'text-blue-500'}`} />
            <div>
              <h3 className="font-black text-2xl mb-1">MedVanshi PWA Status</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {isPWAInstalled 
                  ? "Installed! Flashcards and Pre-loaded Quizzes available offline."
                  : "Click below to install and gain offline access."}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsPWAInstalled(!isPWAInstalled)}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${isPWAInstalled ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            {isPWAInstalled ? "Uninstall PWA (Mock)" : "Install App (Mock)"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfflineModeView;