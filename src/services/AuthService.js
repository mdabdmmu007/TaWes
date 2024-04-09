import React, { useContext, useEffect, useState } from "react";
import { auth, db, getDocuments } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  deleteUser,
} from "firebase/auth";
import { collection, doc, addDoc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

const AuthContext = React.createContext("auth");

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState("");
  const usersColRef = collection(db, "users");


  async function addNewUser(username, userId, role = 'user', email) {
    const newUserRef = doc(db, "users", userId);
    await setDoc(newUserRef, { name: username, username, userId, role });
    if (role === 'healthcare') {
      const newHealthCareRef = doc(db, "healthcare", userId);
      await setDoc(newHealthCareRef, { name: username, userId, email, patiants: [] });
    }
  }

  async function signup(email, password, newdisplayName, role) {
    return createUserWithEmailAndPassword(auth, email, password).then(async (credentials) => {
      setUserID(credentials.user.uid);
      addNewUser(newdisplayName, credentials.user.uid, role, email);
    });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setCurrentUser(null)
    setUser(null)
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updatingEmail(email) {
    return updateEmail(auth.currentUser, email);
  }
  function updatingPassword(password) {
    return updatePassword(auth.currentUser, password);
  }

  const updateUsername = async (id, newUsername) => {
    const userDoc = doc(db, "users", id);
    const updatedName = { username: newUsername, name: newUsername };
    await updateDoc(userDoc, updatedName);
  };

  const deleteThisUser = async (id) => {
    const recordsDocs = await getDocuments("records", currentUser?.uid);
    const userDoc = doc(db, "users", id);

    deleteUserRecords(recordsDocs).then(async () => {
      await signOut(auth);
      await deleteDoc(userDoc);
      await deleteUser(currentUser);
    });
  };

  const deleteUserRecords = async (recordsDocs) => {
    for (let i = 0; i < recordsDocs.length; i++) {
      await deleteDoc(doc(db, "records", recordsDocs[i].id));
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (loggeduser) => {
      if (loggeduser) {
        // const docRef = doc(usersColRef, 'uUnSIDuxDWhBT0mgxI7H5RfWC193');
        const docRef = doc(usersColRef, loggeduser?.uid);
        const docSnap = await getDoc(docRef)
        setCurrentUser(loggeduser);
        setUser(docSnap.data())
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    addNewUser,
    currentUser,
    user,
    login,
    signup,
    logout,
    resetPassword,
    updatingEmail,
    updatingPassword,
    updateUsername,
    deleteThisUser,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
