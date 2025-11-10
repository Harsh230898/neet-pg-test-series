// src/views/SmartPracticeView.jsx

import React, { useState, useContext } from 'react';
import { Brain, Target, Zap, TrendingDown, Play, Settings } from 'lucide-react';
import UIContext from '../context/UIContext';

const SmartPracticeView = () => {
  const { getTextColor, getCardStyle, isDarkMode, setCurrentView } = useContext(UIContext);
  const CardStyle = getCardStyle();

  const [practiceMode, setPracticeMode] = useState('weak-topics'); // weak-topics, mistakes, hybrid
  const [questionCount, setQuestionCount] = useState(25);
  const [difficulty, setDifficulty] = useState('adaptive'); // easy, medium, hard, adaptive

  // AI-analyzed weak areas based on user performance
  const weakTopics = [
    { 
      subject: 'Pharmacology', 
      topic: 'Antihypertensives',
      accuracy: 58, 
      attempted: 45,
      priority: 'urgent',
      improvementPotential: 85,
      estimatedQuestions: 15
    },
    { 
      subject: 'Pathology', 
      topic: 'Neoplasia',
      accuracy: 62, 
      attempted: 38,
      priority: 'high',
      improvementPotential: 78,
      estimatedQuestions: 12
    },
    { 
      subject: 'Microbiology', 
      topic: 'Bacterial Infections',
      accuracy: 65, 
      attempted: 52,
      priority: 'high',
      improvementPotential: 75,
      estimatedQuestions: 18
    },
    { 
      subject: 'Biochemistry', 
      topic: 'Metabolism',
      accuracy: 68, 
      attempted: 41,
      priority: 'medium',
      improvementPotential: 70,
      estimatedQuestions: 10
    },
  ];

  const repeatMistakes = [
    {
      question: 'ACE inhibitors side effects',
      subject: 'Pharmacology',
      wrongAttempts: 3,
      lastAttempt: '2025-11-09'
    },
    {
      question: 'Types of hypersensitivity reactions',
      subject: 'Pathology',
      wrongAttempts: 2,
      lastAttempt: '2025-11-08'
    },
    {
      question: 'Gram staining interpretation',
      subject: 'Microbiology',
      wrongAttempts: 2,
      lastAttempt: '2025-11-07'
    }
  ];

  const startSmartPractice = () => {
    // This would normally generate a custom quiz
    alert(`Starting Smart Practice:\nMode: ${practiceMode}\nQuestions: ${questionCount}\nDifficulty: ${difficulty}`);
    setCurrentView('quiz');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'from-red-500 to-rose-600';
      case 'high': return 'from-orange-500 to-amber-600';
      case 'medium': return 'from-yellow-500 to-orange-500';
      default: return 'from-green-500 to-emerald-600';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="mb-10">
        <h2 className={`text-5xl lg:text-6xl font-black mb-3 ${getTextColor('text-slate-900', 'text-white')}`}>
          Smart <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Practice</span>
        </h2>
        <p className={`${getTextColor('text-xl text-slate-600', 'text-slate-400')}`}>
          AI-powered personalized question sets targeting your weak areas
        </p>
      </div>

      {/* How It Works */}
      <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 border bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-indigo-900/30`}>
        <h3 className={`${getTextColor('text-2xl font-black mb-6 text-slate-900', 'text-white')} flex items-center gap-3`}>
          <Brain className="w-8 h-8 text-indigo-600" />
          How Smart Practice Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-slate-700 rounded-2xl">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-black text-xl">1</span>
            </div>
            <h4 className={`font-bold mb-2 ${getTextColor('text-slate-900', 'text-white')}`}>
              AI Analyzes Your Performance
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Our algorithm identifies subjects and topics where you score below 70%
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-slate-700 rounded-2xl">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-black text-xl">2</span>
            </div>
            <h4 className={`font-bold mb-2 ${getTextColor('text-slate-900', 'text-white')}`}>
              Generates Custom Quiz
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Creates a personalized question set focusing on your weak topics
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-slate-700 rounded-2xl">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-black text-xl">3</span>
            </div>
            <h4 className={`font-bold mb-2 ${getTextColor('text-slate-900', 'text-white')}`}>
              Tracks Improvement
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Monitors your progress and adjusts difficulty adaptively
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Panel */}
        <div className="lg:col-span-1">
          <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-6 border sticky top-6`}>
            <h3 className={`${getTextColor('text-xl font-black mb-6 text-slate-900', 'text-white')} flex items-center gap-3 border-b pb-4`}>
              <Settings className="w-6 h-6 text-purple-600" />
              Practice Settings
            </h3>

            <div className="space-y-6">
              {/* Practice Mode */}
              <div>
                <label className={`block text-sm font-bold mb-3 ${getTextColor('text-slate-700', 'text-slate-300')}`}>
                  Practice Mode
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'weak-topics', label: 'Weak Topics', icon: TrendingDown, desc: 'Focus on subjects <70% accuracy' },
                    { value: 'mistakes', label: 'Repeat Mistakes', icon: Target, desc: 'Questions you got wrong before' },
                    { value: 'hybrid', label: 'Hybrid Mode', icon: Zap, desc: 'Mix of weak topics + mistakes' }
                  ].map((mode) => (
                    <button
                      key={mode.value}
                      onClick={() => setPracticeMode(mode.value)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        practiceMode === mode.value
                          ? 'bg-purple-100 border-purple-600 dark:bg-purple-900/40 dark:border-purple-500'
                          : isDarkMode
                          ? 'bg-slate-700 border-slate-600 hover:bg-slate-600'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <mode.icon className={`w-5 h-5 ${practiceMode === mode.value ? 'text-purple-600' : 'text-slate-500'}`} />
                        <span className={`font-bold ${practiceMode === mode.value ? 'text-purple-900 dark:text-purple-200' : getTextColor('text-slate-900', 'text-white')}`}>
                          {mode.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 ml-8">{mode.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Count */}
              <div>
                <label className={`block text-sm font-bold mb-3 ${getTextColor('text-slate-700', 'text-slate-300')}`}>
                  Number of Questions
                </label>
                <select
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className={`w-full p-3 rounded-xl border font-semibold ${
                    isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-white border-slate-300 text-slate-900'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                >
                  <option value={10}>10 Questions (Quick)</option>
                  <option value={25}>25 Questions (Standard)</option>
                  <option value={50}>50 Questions (Extended)</option>
                  <option value={100}>100 Questions (Marathon)</option>
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label className={`block text-sm font-bold mb-3 ${getTextColor('text-slate-700', 'text-slate-300')}`}>
                  Difficulty Level
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className={`w-full p-3 rounded-xl border font-semibold ${
                    isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-white border-slate-300 text-slate-900'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                >
                  <option value="adaptive">Adaptive (Recommended)</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <button
                onClick={startSmartPractice}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black hover:scale-[1.02] transition-all shadow-xl flex items-center justify-center gap-3"
              >
                <Play className="w-6 h-6" />
                Start Smart Practice
              </button>
            </div>
          </div>
        </div>

        {/* Weak Topics Analysis */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weak Topics */}
          <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 border`}>
            <h3 className={`${getTextColor('text-2xl font-black mb-6 text-slate-900', 'text-white')} flex items-center gap-3 border-b pb-4`}>
              <TrendingDown className="w-6 h-6 text-red-500" />
              Your Weak Topics
            </h3>

            <div className="space-y-4">
              {weakTopics.map((topic, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border-2 transition-all hover:shadow-xl ${
                    topic.priority === 'urgent'
                      ? 'bg-red-50 border-red-300 dark:bg-red-900/30 dark:border-red-700'
                      : topic.priority === 'high'
                      ? 'bg-orange-50 border-orange-300 dark:bg-orange-900/30 dark:border-orange-700'
                      : 'bg-yellow-50 border-yellow-300 dark:bg-yellow-900/30 dark:border-yellow-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className={`text-xl font-black ${
                          topic.priority === 'urgent' ? 'text-red-700 dark:text-red-300' :
                          topic.priority === 'high' ? 'text-orange-700 dark:text-orange-300' :
                          'text-yellow-700 dark:text-yellow-300'
                        }`}>
                          {topic.subject}
                        </h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          topic.priority === 'urgent' ? 'bg-red-200 text-red-700 dark:bg-red-800 dark:text-red-200' :
                          topic.priority === 'high' ? 'bg-orange-200 text-orange-700 dark:bg-orange-800 dark:text-orange-200' :
                          'bg-yellow-200 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200'
                        }`}>
                          {topic.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className={`text-sm font-semibold ${getTextColor('text-slate-600', 'text-slate-400')}`}>
                        {topic.topic}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Accuracy</p>
                      <p className={`text-2xl font-black ${
                        topic.accuracy < 60 ? 'text-red-600' : 
                        topic.accuracy < 70 ? 'text-orange-600' : 'text-yellow-600'
                      }`}>
                        {topic.accuracy}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Attempted</p>
                      <p className={`text-2xl font-black ${getTextColor('text-slate-900', 'text-white')}`}>
                        {topic.attempted}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Potential</p>
                      <p className="text-2xl font-black text-emerald-600">
                        {topic.improvementPotential}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Questions</p>
                      <p className={`text-2xl font-black ${getTextColor('text-slate-900', 'text-white')}`}>
                        ~{topic.estimatedQuestions}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 rounded-full h-2 dark:bg-slate-700">
                      <div
                        className={`h-2 rounded-full ${
                          topic.priority === 'urgent' ? 'bg-red-500' :
                          topic.priority === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${topic.accuracy}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-slate-500">
                      Target: 75%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Repeat Mistakes */}
          <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 border`}>
            <h3 className={`${getTextColor('text-2xl font-black mb-6 text-slate-900', 'text-white')} flex items-center gap-3 border-b pb-4`}>
              <Target className="w-6 h-6 text-rose-500" />
              Common Mistakes to Revisit
            </h3>

            <div className="space-y-3">
              {repeatMistakes.map((mistake, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/30 border-2 border-rose-200 dark:border-rose-700 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className={`font-bold ${getTextColor('text-slate-900', 'text-white')}`}>
                        {mistake.question}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {mistake.subject} • Last attempt: {mistake.lastAttempt}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-rose-200 text-rose-700 dark:bg-rose-800 dark:text-rose-200 rounded-full text-xs font-bold">
                        Wrong {mistake.wrongAttempts}x
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartPracticeView;
