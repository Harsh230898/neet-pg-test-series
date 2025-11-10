// src/components/SplashScreen.jsx
import React, { useContext } from 'react';
import { Brain } from 'lucide-react';
import UIContext from '../context/UIContext';

const SplashScreen = () => {
  const { isAppLoading } = useContext(UIContext);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-1000"
      style={{ 
        backgroundColor: '#1e293b', 
        opacity: isAppLoading ? 1 : 0, 
        pointerEvents: isAppLoading ? 'auto' : 'none'
      }}
    >
      <div 
        className="flex flex-col items-center justify-center transform transition-transform duration-1000 ease-out"
        style={{ transform: isAppLoading ? 'scale(1)' : 'scale(1.2)' }}
      >
        <div className="p-5 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-3xl shadow-2xl animate-pulse-slow">
          <Brain className="w-16 h-16 text-white" />
        </div>
        <h1 className="text-6xl font-black mt-6" style={{
          background: 'linear-gradient(to right, #e9d5ff, #fbcfe8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'text-fade-in 1s ease-out'
        }}>
          MedVanshi
        </h1>
        <p className="text-xl font-semibold mt-2 text-purple-300 animate-fade-in">
          NEET PG Excellence
        </p>
      </div>
      
      <div className="absolute bottom-10 w-64 h-2 bg-slate-700 rounded-full overflow-hidden">
        {isAppLoading && (
          <div className="h-full bg-gradient-to-r from-purple-500 to-rose-500 animate-loading-bar origin-left"></div>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;