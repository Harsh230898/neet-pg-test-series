// src/views/DeepDiveView.jsx
import React, { useState, useContext } from 'react';
import { 
  X, Brain, TrendingUp, Target, Star, MessageSquare, ArrowUp, FileText, ChevronRight, Play 
} from 'lucide-react';
import UIContext from '../context/UIContext';
import UGCContext from '../context/UGCContext';
import QuizContext from '../context/QuizContext';
import { ALL_SUBJECTS } from '../constants/data';

const DeepDiveView = () => {
  const { getTextColor, getCardStyle } = useContext(UIContext);
  const { startQuiz } = useContext(QuizContext);
  const { communityMnemonics, submitMnemonic } = useContext(UGCContext);
  const CardStyle = getCardStyle();

  const [isDeepDiveModalOpen, setIsDeepDiveModalOpen] = useState(false);
  const [activeDeepDiveSubject, setActiveDeepDiveSubject] = useState(null);

  const openDeepDiveModal = (subject) => {
    const subjectData = ALL_SUBJECTS.find(s => s.name === subject);
    setActiveDeepDiveSubject(subjectData);
    setIsDeepDiveModalOpen(true);
  };
  
  const closeDeepDiveModal = () => {
    setIsDeepDiveModalOpen(false);
    setActiveDeepDiveSubject(null);
  };

  const DeepDiveModal = () => {
    if (!activeDeepDiveSubject) return null;
    const subject = activeDeepDiveSubject;
    const subjectMnemonics = communityMnemonics.filter(m => m.subject === subject.name);

    const MnemonicSubmission = () => {
      const [mnemonicText, setMnemonicText] = useState('');
      const handleSubmit = () => {
        if (mnemonicText.trim()) {
          submitMnemonic(`**User Contribution:** ${mnemonicText}`, subject.name);
          setMnemonicText('');
          console.log("Mnemonic submitted for review!");
        }
      };
      
      return (
        <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600">
          <h4 className="font-bold mb-3">Submit a Public Note/Mnemonic</h4>
          <textarea
            className="w-full p-2 mb-3 rounded-lg border border-slate-300 dark:bg-slate-800 dark:border-slate-600 focus:outline-none focus:border-purple-500"
            placeholder={`Share your high-yield fact or mnemonic for ${subject.name}...`}
            value={mnemonicText}
            onChange={(e) => setMnemonicText(e.target.value)}
            rows={3}
          />
          <button
            onClick={handleSubmit}
            disabled={!mnemonicText.trim()}
            className="w-full py-2 bg-rose-500 text-white rounded-lg font-semibold hover:bg-rose-600 transition-all disabled:opacity-50"
          >
            Submit Mnemonic
          </button>
        </div>
      );
    };

    return (
      <div 
        className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" 
        onClick={closeDeepDiveModal}
      >
        <div 
          className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 shadow-2xl ${CardStyle.bg} ${CardStyle.border}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h2 className={`text-4xl font-black flex items-center gap-4 ${CardStyle.text}`}>
              <span className="text-5xl">{subject.icon}</span> {subject.name} Hub
            </h2>
            <button onClick={closeDeepDiveModal} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-8">
            <div className="p-6 bg-purple-50/50 dark:bg-purple-900/50 rounded-2xl border border-purple-300 dark:border-purple-700">
              <div className="flex items-center gap-3 mb-3">
                <Brain className="w-5 h-5 text-purple-600" />
                <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300">AI Concept Summary</h3>
              </div>
              <p className={getTextColor('text-slate-700', 'text-slate-300')}>{subject.aiSummary}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-700 text-center">
                <TrendingUp className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-4xl font-black text-emerald-600 dark:text-emerald-300">{subject.topicAccuracy}%</p>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Your Accuracy</p>
              </div>
              <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/50 border border-blue-300 dark:border-blue-700 text-center">
                <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-4xl font-black text-blue-600 dark:text-blue-300">{Math.floor(Math.random() * 300) + 150}</p>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Total Questions</p>
              </div>
              <div className="p-6 rounded-2xl bg-yellow-50 dark:bg-yellow-900/50 border border-yellow-300 dark:border-yellow-700 text-center">
                <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-4xl font-black text-yellow-600 dark:text-yellow-300">{(subject.topicAccuracy > 75 ? 'Mastered' : 'Needs Focus')}</p>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Status</p>
              </div>
            </div>
            <div className={`${CardStyle.bg} ${CardStyle.border} p-6 rounded-2xl border`}>
              <div className="flex items-center justify-between mb-4 border-b pb-2">
                <h3 className="text-xl font-bold text-rose-600 dark:text-rose-300 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" /> Community Notes & Mnemonics
                </h3>
                <span className="text-sm font-bold text-slate-500">Public contributions for {subject.name}</span>
              </div>
              <ul className="space-y-3 text-sm">
                {subjectMnemonics.length > 0 ? subjectMnemonics.map((m, i) => (
                    <li key={m.id} className="p-3 border-b border-slate-100 dark:border-slate-700 last:border-b-0 flex justify-between items-center">
                      <span className={getTextColor('text-slate-700', 'text-slate-300')}>{m.text}</span>
                      <span className="text-xs font-semibold text-purple-500 flex items-center gap-1">
                        <ArrowUp className="w-3 h-3"/> {m.votes}
                      </span>
                    </li>
                  )) : (
                    <li className={getTextColor('text-slate-500 italic', 'text-slate-400')}>No public mnemonics yet. Be the first to contribute!</li>
                  )}
              </ul>
              <MnemonicSubmission />
            </div>
            <button
              onClick={() => { 
                closeDeepDiveModal(); 
                startQuiz(false, subject.name); 
              }}
              className="w-full py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white rounded-xl font-black text-xl hover:scale-[1.01] transition-all shadow-lg flex items-center justify-center gap-3"
            >
              <Play className="w-7 h-7" />
              <span>Start Practice Test on {subject.name} (Quick 10 Qs)</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className={`text-4xl lg:text-6xl font-black mb-3 ${getTextColor('text-slate-900', 'text-white')}`}>Deep Dive Hubs</h2>
          <p className={getTextColor('text-xl text-slate-600', 'text-slate-400')}>Centralized topic resources and performance analysis.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_SUBJECTS.map(subject => (
            <button 
              key={subject.name} 
              onClick={() => openDeepDiveModal(subject.name)}
              className={`rounded-3xl p-8 hover:shadow-2xl transition-all border text-left hover:scale-[1.01] ${CardStyle.bg} ${CardStyle.border}`}
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${subject.color} rounded-3xl flex items-center justify-center text-5xl mb-5 shadow-2xl`}>
                {subject.icon}
              </div>
              <h3 className={getTextColor('font-black text-2xl mb-4 text-slate-900', 'text-white')}>{subject.name}</h3>
              <div className="space-y-3 mb-6">
                <div className={getTextColor('flex items-center gap-2 text-sm text-slate-600', 'flex items-center gap-2 text-sm text-slate-400')}>
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span>{subject.modules.length} Modules covered</span>
                </div>
                <div className={getTextColor('flex items-center gap-2 text-sm text-slate-600', 'flex items-center gap-2 text-sm text-slate-400')}>
                  <Target className="w-4 h-4 text-blue-400" />
                  <span>{subject.topicAccuracy}% current accuracy</span>
                </div>
              </div>
              <div className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2">
                <span>View Hub</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>
      {isDeepDiveModalOpen && <DeepDiveModal />}
    </>
  );
};

export default DeepDiveView;