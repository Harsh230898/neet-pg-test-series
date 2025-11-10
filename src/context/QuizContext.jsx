// src/context/QuizContext.jsx
import React, { createContext, useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { db } from '../firebase'; // Import the Firestore database instance
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions

// --------------------------------------------------------------------------------
// NOTE: You must ensure your Firestore database has a collection named 'questions' 
// populated with documents structured similarly to your old MOCK_QUESTIONS data.
// --------------------------------------------------------------------------------


// Mock data/constants needed for context functions (assuming these are defined elsewhere)
// import { QUIZ_SETTINGS, QUIZ_MODES } from '../constants/quizConstants'; 

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    // --- Data Loading States ---
    const [allQuestions, setAllQuestions] = useState([]);
    const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    
    // --- Quiz Session States ---
    const [isQuizActive, setIsQuizActive] = useState(false);
    const [currentQuiz, setCurrentQuiz] = useState(null); // Holds the questions and settings for the active quiz
    const [userAnswers, setUserAnswers] = useState({});
    const [quizResults, setQuizResults] = useState(null);
    const [timer, setTimer] = useState(0);
    const [mode, setMode] = useState('practice'); // 'practice', 'test', 'grand-test', etc.

    // --- Firestore Data Fetching Effect ---
    useEffect(() => {
        const fetchQuestions = async () => {
            setIsLoadingQuestions(true);
            setFetchError(null);
            try {
                // Reference the 'questions' collection in Firestore
                const questionsCollectionRef = collection(db, 'questions'); 
                const questionSnapshot = await getDocs(questionsCollectionRef);
                
                // Map the Firestore documents to a JavaScript array
                const questionsList = questionSnapshot.docs.map(doc => ({
                    id: doc.id, 
                    ...doc.data() 
                }));

                setAllQuestions(questionsList);
                console.log(`Fetched ${questionsList.length} questions from Firestore.`);
            } catch (error) {
                console.error("Error fetching questions from Firestore:", error);
                setFetchError("Failed to load questions. Please check your Firestore connection and rules.");
            } finally {
                setIsLoadingQuestions(false);
            }
        };

        fetchQuestions();
    }, []); 

    // --- Quiz Logic Functions (Placeholder for brevity, assuming existing logic uses allQuestions) ---
    
    const startNewQuiz = useCallback(({ mode, settings, filters }) => {
        // 1. Filter and select questions from allQuestions based on filters (subject, topic, tags)
        // 2. Shuffle the selected questions
        // 3. Set currentQuiz, reset userAnswers, start timer, setIsQuizActive(true)
        console.log(`Starting new quiz in ${mode} mode...`);
        // Example logic:
        const filteredQuestions = allQuestions; // Simplified: use all questions for now
        const selectedQuestions = filteredQuestions.slice(0, 10); // Take first 10 for testing
        
        setCurrentQuiz({
            questions: selectedQuestions,
            settings,
            mode
        });
        setUserAnswers({});
        setQuizResults(null);
        setTimer(0);
        setIsQuizActive(true);

    }, [allQuestions]);


    const submitQuiz = useCallback(() => {
        // 1. Calculate score, review correct/incorrect answers based on currentQuiz and userAnswers
        // 2. Set quizResults object
        // 3. setIsQuizActive(false)
        console.log("Quiz submitted. Calculating results...");
        setQuizResults({
            score: 75, // Mock score
            totalQuestions: currentQuiz.questions.length,
            correctCount: 7,
            incorrectCount: 3,
            timeTaken: timer
        });
        setIsQuizActive(false);
        setCurrentQuiz(null);
    }, [currentQuiz, userAnswers, timer]);


    // Memoize the context value
    const contextValue = useMemo(() => ({
        // Data
        allQuestions,
        isLoadingQuestions,
        fetchError,
        
        // Quiz Session
        isQuizActive,
        currentQuiz,
        userAnswers,
        quizResults,
        timer,
        mode,

        // Functions
        setIsQuizActive,
        startNewQuiz,
        setUserAnswers, // Function to update answers
        setTimer,
        submitQuiz,
        // ... any other functions (e.g., skipQuestion, markForReview)

    }), [
        allQuestions, isLoadingQuestions, fetchError, 
        isQuizActive, currentQuiz, userAnswers, quizResults, 
        timer, mode, startNewQuiz, submitQuiz
    ]);

    return (
        <QuizContext.Provider value={contextValue}>
            {/* Display a global loading state if questions are being fetched */}
            {isLoadingQuestions ? (
                <div className="flex h-screen w-screen items-center justify-center text-lg font-semibold text-blue-500">
                    Loading questions from database...
                </div>
            ) : fetchError ? (
                <div className="flex h-screen w-screen items-center justify-center text-lg font-semibold text-red-500">
                    Error: {fetchError}
                </div>
            ) : (
                children
            )}
        </QuizContext.Provider>
    );
};

export default QuizContext;