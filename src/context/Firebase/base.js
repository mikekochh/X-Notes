import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { tweet } from "../../functions/tweetFunctions";
// import { Client, auth } from " twitter-api-sdk";
// import { TwitterApi } from "twitter-api-v2";

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
const firebaseAuth = getAuth(app);

class Firebase {

    constructor() {
        this.firebaseAuth = firebaseAuth;
    }

    signUserIn = async() => {
        const provider = new TwitterAuthProvider();
        console.log('provider: ', provider);
        console.log('firebaseAuth: ', firebaseAuth);
        await signInWithPopup(firebaseAuth, provider)
            .then((result) => {
                this.userID = result.user.uid;
                this.displayName = result.user.displayName;
            }).catch((error) => {
                console.log('error: ', error);
            });
    }

    signUserOut = async() => {
        await firebaseAuth.signOut();
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

    postTweet = async () => {
        console.log('Post Tweet');
    }

    addNewDocument = async (firestore, collectionName, documentContent) => {
        try {
            const collectionRef = collection(firestore, collectionName);

            await addDoc(collectionRef, {
                noteContent: documentContent.noteContent,
                noteTitle: documentContent.noteTitle,
                userID: documentContent.userID,
                noteID: documentContent.noteID
            });
        } catch (error) {   
            console.log('error: ', error);
        }
    }

    getCurrentUser = async (retrieveID) => {
        return new Promise((resolve, reject) => {
            const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
                unsubscribe();
                if (retrieveID) {
                    resolve(user.uid);
                }
                else {
                    resolve(user.displayName);
                }
                
            }, reject);
        });
    }

    // TODO: dont think this is needed
    getUserID = () => {
        return this.getCurrentUser(true);
    }

    getDisplayName = () => {
        return this.getCurrentUser(false);
    }

    deleteNote = async (firestore, collectionName, noteID) => {
        const collectionRef = collection(firestore, collectionName);
        const snapshot = await getDocs(collectionRef);

        snapshot.forEach((doc) => {
            if (doc.data().noteID === noteID) {
                deleteDoc(doc.ref);
            }
        });
    }


    getCollection = async (firestore, collectionName) => {
        const collectionRef = collection(firestore, collectionName);
        const snapshot = await getDocs(collectionRef);
        const userID = await this.getCurrentUser(true);

        const data = [];

        snapshot.forEach((doc) => {
            if (doc.data().userID === userID) {
               data.push(doc.data());
            }
        });
        
        return data;
    }

    isUserSignedIn = () => {
        return new Promise((resolve) => {
            const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
                unsubscribe();
                resolve(!!user);
            });
        });
    }
}

export default Firebase;