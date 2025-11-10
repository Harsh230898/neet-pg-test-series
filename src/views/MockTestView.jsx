// src/views/MockTestView.jsx

import React, { useState, useContext, useEffect } from 'react';
import { Clock, Play, Coffee, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import UIContext from '../context/UIContext';

const MockTestView = () => {
  const { getTextColor, getCardStyle, isDarkMode } = useContext(UIContext);
  const CardStyle = getCardStyle();

  const [testStarted, setTestStarted] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(210 * 60); // 3.5 hours
  const [breakTime, setBreakTime] = useState(15 * 60); // 15 minutes
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});

  const totalQuestions = 200;

  // Timer logic
  useEffect(() => {
    if (testStarted && !onBreak && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [testStarted, onBreak, timeRemaining]);

  useEffect(() => {
    if (onBreak && breakTime > 0) {
      const timer = setInterval(() => {
        setBreakTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (breakTime === 0) {
      setOnBreak(false);
      setBreakTime(15 * 60);
    }
  }, [onBreak, breakTime]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const toggleMark = (questionId) => {
    setMarked({ ...marked, [questionId]: !marked[questionId] });
  };

  const getQuestionStatus = (index) => {
    if (answers[index]) return 'answered';
    if (marked[index]) return 'marked';
    if (index === currentQuestion) return 'current';
    return 'not-visited';
  };

  if (!testStarted) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="mb-10">
          <h2 className={`text-5xl lg:text-6xl font-black mb-3 ${getTextColor('text-slate-900', 'text-white')}`}>
            NEET PG Mock Test
          </h2>
          <p className={`${getTextColor('text-xl text-slate-600', 'text-slate-400')}`}>
            Full exam simulation with real NEET PG pattern
          </p>
        </div>

        <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 border`}>
          <h3 className={`${getTextColor('text-2xl font-black mb-6 text-slate-900', 'text-white')} border-b pb-4`}>
            Test Instructions
          </h3>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
              <div>
                <p className={`font-bold ${getTextColor('text-slate-900', 'text-white')}`}>Total Questions: 200</p>
                <p className="text-sm text-slate-500">All 19 NEET PG subjects covered</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <p className={`font-bold ${getTextColor('text-slate-900', 'text-white')}`}>Total Time: 3 hours 30 minutes</p>
                <p className="text-sm text-slate-500">Real NEET PG exam duration</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Coffee className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <p className={`font-bold ${getTextColor('text-slate-900', 'text-white')}`}>Optional Break: 15 minutes</p>
                <p className="text-sm text-slate-500">Available after question 100</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <p className={`font-bold ${getTextColor('text-slate-900', 'text-white')}`}>Marking Scheme</p>
                <p className="text-sm text-slate-500">+4 for correct, -1 for incorrect, 0 for unattempted</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setTestStarted(true)}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black text-lg hover:scale-[1.01] transition-all shadow-xl flex items-center justify-center gap-3"
          >
            <Play className="w-6 h-6" />
            Start Mock Test
          </button>
        </div>
      </div>
    );
  }

  if (onBreak) {
    return (
      <div className="max-w-2xl mx-auto mt-20">
        <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-12 border text-center`}>
          <Coffee className="w-20 h-20 text-amber-500 mx-auto mb-6" />
          <h2 className={`text-4xl font-black mb-4 ${getTextColor('text-slate-900', 'text-white')}`}>
            Break Time
          </h2>
          <p className="text-6xl font-black text-amber-500 mb-4">{formatTime(breakTime)}</p>
          <p className={`text-xl mb-8 ${getTextColor('text-slate-600', 'text-slate-400')}`}>
            Relax and recharge!
          </p>
          <button
            onClick={() => setOnBreak(false)}
            className="px-8 py-4 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 transition-colors"
          >
            End Break Early
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Timer Header */}
      <div className={`${CardStyle.bg} ${CardStyle.border} rounded-2xl p-4 border flex items-center justify-between sticky top-0 z-10`}>
        <div className="flex items-center gap-4">
          <Clock className="w-5 h-5 text-purple-600" />
          <span className={`text-2xl font-black ${timeRemaining < 600 ? 'text-red-600' : 'text-purple-600'}`}>
            {formatTime(timeRemaining)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {currentQuestion === 100 && !onBreak && (
            <button
              onClick={() => setOnBreak(true)}
              className="px-4 py-2 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 transition-colors flex items-center gap-2"
            >
              <Coffee className="w-4 h-4" />
              Take Break
            </button>
          )}
          <button
            onClick={() => alert(`Test submitted! Answered: ${Object.keys(answers).length}/200`)}
            className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors"
          >
            Submit Test
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question Panel */}
        <div className="lg:col-span-3">
          <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 border`}>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-black ${getTextColor('text-slate-900', 'text-white')}`}>
                  Question {currentQuestion + 1} of {totalQuestions}
                </h3>
                <button
                  onClick={() => toggleMark(currentQuestion)}
                  className={`px-4 py-2 rounded-xl font-bold transition-colors ${
                    marked[currentQuestion]
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  {marked[currentQuestion] ? '⭐ Marked' : 'Mark for Review'}
                </button>
              </div>

              <p className={`text-lg mb-6 ${getTextColor('text-slate-800', 'text-slate-200')}`}>
                Sample Question {currentQuestion + 1}: A 45-year-old male presents with chest pain. What is the most likely diagnosis?
              </p>

              <div className="space-y-3">
                {['A. Myocardial Infarction', 'B. Angina Pectoris', 'C. Pericarditis', 'D. Aortic Dissection'].map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(currentQuestion, option)}
                    className={`w-full text-left p-4 rounded-xl font-semibold transition-all border-2 ${
                      answers[currentQuestion] === option
                        ? 'bg-purple-100 border-purple-600 text-purple-900 dark:bg-purple-900/40 dark:border-purple-500 dark:text-purple-200'
                        : isDarkMode
                        ? 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600'
                        : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                ← Previous
              </button>
              <button
                onClick={() => setCurrentQuestion(Math.min(totalQuestions - 1, currentQuestion + 1))}
                disabled={currentQuestion === totalQuestions - 1}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* Question Palette (OMR Style) */}
        <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-6 border sticky top-24 h-fit`}>
          <h4 className={`font-black mb-4 ${getTextColor('text-slate-900', 'text-white')}`}>Question Palette</h4>
          
          <div className="grid grid-cols-5 gap-2 mb-6 max-h-96 overflow-y-auto">
            {Array.from({ length: totalQuestions }, (_, i) => {
              const status = getQuestionStatus(i);
              return (
                <button
                  key={i}
                  onClick={() => setCurrentQuestion(i)}
                  className={`aspect-square rounded-lg font-bold text-sm transition-all ${
                    status === 'answered'
                      ? 'bg-emerald-500 text-white'
                      : status === 'marked'
                      ? 'bg-amber-500 text-white'
                      : status === 'current'
                      ? 'bg-purple-600 text-white ring-4 ring-purple-300'
                      : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          <div className="space-y-2 text-sm border-t pt-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-emerald-500"></div>
              <span className={getTextColor('text-slate-700', 'text-slate-300')}>Answered ({Object.keys(answers).length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-amber-500"></div>
              <span className={getTextColor('text-slate-700', 'text-slate-300')}>Marked ({Object.keys(marked).filter(k => marked[k]).length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-slate-200 dark:bg-slate-700"></div>
              <span className={getTextColor('text-slate-700', 'text-slate-300')}>Not Visited</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockTestView;
