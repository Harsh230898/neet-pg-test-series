import React, { useState, useContext } from 'react';
import { Brain, Clock, AlertCircle } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import UIContext from '../context/UIContext';

const AuthView = () => {
  const { handleLogin, handleSignUp, authLoading, authError } = useContext(AuthContext);
  const { getBackgroundColor, getTextColor, getCardStyle, isDarkMode } = useContext(UIContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(true); // <-- NEW: Added state for the checkbox
  const [isLoginMode, setIsLoginMode] = useState(true);

  const submitAuth = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      handleLogin(email, password, keepLoggedIn); // <-- NEW: Pass keepLoggedIn to handleLogin
    } else {
      handleSignUp(email, password, keepLoggedIn); // <-- NEW: Pass keepLoggedIn to handleSignUp
    }
  };
  
  const authCardStyle = getCardStyle();

  return (
    <div className={`flex items-center justify-center min-h-screen ${getBackgroundColor('bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50', 'bg-slate-900')}`}>
      <div className={`w-full max-w-md p-10 rounded-3xl shadow-2xl ${authCardStyle.bg} ${authCardStyle.border} border`}>
        <div className="text-center mb-8">
          <div className="p-4 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-2xl shadow-xl mx-auto w-16 h-16 mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
        
          <h2 className="text-4xl font-black">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">MedVanshi</span>
          </h2>
          <p className={getTextColor('text-slate-600', 'text-slate-400')}>Log in to access your personalized dashboard</p>
        </div>

        <form onSubmit={submitAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-full p-3 rounded-xl border focus:outline-none focus:border-purple-500 shadow-inner ${isDarkMode ?
 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
          />
          <input
            type="password"
            placeholder="Password (Min 6 chars for sign-up)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`w-full p-3 rounded-xl border focus:outline-none focus:border-purple-500 shadow-inner ${isDarkMode ?
 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
          />

          {/* --- NEW: Keep Me Logged In Checkbox --- */}
          <div className="flex items-center justify-start py-2">
            <input
              type="checkbox"
              id="keepLoggedIn"
              checked={keepLoggedIn}
              onChange={(e) => setKeepLoggedIn(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <label
              htmlFor="keepLoggedIn"
              className={`ml-2 block text-sm font-medium ${getTextColor('text-slate-700', 'text-slate-300')}`}
            >
              Keep me logged in
            </label>
          </div>
          {/* --- END OF NEW SECTION --- */}
          
          {authError && (
            <div className="p-3 text-sm font-semibold rounded-xl bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {authError}
            </div>
          )}

          <button
            type="submit"
            disabled={authLoading || password.length < (isLoginMode ? 1 : 6)}
            className={`w-full py-3 rounded-xl font-black text-lg transition-all flex items-center justify-center gap-2 ${authLoading || password.length < (isLoginMode ? 1 : 6) ? 
                'bg-slate-400 text-slate-600 cursor-not-allowed dark:bg-slate-700 dark:text-slate-500' :
                'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-[1.01] shadow-lg'
            }`}
          >
            {authLoading ? (
              <>
                <Clock className="w-5 h-5 animate-spin" /> {isLoginMode ? 'Logging In...' : 'Signing Up...'}
              </>
            ) : (
              isLoginMode ? 'Log In' : 'Sign Up'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => { 
              setIsLoginMode(!isLoginMode); 
            }}
            className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline"
          >
            {isLoginMode ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </button>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            **Mock Credentials for Login:** Email: `dr.devanshi@medvanshi.com`, Password: `password123`
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthView;