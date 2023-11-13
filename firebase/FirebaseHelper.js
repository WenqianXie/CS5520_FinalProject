import { addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  usersCollectionRef,
  bookmarksCollectionRef,
  infoDataCollectionRef,
} from "./FirebaseSetup";
import { database } from "./FirebaseSetup";
import { auth } from "./FirebaseSetup";

// Helper function to write to the user's collection, update, and delete documents

export async function writeToUsersDB(userData) {
  try {
    // Just pass the userData to addDoc with usersCollectionRef
    const docRef = await addDoc(usersCollectionRef, {
      ...userData,
      userId: auth.currentUser.uid,
    });
    console.log("User document written with ID: ", docRef.id);
  } catch (err) {
    console.error("Error writing to users collection: ", err);
  }
}

export async function writeToBookmarksDB(bookmarkData, bookmarkId) {
  try {
    // Just pass the bookmarkData to addDoc with bookmarksCollectionRef
    const docRef = await addDoc(bookmarksCollectionRef, {
      ...bookmarkData,
      bookmarkId: bookmarkId,
    });
    console.log("Bookmark document written with ID: ", docRef.id);
  } catch (err) {
    console.error("Error writing to bookmarks collection: ", err);
  }
}

export async function writeToInfoDataDB(infoData, dataId) {}

export async function deleteFromUsersDB(userId) {
  try {
    await deleteDoc(doc(usersCollectionRef, userId)); // delete the document from users collection
    console.log("User document deleted with ID: ", userId);
  } catch (err) {
    console.error("Error deleting from users collection: ", err);
  }
}
