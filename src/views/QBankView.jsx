// src/views/QBankView.jsx
import React, { useState, useMemo, useContext } from 'react';
import { Library, BookOpen, FileText, Filter, Award, Brain, Search, Play, Clock, AlertCircle } from 'lucide-react';
import UIContext from '../context/UIContext';
import QuizContext from '../context/QuizContext';
import { ALL_SUBJECTS, Q_BANK_SOURCES, DIFFICULTY_OPTIONS, COGNITIVE_SKILL_OPTIONS } from '../constants/data';

const QBankView = () => {
  const { getTextColor, getCardStyle, isDarkMode } = useContext(UIContext);
  const { startQuiz, savedQuizSession, resumeQuiz, formatTime } = useContext(QuizContext);

  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedModules, setSelectedModules] = useState([]); 
  const [selectedSubtopics, setSelectedSubtopics] = useState([]); 
  const [numberOfQuestions, setNumberOfQuestions] = useState(50);
  const [selectedSources, setSelectedSources] = useState(Q_BANK_SOURCES);
  const [selectedDifficulty, setSelectedDifficulty] = useState('Medium');
  const [selectedCognitiveSkill, setSelectedCognitiveSkill] = useState([]);
  const [keywordQuery, setKeywordQuery] = useState('');
  
  const CardStyle = getCardStyle();
  const currentSubjectData = useMemo(() => {
    return ALL_SUBJECTS.find(s => s.name === selectedSubject);
  }, [selectedSubject]);

  const toggleSource = (source) => setSelectedSources(prev => prev.includes(source) ? prev.filter(s => s !== source) : [...prev, source]);
  const toggleCognitiveSkill = (skill) => setSelectedCognitiveSkill(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  const toggleModule = (moduleName) => setSelectedModules(prev => prev.includes(moduleName) ? prev.filter(m => m !== moduleName) : [...prev, moduleName]);
  const toggleSubtopic = (subtopic) => setSelectedSubtopics(prev => prev.includes(subtopic) ? prev.filter(s => s !== subtopic) : [...prev, subtopic]);
  
  const handleSubjectSelect = (subjectName) => {
    if (selectedSubject === subjectName) {
      setSelectedSubject('');
      setSelectedModules([]);
      setSelectedSubtopics([]); 
    } else {
      setSelectedSubject(subjectName);
      setSelectedModules([]);
      setSelectedSubtopics([]); 
    }
  };

  const isTestReady = selectedSubject && selectedSources.length > 0 && numberOfQuestions > 0;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <h2 className={`text-4xl lg:text-6xl font-black mb-3 ${getTextColor('text-slate-900', 'text-white')}`}>Custom Test Builder</h2>
        <p className={getTextColor('text-xl text-slate-600', 'text-slate-400')}>Filter questions by source, subject, topic, and difficulty</p>
      </div>
      
      {savedQuizSession && (
        <div className={`p-6 rounded-3xl border border-rose-500 dark:border-rose-700 bg-rose-50/70 dark:bg-rose-900/40 shadow-xl flex justify-between items-center transition-all hover:scale-[1.01] mb-8`}>
          <div className="flex items-center gap-4">
            <Clock className="w-8 h-8 text-rose-600" />
            <div>
              <h3 className="text-xl font-black text-rose-800 dark:text-rose-300">Resume Incomplete Test</h3>
              <p className="text-sm text-rose-700 dark:text-rose-400">
                {savedQuizSession.quizQuestions.length} Questions |
                Time Left: {formatTime(savedQuizSession.timeLeftSeconds)}
              </p>
            </div>
          </div>
          <button
            onClick={resumeQuiz}
            className="bg-rose-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-rose-700 transition-all shadow-md flex items-center gap-2"
          >
            <Play className="w-5 h-5" /> Resume
          </button>
        </div>
      )}

      <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 lg:p-10 space-y-8 border`}>
        <div>
          <label className={`flex items-center gap-2 text-xl font-black mb-5 ${CardStyle.text}`}>
            <Library className="w-6 h-6 text-purple-600" />
            <span>QBank Source (Select at least one)</span>
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Q_BANK_SOURCES.map(source => (
              <button
                key={source}
                onClick={() => toggleSource(source)}
                className={`p-4 rounded-2xl border-2 font-bold transition-all hover:shadow-md ${
                  selectedSources.includes(source)
                    ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-lg dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-700'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700'
                }`}
              >
                {source}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={`flex items-center gap-2 text-xl font-black mb-5 ${CardStyle.text}`}>
            <BookOpen className="w-6 h-6 text-pink-600" />
            <span>Subject (Select one)</span>
          </label>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-96 overflow-y-auto pr-2">
            {ALL_SUBJECTS.map(subject => (
              <button
                key={subject.name}
                onClick={() => handleSubjectSelect(subject.name)}
                className={`p-4 rounded-2xl border-2 font-bold transition-all hover:shadow-md ${
                  selectedSubject === subject.name
                    ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-lg dark:bg-pink-900/50 dark:text-pink-300 dark:border-pink-700'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700'
                }`}
              >
                <div className="text-3xl mb-2">{subject.icon}</div>
                <div className="text-xs">{subject.name}</div>
              </button>
            ))}
          </div>
        </div>

        {currentSubjectData && (
          <div>
            <label className={`flex items-center gap-2 text-xl font-black mb-5 ${CardStyle.text}`}>
              <FileText className="w-6 h-6 text-orange-600" />
              <span>Module / Chapter (Optional)</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-60 overflow-y-auto pr-2">
              {currentSubjectData.modules.map(moduleName => (
                <button
                  key={moduleName}
                  onClick={() => toggleModule(moduleName)}
                  className={`p-3 text-sm rounded-xl border-2 transition-all hover:shadow-sm ${
                    selectedModules.includes(moduleName)
                      ? 'border-orange-500 bg-orange-50 text-orange-700 font-semibold dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-700'
                      : 'border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-400'
                  }`}
                >
                  {moduleName}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentSubjectData && (
          <div>
            <label className={`flex items-center gap-2 text-xl font-black mb-5 ${CardStyle.text}`}>
              <Filter className="w-6 h-6 text-blue-600" />
              <span>Subtopic (Optional, within selected Subject)</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-60 overflow-y-auto pr-2">
              {currentSubjectData.subtopics.map((subtopic, index) => (
                <button
                  key={index + subtopic}
                  onClick={() => toggleSubtopic(subtopic)}
                  className={`p-3 text-sm rounded-xl border-2 transition-all hover:shadow-sm ${
                    selectedSubtopics.includes(subtopic)
                      ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700'
                      : 'border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-400'
                  }`}
                >
                  {subtopic}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className={`flex items-center gap-2 text-xl font-black mb-5 ${CardStyle.text}`}>
            <Award className="w-6 h-6 text-teal-600" />
            <span>Difficulty</span>
          </label>
          <div className="grid grid-cols-3 gap-4">
            {DIFFICULTY_OPTIONS.map(difficulty => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`p-4 rounded-2xl border-2 font-bold transition-all hover:shadow-md ${
                  selectedDifficulty === difficulty
                    ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-lg dark:bg-teal-900/50 dark:text-teal-300 dark:border-teal-700'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={`flex items-center gap-2 text-xl font-black mb-5 ${CardStyle.text}`}>
            <Brain className="w-6 h-6 text-green-600" />
            <span>Cognitive Skill</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COGNITIVE_SKILL_OPTIONS.map(skill => (
              <button
                key={skill}
                onClick={() => toggleCognitiveSkill(skill)}
                className={`p-4 text-sm rounded-2xl border-2 font-bold transition-all hover:shadow-md ${
                  selectedCognitiveSkill.includes(skill)
                    ? 'border-green-500 bg-green-50 text-green-700 shadow-lg dark:bg-green-900/50 dark:text-green-300 dark:border-green-700'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={`flex items-center gap-2 text-xl font-black mb-5 ${CardStyle.text}`}>
            <Search className="w-6 h-6 text-red-600" />
            <span>Keyword Search (e.g., "Parkinson's", "Beta-Blockers")</span>
          </label>
          <input
            type="text"
            placeholder="Enter keywords..."
            value={keywordQuery}
            onChange={(e) => setKeywordQuery(e.target.value)}
            className={`w-full p-4 border-2 rounded-xl text-lg font-semibold placeholder-slate-400 focus:outline-none focus:border-red-400 shadow-inner transition-colors ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 text-white' 
                : 'bg-white/70 backdrop-blur-sm border-slate-300 text-slate-900'
            }`}
          />
        </div>
        
        <div>
          <label className={`flex items-center gap-2 text-xl font-black mb-5 ${CardStyle.text}`}>
            <FileText className="w-6 h-6 text-purple-600" />
            <span>Test Length</span>
          </label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[10, 25, 50, 100, 150, 200].map(num => (
              <button
                key={num}
                onClick={() => setNumberOfQuestions(num)}
                className={`p-5 rounded-2xl border-2 font-black transition-all hover:shadow-md ${
                  numberOfQuestions === num
                    ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-lg dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-700'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => startQuiz(false, selectedSubject)}
          disabled={!isTestReady || !!savedQuizSession}
          className={`w-full py-6 rounded-2xl font-black text-xl transition-all ${
            isTestReady && !savedQuizSession
              ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white hover:shadow-2xl hover:scale-[1.02]'
              : 'bg-slate-300 text-slate-500 cursor-not-allowed dark:bg-slate-700 dark:text-slate-400'
          } flex items-center justify-center gap-3`}
        >
          <Play className="w-7 h-7" />
          <span>Start Custom Test ({numberOfQuestions} MCQs)</span>
        </button>
        {(!isTestReady || !!savedQuizSession) && (
          <p className="text-center text-sm text-rose-500 font-semibold flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {savedQuizSession ? 'Resume your saved test or submit it first to start a new test.' : 'Select a Subject and at least one Source to begin.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default QBankView;