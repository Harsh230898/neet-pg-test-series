// src/context/AIChatContext.jsx
import React, { useState, useContext, createContext, useCallback } from 'react';
import NotificationContext from './NotificationContext';
import FlashcardContext from './FlashcardContext';
import UIContext from './UIContext';
import { mockGroqApiCall } from '../services/api';

const AIChatContext = createContext();

export const AIChatProvider = ({ children }) => {
  const notificationContext = useContext(NotificationContext);
  const flashcardContext = useContext(FlashcardContext);
  const uiContext = useContext(UIContext);

  const [aiMessages, setAiMessages] = useState([
    { sender: 'ai', content: "👋 Welcome to MedVanshi AI! I'm your doubt solver and high-yield flashcard generator. What can I help you study today?", type: 'text' }
  ]);
  const [aiLoading, setAiLoading] = useState(false);
  // REMOVED: aiIntroShown state is no longer needed here

  const saveAIFlashcards = (flashcards, topic) => {
    if (!flashcards || flashcards.length === 0) {
      notificationContext?.addNotification("Failed to save: No flashcards found.", 'error');
      return;
    }
    const deckName = `🤖 AI: ${topic.substring(0, 30).trim()} - ${new Date().toLocaleDateString()}`;
    const newDeck = {
        name: deckName,
        cards: flashcards.length,
        mastered: 0,
        toReview: flashcards.length,
        color: 'from-purple-500 to-pink-500', 
        icon: '🤖',
        keywords: topic.toLowerCase(),
        content: flashcards.map((card, index) => ({
            id: index,
            question: card.cue,
            answer: card.answer,
            highYieldNote: card.highYieldNote,
            tags: card.tags.join(', '),
        }))
    };
    flashcardContext?.addDeck(newDeck);
    notificationContext?.addNotification(`Deck "${deckName}" saved with ${flashcards.length} cards!`, 'success');
  };

  const handleAITextResponse = (content) => {
    setAiMessages(prev => [...prev, { sender: 'ai', content: content, type: 'text' }]);
  };

  const handleAIFlashcardResponse = (jsonString, userPrompt) => {
    try {
      const data = JSON.parse(jsonString);
      const flashcards = data.flashcards;
      if (!flashcards || flashcards.length === 0) throw new Error("No flashcards generated.");
      const topic = userPrompt.replace(/flashcard(s)?|create|high-yield on|generate/gi, '').trim() || "Generated Topic";
      const previewContent = `
          **✅ Generated 10 High-Yield Flashcards** on **${topic}**.
          **Card 1 (Preview):** ${flashcards[0].cue}
          **Card 2 (Preview):** ${flashcards[1].cue}
          
          Click the button below to save this new deck to your 'Flashcards' tab.
          `;
      setAiMessages(prev => [...prev, {
          sender: 'ai',
          content: previewContent,
          type: 'flashcard_preview',
          payload: flashcards,
          topic: topic
      }]);
    } catch (e) {
      notificationContext?.addNotification("AI returned an invalid format. Please try again.", 'error');
      handleAITextResponse("I had trouble reading the format of the cards. Could you try asking for a simpler, single topic?");
    }
  };

  const handleUserSubmit = useCallback(async (userInput) => {
    if (aiLoading || userInput.length < 3) return;
    setAiMessages(prev => [...prev, { sender: 'user', content: userInput, type: 'text' }]);
    setAiLoading(true);
    uiContext?.setIsGlobalLoading(true);

    const lowerCaseInput = userInput.toLowerCase();
    let intent = 'doubt_solver';
    if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi') || lowerCaseInput.includes('hey')) {
      intent = 'greeting';
    } else if (lowerCaseInput.includes('flashcard') || lowerCaseInput.includes('card') || lowerCaseInput.includes('create') || lowerCaseInput.includes('generate')) {
      intent = 'flashcard';
    }

    try {
      let aiResponseContent;
      if (intent === 'flashcard') {
        aiResponseContent = await mockGroqApiCall("DUMMY_SCHEMA", userInput, true);
        handleAIFlashcardResponse(aiResponseContent, userInput);
      } else {
        aiResponseContent = await mockGroqApiCall("DOUBT_SOLVING_SYSTEM_PROMPT", userInput, false);
        handleAITextResponse(aiResponseContent);
      }
    } catch (error) {
      notificationContext?.addNotification("AI assistant failed to respond. Please check your connection.", 'error');
      handleAITextResponse("Sorry, I encountered an internal error. Please try again.");
    } finally {
      setAiLoading(false);
      uiContext?.setIsGlobalLoading(false);
    }
  }, [aiLoading, notificationContext, uiContext, flashcardContext]);

  return (
    <AIChatContext.Provider value={{ 
      aiMessages, aiLoading, 
      handleUserSubmit, saveAIFlashcards 
      // REMOVED: aiIntroShown and setAiIntroShown
    }}>
      {children}
    </AIChatContext.Provider>
  );
};

export default AIChatContext;