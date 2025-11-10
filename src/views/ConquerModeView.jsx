// src/views/ConquerModeView.jsx
import React, { useState, useContext } from 'react';
import { Target, BookOpen, Zap, Brain, AlertCircle } from 'lucide-react';
import UIContext from '../context/UIContext';
import QuizContext from '../context/QuizContext';
import { ALL_SUBJECTS, Q_BANK_SOURCES } from '../constants/data';

const ConquerModeView = () => {
  const { getTextColor, getCardStyle, isDarkMode } = useContext(UIContext);
  const { startQuiz, savedQuizSession } = useContext(QuizContext);
  const CardStyle = getCardStyle();

  const [conquerModeGoal, setConquerModeGoal] = useState('Conquer All');
  const [conquerModeSubject, setConquerModeSubject] = useState('All Subjects');
  
  const performanceData = {
    weaknesses: [ { subject: 'Pharmacology', accuracy: 58, trend: 'down', questionsAttempted: 65 } ],
  };

  const conquerOptions = [ 'Conquer All', ...Q_BANK_SOURCES.map(s => `Conquer ${s}`) ];
  const selectedGoalText = conquerModeGoal.includes('All') 
    ? 'This uses a mix of all sources to prioritize your weakest subjects/topics.'
    : `This targets your weak areas specifically using content from the **${conquerModeGoal.replace('Conquer ', '')}** QBank.`;

  const topWeakness = conquerModeSubject === 'All Subjects' ? performanceData.weaknesses[0].subject : conquerModeSubject;
  const weaknessTopic = ALL_SUBJECTS.find(s => s.name === topWeakness)?.weaknessTopic || 'Unspecified Topic';

  const startAdaptiveQuiz = () => {
    console.log("Starting adaptive quiz with settings:", conquerModeGoal, conquerModeSubject);
    startQuiz(false, topWeakness); 
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <h2 className={`text-4xl lg:text-6xl font-black mb-3 ${getTextColor('text-slate-900', 'text-white')}`}>Fully Adaptive Pathway</h2>
        <p className={getTextColor('text-xl text-slate-600', 'text-slate-400')}>
          Let our algorithm generate the perfect, personalized test to conquer your weakest areas.
        </p>
      </div>
      <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 lg:p-10 space-y-8 border`}>
        <div>
          <label className={`flex items-center gap-2 text-xl font-black mb-5 ${CardStyle.text}`}>
            <Target className="w-6 h-6 text-purple-600" />
            <span>1. Select Source Goal</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {conquerOptions.map(goal => (
              <button
                key={goal}
                onClick={() => setConquerModeGoal(goal)}
                className={`p-4 rounded-2xl border-2 font-bold transition-all hover:shadow-md ${
                  conquerModeGoal === goal
                    ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-lg dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-700'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700'
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className={`flex items-center gap-2 text-xl font-black mb-5 ${CardStyle.text}`}>
            <BookOpen className="w-6 h-6 text-pink-600" />
            <span>2. Filter by Subject (Optional)</span>
          </label>
          <select
            value={conquerModeSubject}
            onChange={(e) => setConquerModeSubject(e.target.value)}
            className={`w-full p-4 border-2 rounded-xl text-lg font-semibold focus:outline-none focus:border-pink-400 ${isDarkMode ?
 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
          >
            <option value="All Subjects">All Subjects (Default)</option>
            {ALL_SUBJECTS.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
          </select>
        </div>

        <div className="p-6 rounded-2xl border border-blue-400 bg-blue-50 dark:bg-blue-900/50">
          <h3 className="font-bold text-xl text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2"><Zap className='w-5 h-5'/> Adaptive Strategy</h3>
          <p className={getTextColor('text-slate-700', 'text-slate-300')}>{selectedGoalText}</p>
          <p className="mt-3 font-semibold text-rose-600 dark:text-rose-400">
            Target Focus: {topWeakness} ({weaknessTopic})
          </p>
        </div>

        <button
          onClick={startAdaptiveQuiz}
          disabled={!!savedQuizSession}
          className={`w-full py-6 rounded-2xl font-black text-xl transition-all 
            bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 text-white hover:shadow-2xl hover:scale-[1.02]
            flex items-center justify-center gap-3
            disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <Brain className="w-7 h-7" />
          <span>Conquer Your Gap (Personalized 25 Qs)</span>
        </button>

        {savedQuizSession && (
          <p className="text-center text-sm text-rose-500 font-semibold flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Resume your saved test or submit it first to start a new test.
          </p>
        )}
      </div>
    </div>
  );
};

export default ConquerModeView;