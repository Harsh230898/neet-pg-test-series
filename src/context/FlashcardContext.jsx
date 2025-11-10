// src/context/FlashcardContext.jsx
import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const FlashcardContext = createContext();

export const FlashcardProvider = ({ children }) => {
    // State for fetched data
    const [flashcardDecks, setFlashcardDecks] = useState([]);
    const [isLoadingDecks, setIsLoadingDecks] = useState(true);
    const [deckFetchError, setDeckFetchError] = useState(null);

    // Placeholder: State for currently active study session
    const [activeStudyDeck, setActiveStudyDeck] = useState(null); 
    const [studyProgress, setStudyProgress] = useState({});

    // Fetch Decks from Firestore
    useEffect(() => {
        const fetchDecks = async () => {
            setIsLoadingDecks(true);
            setDeckFetchError(null);
            try {
                const decksCollectionRef = collection(db, 'flashcardDecks');
                const decksSnapshot = await getDocs(decksCollectionRef);
                
                const decksList = decksSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setFlashcardDecks(decksList);
                console.log(`Fetched ${decksList.length} flashcard decks.`);
            } catch (error) {
                console.error("Error fetching flashcard decks:", error);
                setDeckFetchError("Failed to load flashcard decks.");
            } finally {
                setIsLoadingDecks(false);
            }
        };

        fetchDecks();
    }, []);
    
    // Placeholder functions for study logic
    const startStudySession = useCallback((deckId) => {
        const deck = flashcardDecks.find(d => d.id === deckId);
        if (deck) {
            setActiveStudyDeck(deck);
            setStudyProgress({}); // Reset progress
        }
    }, [flashcardDecks]);

    const finishStudySession = useCallback(() => {
        setActiveStudyDeck(null);
    }, []);

    const contextValue = useMemo(() => ({
        flashcardDecks,
        isLoadingDecks,
        deckFetchError,
        activeStudyDeck,
        studyProgress,
        startStudySession,
        finishStudySession,
        // ... include any other flashcard management functions
    }), [
        flashcardDecks, isLoadingDecks, deckFetchError, 
        activeStudyDeck, studyProgress, startStudySession, finishStudySession
    ]);

    return (
        <FlashcardContext.Provider value={contextValue}>
            {children}
        </FlashcardContext.Provider>
    );
};

export default FlashcardContext;