// src/views/HomeView.jsx

import React, { useState, useContext } from 'react';
import { 
  Clock, Award, Flame, Trophy, Target, TrendingUp, TrendingDown, 
  CheckSquare, Library, FileText, Brain, ChevronRight, Calendar,
  CheckCircle, Zap, Play, BarChart3
} from 'lucide-react';
import AuthContext from '../context/AuthContext';
import UIContext from '../context/UIContext';
import QuizContext from '../context/QuizContext';
import { ALL_SUBJECTS, Q_BANK_SOURCES } from '../constants/data';

const HomeView = () => {
  const { user } = useContext(AuthContext);
  const { getTextColor, getCardStyle, setCurrentView, isDarkMode } = useContext(UIContext);
  const { savedQuizSession, resumeQuiz, formatTime } = useContext(QuizContext);
  
  const [showMCQOfDay, setShowMCQOfDay] = useState(true);
  const [selectedQBank, setSelectedQBank] = useState('All Sources');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  
  const CardStyle = getCardStyle();

  const performanceData = {
    strengths: [
      { subject: 'Anatomy', accuracy: 85, trend: 'up', questionsAttempted: 120 }
    ],
    weaknesses: [
      { subject: 'Pharmacology', accuracy: 58, trend: 'down', questionsAttempted: 65 }
    ],
    sourceBreakdown: [
      { name: 'Marrow', accuracy: 78, questions: 250, completed: 4000 }
    ],
    recommendations: {
      focusTopic: 'Cardiovascular Physiology',
      reason: 'Your accuracy is below 70% in high-yield modules, suggesting a knowledge gap.',
      nextStep: 'Start a 25-question Hard test on Cardiac Cycle and ECG.'
    }
  };

  const ACHIEVEMENTS = [
    { name: 'Streak Starter', description: 'Maintain a 7-day study streak.', icon: Flame, isAchieved: true, color: 'text-orange-500' },
    { name: 'Marrow Master', description: 'Attempt 1000 questions from Marrow.', icon: Target, isAchieved: false, color: 'text-blue-500' },
    { name: 'Anatomy Ace', description: 'Achieve 80% accuracy in Anatomy.', icon: Zap, isAchieved: true, color: 'text-purple-500' },
    { name: 'Grand Test Runner', description: 'Complete 3 full Grand Tests.', icon: Trophy, isAchieved: true, color: 'text-yellow-500' }
  ];

  const [currentGoal, setCurrentGoal] = useState({
    type: 'Weekly',
    target: 250,
    achieved: 180,
    progress: 72
  });

  const subjectWiseData = {
    'All Sources': [
      { name: 'Anatomy', accuracy: 85, attempted: 450, correct: 383, qbank: 'Marrow' },
      { name: 'Physiology', accuracy: 82, attempted: 390, correct: 320, qbank: 'Marrow' },
      { name: 'Biochemistry', accuracy: 78, attempted: 280, correct: 218, qbank: 'Prepladder' },
      { name: 'Pharmacology', accuracy: 58, attempted: 320, correct: 186, qbank: 'Marrow' },
      { name: 'Pathology', accuracy: 62, attempted: 410, correct: 254, qbank: 'Cerebellum' },
      { name: 'Microbiology', accuracy: 65, attempted: 290, correct: 189, qbank: 'Marrow' },
    ],
    'Marrow': [
      { name: 'Anatomy', accuracy: 85, attempted: 450, correct: 383 },
      { name: 'Physiology', accuracy: 82, attempted: 390, correct: 320 },
      { name: 'Pharmacology', accuracy: 58, attempted: 320, correct: 186 },
      { name: 'Microbiology', accuracy: 65, attempted: 290, correct: 189 },
    ],
    'Prepladder': [
      { name: 'Biochemistry', accuracy: 78, attempted: 280, correct: 218 },
      { name: 'Medicine', accuracy: 72, attempted: 520, correct: 374 },
    ],
    'Cerebellum': [
      { name: 'Pathology', accuracy: 62, attempted: 410, correct: 254 },
      { name: 'Anatomy', accuracy: 75, attempted: 180, correct: 135 },
    ],
  };

  const filteredSubjectData = selectedQBank === 'All Sources' 
    ? subjectWiseData['All Sources']
    : subjectWiseData[selectedQBank] || [];

  const HomeStudyTimeTracker = () => {
    const hours = Math.floor(user.studyTimeMinutes / 60);
    const minutes = user.studyTimeMinutes % 60;
    const weeklyGoal = 600;
    const progressPercent = Math.min(100, ((user.studyTimeMinutes / weeklyGoal) * 100).toFixed(1));

    return (
      <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 border`}>
        <h3 className={`${getTextColor('text-2xl font-black', 'text-white')} flex items-center gap-3 mb-6 border-b pb-4`}>
          <Clock className="w-6 h-6 text-indigo-500" />
          Study Consistency
        </h3>
        <div className="text-center mb-6">
          <p className="text-5xl font-black bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
            {hours}<span className="text-2xl font-normal text-indigo-500">h</span> {minutes}<span className="text-2xl font-normal text-indigo-500">m</span>
          </p>
          <p className={`${getTextColor('text-sm font-semibold text-slate-600', 'text-slate-400')}`}>
            Total time logged this week
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-800">
          <div className="flex justify-between text-sm font-bold mb-2">
            <span className={`${getTextColor('text-slate-700', 'text-slate-300')}`}>
              Weekly Goal: {Math.floor(weeklyGoal/60)}h Target
            </span>
            <span className="text-indigo-500">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 dark:bg-slate-700">
            <div 
              className="bg-gradient-to-r from-indigo-400 to-blue-400 h-3 rounded-full" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  const HomeAchievements = () => (
    <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 border`}>
      <h3 className={`${getTextColor('text-2xl font-black mb-6', 'text-white')} flex items-center gap-3 border-b pb-4`}>
        <Award className="w-6 h-6 text-green-500" />
        Achievements
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ACHIEVEMENTS.map((ach, i) => (
          <div 
            key={i}
            className={`p-4 rounded-xl flex items-start gap-3 transition-colors ${
              ach.isAchieved 
                ? 'bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-300'
                : 'bg-slate-50 dark:bg-slate-700 border border-slate-300'
            }`}
          >
            <div className={`p-3 rounded-full flex-shrink-0 ${ach.isAchieved ? 'bg-emerald-500' : 'bg-slate-400'}`}>
              <ach.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-bold text-sm mb-1 ${ach.isAchieved ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-700 dark:text-slate-300'}`}>
                {ach.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 break-words">{ach.description}</p>
            </div>
            {ach.isAchieved && <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );

  const HomeRecommendations = () => (
    <div className={`rounded-3xl p-8 border ${CardStyle.bg} ${CardStyle.border} bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-800 dark:to-purple-900/30 border-purple-400 dark:border-purple-700`}>
      <div className="flex items-center gap-4 mb-4">
        <Brain className="w-10 h-10 text-pink-600" />
        <h3 className={`${getTextColor('text-2xl font-black', 'text-white')}`}>Smart Recommendations</h3>
      </div>
      <p className={`${getTextColor('text-lg font-semibold mb-4 text-slate-700', 'text-slate-300')}`}>
        Your adaptive study plan for maximum impact
      </p>
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-purple-200/50 dark:bg-purple-800/50 border border-purple-300 dark:border-purple-700">
          <p className="text-sm font-semibold text-purple-800 dark:text-purple-300 mb-1">Focus Topic</p>
          <p className="text-xl font-black text-purple-900 dark:text-white">{performanceData.recommendations.focusTopic}</p>
        </div>
        <div className="p-4 rounded-xl bg-red-200/50 dark:bg-red-800/50 border border-red-300 dark:border-red-700">
          <p className="text-sm font-semibold text-red-800 dark:text-red-300 mb-1">Why?</p>
          <p className="text-base font-medium text-red-900 dark:text-red-100">{performanceData.recommendations.reason}</p>
        </div>
      </div>
      <button 
        onClick={() => setCurrentView('qbank')}
        className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-rose-600 text-white rounded-xl font-bold hover:scale-[1.01] transition-all shadow-lg flex items-center justify-center gap-2"
      >
        <span>Practice Topic</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );

  const HomeGoalSetting = () => (
    <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 border`}>
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <h3 className={`${getTextColor('text-2xl font-black', 'text-white')} flex items-center gap-3`}>
          <CheckSquare className="w-6 h-6 text-teal-500" />
          {currentGoal.type} Goal
        </h3>
        <button className="text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline">
          Change Goal
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-4xl font-black text-teal-500">{currentGoal.target}</p>
          <p className={`${getTextColor('text-sm font-semibold text-slate-600', 'text-slate-400')}`}>Target Qs</p>
        </div>
        <div>
          <p className="text-4xl font-black text-purple-500">{currentGoal.achieved}</p>
          <p className={`${getTextColor('text-sm font-semibold text-slate-600', 'text-slate-400')}`}>Achieved</p>
        </div>
        <div>
          <p className="text-4xl font-black text-orange-500">{currentGoal.progress}%</p>
          <p className={`${getTextColor('text-sm font-semibold text-slate-600', 'text-slate-400')}`}>Progress</p>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-purple-200 dark:border-purple-800">
        <div className="w-full bg-slate-200 rounded-full h-3 dark:bg-slate-700">
          <div 
            className="bg-gradient-to-r from-teal-400 to-cyan-400 h-3 rounded-full" 
            style={{ width: `${currentGoal.progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

  const HomePerformanceSummary = () => {
    const primarySource = performanceData.sourceBreakdown[0];
    const totalQuestions = 5000;
    const percentageCompleted = ((primarySource.completed / totalQuestions) * 100).toFixed(1);

    return (
      <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 border`}>
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h3 className={`${getTextColor('text-2xl font-black', 'text-white')} flex items-center gap-3`}>
            <Library className="w-6 h-6 text-blue-500" />
            QBank Progress <span className="text-purple-500">({primarySource.name})</span>
          </h3>
          <span 
            onClick={() => setCurrentView('analytics')} 
            className="text-sm font-bold text-purple-600 dark:text-purple-400 cursor-pointer hover:underline"
          >
            View Breakdown <ChevronRight className="w-4 h-4 inline ml-1" />
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-5xl font-black text-emerald-500">{primarySource.accuracy}%</p>
            <p className={`${getTextColor('text-sm font-semibold text-slate-600', 'text-slate-400')}`}>Accuracy</p>
          </div>
          <div>
            <p className="text-5xl font-black text-purple-500">{percentageCompleted}%</p>
            <p className={`${getTextColor('text-sm font-semibold text-slate-600', 'text-slate-400')}`}>Completed</p>
          </div>
          <div>
            <p className="text-5xl font-black text-orange-500">{primarySource.completed.toLocaleString()}</p>
            <p className={`${getTextColor('text-sm font-semibold text-slate-600', 'text-slate-400')}`}>Questions Done</p>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-purple-200 dark:border-purple-800">
          <div className="flex justify-between text-sm font-bold mb-2">
            <span className={`${getTextColor('text-slate-700', 'text-slate-300')}`}>Completion Progress</span>
            <span className="text-purple-500">{primarySource.completed.toLocaleString()}/{totalQuestions.toLocaleString()}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 dark:bg-slate-700">
            <div 
              className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full" 
              style={{ width: `${percentageCompleted}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  const HomePerformanceSummaryDetail = () => (
    <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 border`}>
      <h3 className={`${getTextColor('text-2xl font-black mb-4 text-slate-900', 'text-white')} flex items-center gap-3 border-b pb-4`}>
        <TrendingUp className="w-6 h-6 text-emerald-500" />
        <TrendingDown className="w-6 h-6 text-rose-500" />
        Subject Performance Summary
      </h3>
      <div className="space-y-4">
        {performanceData.strengths.slice(0, 1).map((item, i) => (
          <div 
            key={`s-${i}`}
            className={`p-4 rounded-xl border-2 transition-colors ${
              isDarkMode 
                ? 'bg-slate-700 border-emerald-800' 
                : 'bg-emerald-50 border-emerald-300'
            }`}
          >
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">Top Strength</p>
            <div className="flex items-center justify-between">
              <span className={`${getTextColor('font-bold text-lg text-slate-900', 'text-white')}`}>{item.subject}</span>
              <span className="text-xl font-black text-emerald-500">{item.accuracy}%</span>
            </div>
          </div>
        ))}
        {performanceData.weaknesses.slice(0, 1).map((item, i) => {
          const weaknessSubject = ALL_SUBJECTS.find(s => s.name === item.subject);
          return (
            <div 
              key={`w-${i}`}
              className={`p-4 rounded-xl border-2 transition-colors ${
                isDarkMode 
                  ? 'bg-slate-700 border-rose-800' 
                  : 'bg-rose-50 border-rose-300'
              }`}
            >
              <p className="text-sm font-semibold text-rose-600 dark:text-rose-300">Biggest Weakness</p>
              <div className="flex items-center justify-between">
                <span className={`${getTextColor('font-bold text-lg text-slate-900', 'text-white')}`}>
                  {item.subject} ({weaknessSubject?.weaknessTopic})
                </span>
                <span className="text-xl font-black text-rose-500">{item.accuracy}%</span>
              </div>
            </div>
          );
        })}
      </div>
      <button 
        onClick={() => setCurrentView('analytics')}
        className="w-full mt-6 py-3 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-xl font-bold hover:bg-purple-200 dark:hover:bg-purple-800 transition-all shadow-md text-sm"
      >
        Go to Full Analytics
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="mb-10">
        <h2 className={`text-5xl lg:text-6xl font-black mb-3 ${getTextColor('text-slate-900', 'text-white')}`}>
          Welcome back, <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{user.name}</span>!
        </h2>
        <p className={`${getTextColor('text-xl text-slate-600', 'text-slate-400')}`}>
          Here's your personalized study dashboard
        </p>
      </div>

      {savedQuizSession && (
        <div className="p-6 rounded-3xl border border-rose-500 dark:border-rose-700 bg-rose-50/70 dark:bg-rose-900/40 shadow-xl flex justify-between items-center transition-all hover:scale-[1.01]">
          <div className="flex items-center gap-4">
            <Clock className="w-8 h-8 text-rose-600" />
            <div>
              <h3 className="text-xl font-black text-rose-800 dark:text-rose-300">Resume Incomplete Test</h3>
              <p className="text-sm text-rose-700 dark:text-rose-400">
                {savedQuizSession.quizQuestions.length} Questions · Time Left: {formatTime(savedQuizSession.timeLeftSeconds)}
              </p>
            </div>
          </div>
          <button 
            onClick={resumeQuiz}
            className="bg-rose-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-rose-700 transition-all shadow-md flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Resume
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-3xl p-8 lg:p-12 text-white shadow-2xl">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold mb-6">
              <Calendar className="w-4 h-4" />
              <span>MCQ of the Day</span>
            </div>

            {showMCQOfDay ? (
              <>
                <h3 className="text-3xl lg:text-4xl font-black mb-4">Today's Question</h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
                  <div className="text-sm font-bold mb-3 text-purple-200">Marrow · Pharmacology</div>
                  <p className="text-lg mb-4">
                    A 45-year-old male with hypertension develops a persistent dry cough. Which drug is most likely responsible?
                  </p>
                  <div className="grid gap-3">
                    {['A. Amlodipine', 'B. Enalapril', 'C. Losartan', 'D. Metoprolol'].map((option, i) => (
                      <button 
                        key={i}
                        className="text-left p-4 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 font-semibold transition-all"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => setShowMCQOfDay(false)}
                  className="bg-white text-purple-600 px-8 py-3 rounded-2xl font-black text-md hover:bg-purple-50 transition-all shadow-2xl inline-flex items-center gap-3 hover:scale-105"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Submit Answer</span>
                </button>
              </>
            ) : (
              <>
                <h3 className="text-3xl lg:text-5xl font-black mb-4">Great Job! 🎉</h3>
                <p className="text-lg lg:text-xl mb-8">You've completed today's MCQ!</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-5 py-3 bg-emerald-500/20 rounded-xl border border-emerald-300/50">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-bold">Correct! (+4)</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <HomeRecommendations />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <HomePerformanceSummary />
        </div>
        <HomeGoalSetting />
      </div>

      {/* FIXED LAYOUT - Subject Performance Summary full width, then stats, then Study Time & Achievements side by side */}
      <HomePerformanceSummaryDetail />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Target, label: 'Tests', value: user.testsCompleted, color: 'from-blue-300 to-cyan-300' },
          { icon: Award, label: 'Accuracy', value: `${user.overallAccuracy}%`, color: 'from-emerald-300 to-teal-300' },
          { icon: Flame, label: 'Streak', value: `${user.streak} days`, color: 'from-orange-300 to-rose-300' },
          { icon: FileText, label: 'MCQs', value: user.totalQuestions, color: 'from-purple-300 to-pink-300' }
        ].map((stat, i) => (
          <div 
            key={i}
            className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-6 hover:shadow-xl transition-all border`}
          >
            <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-2xl shadow-lg mb-4 inline-block`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className={`${getTextColor('text-xs font-bold text-slate-600', 'text-slate-400')} mb-2`}>
              {stat.label}
            </h3>
            <p className={`${getTextColor('text-3xl font-black text-slate-900', 'text-white')}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HomeStudyTimeTracker />
        <HomeAchievements />
      </div>

      {/* SUBJECT-WISE PERFORMANCE SECTION */}
      <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 border`}>
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h2 className={`${getTextColor('text-3xl font-black text-slate-900', 'text-white')} flex items-center gap-3`}>
            <BarChart3 className="w-8 h-8 text-purple-600" />
            Subject-Wise Performance
          </h2>
          <button 
            onClick={() => setCurrentView('analytics')}
            className="text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className={`block text-sm font-bold mb-2 ${getTextColor('text-slate-700', 'text-slate-300')}`}>
              Filter by QBank
            </label>
            <select
              value={selectedQBank}
              onChange={(e) => setSelectedQBank(e.target.value)}
              className={`w-full p-3 rounded-xl border font-semibold ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-300 text-slate-900'
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            >
              <option value="All Sources">All Sources</option>
              {Q_BANK_SOURCES.map((source) => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-bold mb-2 ${getTextColor('text-slate-700', 'text-slate-300')}`}>
              Filter by Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className={`w-full p-3 rounded-xl border font-semibold ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-300 text-slate-900'
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            >
              <option value="All Subjects">All Subjects</option>
              <option value="Anatomy">Anatomy</option>
              <option value="Physiology">Physiology</option>
              <option value="Biochemistry">Biochemistry</option>
              <option value="Pharmacology">Pharmacology</option>
              <option value="Pathology">Pathology</option>
              <option value="Microbiology">Microbiology</option>
            </select>
          </div>
        </div>

        {/* Subject Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjectData
            .filter(item => selectedSubject === 'All Subjects' || item.name === selectedSubject)
            .slice(0, 6)
            .map((subject, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border-2 transition-all hover:shadow-xl ${
                  subject.accuracy >= 75
                    ? 'bg-emerald-50 border-emerald-300 dark:bg-emerald-900/30 dark:border-emerald-700'
                    : subject.accuracy >= 60
                    ? 'bg-yellow-50 border-yellow-300 dark:bg-yellow-900/30 dark:border-yellow-700'
                    : 'bg-rose-50 border-rose-300 dark:bg-rose-900/30 dark:border-rose-700'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-black ${
                    subject.accuracy >= 75
                      ? 'text-emerald-700 dark:text-emerald-300'
                      : subject.accuracy >= 60
                      ? 'text-yellow-700 dark:text-yellow-300'
                      : 'text-rose-700 dark:text-rose-300'
                  }`}>
                    {subject.name}
                  </h3>
                  {selectedQBank === 'All Sources' && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-200 text-purple-700 dark:bg-purple-800 dark:text-purple-200">
                      {subject.qbank}
                    </span>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-1">
                      <span className={getTextColor('text-slate-600', 'text-slate-400')}>Accuracy</span>
                      <span className={`${
                        subject.accuracy >= 75
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : subject.accuracy >= 60
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : 'text-rose-600 dark:text-rose-400'
                      }`}>
                        {subject.accuracy}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 dark:bg-slate-700">
                      <div
                        className={`h-2 rounded-full ${
                          subject.accuracy >= 75
                            ? 'bg-emerald-500'
                            : subject.accuracy >= 60
                            ? 'bg-yellow-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${subject.accuracy}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Attempted</p>
                      <p className="text-lg font-black text-slate-900 dark:text-white">{subject.attempted}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Correct</p>
                      <p className="text-lg font-black text-slate-900 dark:text-white">{subject.correct}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {filteredSubjectData.filter(item => selectedSubject === 'All Subjects' || item.name === selectedSubject).length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg font-bold text-slate-500 dark:text-slate-400">
              No data available for this selection
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeView;
