// src/views/AIChatView.jsx
import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import UIContext from '../context/UIContext';
// Assuming AIChatContext might be used later for history/state persistence
// import AIChatContext from '../context/AIChatContext'; 
import { Send, Loader2, MessageSquare, Menu } from 'lucide-react';

const AIChatView = () => {
    const { isDarkMode, setIsMobileMenuOpen } = useContext(UIContext);
    // const { chatHistory, setChatHistory } = useContext(AIChatContext); // Example context usage

    const [inputMessage, setInputMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { sender: 'AI', text: "Hello! I'm your dedicated NEET-PG study assistant. Ask me anything about medical concepts, clinical scenarios, or study strategies!", id: 1 }
    ]);
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef(null);

    // Scroll to the bottom of the chat window when history updates
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    const sendMessage = useCallback(async () => {
        const userMessage = inputMessage.trim();
        if (!userMessage || isSending) return;

        // 1. Update history with user's message
        const newUserMessage = { sender: 'user', text: userMessage, id: Date.now() };
        setChatHistory(prev => [...prev, newUserMessage]);
        setInputMessage('');
        setIsSending(true);
        
        // Placeholder for AI's immediate response state
        const placeholderId = Date.now() + 1;
        setChatHistory(prev => [...prev, { sender: 'AI', text: '...', id: placeholderId, loading: true }]);


        try {
            // 2. Call the secure Netlify Function endpoint
            const response = await fetch('/.netlify/functions/ai-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: userMessage }),
            });

            const data = await response.json();

            // 3. Process the response
            if (response.ok && data.response) {
                const aiResponse = { sender: 'AI', text: data.response, id: placeholderId, loading: false };
                
                // Replace the loading placeholder with the actual response
                setChatHistory(prev => prev.map(msg => 
                    msg.id === placeholderId ? aiResponse : msg
                ));
            } else {
                const errorText = data.message || "An unknown error occurred on the server.";
                const errorResponse = { sender: 'AI', text: `Error: ${errorText}`, id: placeholderId, loading: false, isError: true };

                // Replace the loading placeholder with an error message
                setChatHistory(prev => prev.map(msg => 
                    msg.id === placeholderId ? errorResponse : msg
                ));
                console.error("AI Function Error:", data);
            }

        } catch (error) {
            console.error("Network or Fetch Error:", error);
            const errorResponse = { sender: 'AI', text: "Network error. Could not reach the AI service.", id: placeholderId, loading: false, isError: true };
            
            // Replace the loading placeholder with a critical error message
            setChatHistory(prev => prev.map(msg => 
                msg.id === placeholderId ? errorResponse : msg
            ));
        } finally {
            setIsSending(false);
        }
    }, [inputMessage, isSending]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const bubbleClasses = (sender, isError) => {
        let base = "max-w-3/4 px-4 py-2 rounded-xl text-sm break-words shadow-md ";
        if (sender === 'user') {
            return base + "bg-blue-500 text-white self-end rounded-br-none";
        } else {
            if (isError) {
                return base + "bg-red-100 text-red-700 self-start rounded-tl-none dark:bg-red-900 dark:text-red-300";
            }
            return base + (isDarkMode ? "bg-slate-700 text-white self-start rounded-tl-none" : "bg-white text-slate-800 self-start rounded-tl-none");
        }
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
            
            {/* Chat Header */}
            <div className={`p-4 border-b ${isDarkMode ? 'border-slate-700 bg-slate-700' : 'border-gray-200 bg-gray-50'} flex items-center justify-between`}>
                <div className="flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5 text-purple-500" />
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">AI Study Assistant</h3>
                </div>
                <button 
                    onClick={() => setIsMobileMenuOpen(true)} 
                    className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg">
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
                {chatHistory.map((message, index) => (
                    <div key={message.id || index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={bubbleClasses(message.sender, message.isError)}>
                            {message.loading ? (
                                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Thinking...</span>
                                </div>
                            ) : (
                                <p>{message.text}</p>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className={`p-4 border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                <div className="flex items-center space-x-3">
                    <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isSending}
                        rows={1}
                        className={`flex-1 p-3 rounded-xl border focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none 
                            ${isDarkMode 
                                ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400' 
                                : 'bg-white border-gray-300 text-slate-900 placeholder-gray-500'}
                        `}
                        placeholder={isSending ? "Waiting for response..." : "Ask a medical question..."}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isSending || !inputMessage.trim()}
                        className={`p-3 rounded-full transition-colors duration-200 ${
                            isSending || !inputMessage.trim()
                                ? 'bg-gray-300 text-gray-500 dark:bg-slate-700 dark:text-slate-500 cursor-not-allowed'
                                : 'bg-purple-500 text-white hover:bg-purple-600 shadow-md'
                        }`}
                    >
                        {isSending ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            <Send className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIChatView;