// src/views/QuizInterface.jsx
import React, { useState, useContext } from 'react';
import { Clock, ChevronRight, Star, Bookmark, X, CheckCircle } from 'lucide-react';
import QuizContext from '../context/QuizContext';
import UIContext from '../context/UIContext';
import ReviewAnalysis from '../components/ReviewAnalysis';
import ResultsView from './ResultsView';

const QuizInterface = () => {
  const { 
    isQuizActive, quizQuestions, currentQuestionIndex, setCurrentQuestionIndex, 
    answers, setAnswers, markings, setMarkings, timeLeftSeconds, 
    submitQuiz, pauseQuizAndSave, formatTime
  } = useContext(QuizContext);
  const { getBackgroundColor, getCardStyle, isDarkMode, currentView, setCurrentView } = useContext(UIContext);
  
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([4]);
  
  const toggleBookmark = (questionId) => {
    setBookmarkedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId) 
        : [...prev, questionId]
    );
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    setMarkings(prev => {
      const currentStatus = prev[questionId];
      if (currentStatus === 3 || currentStatus === 0) {
        return { ...prev, [questionId]: 1 };
      }
      return prev;
    });
  };

  const handleMarkForReview = (questionId) => {
    setMarkings(prev => {
      const isAnswered = answers[questionId] !== undefined;
      if (prev[questionId] === 2) return { ...prev, [questionId]: 1 };
      if (prev[questionId] === 3) return { ...prev, [questionId]: 0 };
      return { ...prev, [questionId]: isAnswered ? 2 : 3 };
    });
  };

  const handleClearResponse = (questionId) => {
    setAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[questionId];
      return newAnswers;
    });
    setMarkings(prev => {
      const currentStatus = prev[questionId];
      if (currentStatus === 2) return { ...prev, [questionId]: 3 };
      if (currentStatus === 1) return { ...prev, [questionId]: 0 };
      return prev;
    });
  };
  
  const getQuestionStatusColor = (questionId) => {
    const status = markings[questionId];
    const isCurrent = quizQuestions[currentQuestionIndex]?.id === questionId;
    const isAttempted = answers[questionId] !== undefined;

    if (isCurrent) return 'bg-purple-500 border-4 border-yellow-300 text-white shadow-xl';
    if (status === 2) return 'bg-green-500 text-white';
    if (status === 3) return 'bg-yellow-500 text-white';
    if (isAttempted) return 'bg-blue-500 text-white';
    return isDarkMode ? 'bg-slate-700 text-slate-300 border border-slate-600' : 'bg-slate-200 text-slate-800';
  };
  
  const CardStyle = getCardStyle();
  const currentQuestion = quizQuestions[currentQuestionIndex];

  if (!currentQuestion) {
    return <ResultsView />;
  }

  const questionId = currentQuestion.id;
  const isAnswered = answers[questionId] !== undefined;
  const currentMarking = markings[questionId];
  const isBookmarked = bookmarkedQuestions.includes(questionId);
  const isUserCorrect = answers[questionId] + 1 === currentQuestion.answer;
  
  const getMarkingLabel = (status) => {
    switch (status) {
      case 1: return 'Attempted';
      case 2: return 'Marked (Attempted)';
      case 3: return 'Marked (Unattempted)';
      case 0: default: return 'Unattempted';
    }
  };
  const statusColor = { 0: 'border-slate-400 dark:border-slate-600', 1: 'border-blue-400 dark:border-blue-700', 2: 'border-green-400 dark:border-green-700', 3: 'border-yellow-400 dark:border-yellow-700' }[currentMarking];
  const statusBg = { 0: 'bg-white dark:bg-slate-800', 1: 'bg-blue-50 dark:bg-blue-950', 2: 'bg-green-50 dark:bg-green-950', 3: 'bg-yellow-50 dark:bg-yellow-950' }[currentMarking];
  const hasImage = currentQuestion.questionImage;

  return (
    <div className={`p-4 lg:p-10 h-full flex flex-col ${getBackgroundColor('bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50', 'bg-slate-900')}`}>
      <div className={`flex items-center justify-between p-4 mb-4 rounded-2xl shadow-xl ${getBackgroundColor('bg-white/80 backdrop-blur-md', 'bg-slate-800/80 backdrop-blur-md')}`}>
        <div className="flex items-center gap-4">
          <Clock className={`w-6 h-6 ${isQuizActive ? 'text-red-500' : 'text-slate-500'}`} />
          <span className={`text-2xl font-black ${isQuizActive ? 'text-red-500' : 'text-slate-500'}`}>{formatTime(timeLeftSeconds)}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 text-sm font-bold rounded-lg bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200">
            Q: {currentQuestionIndex + 1} / {quizQuestions.length}
          </div>
          <div className="px-3 py-1 text-sm font-bold rounded-lg bg-orange-200 text-orange-800 dark:bg-orange-800 dark:text-orange-200">
            Marks: +4 / -1
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        <div className="lg:col-span-2 overflow-y-auto pr-2 space-y-6">
          {hasImage && (
            <div className={`${CardStyle.bg} ${CardStyle.border} p-6 rounded-3xl shadow-xl`}>
              <h3 className="text-xl font-bold mb-4 border-b pb-2">Image Reference (Clinical/Image-Based Question)</h3>
              <img 
                src={currentQuestion.questionImage} 
                alt="Question Reference Image" 
                className="w-full max-h-96 object-contain rounded-xl border-2 border-slate-300 dark:border-slate-700" 
              />
            </div>
          )}
          
          <div className={`${CardStyle.bg} ${CardStyle.border} p-8 rounded-3xl shadow-xl border-4 ${statusColor} ${statusBg} transition-all`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Question {currentQuestionIndex + 1}</h3>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${currentMarking === 0 ? 'bg-slate-300 text-slate-800' : currentMarking === 1 ? 'bg-blue-300 text-blue-800' : currentMarking === 2 ? 'bg-green-300 text-green-800' : 'bg-yellow-300 text-yellow-800'}`}>
                {getMarkingLabel(currentMarking)}
              </span>
            </div>
            
            <p className="text-2xl font-semibold mb-6">{currentQuestion.question}</p>
            
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => isQuizActive && handleAnswerSelect(questionId, index)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium 
                    ${answers[questionId] === index 
                      ? (isQuizActive ? 'bg-purple-500 text-white border-purple-500 shadow-md' : (index + 1 === currentQuestion.answer ? 'bg-emerald-500 text-white border-emerald-500 shadow-md' : 'bg-rose-500 text-white border-rose-500 shadow-md'))
                      : (index + 1 === currentQuestion.answer && !isQuizActive) 
                        ? 'bg-emerald-50/70 border-emerald-300 dark:bg-emerald-900/50 dark:border-emerald-700'
                        : 'bg-white hover:bg-purple-50 border-slate-300 dark:bg-slate-700 dark:text-white dark:border-slate-600 dark:hover:bg-slate-600'
                    }
                  ${!isQuizActive ? 'cursor-default' : ''}
                  `}
                  disabled={!isQuizActive}
                >
                  <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span> {option}
                  {!isQuizActive && answers[questionId] === index && (
                    isUserCorrect ? (
                      <CheckCircle className="w-5 h-5 text-white ml-2 inline" />
                    ) : (
                      <X className="w-5 h-5 text-white ml-2 inline" />
                    )
                  )}
                </button>
              ))}
            </div>
          </div>

          {isQuizActive && (
            <div className="flex justify-between items-center gap-4 pt-4">
              <button
                onClick={pauseQuizAndSave}
                className="px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 bg-rose-500 text-white hover:bg-rose-600 shadow-lg"
              >
                <Clock className="w-5 h-5" />
                Pause / Exit
              </button>
              
              <button
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${currentQuestionIndex === 0 ? 'bg-slate-300 text-slate-500 dark:bg-slate-700 dark:text-slate-500' : 'bg-purple-500 text-white hover:bg-purple-600 shadow-lg'}`}
              >
                <ChevronRight className="w-5 h-5 transform rotate-180" />
                Previous
              </button>
            
              <div className="flex gap-3">
                <button
                  onClick={() => handleMarkForReview(questionId)}
                  className={`px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${currentMarking === 2 || currentMarking === 3 ? 'bg-yellow-600 text-white hover:bg-yellow-700' : 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200 hover:bg-yellow-300/80'} hover:scale-[1.02]`}
                >
                  <Star className="w-5 h-5" />
                  {currentMarking === 2 || currentMarking === 3 ? 'Unmark' : 'Mark for Review'}
                </button>

                <button
                  onClick={() => toggleBookmark(questionId)}
                  className={`px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${isBookmarked ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-rose-100 text-rose-600 hover:bg-rose-200 dark:bg-rose-900/50 dark:text-rose-300'} hover:scale-[1.02]`}
                >
                  <Bookmark className="w-5 h-5" fill={isBookmarked ? 'white' : 'currentColor'} />
                  {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
                </button>

                <button
                  onClick={() => handleClearResponse(questionId)}
                  disabled={!isAnswered && (currentMarking !== 2)}
                  className={`px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${isAnswered || currentMarking === 2 ? 'bg-slate-500 text-white hover:bg-slate-600' : 'bg-slate-300 text-slate-500 dark:bg-slate-700 dark:text-slate-500'}`}
                >
                  <X className="w-5 h-5" />
                  Clear
                </button>
              </div>

              <button
                onClick={() => {
                  if (currentQuestionIndex < quizQuestions.length - 1) {
                    setCurrentQuestionIndex(prev => prev + 1);
                  } else {
                    submitQuiz();
                  }
                }}
                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 bg-green-500 text-white hover:bg-green-600 shadow-lg`}
              >
                {currentQuestionIndex === quizQuestions.length - 1 ? 'Submit Test' : 'Save & Next'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {!isQuizActive && currentView === 'quiz' && (
            <div className="flex justify-between items-center gap-4 pt-4">
              <button
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${currentQuestionIndex === 0 ? 'bg-slate-300 text-slate-500 dark:bg-slate-700 dark:text-slate-500' : 'bg-purple-500 text-white hover:bg-purple-600 shadow-lg'}`}
              >
                <ChevronRight className="w-5 h-5 transform rotate-180" />
                Previous
              </button>

              <button
                onClick={() => {
                  if (currentQuestionIndex < quizQuestions.length - 1) {
                    setCurrentQuestionIndex(prev => prev + 1);
                  } else {
                    setCurrentView('results');
                  }
                }}
                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 bg-green-500 text-white hover:bg-green-600 shadow-lg`}
              >
                {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish Review' : 'Next Question'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {!isQuizActive && currentView === 'quiz' && (
            <ReviewAnalysis 
              question={currentQuestion} 
              userIncorrect={currentQuestion.id === 1 && answers[currentQuestion.id] !== (currentQuestion.answer - 1)} 
            />
          )}
        </div>
        
        <div className="lg:col-span-1 flex flex-col space-y-6 overflow-y-auto">
          <div className={`${CardStyle.bg} ${CardStyle.border} p-6 rounded-3xl shadow-lg`}>
            <h4 className="text-lg font-bold mb-4 border-b pb-2">Status Legend</h4>
            <div className="grid grid-cols-2 gap-3 text-sm font-semibold">
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-blue-500"></div> Attempted</div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 border border-slate-400"></div> Unattempted</div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-green-500"></div> Marked & Answered</div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-yellow-500"></div> Marked & Unanswered</div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-purple-500 border-2 border-yellow-300"></div> Current Question</div>
            </div>
          </div>

          <div className={`${CardStyle.bg} ${CardStyle.border} p-6 rounded-3xl shadow-lg flex-1`}>
            <h4 className="text-lg font-bold mb-4 border-b pb-2">Question Palette</h4>
            <div className="grid grid-cols-5 gap-3 max-h-96 lg:max-h-[70vh] overflow-y-auto pr-2">
              {quizQuestions.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-all shadow-md text-sm ${getQuestionStatusColor(q.id)}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizInterface;