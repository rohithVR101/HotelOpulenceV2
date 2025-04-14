"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import BookingDetails from "@/model/BookingDetails";
import TripDetails from "@/model/TripDetails";

interface UserStoreContextType {
  currentUser: User | null;
  userSearch: TripDetails;
  userSelection: BookingDetails | null;
  setUserSearch: Dispatch<SetStateAction<TripDetails>>;
  setUserSelection: Dispatch<SetStateAction<BookingDetails | null>>;
  createNewUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<User>;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const UserStoreContext = createContext<UserStoreContextType | null>(null);

export const UserStoreProvider = ({ children }: { children: ReactNode }) => {
  const firebaseConfig = {
    apiKey: "AIzaSyArU9asa2adc3e6J_QupAUr3a7pwz_0r-U",
    authDomain: "hotelopulence-82d65.firebaseapp.com",
    projectId: "hotelopulence-82d65",
    storageBucket: "hotelopulence-82d65.firebasestorage.app",
    messagingSenderId: "132553689315",
    appId: "1:132553689315:web:6d824f5875066f31c89dd6",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const fireStore = getFirestore(app);

  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [userSearch, setUserSearch] = useState<TripDetails>({
    fromDate: "",
    toDate: "",
    count: 1,
  });

  const [userSelection, setUserSelection] = useState<BookingDetails | null>(
    null
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  const createDocFromAuth = async (userAuth: any) => {
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

  const createNewUserWithEmailAndPassword = async (
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

  const loginWithEmailAndPassword = async (email: string, password: string) => {
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

  const loginWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      await createDocFromAuth(userCredential.user);
    } catch (error) {
      console.error("Error logging in with Google", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out", error);
      throw error;
    }
  };

  const value = {
    currentUser,
    userSearch,
    userSelection,
    setUserSearch,
    setUserSelection,
    createNewUserWithEmailAndPassword,
    loginWithEmailAndPassword,
    loginWithGoogle,
    signOut,
  };
  return (
    <UserStoreContext.Provider value={value}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = () => {
  const context = useContext(UserStoreContext);
  if (!context) {
    throw new Error("useUserStore must be used within a UserStoreProvider");
  }
  return context;
};
