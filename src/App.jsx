// src/App.jsx
import React, { useContext, useState, useMemo, useEffect } from 'react';

// --- Import Contexts ---
import AuthContext from './context/AuthContext';
import UIContext from './context/UIContext';
import QuizContext from './context/QuizContext';
import FlashcardContext from './context/FlashcardContext';
import UGCContext from './context/UGCContext';
// import DeepDiveContext from './context/DeepDiveContext'; // If you create a separate context for subjects

// --- Import Constants (Mock Data - We only keep ALL_SUBJECTS for now, 
// but in a real app, this should also be fetched from Firestore) ---
// REMOVE: import { MOCK_QUESTIONS } from './constants/data';
import { ALL_SUBJECTS } from './constants/data'; // KEEP: Assume ALL_SUBJECTS will be moved to a context later. 

// --- Import Reusable Components ---
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MainHeader from './components/MainHeader';
import SplashScreen from './components/SplashScreen';
import NotificationHub from './components/NotificationHub';

// --- Import All View (Page) Components ---
import AuthView from './views/AuthView';
import HomeView from './views/HomeView';
import QBankView from './views/QBankView';
import QuizInterface from './views/QuizInterface';
import ResultsView from './views/ResultsView';
import AIChatView from './views/AIChatView';

// --- NEW/UPDATED Views ---
import AnalyticsView from './views/AnalyticsView';
import BookmarksView from './views/BookmarksView'; 
import SmartPracticeView from './views/SmartPracticeView';
import RevisionView from './views/RevisionView';
import SettingsView from './views/SettingsView'; 
// -------------------------

import ConquerModeView from './views/ConquerModeView';
import GrandTestsView from './views/GrandTestsView';
import SubjectTestView from './views/SubjectTestView';
import FlashcardsView from './views/FlashcardsView';
import FlashcardStudyView from './views/FlashcardStudyView';
import DeepDiveView from './views/DeepDiveView';
import PatientEncountersView from './views/PatientEncountersView';
import OfflineModeView from './views/OfflineModeView';
import SearchView from './views/SearchView';
import MockTestView from './views/MockTestView'; 

const App = () => {
  const { isAuthenticated, user, isLoading: isAuthLoading } = useContext(AuthContext); // Use AuthContext loading state
  const { 
    isDarkMode, isMobileMenuOpen, setIsMobileMenuOpen, 
    currentView, setCurrentView, isAppLoading, setIsAppLoading 
  } = useContext(UIContext);
  
  // Use real data from contexts
  const { isQuizActive, allQuestions, isLoadingQuestions } = useContext(QuizContext); 
  const { flashcardDecks, isLoadingDecks } = useContext(FlashcardContext);
  const { communityMnemonics, isLoadingMnemonics } = useContext(UGCContext);

  // Auth/Loading state management
  useEffect(() => {
    // If the authentication process is complete and the user is NOT authenticated, 
    // we can stop the overall app splash screen.
    if (!isAuthLoading && !isAuthenticated) {
        setIsAppLoading(false);
    }
    // For general content loading, we assume the app is ready once the main data 
    // contexts (Questions, Decks, Mnemonics) have finished loading.
    if (!isLoadingQuestions && !isLoadingDecks && !isLoadingMnemonics) {
        // Simulating the end of the initial app load after all data is ready
        setTimeout(() => setIsAppLoading(false), 500); 
    }
    
  }, [isAuthenticated, isAuthLoading, isLoadingQuestions, isLoadingDecks, isLoadingMnemonics, setIsAppLoading]);

  // Local state for search query
  const [searchQuery, setSearchQuery] = useState('');
  const performSearch = () => {
    if (!searchQuery.trim()) {
      setCurrentView('home');
      return;
    }
    setCurrentView('search');
  };

  // Search logic (Updated to use context data)
  const SearchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    
    // Block search results until all necessary data is loaded
    if (!query || isLoadingQuestions || isLoadingDecks || isLoadingMnemonics) 
        return { qbank: [], topics: [], flashcards: [], mnemonics: [] };
    
    // QBank search uses real questions
    const qbank = allQuestions.filter(q => 
      q.question.toLowerCase().includes(query) || (q.keywords && q.keywords.toLowerCase().includes(query))
    ).map(q => ({ id: q.id, title: q.question.substring(0, 100) + '...', source: q.source, subject: q.subject, type: 'QBank Question' }));
    
    // Topics search still uses ALL_SUBJECTS (assuming this will be moved to a context later)
    const topics = ALL_SUBJECTS.filter(s => 
      s.name.toLowerCase().includes(query) || s.aiSummary.toLowerCase().includes(query) || s.subtopics.some(t => t.toLowerCase().includes(query))
    ).map(s => ({ id: s.name, title: `${s.name} Deep Dive Hub`, snippet: s.aiSummary.substring(0, 120) + '...', icon: s.icon, type: 'Deep Dive Topic' }));
    
    // Flashcards search uses real flashcardDecks
    const flashcards = flashcardDecks.filter(d => 
      d.name.toLowerCase().includes(query) || (d.keywords && d.keywords.toLowerCase().includes(query))
    ).map(d => ({ id: d.name, title: `${d.name} Flashcard Deck`, count: d.cards ? d.cards.length : 0, type: 'Private Flashcard' })); // Added null check for cards
    
    // Mnemonics search uses real communityMnemonics
    const mnemonics = communityMnemonics.filter(m => 
      m.text.toLowerCase().includes(query) || (m.keywords && m.keywords.toLowerCase().includes(query))
    ).map(m => ({ id: m.id, title: m.text.substring(0, 100) + '...', subject: m.subject, votes: m.votes, type: 'Community Mnemonic' }));

    return { qbank, topics, flashcards, mnemonics };
  }, [searchQuery, allQuestions, isLoadingQuestions, flashcardDecks, isLoadingDecks, communityMnemonics, isLoadingMnemonics]);


  // The main router logic
  const renderView = () => {
    // High priority views that take over the screen
    if (isQuizActive || (currentView === 'quiz' && !isQuizActive)) return <QuizInterface />;
    if (currentView === 'results') return <ResultsView />;
    if (currentView === 'flashcard-study') return <FlashcardStudyView />;

    // Standard views
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'qbank':
        return <QBankView />;
      case 'analytics':
        return <AnalyticsView />;
      
      // --- NEW/UPDATED ROUTES ---
      case 'smart-practice':
        return <SmartPracticeView />;
      case 'revision-calendar':
        return <RevisionView />;
      case 'mistake-notebook': // Used to be 'bookmarks'
        return <BookmarksView />;
      case 'settings':
        return <SettingsView />;
      // --------------------------

      case 'subject-test':
        return <SubjectTestView />;
      case 'mock-test': 
        return <MockTestView />;
      case 'grand-tests':
        return <GrandTestsView />;
      case 'conquer-mode':
        return <ConquerModeView />;
      case 'deep-dive':
        return <DeepDiveView />;
      case 'flashcards':
        return <FlashcardsView />;
      case 'offline-mode':
        return <OfflineModeView />;
      case 'ai-chat':
        return <AIChatView />;
      case 'patient-encounters':
        return <PatientEncountersView />;
      case 'search':
        return <SearchView results={SearchResults} query={searchQuery} />;
      default:
        return <HomeView />;
    }
  };

  // If Auth is still loading, show splash screen (handled by AuthContext in main.jsx)
  if (isAuthLoading) {
    return <SplashScreen />; 
  }

  // If Auth is complete and user is not authenticated, show AuthView
  if (!isAuthenticated) {
    return (
      <>
        <SplashScreen /> 
        <AuthView />
      </>
    );
  }

  // Determine if the current view should be full-screen (i.e., hide header/sidebar components)
  const isFullScreenView = isQuizActive || 
                           currentView === 'quiz' || 
                           currentView === 'results' || 
                           currentView === 'flashcard-study' ||
                           currentView === 'mock-test'; 

  // Main Authenticated App Layout
  return (
    <div className={`flex h-screen transition-colors ${isDarkMode ? 'dark bg-slate-900 text-white' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-slate-900'}`}>
      {/* SplashScreen is only shown initially while data loads, then hidden via opacity transition */}
      <SplashScreen /> 
      <NotificationHub />

      <div className="hidden lg:block">
        <Sidebar user={user} />
      </div>
            
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" 
          onClick={() => setIsMobileMenuOpen(false)}>
          <div className="w-72 h-full" onClick={(e) => e.stopPropagation()}>
            <Sidebar user={user} />
          </div>
        </div>
      )}
            
      <div className={`flex-1 overflow-auto transition-opacity duration-500 ${isAppLoading ? 'opacity-0' : 'opacity-100'}`}>
        
        {!isFullScreenView && (
          <TopBar />
        )}

        <div className={`p-6 lg:p-10 ${isFullScreenView ? 'hidden' : ''}`}>
          <MainHeader 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            performSearch={performSearch} 
          />
        </div>
        
        {/* Main Content Area */}
        <div className={`${isFullScreenView ? 'h-full' : 'p-6 lg:p-10 pt-0'}`}>
          {renderView()}
        </div>
        
        {/* Global Footer */}
        {!isFullScreenView && (
          <footer className="p-4 mt-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-slate-800">
            &copy; {new Date().getFullYear()} Made With Love By HD <span role="img" aria-label="love-heart">❤️</span>
          </footer>
        )}
      </div>
    </div>
  );
};

export default App;