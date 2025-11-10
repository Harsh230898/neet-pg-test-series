// src/views/BookmarksView.jsx

import React, { useState, useContext } from 'react';
import { Bookmark, Search, Tag, StickyNote, Trash2, Edit2, Save, X } from 'lucide-react';
import UIContext from '../context/UIContext';

const BookmarksView = () => {
  const { getTextColor, getCardStyle, isDarkMode } = useContext(UIContext);
  const CardStyle = getCardStyle();

  const [bookmarks, setBookmarks] = useState([
    {
      id: 1,
      question: 'A 45-year-old male with hypertension develops a persistent dry cough. Which drug is most likely responsible?',
      subject: 'Pharmacology',
      topic: 'ACE Inhibitors',
      tags: ['Side Effects', 'Hypertension', 'Important'],
      note: 'ACE inhibitors cause dry cough due to bradykinin accumulation. Switch to ARBs if cough develops.',
      dateAdded: '2025-11-08',
      qbank: 'Marrow'
    },
    {
      id: 2,
      question: 'What is the most common cause of sudden cardiac death in young athletes?',
      subject: 'Medicine',
      topic: 'Cardiology',
      tags: ['High Yield', 'Emergency'],
      note: 'Hypertrophic cardiomyopathy - remember septal hypertrophy and outflow obstruction',
      dateAdded: '2025-11-07',
      qbank: 'Prepladder'
    },
    {
      id: 3,
      question: 'A patient presents with "bag of worms" sensation in scrotum. Diagnosis?',
      subject: 'Surgery',
      topic: 'Urology',
      tags: ['Clinical', 'Diagnosis'],
      note: 'Varicocele - classic description. More common on left side.',
      dateAdded: '2025-11-06',
      qbank: 'Marrow'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editNote, setEditNote] = useState('');
  const [newTag, setNewTag] = useState('');

  // Get all unique tags
  const allTags = ['All', ...new Set(bookmarks.flatMap(b => b.tags))];

  // Filter bookmarks
  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = 
      bookmark.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.note.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag === 'All' || bookmark.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const deleteBookmark = (id) => {
    setBookmarks(bookmarks.filter(b => b.id !== id));
  };

  const startEdit = (bookmark) => {
    setEditingId(bookmark.id);
    setEditNote(bookmark.note);
  };

  const saveEdit = (id) => {
    setBookmarks(bookmarks.map(b => 
      b.id === id ? { ...b, note: editNote } : b
    ));
    setEditingId(null);
  };

  const addTag = (bookmarkId) => {
    if (newTag.trim()) {
      setBookmarks(bookmarks.map(b => 
        b.id === bookmarkId 
          ? { ...b, tags: [...b.tags, newTag.trim()] }
          : b
      ));
      setNewTag('');
    }
  };

  const removeTag = (bookmarkId, tagToRemove) => {
    setBookmarks(bookmarks.map(b => 
      b.id === bookmarkId 
        ? { ...b, tags: b.tags.filter(t => t !== tagToRemove) }
        : b
    ));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="mb-10">
        <h2 className={`text-5xl lg:text-6xl font-black mb-3 ${getTextColor('text-slate-900', 'text-white')}`}>
          My <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Bookmarks</span>
        </h2>
        <p className={`${getTextColor('text-xl text-slate-600', 'text-slate-400')}`}>
          Your saved questions with notes and tags
        </p>
      </div>

      {/* Search and Filter */}
      <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-6 border`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border font-semibold ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          </div>

          {/* Tag Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {allTags.map((tag, index) => (
              <button
                key={index}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                  selectedTag === tag
                    ? 'bg-purple-600 text-white'
                    : isDarkMode
                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <p className={`text-sm font-bold ${getTextColor('text-slate-600', 'text-slate-400')}`}>
            Showing {filteredBookmarks.length} of {bookmarks.length} bookmarks
          </p>
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-6">
        {filteredBookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 border hover:shadow-xl transition-all`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Bookmark className="w-6 h-6 text-purple-600" fill="currentColor" />
                <div>
                  <h3 className={`text-lg font-black ${getTextColor('text-slate-900', 'text-white')}`}>
                    {bookmark.subject} - {bookmark.topic}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {bookmark.qbank} • Added {bookmark.dateAdded}
                  </p>
                </div>
              </div>
              <button
                onClick={() => deleteBookmark(bookmark.id)}
                className="p-2 rounded-xl bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Question */}
            <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-700 dark:to-purple-900/30">
              <p className={`font-semibold ${getTextColor('text-slate-800', 'text-slate-200')}`}>
                {bookmark.question}
              </p>
            </div>

            {/* Tags */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4 text-slate-500" />
                <p className={`text-sm font-bold ${getTextColor('text-slate-700', 'text-slate-300')}`}>
                  Tags
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {bookmark.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-full text-sm font-bold flex items-center gap-2"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(bookmark.id, tag)}
                      className="hover:text-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addTag(bookmark.id);
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-sm font-semibold w-32 ${
                      isDarkMode
                        ? 'bg-slate-700 border-slate-600 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                  <button
                    onClick={() => addTag(bookmark.id)}
                    className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-bold hover:bg-purple-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <StickyNote className="w-4 h-4 text-amber-500" />
                  <p className={`text-sm font-bold ${getTextColor('text-slate-700', 'text-slate-300')}`}>
                    Personal Notes
                  </p>
                </div>
                {editingId !== bookmark.id && (
                  <button
                    onClick={() => startEdit(bookmark)}
                    className="p-2 rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/60 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {editingId === bookmark.id ? (
                <div className="space-y-2">
                  <textarea
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                    rows={3}
                    className={`w-full p-3 rounded-xl border font-semibold ${
                      isDarkMode
                        ? 'bg-slate-700 border-slate-600 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(bookmark.id)}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className={`text-sm italic ${getTextColor('text-slate-600', 'text-slate-400')} bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl`}>
                  {bookmark.note || 'No notes added yet.'}
                </p>
              )}
            </div>
          </div>
        ))}

        {filteredBookmarks.length === 0 && (
          <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-12 border text-center`}>
            <Bookmark className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className={`text-xl font-bold ${getTextColor('text-slate-600', 'text-slate-400')}`}>
              No bookmarks found
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
              {searchTerm || selectedTag !== 'All' 
                ? 'Try adjusting your search or filters'
                : 'Start bookmarking questions to save them here'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksView;
