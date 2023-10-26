import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

    signUserIn = async() => {
        const provider = new TwitterAuthProvider();
        await signInWithPopup(auth, provider)
            .then((result) => {
                console.log('result: ', result);
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

    getCollection = async (firestore, collectionName) => {
        const collectionRef = collection(firestore, collectionName);
        const snapshot = await getDocs(collectionRef);

        const data = [];

        snapshot.forEach((doc) => {
            data.push(doc.data());
        });

        console.log("data from getCollection: ", data);
        
        return data;
    }
}

export default Firebase;