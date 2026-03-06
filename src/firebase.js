// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// TODO: Replace these with your actual Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQ8vMkcAboKL1XZmK4CCRxOPETX7YjhYI",
    authDomain: "fieldos-e8447.firebaseapp.com",
    projectId: "fieldos-e8447",
    storageBucket: "fieldos-e8447.firebasestorage.app",
    messagingSenderId: "795350645297",
    appId: "1:795350645297:web:1dba3311111aca9035f310",
    measurementId: "G-T230C2RY7V"
};

// Initialize Firebase only if the user has updated the config, 
// otherwise we use a mock system to prevent crashing.
const isConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY";

let app;
let db;

if (isConfigured) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
} else {
    console.warn("Firebase is not configured! Using mock data storage. Please update src/firebase.js with your keys.");
}

// In-memory mock database for testing before Firebase is configured
const mockDatabase = [];

/**
 * Register a new implement for a farmer
 * @param {Object} implementData
 */
export async function addImplementRegistration(implementData) {
    if (isConfigured) {
        try {
            // First check if this serial number already exists to prevent duplicates
            const implementsRef = collection(db, 'implements');
            const q = query(implementsRef, where('serialNumber', '==', implementData.serialNumber));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                throw new Error('An implement with this Serial Number is already registered.');
            }

            await addDoc(implementsRef, {
                ...implementData,
                timestamp: new Date()
            });
            return true;
        } catch (e) {
            console.error("Error adding document: ", e);
            throw e;
        }
    } else {
        // Mock Registration
        const exists = mockDatabase.find(i => i.serialNumber === implementData.serialNumber);
        if (exists) {
            throw new Error('An implement with this Serial Number is already registered.');
        }
        mockDatabase.push({ ...implementData, timestamp: new Date() });
        return true;
    }
}

/**
 * Get count of registered implements in a specific block for a given category
 */
export async function getImplementsCount(block, category) {
    if (isConfigured) {
        try {
            const implementsRef = collection(db, 'implements');
            // We query just by category (which is a dropdown match), 
            // then filter the block case-insensitively in JS since block was a typed field.
            const q = query(implementsRef, where('type', '==', category));
            const querySnapshot = await getDocs(q);

            let count = 0;
            const targetBlock = (block || '').toString().trim().toLowerCase();

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const recordBlock = (data.block || '').toString().trim().toLowerCase();
                if (recordBlock === targetBlock) {
                    count++;
                }
            });
            return count;
        } catch (e) {
            console.error("Error getting count: ", e);
            return 0; // fallback
        }
    } else {
        // Mock count
        const targetBlock = (block || '').toString().trim().toLowerCase();
        return mockDatabase.filter(i => {
            const recordBlock = (i.block || '').toString().trim().toLowerCase();
            return recordBlock === targetBlock && i.type === category;
        }).length;
    }
}
