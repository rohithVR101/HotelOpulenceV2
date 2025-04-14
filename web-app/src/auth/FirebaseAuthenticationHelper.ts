import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyArU9asa2adc3e6J_QupAUr3a7pwz_0r-U",
    authDomain: "hotelopulence-82d65.firebaseapp.com",
    projectId: "hotelopulence-82d65",
    storageBucket: "hotelopulence-82d65.firebasestorage.app",
    messagingSenderId: "132553689315",
    appId: "1:132553689315:web:6d824f5875066f31c89dd6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
const fireStore = getFirestore(app);

export const createDocFromAuth = async (userAuth: any) => {
    if (!userAuth) return;

    const userDocRef = doc(fireStore, "users", userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            });
        } catch (error) {
            console.error("Error creating the user", error);
        }
    }
};

export const createNewUserWithEmailAndPassword = async (
    email: string,
    password: string
): Promise<User> => {
    const auth = getAuth(app);
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        await createDocFromAuth(userCredential.user);
        return userCredential.user;
    } catch (error) {
        console.error("Error creating user with email and password", error);
        throw error;
    }
};

export const loginWithEmailAndPassword = async (email: string, password: string) => {
    const auth = getAuth(app);
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        await createDocFromAuth(userCredential.user);
    } catch (error) {
        console.error("Error logging in with email and password", error);
        throw error;
    }
};

export const loginWithGoogle = async () => {
    try {
        const userCredential = await signInWithPopup(auth, provider);
        await createDocFromAuth(userCredential.user);
    } catch (error) {
        console.error("Error logging in with Google", error);
        throw error;
    }
};

export const signOutUser = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.error("Error signing out", error);
        throw error;
    }
};

