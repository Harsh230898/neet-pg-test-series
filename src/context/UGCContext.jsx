// src/context/UGCContext.jsx
import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore'; 

const UGCContext = createContext();

export const UGCProvider = ({ children }) => {
    // State for fetched data
    const [communityMnemonics, setCommunityMnemonics] = useState([]);
    const [isLoadingMnemonics, setIsLoadingMnemonics] = useState(true);
    const [mnemonicFetchError, setMnemonicFetchError] = useState(null);
    
    // Placeholder: State for other UGC like notes or discussion posts
    const [userNotes, setUserNotes] = useState([]); 

    // Fetch Mnemonics from Firestore
    useEffect(() => {
        const fetchMnemonics = async () => {
            setIsLoadingMnemonics(true);
            setMnemonicFetchError(null);
            try {
                // Fetch mnemonics, ordered by votes (or creation date)
                const mnemonicsCollectionRef = collection(db, 'mnemonics');
                const q = query(mnemonicsCollectionRef, orderBy('votes', 'desc')); // Assuming 'votes' field exists
                const mnemonicsSnapshot = await getDocs(q);
                
                const mnemonicsList = mnemonicsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setCommunityMnemonics(mnemonicsList);
                console.log(`Fetched ${mnemonicsList.length} mnemonics.`);
            } catch (error) {
                console.error("Error fetching mnemonics:", error);
                setMnemonicFetchError("Failed to load community mnemonics.");
            } finally {
                setIsLoadingMnemonics(false);
            }
        };

        fetchMnemonics();
    }, []);

    // Placeholder functions for UGC management
    const addMnemonic = useCallback((mnemonicData) => {
        // Implement logic to add mnemonic to Firestore and update state
        console.log("Adding new mnemonic:", mnemonicData);
    }, []);
    
    // ...

    const contextValue = useMemo(() => ({
        communityMnemonics,
        isLoadingMnemonics,
        mnemonicFetchError,
        userNotes,
        addMnemonic,
        // ...
    }), [communityMnemonics, isLoadingMnemonics, mnemonicFetchError, userNotes]);

    return (
        <UGCContext.Provider value={contextValue}>
            {children}
        </UGCContext.Provider>
    );
};

export default UGCContext;