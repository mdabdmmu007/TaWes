import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCU5gGAg18d73xpOaljv9NjjaRWaqRMTtk",
  authDomain: "tawes-d7e5e.firebaseapp.com",
  projectId: "tawes-d7e5e",
  storageBucket: "tawes-d7e5e.appspot.com",
  messagingSenderId: "852040525891",
  appId: "1:852040525891:web:ddc3f5f15f17b65272ccf6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const getDocuments = async (collectionName, userId) => {
  const docs = await getDocs(
    query(collection(db, collectionName), where("userId", "==", userId))
  );
  const docslists = docs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return docslists;
};

export default app;
