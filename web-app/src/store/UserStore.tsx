"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  useReducer,
} from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";
import BookingDetails from "@/model/BookingDetails";
import { auth } from "@/auth/FirebaseAuthenticationHelper";

interface UserStoreContextType {
  currentUser: User | null;
  userSelection: BookingDetails;
  setUserSelection: Dispatch<BookingDetails | null>;
}

interface UserReducerState {
  currentUser: User | null;
  userSelection: BookingDetails;
}

const INITIAL_STATE = {
  currentUser: auth.currentUser,
  userSelection: {
    trip: {
      fromDate: "",
      toDate: "",
      count: 1,
    },
    room: null,
    roomCount: 0,
    totalCost: 0,
  },
};

const UserStoreContext = createContext<UserStoreContextType | null>(null);

export const UserStoreProvider = ({ children }: { children: ReactNode }) => {
  const [{ currentUser, userSelection }, userDispatch] = useReducer(
    userReducer,
    INITIAL_STATE
  );

  function userReducer(
    state: UserReducerState,
    action: { type: string; payload: any }
  ): UserReducerState {
    switch (action.type) {
      case "SET_CURRENT_USER":
        return { ...state, currentUser: action.payload.currentUser };
      case "SET_USER_SELECTION":
        return { ...state, userSelection: action.payload.userSelection };
      default:
        return state;
    }
  }

  const setCurrentUser = (user: User | null) => {
    userDispatch({
      type: "SET_CURRENT_USER",
      payload: { currentUser: user },
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  const setUserSelection = (userSelection: BookingDetails | null) => {
    userDispatch({
      type: "SET_USER_SELECTION",
      payload: { userSelection },
    });
  };

  const value = {
    currentUser,
    userSelection,
    setUserSelection,
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
