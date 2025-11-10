// src/views/RevisionView.jsx

import React, { useState, useContext, useMemo } from 'react';
import { Calendar, Clock, TrendingDown, RefreshCw, BookOpen, AlertCircle } from 'lucide-react';
import UIContext from '../context/UIContext';
import { ALL_SUBJECTS } from '../constants/data';

const RevisionView = () => {
  const { getTextColor, getCardStyle, isDarkMode, setCurrentView } = useContext(UIContext);
  const CardStyle = getCardStyle();

  // Mock data - replace with real data from your context
  const [revisionSchedule, setRevisionSchedule] = useState(() => {
    const saved = localStorage.getItem('revision_schedule');
    return saved ? JSON.parse(saved) : {};
  });

  // Calculate subjects needing revision based on spaced repetition
  const getRevisionData = () => {
    const subjects = [
      { name: 'Pharmacology', lastStudied: '2025-11-08', accuracy: 58, nextReview: '2025-11-10', priority: 'high', daysOverdue: 0 },
      { name: 'Pathology', lastStudied: '2025-11-07', accuracy: 62, nextReview: '2025-11-10', priority: 'high', daysOverdue: 0 },
      { name: 'Microbiology', lastStudied: '2025-11-05', accuracy: 65, nextReview: '2025-11-08', priority: 'urgent', daysOverdue: 2 },
      { name: 'Biochemistry', lastStudied: '2025-11-09', accuracy: 78, nextReview: '2025-11-12', priority: 'medium', daysOverdue: -2 },
      { name: 'Anatomy', lastStudied: '2025-11-09', accuracy: 85, nextReview: '2025-11-16', priority: 'low', daysOverdue: -6 },
      { name: 'Physiology', lastStudied: '2025-11-08', accuracy: 82, nextReview: '2025-11-15', priority: 'low', daysOverdue: -5 },
    ];

    return subjects.sort((a, b) => {
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  const revisionData = getRevisionData();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'from-red-500 to-rose-600';
      case 'high':
        return 'from-orange-500 to-amber-600';
      case 'medium':
        return 'from-yellow-500 to-orange-500';
      case 'low':
        return 'from-green-500 to-emerald-600';
      default:
        return 'from-gray-500 to-slate-600';
    }
  };

  const getPriorityBadge = (priority, daysOverdue) => {
    if (daysOverdue > 0) {
      return { text: `${daysOverdue} days overdue`, color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' };
    } else if (daysOverdue === 0) {
      return { text: 'Due Today', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' };
    } else if (daysOverdue >= -2) {
      return { text: 'Due Soon', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' };
    }
    return { text: `Due in ${Math.abs(daysOverdue)} days`, color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' };
  };

  const markAsRevised = (subjectName) => {
    const today = new Date().toISOString().split('T')[0];
    const updated = { ...revisionSchedule, [subjectName]: today };
    setRevisionSchedule(updated);
    localStorage.setItem('revision_schedule', JSON.stringify(updated));
  };

  const stats = useMemo(() => {
    const urgent = revisionData.filter(s => s.priority === 'urgent').length;
    const high = revisionData.filter(s => s.priority === 'high').length;
    const overdue = revisionData.filter(s => s.daysOverdue > 0).length;
    return { urgent, high, overdue };
  }, [revisionData]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="mb-10">
        <h2 className={`text-5xl lg:text-6xl font-black mb-3 ${getTextColor('text-slate-900', 'text-white')}`}>
          Revision <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Calendar</span>
        </h2>
        <p className={`${getTextColor('text-xl text-slate-600', 'text-slate-400')}`}>
          Smart spaced repetition for maximum retention
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-6 border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-red-600 dark:text-red-400 mb-1">Urgent</p>
              <p className="text-4xl font-black text-red-500">{stats.urgent}</p>
            </div>
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>
        <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-6 border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-orange-600 dark:text-orange-400 mb-1">High Priority</p>
              <p className="text-4xl font-black text-orange-500">{stats.high}</p>
            </div>
            <TrendingDown className="w-12 h-12 text-orange-500" />
          </div>
        </div>
        <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-6 border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-purple-600 dark:text-purple-400 mb-1">Overdue</p>
              <p className="text-4xl font-black text-purple-500">{stats.overdue}</p>
            </div>
            <Clock className="w-12 h-12 text-purple-500" />
          </div>
        </div>
      </div>

      {/* How Spaced Repetition Works */}
      <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 border bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-indigo-900/30`}>
        <h3 className={`${getTextColor('text-2xl font-black mb-4 text-slate-900', 'text-white')} flex items-center gap-3`}>
          <BookOpen className="w-6 h-6 text-indigo-600" />
          How Spaced Repetition Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white dark:bg-slate-700 rounded-xl">
            <p className="font-bold text-indigo-600 mb-2">📅 1 Day</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">First review after learning</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-700 rounded-xl">
            <p className="font-bold text-purple-600 mb-2">📅 3 Days</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Second review interval</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-700 rounded-xl">
            <p className="font-bold text-pink-600 mb-2">📅 1 Week</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Third review interval</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-700 rounded-xl">
            <p className="font-bold text-rose-600 mb-2">📅 1 Month</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Long-term retention</p>
          </div>
        </div>
      </div>

      {/* Revision Schedule */}
      <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 border`}>
        <h3 className={`${getTextColor('text-2xl font-black mb-6 text-slate-900', 'text-white')} flex items-center gap-3 border-b pb-4`}>
          <Calendar className="w-6 h-6 text-purple-600" />
          Your Revision Schedule
        </h3>

        <div className="space-y-4">
          {revisionData.map((subject, index) => {
            const badge = getPriorityBadge(subject.priority, subject.daysOverdue);
            
            return (
              <div
                key={index}
                className={`p-6 rounded-2xl border-2 transition-all hover:shadow-xl ${
                  subject.priority === 'urgent'
                    ? 'bg-red-50 border-red-300 dark:bg-red-900/30 dark:border-red-700'
                    : subject.priority === 'high'
                    ? 'bg-orange-50 border-orange-300 dark:bg-orange-900/30 dark:border-orange-700'
                    : subject.priority === 'medium'
                    ? 'bg-yellow-50 border-yellow-300 dark:bg-yellow-900/30 dark:border-yellow-700'
                    : 'bg-green-50 border-green-300 dark:bg-green-900/30 dark:border-green-700'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className={`text-2xl font-black ${
                        subject.priority === 'urgent' ? 'text-red-700 dark:text-red-300' :
                        subject.priority === 'high' ? 'text-orange-700 dark:text-orange-300' :
                        subject.priority === 'medium' ? 'text-yellow-700 dark:text-yellow-300' :
                        'text-green-700 dark:text-green-300'
                      }`}>
                        {subject.name}
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${badge.color}`}>
                        {badge.text}
                      </span>
                    </div>
                    <div className="flex gap-6 text-sm">
                      <p className={`${getTextColor('text-slate-600', 'text-slate-400')}`}>
                        <span className="font-bold">Last Studied:</span> {subject.lastStudied}
                      </p>
                      <p className={`${getTextColor('text-slate-600', 'text-slate-400')}`}>
                        <span className="font-bold">Next Review:</span> {subject.nextReview}
                      </p>
                      <p className={`${getTextColor('text-slate-600', 'text-slate-400')}`}>
                        <span className="font-bold">Accuracy:</span> {subject.accuracy}%
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      markAsRevised(subject.name);
                      setCurrentView('qbank'); // Navigate to practice
                    }}
                    className={`px-6 py-3 bg-gradient-to-r ${getPriorityColor(subject.priority)} text-white rounded-xl font-bold hover:scale-105 transition-all shadow-lg flex items-center gap-2`}
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span>Revise Now</span>
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className={getTextColor('text-slate-600', 'text-slate-400')}>Retention Strength</span>
                    <span className={
                      subject.accuracy >= 75 ? 'text-green-600' :
                      subject.accuracy >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }>
                      {subject.accuracy >= 75 ? 'Strong' : subject.accuracy >= 60 ? 'Moderate' : 'Weak'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 dark:bg-slate-700">
                    <div
                      className={`h-2 rounded-full ${
                        subject.accuracy >= 75 ? 'bg-green-500' :
                        subject.accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${subject.accuracy}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RevisionView;
