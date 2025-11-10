// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useMemo } from 'react';
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut, 
    createUserWithEmailAndPassword 
} from 'firebase/auth';
import { auth } from '../firebase'; // Import the initialized auth object

// Initial context state
const AuthContext = createContext({
    isAuthenticated: false,
    user: null, // Stores the Firebase User object
    isLoading: true, // New state to handle initial auth check
    login: async () => {},
    logout: async () => {},
    register: async () => {},
});

// Mock user object structure (adjust this based on your needs)
const mockUser = {
    id: 'mock-user-123',
    name: 'Student HD',
    email: 'user@test.com',
    role: 'student',
    subscription: 'premium',
    avatarUrl: 'https://i.pravatar.cc/150?img=68'
};

export const AuthProvider = ({ children }) => {
    // State to hold the Firebase user object
    const [currentUser, setCurrentUser] = useState(null); 
    // State to track if the initial authentication check is complete
    const [isLoading, setIsLoading] = useState(true);

    // Effect to set up the Firebase Auth state listener
    useEffect(() => {
        // This listener is crucial. It runs when the component mounts and 
        // whenever the user's sign-in state changes.
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in. You might fetch additional user profile 
                // data from Firestore here if needed, but for now, we'll use 
                // a mix of Firebase data and a mock profile structure.
                
                // For a real app, you'd fetch the user's custom profile from Firestore 
                // based on user.uid and merge it with the Firebase user object.
                const userProfile = {
                    ...mockUser, // Start with mock/default profile data
                    uid: user.uid,
                    email: user.email,
                    // photoURL: user.photoURL, // Uncomment if you use this
                    // displayName: user.displayName, // Uncomment if you use this
                };
                setCurrentUser(userProfile);
            } else {
                // User is signed out
                setCurrentUser(null);
            }
            setIsLoading(false); // Authentication check is complete
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // --- Authentication Functions using Firebase ---
    
    // 1. Log in
    const login = async (email, password) => {
        try {
            setIsLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            // onAuthStateChanged listener handles setting currentUser
            return { success: true };
        } catch (error) {
            console.error("Login failed:", error.message);
            setIsLoading(false);
            // Return error for AuthView to display
            return { success: false, error: error.message };
        }
    };

    // 2. Register / Sign Up
    const register = async (email, password) => {
        try {
            setIsLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // OPTIONAL: Immediately store an initial profile in Firestore here
            // const userRef = doc(db, "users", userCredential.user.uid);
            // await setDoc(userRef, { email: email, createdAt: new Date() });
            
            // onAuthStateChanged listener handles setting currentUser
            return { success: true };
        } catch (error) {
            console.error("Registration failed:", error.message);
            setIsLoading(false);
            return { success: false, error: error.message };
        }
    };

    // 3. Log out
    const logout = async () => {
        try {
            setIsLoading(true);
            await signOut(auth);
            // onAuthStateChanged listener handles setting currentUser to null
        } catch (error) {
            console.error("Logout failed:", error.message);
            setIsLoading(false);
        }
    };
    
    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        isAuthenticated: !!currentUser, // Check if user object exists
        user: currentUser,
        isLoading: isLoading,
        login,
        logout,
        register,
    }), [currentUser, isLoading]);

    // Render logic: Show nothing or a loading spinner while auth check is in progress
    if (isLoading) {
        // You can replace this with a proper loading spinner component
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                Authenticating...
            </div>
        );
    }
    
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;