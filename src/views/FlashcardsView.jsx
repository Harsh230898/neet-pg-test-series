// src/views/FlashcardsView.jsx
import React, { useState, useContext } from 'react';
import { Lightbulb, Layers, Zap, Maximize2 } from 'lucide-react';
import UIContext from '../context/UIContext';
import FlashcardContext from '../context/FlashcardContext';

const FlashcardsView = () => {
  const { getTextColor, getCardStyle, getBackgroundColor, isDarkMode } = useContext(UIContext);
  const { flashcardDecks, addDeck, startStudySession } = useContext(FlashcardContext);
  const CardStyle = getCardStyle();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const CreateDeckModal = () => {
    const [deckName, setDeckName] = useState('');
    const handleSubmit = () => {
      if (deckName.trim()) {
        addDeck({
          name: deckName,
          cards: 0,
          mastered: 0,
          toReview: 0,
          color: `from-${['red', 'green', 'blue', 'pink'][Math.floor(Math.random() * 4)]}-300 to-${['rose', 'teal', 'cyan', 'fuchsia'][Math.floor(Math.random() * 4)]}-300`,
          icon: '📝',
          keywords: deckName.toLowerCase(),
          content: []
        });
        setDeckName('');
        setIsCreateModalOpen(false); 
      }
    };
    
    return (
      <div 
        className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" 
        onClick={() => setIsCreateModalOpen(false)}
      >
        <div 
          className={`w-full max-w-lg rounded-3xl p-8 shadow-2xl ${CardStyle.bg} ${CardStyle.border}`}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-3xl font-black mb-6 flex items-center gap-3 border-b pb-3">
            <Lightbulb className="w-8 h-8 text-purple-500" /> Create New Flashcard Deck
          </h2>
          <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
            Create your own private flashcard collection to target specific high-yield facts.
          </p>
          <input
            type="text"
            placeholder="Enter Deck Name (e.g., 'CVS Micro mnemonics')"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            className={`w-full p-4 mb-6 border-2 rounded-xl text-lg font-semibold placeholder-slate-400 focus:outline-none focus:border-purple-400 shadow-inner ${isDarkMode ?
 'bg-slate-800 border-slate-700 text-white' : 'bg-white/70 border-slate-300 text-slate-900'}`}
          />
          <div className="flex justify-between gap-3">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="flex-1 py-3 bg-slate-300 text-slate-800 rounded-xl font-bold hover:bg-slate-400 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!deckName.trim()}
              className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:scale-[1.01] transition-all disabled:opacity-50"
            >
              Create Deck
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
          <h2 className={`text-4xl lg:text-6xl font-black mb-3 ${getTextColor('text-slate-900', 'text-white')}`}>Flashcards</h2>
          <p className={getTextColor('text-xl text-slate-600', 'text-slate-400')}>Your private, user-generated study decks.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {flashcardDecks.map((deck, i) => (
            <div key={i} className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 hover:shadow-2xl transition-all border`}>
              <div className={`w-16 h-16 bg-gradient-to-br ${deck.color} rounded-2xl flex items-center justify-center text-4xl mb-5 shadow-xl`}>
                {deck.icon}
              </div>
              <h3 className={getTextColor('font-black text-2xl mb-2 text-slate-900', 'text-white')}>{deck.name}</h3>
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-4">
                <span className='flex items-center gap-1'><Layers className='w-4 h-4 text-purple-500'/> {deck.cards} Total Cards</span>
                <span className='flex items-center gap-1'><Zap className='w-4 h-4 text-orange-500'/> {deck.toReview} To Review</span>
              </div>
              <div className="mb-4">
                <div className={getTextColor('flex justify-between text-sm font-bold text-slate-700', 'flex justify-between text-sm font-bold text-slate-300') + ' mb-2'}>
                  <span>Mastered Progress</span>
                  <span>{deck.mastered}/{deck.cards}</span>
                </div>
                <div className="w-full bg-purple-200/50 rounded-full h-3">
                  <div className={`bg-gradient-to-r ${deck.color} h-3 rounded-full`} style={{ width: (deck.mastered / (deck.cards || 1) * 100) + '%' }}></div>
                </div>
              </div>
              <button 
                onClick={() => startStudySession(deck)}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:scale-105 transition-all disabled:opacity-50"
                disabled={!deck.content || deck.content.length === 0}
              >
                Study
              </button>
            </div>
          ))}
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className={getBackgroundColor('bg-gradient-to-br from-purple-100 to-pink-100', 'bg-slate-800') + ' w-full rounded-3xl p-12 text-center border-2 border-purple-200 dark:border-purple-800 hover:scale-[1.01] transition-transform'}
        >
          <Lightbulb className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h3 className={getTextColor('text-3xl font-black mb-3 text-slate-900', 'text-white')}>Create New Deck</h3>
          <p className={getTextColor('text-lg text-slate-600', 'text-slate-400') + ' mb-6'}>Build custom flashcards from your notes and mistakes.</p>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl inline-flex items-center gap-2">
            <Maximize2 className='w-5 h-5'/> Create Deck
          </div>
        </button>
      </div>
      {isCreateModalOpen && <CreateDeckModal />}
    </>
  );
};

export default FlashcardsView;