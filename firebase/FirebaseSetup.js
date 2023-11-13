import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  envapiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} from "@env";
import { collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: envapiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

const app = initializeApp(firebaseConfig); // initialize the app
export const database = getFirestore(app); // first database
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const usersCollectionRef = collection(database, "users"); // Collection for user information
export const bookmarksCollectionRef = collection(database, "bookmarks"); // Collection for bookmarks
export const infoDataCollectionRef = collection(database, "infoData"); // Collection for information data
