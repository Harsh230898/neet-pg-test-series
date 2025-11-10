// src/views/SubjectTestView.jsx
import React, { useState, useContext } from 'react';
import { Target, FileText, ChevronRight, AlertCircle } from 'lucide-react';
import UIContext from '../context/UIContext';
import QuizContext from '../context/QuizContext';
import { ALL_SUBJECTS, Q_BANK_SOURCES } from '../constants/data';

const SubjectTestView = () => {
  const { getTextColor, getCardStyle, setCurrentView } = useContext(UIContext);
  const { startQuiz, savedQuizSession } = useContext(QuizContext);
  
  const [selectedSources] = useState(Q_BANK_SOURCES);
  const CardStyle = getCardStyle();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className={`text-4xl lg:text-6xl font-black mb-3 ${getTextColor('text-slate-900', 'text-white')}`}>Subject/Topic Tests</h2>
        <p className={getTextColor('text-xl text-slate-600', 'text-slate-400')}>
          Take a quick **50-question test** focused purely on a single Subject.
          Sources: 
          <span className="font-semibold text-purple-600 dark:text-purple-400"> {selectedSources.join(', ') || 'None Selected'}</span>.
        </p>
        {!selectedSources.length && (
          <p className="text-sm text-rose-500 font-semibold mt-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Please select QBank sources in the Custom Test Builder to enable Subject Tests.
          </p>
        )}
      </div>
           
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ALL_SUBJECTS.map(subject => (
          <button
            key={subject.name}
            onClick={() => startQuiz(false, subject.name)}
            disabled={!selectedSources.length || !!savedQuizSession}
            className={`rounded-3xl p-8 hover:shadow-2xl transition-all hover:scale-105 text-left border disabled:opacity-50 disabled:cursor-not-allowed ${CardStyle.bg} ${CardStyle.border}`}
          >
            <div className={`w-20 h-20 bg-gradient-to-br ${subject.color} rounded-3xl flex items-center justify-center text-5xl mb-5 shadow-2xl`}>
              {subject.icon}
            </div>
            <h3 className={getTextColor('font-black text-2xl mb-2 text-slate-900', 'text-white')}>{subject.name}</h3>
            <p className={getTextColor('text-sm text-slate-600', 'text-slate-400') + ' mb-4'}>50 Questions | {subject.modules.length} Modules</p>
            <div className="flex items-center text-purple-400 font-bold">
              <span>Start Quick Test</span>
              <ChevronRight className="w-5 h-5 ml-2" />
            </div>
          </button>
        ))}
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

export default SubjectTestView;