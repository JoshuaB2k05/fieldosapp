import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDQ8vMkcAboKL1XZmK4CCRxOPETX7YjhYI",
    authDomain: "fieldos-e8447.firebaseapp.com",
    projectId: "fieldos-e8447",
    storageBucket: "fieldos-e8447.firebasestorage.app",
    messagingSenderId: "795350645297",
    appId: "1:795350645297:web:1dba3311111aca9035f310",
    measurementId: "G-T230C2RY7V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkImplements() {
    console.log("Checking Firestore 'implements' collection...");
    try {
        const implementsRef = collection(db, 'implements');
        const snapshot = await getDocs(implementsRef);

        if (snapshot.empty) {
            console.log("No implements found in the database. The collection is empty.");
        } else {
            console.log(`Found ${snapshot.size} implement(s) registered:`);
            snapshot.forEach(doc => {
                console.log("ID:", doc.id, "=>", doc.data());
            });
        }
    } catch (e) {
        console.error("Error fetching implements:", e);
    }
    process.exit();
}

checkImplements();
