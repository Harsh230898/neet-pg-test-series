// src/views/GrandTestsView.jsx
import React, { useState, useContext } from 'react';
import { Trophy, Play, BarChart3, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import UIContext from '../context/UIContext';
import QuizContext from '../context/QuizContext';

const GrandTestsView = () => {
  const { getTextColor, getCardStyle } = useContext(UIContext);
  const { startQuiz, savedQuizSession } = useContext(QuizContext);
  const CardStyle = getCardStyle();

  const [grandTestStats] = useState({
    taken: 3,
    avgAccuracy: 65,
    totalCorrect: 390,
    totalIncorrect: 150,
    totalUnattempted: 60,
    lastScore: 680,
    rank: 1800,
    trend: 'up'
  });

  const GrandTestStats = ({ stats, cardStyle }) => (
    <div className={`p-8 rounded-3xl border mb-8 ${cardStyle.bg} ${cardStyle.border}`}>
      <h3 className={`${cardStyle.text} text-3xl font-black mb-6 flex items-center gap-3 border-b pb-4`}>
        <BarChart3 className="w-7 h-7 text-yellow-500" /> Grand Test Performance Summary
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
        <div className="p-4 rounded-xl bg-purple-100/70 dark:bg-purple-900/50">
          <p className="text-4xl font-black text-purple-600 dark:text-purple-300">{stats.taken}</p>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Tests Taken</p>
        </div>
        <div className="p-4 rounded-xl bg-emerald-100/70 dark:bg-emerald-900/50">
          <div className="flex items-center justify-center gap-1">
            <p className="text-4xl font-black text-emerald-600 dark:text-emerald-300">{stats.avgAccuracy}%</p>
            {stats.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-500" />}
            {stats.trend === 'down' && <TrendingDown className="w-4 h-4 text-rose-500" />}
          </div>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Avg. Accuracy</p>
        </div>
        <div className="p-4 rounded-xl bg-blue-100/70 dark:bg-blue-900/50">
          <p className="text-4xl font-black text-blue-600 dark:text-blue-300">{stats.lastScore}</p>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Last Score (Max 800)</p>
        </div>
        <div className="p-4 rounded-xl bg-yellow-100/70 dark:bg-yellow-900/50">
          <p className="text-4xl font-black text-yellow-600 dark:text-yellow-300">{stats.rank}</p>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Current Rank</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-sm font-semibold mt-6 pt-4 border-t border-purple-200 dark:border-purple-800">
        <div className="p-2 rounded-lg bg-green-200/70 dark:bg-green-800 text-green-800 dark:text-green-200">
          <p className="text-lg font-black">{stats.totalCorrect}</p>
          <p>Total Correct</p>
        </div>
        <div className="p-2 rounded-lg bg-red-200/70 dark:bg-red-800 text-red-800 dark:text-red-200">
          <p className="text-lg font-black">{stats.totalIncorrect}</p>
          <p>Total Incorrect</p>
        </div>
        <div className="p-2 rounded-lg bg-slate-300/70 dark:bg-slate-700 text-slate-800 dark:text-slate-300">
          <p className="text-lg font-black">{stats.totalUnattempted}</p>
          <p>Total Unattempted</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className={`text-4xl lg:text-6xl font-black mb-3 ${getTextColor('text-slate-900', 'text-white')}`}>Grand Tests</h2>
        <p className={getTextColor('text-xl text-slate-600', 'text-slate-400')}>Full mock exams</p>
      </div>
      <GrandTestStats stats={grandTestStats} cardStyle={CardStyle} />
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 rounded-3xl p-8 lg:p-12 mb-8 text-white shadow-2xl">
        <div className="relative z-10">
          <Trophy className="w-16 h-16 mb-4" />
          <h3 className="text-3xl lg:text-5xl font-black mb-4">NEET PG Full Mock (200 MCQs)</h3>
          <button 
            onClick={() => startQuiz(true)}
            disabled={!!savedQuizSession}
            className="bg-white text-orange-600 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 inline-flex items-center gap-3 shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-6 h-6" />
            <span>Start 200 Minute Test</span>
          </button>
        </div>
      </div>
      {savedQuizSession && (
        <p className="text-center text-sm text-rose-500 font-semibold mt-6 flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4" />
          Resume your saved test or submit it first to start a new test.
        </p>
      )}
    </div>
  );
};

export default GrandTestsView;