import { addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  usersCollectionRef,
  bookmarksCollectionRef,
  infoDataCollectionRef,
} from "./FirebaseSetup";
import { database } from "./FirebaseSetup";

// Helper function to write to the user's collection, update, and delete documents
export async function writeToUsersDB(userData, userId) {
  try {
    if (userId) {
      // if the userId exists, update the document in users collection
      await updateDoc(doc(usersCollectionRef, userId), userData);
      console.log("User document updated with ID: ", userId);
    } else {
      // if the userId does not exist, add the document to users collection
      const docRef = await addDoc(usersCollectionRef, userData);
      console.log("User document written with ID: ", docRef.id);
    }
  } catch (err) {
    console.error("Error writing to users collection: ", err);
  }
}

export async function writeToBookmarksDB(bookmarkData, bookmarkId) {
  try {
    if (bookmarkId) {
      await updateDoc(doc(bookmarksCollectionRef, bookmarkId), bookmarkData);
      console.log("User document updated with ID: ", bookmarkId);
    } else {
      const docRef = await addDoc(bookmarksCollectionRef, bookmarkData);
      console.log("User document written with ID: ", docRef.id);
    }
  } catch (err) {
    console.error("Error writing to users collection: ", err);
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
