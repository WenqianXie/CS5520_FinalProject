import {
  addDoc,
  deleteDoc,
  setDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";
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
    const userQuery = query(
      usersCollectionRef,
      where("userId", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      // User document exists, update it
      const userDocRef = querySnapshot.docs[0].ref;
      await updateDoc(userDocRef, {
        ...userData,
      });
      console.log("User document updated with ID: ", userDocRef.id);
    } else {
      // No user document, create a new one
       await setDoc(doc(usersCollectionRef, auth.currentUser.uid), {
        ...userData,
        userId: auth.currentUser.uid,
      });
    }
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

export async function writeToInfoDataDB(infoData, category, dataId) {
  try{
    let collectionName;
    switch (category){
      case "medicine":
        collectionName = "medicineCollection";
        break;
      case "transit":
        collectionName = "transitCollection";
        break;
      case "essentials":
        collectionName = "essentialsCollection";
        break;
    }
    const infoDataDoc = doc(infoDataCollectionRef, category, collectionName, dataId);
    await updateDoc(infoDataDoc, {
      ...infoData,
    });
  } catch (err) {
    console.error("Error writing to infoData collection: ", err);
  }
}

export async function deleteSelectionsFromUsersDB() {
  try {
    const userDoc = doc(usersCollectionRef, auth.currentUser.uid);
    await updateDoc(userDoc, {
      userSelection: {
        lengthInCanada: null,
        occupation: null,
      },
    });
    // await deleteDoc(doc(usersCollectionRef, userId)); // delete the document from users collection
  } catch (err) {
    console.error("Error deleting from users collection: ", err);
  }
}

export async function readInfoData(topic){
  try{
    let docRef;
    switch(topic){
      case "msp":
        docRef = doc(infoDataCollectionRef, "medicine", "medicineCollection", "msp")
        break;
      case "familyDoctor":
        docRef = doc(infoDataCollectionRef, "medicine", "medicineCollection", "familyDoctor")
        break;
      case "skyTrain":
        docRef = doc(infoDataCollectionRef, "transit", "transitCollection", "skyTrain")
        break;
      case "bus":
        docRef = doc(infoDataCollectionRef, "transit", "transitCollection", "bus")
        break;
      case "seabus":
        docRef = doc(infoDataCollectionRef, "transit", "transitCollection", "seabus")
        break;
    }
    const docSnap = await getDoc(docRef)
    return docSnap.data();
  } catch (err){
    console.log(err)
  }
}
