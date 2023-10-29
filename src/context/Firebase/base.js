import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAsnA9j40lfzGrIHXLNPuoXKzSO1p30uVM",
    authDomain: "x-notes-d3f6a.firebaseapp.com",
    projectId: "x-notes-d3f6a",
    storageBucket: "x-notes-d3f6a.appspot.com",
    messagingSenderId: "452996085228",
    appId: "1:452996085228:web:11a52883f0986d29bc7cc9",
    measurementId: "G-B238T1KGWQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

class Firebase {

    constructor() {
        this.auth = auth;
    }

    signUserIn = async() => {
        const provider = new TwitterAuthProvider();
        await signInWithPopup(auth, provider)
            .then((result) => {
                this.userID = result.user.uid;
                this.displayName = result.user.displayName;
            }).catch((error) => {
                console.log('error: ', error);
            });
    }

    signUserOut = async() => {
        await auth.signOut();
    }

    getFirestore = () => {
        return getFirestore(app);
    }

    saveNewNote = async (firestore, collectionName, noteTitle, noteContent, userID, displayName) => {
        const collectionRef = collection(firestore, collectionName);
        await collectionRef.add({
            title: noteTitle,
            note: noteContent,
            userID: userID
        });
    }

    addNewDocument = async (firestore, collectionName, documentContent) => {
        try {
            const collectionRef = collection(firestore, collectionName);

            await addDoc(collectionRef, {
                noteContent: documentContent.content,
                noteTitle: documentContent.title,
                userID: documentContent.userID
            });
        } catch (error) {   
            console.log('error: ', error);
        }
    }

    getCurrentUser = async () => {
        return new Promise((resolve, reject) => {
            const unsubscribe = auth.onAuthStateChanged(user => {
                unsubscribe();
                resolve(user);
            }, reject);
        });
    }


    getCollection = async (firestore, collectionName) => {
        const collectionRef = collection(firestore, collectionName);
        const snapshot = await getDocs(collectionRef);

        console.log('snapshot: ', snapshot);

        const data = [];

        snapshot.forEach((doc) => {
            data.push(doc.data());
        });
        
        return data;
    }

    getUserID = () => {
        return this.getCurrentUser();
    }

    getDisplayName = () => {
        return this.displayName;
    }

    isUserSignedIn = () => {
        return new Promise((resolve) => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                unsubscribe();
                resolve(!!user);
            });
        });
    }
}

export default Firebase;