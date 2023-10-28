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
        console.log("How many times is this running?");
        this.userID = '';
        this.displayName = '';
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

    addNewDocument = async (firestore, collectionName, documentName, documentContent) => {
        try {
            const collectionRef = collection(firestore, collectionName);

            console.log('collectionRef: ', collectionRef);
            console.log('documentName: ', documentName);

            await addDoc(collectionRef, {
                [documentName]: {
                    noteContent: documentContent.content,
                    noteTitle: documentContent.title,
                    userID: documentContent.userID
                }
            });
        } catch (error) {   
            console.log('error: ', error);
        }
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
        console.log("user ID: ", this.userID);
        return this.userID;
    }

    getDisplayName = () => {
        return this.displayName;
    }
}

export default Firebase;