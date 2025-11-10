// src/views/SearchView.jsx
import React, { useContext } from 'react';
import { FileText, Brain, Lightbulb, MessageSquare, AlertCircle } from 'lucide-react';
import UIContext from '../context/UIContext';

const SearchView = ({ results, query }) => {
  const { getTextColor, getCardStyle } = useContext(UIContext);
  const CardStyle = getCardStyle();
  const totalResults = results.qbank.length + results.topics.length + results.flashcards.length + results.mnemonics.length;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <h2 className={`text-4xl lg:text-6xl font-black ${getTextColor('text-slate-900', 'text-white')}`}>
        Search Results for: <span className="text-purple-600 dark:text-purple-400">"{query}"</span>
      </h2>
      <p className={getTextColor('text-xl text-slate-600', 'text-slate-400')}>{totalResults} results found across your ecosystem.</p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <h3 className={getTextColor('text-2xl font-black mb-3', 'text-white')}>Filter By Type</h3>
          {[
            { label: 'QBank Questions', count: results.qbank.length, icon: FileText, color: 'text-green-500' },
            { label: 'Deep Dive Topics', count: results.topics.length, icon: Brain, color: 'text-purple-500' },
            { label: 'Flashcard Decks', count: results.flashcards.length, icon: Lightbulb, color: 'text-orange-500' },
            { label: 'Community Notes', count: results.mnemonics.length, icon: MessageSquare, color: 'text-rose-500' },
          ].map((item, i) => (
            <div key={i} className={`p-4 rounded-xl flex justify-between items-center ${CardStyle.bg} ${CardStyle.border}`}>
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className={getTextColor('font-semibold', 'text-slate-300')}>{item.label}</span>
              </div>
              <span className="font-black text-xl text-purple-600 dark:text-purple-400">{item.count}</span>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3 space-y-6">
          {results.qbank.length > 0 && (
            <div className={`${CardStyle.bg} ${CardStyle.border} p-6 rounded-3xl`}>
              <h3 className="text-2xl font-black mb-4 border-b pb-2 flex items-center gap-2 text-green-600 dark:text-green-400">
                <FileText className='w-6 h-6'/> QBank Questions ({results.qbank.length})
              </h3>
              <div className="space-y-3">
                {results.qbank.slice(0, 3).map(q => (
                  <div key={q.id} className="p-3 border-l-4 border-l-green-400 bg-green-50/50 dark:bg-slate-700/50 rounded-lg">
                    <p className="font-semibold text-sm">{q.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Source: {q.source} | Subject: {q.subject}</p>
                  </div>
                ))}
              </div>
              {results.qbank.length > 3 && (
                <button className="mt-4 text-purple-600 dark:text-purple-400 font-bold text-sm hover:underline">View All {results.qbank.length} Questions</button>
              )}
            </div>
          )}
          {results.topics.length > 0 && (
            <div className={`${CardStyle.bg} ${CardStyle.border} p-6 rounded-3xl`}>
              <h3 className="text-2xl font-black mb-4 border-b pb-2 flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <Brain className='w-6 h-6'/> Deep Dive Topics ({results.topics.length})
              </h3>
              <div className="space-y-3">
                {results.topics.slice(0, 3).map(t => (
                  <div key={t.id} className="p-3 border-l-4 border-l-purple-400 bg-purple-50/50 dark:bg-slate-700/50 rounded-lg">
                    <p className="font-semibold text-sm">{t.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.snippet}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {results.flashcards.length > 0 && (
            <div className={`${CardStyle.bg} ${CardStyle.border} p-6 rounded-3xl`}>
              <h3 className="text-2xl font-black mb-4 border-b pb-2 flex items-center gap-2 text-orange-600 dark:text-orange-400">
                <Lightbulb className='w-6 h-6'/> Flashcard Decks ({results.flashcards.length})
              </h3>
              <div className="space-y-3">
                {results.flashcards.slice(0, 3).map(f => (
                  <div key={f.id} className="p-3 border-l-4 border-l-orange-400 bg-orange-50/50 dark:bg-slate-700/50 rounded-lg">
                    <p className="font-semibold text-sm">{f.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{f.count} cards</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {results.mnemonics.length > 0 && (
            <div className={`${CardStyle.bg} ${CardStyle.border} p-6 rounded-3xl`}>
              <h3 className="text-2xl font-black mb-4 border-b pb-2 flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <MessageSquare className='w-6 h-6'/> Community Notes ({results.mnemonics.length})
              </h3>
              <div className="space-y-3">
                {results.mnemonics.slice(0, 3).map(m => (
                  <div key={m.id} className="p-3 border-l-4 border-l-rose-400 bg-rose-50/50 dark:bg-slate-700/50 rounded-lg">
                    <p className="font-semibold text-sm" dangerouslySetInnerHTML={{ __html: m.title.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }}></p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Subject: {m.subject} | Votes: {m.votes}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {totalResults === 0 && (
            <div className={`${CardStyle.bg} ${CardStyle.border} p-20 rounded-3xl text-center`}>
              <AlertCircle className='w-10 h-10 mx-auto text-red-500 mb-4'/>
              <h3 className='text-2xl font-black'>No Results Found</h3>
              <p className='text-lg text-slate-500 dark:text-slate-400'>Try a different keyword or check your spelling.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchView;