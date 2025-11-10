// src/views/ResultsView.jsx
import React, { useContext } from 'react';
import { Trophy, BookOpen, Maximize2 } from 'lucide-react';
import QuizContext from '../context/QuizContext';
import UIContext from '../context/UIContext';

const ResultsView = () => {
  const { calculateResults, setIsQuizActive, setCurrentQuestionIndex } = useContext(QuizContext);
  const { getBackgroundColor, getCardStyle, getTextColor, setCurrentView } = useContext(UIContext);

  const results = calculateResults();
  const percentage = results.totalQuestions > 0 ? ((results.score / (results.totalQuestions * 4)) * 100).toFixed(2) : 0;
  const CardStyle = getCardStyle();

  return (
    <div className={`max-w-4xl mx-auto p-10 ${getBackgroundColor('', 'bg-slate-900')}`}>
      <div className={`text-center ${CardStyle.bg} ${CardStyle.border} rounded-3xl p-10 shadow-2xl`}>
        <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
        <h2 className={`text-5xl font-black mb-2 ${CardStyle.text}`}>Test Completed!</h2>
        <p className={getTextColor('text-xl text-slate-600', 'text-slate-400') + ' mb-8'}>Review your performance below.</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-50/70 dark:bg-blue-900 p-6 rounded-2xl">
            <p className="text-4xl font-black text-blue-600 dark:text-blue-300">{results.score}</p>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Total Score</p>
          </div>
          <div className="bg-emerald-50/70 dark:bg-emerald-900 p-6 rounded-2xl">
            <p className="text-4xl font-black text-emerald-600 dark:text-emerald-300">{percentage}%</p>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Accuracy</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm font-semibold mb-10">
          <div className="p-4 rounded-xl bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200">
            <p className="text-2xl font-black">{results.correct}</p>
            <p>Correct (+4)</p>
          </div>
          <div className="p-4 rounded-xl bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200">
            <p className="text-2xl font-black">{results.incorrect}</p>
            <p>Incorrect (-1)</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300">
            <p className="text-2xl font-black">{results.totalQuestions - results.attempted}</p>
            <p>Unattempted (0)</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={() => setCurrentView('qbank')}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl inline-flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            <span>Go Back to QBank</span>
          </button>
          <button
            onClick={() => {
              setCurrentView('quiz');
              setIsQuizActive(false);
              setCurrentQuestionIndex(0);
            }}
            className="flex-1 bg-emerald-500 text-white px-6 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl inline-flex items-center justify-center gap-2"
          >
            <Maximize2 className="w-5 h-5" />
            <span>Start Review</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;