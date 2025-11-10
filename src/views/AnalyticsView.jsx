// src/views/AnalyticsView.jsx

import React, { useState, useContext } from 'react';
import { Brain, TrendingUp, TrendingDown, Zap, Compass, BarChart3, Target, Award, Activity } from 'lucide-react';
import UIContext from '../context/UIContext';
import { Q_BANK_SOURCES } from '../constants/data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AnalyticsView = () => {
  const { getTextColor, getCardStyle, isDarkMode } = useContext(UIContext);
  const CardStyle = getCardStyle();

  const [selectedQBank, setSelectedQBank] = useState('All Sources');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [totalCandidates, setTotalCandidates] = useState(200000);

  const performanceData = {
    strengths: [
      { subject: 'Anatomy', accuracy: 85 },
      { subject: 'Physiology', accuracy: 82 },
      { subject: 'Biochemistry', accuracy: 78 },
    ],
    weaknesses: [
      { subject: 'Pharmacology', accuracy: 58 },
      { subject: 'Pathology', accuracy: 62 },
      { subject: 'Microbiology', accuracy: 65 },
    ],
    sourceBreakdown: [
      { name: 'Marrow', accuracy: 78, questions: 250, completed: 4000 },
      { name: 'Prepladder', accuracy: 72, questions: 180, completed: 3500 },
      { name: 'Cerebellum', accuracy: 68, questions: 150, completed: 3000 },
      { name: 'EPW Dams', accuracy: 65, questions: 44, completed: 2800 },
    ],
  };

  // ALL 19 NEET PG SUBJECTS
  const subjectWiseData = {
    'All Sources': [
      { name: 'Anatomy', accuracy: 85, attempted: 450, correct: 383, qbank: 'Marrow' },
      { name: 'Physiology', accuracy: 82, attempted: 390, correct: 320, qbank: 'Marrow' },
      { name: 'Biochemistry', accuracy: 78, attempted: 280, correct: 218, qbank: 'Prepladder' },
      { name: 'Pharmacology', accuracy: 58, attempted: 320, correct: 186, qbank: 'Marrow' },
      { name: 'Pathology', accuracy: 62, attempted: 410, correct: 254, qbank: 'Cerebellum' },
      { name: 'Microbiology', accuracy: 65, attempted: 290, correct: 189, qbank: 'Marrow' },
      { name: 'Forensic Medicine', accuracy: 70, attempted: 200, correct: 140, qbank: 'Prepladder' },
      { name: 'Medicine', accuracy: 72, attempted: 520, correct: 374, qbank: 'Prepladder' },
      { name: 'Surgery', accuracy: 68, attempted: 480, correct: 326, qbank: 'Marrow' },
      { name: 'Obstetrics & Gynecology', accuracy: 75, attempted: 350, correct: 263, qbank: 'Prepladder' },
      { name: 'Pediatrics', accuracy: 70, attempted: 310, correct: 217, qbank: 'Cerebellum' },
      { name: 'Orthopedics', accuracy: 66, attempted: 240, correct: 158, qbank: 'Marrow' },
      { name: 'ENT', accuracy: 71, attempted: 180, correct: 128, qbank: 'Prepladder' },
      { name: 'Ophthalmology', accuracy: 74, attempted: 200, correct: 148, qbank: 'Marrow' },
      { name: 'Psychiatry', accuracy: 69, attempted: 190, correct: 131, qbank: 'Cerebellum' },
      { name: 'Dermatology', accuracy: 77, attempted: 210, correct: 162, qbank: 'Prepladder' },
      { name: 'Radiology', accuracy: 73, attempted: 220, correct: 161, qbank: 'Marrow' },
      { name: 'Anesthesia', accuracy: 67, attempted: 170, correct: 114, qbank: 'Cerebellum' },
      { name: 'Community Medicine', accuracy: 76, attempted: 300, correct: 228, qbank: 'Prepladder' },
    ],
    'Marrow': [
      { name: 'Anatomy', accuracy: 85, attempted: 450, correct: 383 },
      { name: 'Physiology', accuracy: 82, attempted: 390, correct: 320 },
      { name: 'Pharmacology', accuracy: 58, attempted: 320, correct: 186 },
      { name: 'Microbiology', accuracy: 65, attempted: 290, correct: 189 },
      { name: 'Surgery', accuracy: 68, attempted: 480, correct: 326 },
      { name: 'Orthopedics', accuracy: 66, attempted: 240, correct: 158 },
      { name: 'Ophthalmology', accuracy: 74, attempted: 200, correct: 148 },
      { name: 'Radiology', accuracy: 73, attempted: 220, correct: 161 },
    ],
    'Prepladder': [
      { name: 'Biochemistry', accuracy: 78, attempted: 280, correct: 218 },
      { name: 'Medicine', accuracy: 72, attempted: 520, correct: 374 },
      { name: 'Forensic Medicine', accuracy: 70, attempted: 200, correct: 140 },
      { name: 'Obstetrics & Gynecology', accuracy: 75, attempted: 350, correct: 263 },
      { name: 'ENT', accuracy: 71, attempted: 180, correct: 128 },
      { name: 'Dermatology', accuracy: 77, attempted: 210, correct: 162 },
      { name: 'Community Medicine', accuracy: 76, attempted: 300, correct: 228 },
    ],
    'Cerebellum': [
      { name: 'Pathology', accuracy: 62, attempted: 410, correct: 254 },
      { name: 'Pediatrics', accuracy: 70, attempted: 310, correct: 217 },
      { name: 'Psychiatry', accuracy: 69, attempted: 190, correct: 131 },
      { name: 'Anesthesia', accuracy: 67, attempted: 170, correct: 114 },
    ],
    'EPW Dams': [
      { name: 'Surgery', accuracy: 64, attempted: 150, correct: 96 },
      { name: 'Medicine', accuracy: 68, attempted: 180, correct: 122 },
      { name: 'Pediatrics', accuracy: 66, attempted: 120, correct: 79 },
    ],
  };

  const filteredSubjectData = selectedQBank === 'All Sources' 
    ? subjectWiseData['All Sources']
    : subjectWiseData[selectedQBank] || [];

  const predictiveScores = {
    predicted: 510,
    max: 800,
    percentile: 87.5,
    estimatedRank: Math.round((totalCandidates * (100 - 87.5)) / 100),
    totalCandidates: totalCandidates,
    strengths: ['Anatomy', 'Physiology', 'Biochemistry'],
    improvement: ['Pharmacology', 'Pathology'],
  };

  // Test History Data
  const testHistoryData = [
    { date: 'Nov 1', score: 65, accuracy: 68, questions: 50 },
    { date: 'Nov 2', score: 70, accuracy: 70, questions: 50 },
    { date: 'Nov 3', score: 68, accuracy: 69, questions: 50 },
    { date: 'Nov 4', score: 75, accuracy: 74, questions: 50 },
    { date: 'Nov 5', score: 72, accuracy: 72, questions: 50 },
    { date: 'Nov 6', score: 78, accuracy: 76, questions: 50 },
    { date: 'Nov 7', score: 80, accuracy: 78, questions: 50 },
    { date: 'Nov 8', score: 82, accuracy: 80, questions: 50 },
    { date: 'Nov 9', score: 85, accuracy: 82, questions: 50 },
    { date: 'Nov 10', score: 88, accuracy: 85, questions: 50 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="mb-10">
        <h2 className={`text-5xl lg:text-6xl font-black mb-3 ${getTextColor('text-slate-900', 'text-white')}`}>
          Performance <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Analytics</span>
        </h2>
        <p className={`${getTextColor('text-xl text-slate-600', 'text-slate-400')}`}>
          Deep insights into your preparation journey
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Overall Accuracy', value: '74%', icon: Target, color: 'from-emerald-300 to-teal-300' },
          { label: 'Total Questions', value: '3,140', icon: BarChart3, color: 'from-blue-300 to-cyan-300' },
          { label: 'Study Streak', value: '12 days', icon: Zap, color: 'from-orange-300 to-rose-300' },
          { label: 'Tests Taken', value: '28', icon: Award, color: 'from-purple-300 to-pink-300' },
        ].map((stat, i) => (
          <div key={i} className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-6 border`}>
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

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 border`}>
          <h3 className={`${getTextColor('text-2xl font-black mb-6 text-slate-900', 'text-white')} flex items-center gap-3 border-b pb-4`}>
            <TrendingUp className="w-6 h-6 text-emerald-500" />
            Top Strengths
          </h3>
          <div className="space-y-4">
            {performanceData.strengths.map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 border-2 border-emerald-300 dark:border-emerald-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg text-emerald-700 dark:text-emerald-300">{item.subject}</span>
                  <span className="text-2xl font-black text-emerald-600">{item.accuracy}%</span>
                </div>
                <div className="w-full bg-emerald-200 rounded-full h-2 dark:bg-emerald-800">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${item.accuracy}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 border`}>
          <h3 className={`${getTextColor('text-2xl font-black mb-6 text-slate-900', 'text-white')} flex items-center gap-3 border-b pb-4`}>
            <TrendingDown className="w-6 h-6 text-rose-500" />
            Areas to Improve
          </h3>
          <div className="space-y-4">
            {performanceData.weaknesses.map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/40 border-2 border-rose-300 dark:border-rose-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg text-rose-700 dark:text-rose-300">{item.subject}</span>
                  <span className="text-2xl font-black text-rose-600">{item.accuracy}%</span>
                </div>
                <div className="w-full bg-rose-200 rounded-full h-2 dark:bg-rose-800">
                  <div
                    className="bg-rose-500 h-2 rounded-full"
                    style={{ width: `${item.accuracy}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Source Breakdown */}
      <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 border`}>
        <h3 className={`${getTextColor('text-2xl font-black mb-6 text-slate-900', 'text-white')} flex items-center gap-3 border-b pb-4`}>
          <Compass className="w-6 h-6 text-blue-500" />
          QBank Source Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceData.sourceBreakdown.map((source, i) => (
            <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-700 dark:to-purple-900/30 border-2 border-purple-200 dark:border-purple-700">
              <h4 className="text-lg font-black text-purple-700 dark:text-purple-300 mb-4">{source.name}</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Accuracy</p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white">{source.accuracy}%</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Questions Attempted</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{source.questions}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Completed</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{source.completed}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Predictive Performance - WITH TOTAL CANDIDATES SELECTOR */}
      <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 border bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-indigo-900/30`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 border-b pb-4 gap-4">
          <h3 className={`${getTextColor('text-3xl font-black text-slate-900', 'text-white')} flex items-center gap-3`}>
            <Brain className="w-8 h-8 text-indigo-600" />
            Predictive Performance Analysis
          </h3>
          
          {/* Total Candidates Selector */}
          <div className="flex items-center gap-3">
            <label className={`text-sm font-bold ${getTextColor('text-slate-700', 'text-slate-300')}`}>
              Total Candidates:
            </label>
            <select
              value={totalCandidates}
              onChange={(e) => setTotalCandidates(Number(e.target.value))}
              className={`p-2 rounded-lg border font-semibold text-sm ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-300 text-slate-900'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              <option value={150000}>150,000 (2023)</option>
              <option value={180000}>180,000 (2024)</option>
              <option value={200000}>200,000 (2025)</option>
              <option value={220000}>220,000 (Projected)</option>
              <option value={250000}>250,000 (Max Estimate)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 text-center">
            <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300 mb-2">Predicted Score</p>
            <p className="text-5xl font-black text-indigo-600 dark:text-indigo-400">{predictiveScores.predicted}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">out of {predictiveScores.max}</p>
          </div>
          <div className="p-6 rounded-2xl bg-purple-100 dark:bg-purple-900/50 text-center">
            <p className="text-sm font-bold text-purple-700 dark:text-purple-300 mb-2">Percentile</p>
            <p className="text-5xl font-black text-purple-600 dark:text-purple-400">{predictiveScores.percentile}%</p>
          </div>
          <div className="p-6 rounded-2xl bg-pink-100 dark:bg-pink-900/50 text-center">
            <p className="text-sm font-bold text-pink-700 dark:text-pink-300 mb-2">Estimated Rank</p>
            <p className="text-5xl font-black text-pink-600 dark:text-pink-400">{predictiveScores.estimatedRank.toLocaleString()}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Based on {totalCandidates.toLocaleString()} candidates
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-teal-100 dark:bg-teal-900/50 text-center">
            <p className="text-sm font-bold text-teal-700 dark:text-teal-300 mb-2">Total Candidates</p>
            <p className="text-4xl font-black text-teal-600 dark:text-teal-400">{(predictiveScores.totalCandidates / 1000).toFixed(0)}K</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">NEET PG Estimate</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50">
            <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300 mb-3">Your Strengths</p>
            <div className="flex flex-wrap gap-2">
              {predictiveScores.strengths.map((str, i) => (
                <span key={i} className="px-4 py-2 bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-full text-sm font-bold">
                  {str}
                </span>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-rose-100 dark:bg-rose-900/50">
            <p className="text-sm font-bold text-rose-700 dark:text-rose-300 mb-3">Focus Areas</p>
            <div className="flex flex-wrap gap-2">
              {predictiveScores.improvement.map((imp, i) => (
                <span key={i} className="px-4 py-2 bg-rose-200 dark:bg-rose-800 text-rose-800 dark:text-rose-200 rounded-full text-sm font-bold">
                  {imp}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TEST HISTORY TIMELINE */}
      <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 border`}>
        <h2 className={`${getTextColor('text-3xl font-black mb-6 text-slate-900', 'text-white')} flex items-center gap-3 border-b pb-4`}>
          <Activity className="w-8 h-8 text-emerald-600" />
          Test History & Performance Trends
        </h2>

        <div className="mb-6">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={testHistoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="date" 
                stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
                style={{ fontSize: '12px', fontWeight: 'bold' }}
              />
              <YAxis 
                stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
                style={{ fontSize: '12px', fontWeight: 'bold' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                  border: `2px solid ${isDarkMode ? '#475569' : '#e2e8f0'}`,
                  borderRadius: '12px',
                  fontWeight: 'bold'
                }}
              />
              <Legend 
                wrapperStyle={{ fontWeight: 'bold', fontSize: '14px' }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', r: 5 }}
                name="Score"
              />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 5 }}
                name="Accuracy %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Test History Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                <th className={`text-left p-4 font-black ${getTextColor('text-slate-900', 'text-white')}`}>Date</th>
                <th className={`text-left p-4 font-black ${getTextColor('text-slate-900', 'text-white')}`}>Questions</th>
                <th className={`text-left p-4 font-black ${getTextColor('text-slate-900', 'text-white')}`}>Score</th>
                <th className={`text-left p-4 font-black ${getTextColor('text-slate-900', 'text-white')}`}>Accuracy</th>
                <th className={`text-left p-4 font-black ${getTextColor('text-slate-900', 'text-white')}`}>Trend</th>
              </tr>
            </thead>
            <tbody>
              {[...testHistoryData].reverse().map((test, index) => (
                <tr 
                  key={index}
                  className={`border-b ${isDarkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-100 hover:bg-slate-50'} transition-colors`}
                >
                  <td className={`p-4 font-bold ${getTextColor('text-slate-700', 'text-slate-300')}`}>
                    {test.date}
                  </td>
                  <td className={`p-4 ${getTextColor('text-slate-600', 'text-slate-400')}`}>
                    {test.questions}
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-full font-bold text-sm">
                      {test.score}%
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full font-bold text-sm ${
                      test.accuracy >= 75 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                        : test.accuracy >= 60
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300'
                    }`}>
                      {test.accuracy}%
                    </span>
                  </td>
                  <td className="p-4">
                    {index < testHistoryData.length - 1 && (
                      test.accuracy > testHistoryData[testHistoryData.length - 2 - index].accuracy ? (
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-rose-500" />
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SUBJECT-WISE PERFORMANCE - ALL 19 SUBJECTS */}
      <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 border`}>
        <h2 className={`${getTextColor('text-3xl font-black mb-6 text-slate-900', 'text-white')} flex items-center gap-3 border-b pb-4`}>
          <BarChart3 className="w-8 h-8 text-purple-600" />
          Subject-Wise Performance Analysis
        </h2>

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
              <option value="Forensic Medicine">Forensic Medicine</option>
              <option value="Medicine">Medicine</option>
              <option value="Surgery">Surgery</option>
              <option value="Obstetrics & Gynecology">Obstetrics & Gynecology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="ENT">ENT</option>
              <option value="Ophthalmology">Ophthalmology</option>
              <option value="Psychiatry">Psychiatry</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Radiology">Radiology</option>
              <option value="Anesthesia">Anesthesia</option>
              <option value="Community Medicine">Community Medicine</option>
            </select>
          </div>
        </div>

        {/* Subject Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjectData
            .filter(item => selectedSubject === 'All Subjects' || item.name === selectedSubject)
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

export default AnalyticsView;
