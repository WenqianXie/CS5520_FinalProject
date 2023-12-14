// Purpose: Helper functions to read and write to the database

import {
  setDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import {
  usersCollectionRef,
  bookmarksCollectionRef,
  infoDataCollectionRef,
} from "./FirebaseSetup";
import { auth } from "./FirebaseSetup";

// Helper function to write to the user's collection, update, and delete documents
export async function writeToUsersDB(userData) {
  try {
    const userDocRef = doc(usersCollectionRef, auth.currentUser.uid);
    const docSnap = await getDoc(userDocRef);
    if(docSnap.exists()){
      await updateDoc(userDocRef, {
        ...userData,
      });
    } else {
      // No user document, create a new one
       await setDoc(userDocRef, {
        ...userData,
        userId: auth.currentUser.uid,
      });
    }
  } catch (err) {
    console.error("Error writing to users collection: ", err);
  }
}

// Helper function to read from the user's collection
export async function readFromUsersDB(targetField=null){
  try{
    const userDocRef = doc(usersCollectionRef, auth.currentUser.uid);
    const docSnap = await getDoc(userDocRef);
    if(docSnap.exists()){
      if(targetField){
        if(docSnap.data()[targetField]){
          console.log("if docSnap.data().targetField === true")
          return docSnap.data()[targetField]
        } else {
          return null
        }
      } else {
        return docSnap.data();
      }
    } else {
      console.log("No such document! Error from readFromUsersDB");
    }
  } catch (err) {
    console.error("Error reading from users collection: ", err);
  }
}

// Helper function to write to the bookmarks collection
export async function writeToBookmarksDB(bookmarkData) {
  try {
    // Just pass the bookmarkData to addDoc with bookmarksCollectionRef
    const bookmarkDocRef = doc(bookmarksCollectionRef, auth.currentUser.uid);
    const docSnap = await getDoc(bookmarkDocRef);

    if (docSnap.exists()) {
      await updateDoc(bookmarkDocRef, {
        ...bookmarkData,
      });
    } else {
      await setDoc(bookmarkDocRef, {
        ...bookmarkData,
        userID: auth.currentUser.uid,
      });
    }
  } catch (err) {
    console.error("Error writing to bookmarks collection: ", err);
  }
}

// Helper function to read from the bookmarks collection
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

// Helper function to read from the bookmarks collection
export async function deleteSelectionsFromUsersDB() {
  try {
    const userDoc = doc(usersCollectionRef, auth.currentUser.uid);
    await updateDoc(userDoc, {
      userSelection: null
    });
    const bookmarkDoc = doc(bookmarksCollectionRef, auth.currentUser.uid)
    await updateDoc(bookmarkDoc,{
      generatedMustDoList: null
    })
  } catch (err) {
    console.error("Error deleting from users collection: ", err);
  }
}

// Helper function to read from the bookmarks collection
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
      case "hospital":
        docRef = doc(infoDataCollectionRef, "medicine", "medicineCollection", "hospital")
        break;
      case "pharmacy":
        docRef = doc(infoDataCollectionRef, "medicine", "medicineCollection", "pharmacy")
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
      case "compassCard":
        docRef = doc(infoDataCollectionRef, "transit", "transitCollection", "compassCard")
        break;
      case "driverLicense":
        docRef = doc(infoDataCollectionRef, "essentials", "essentialsCollection", "driverLicense")
        break;
      case "sin":
        docRef = doc(infoDataCollectionRef, "essentials", "essentialsCollection", "sin")
        break;
      case "bcServicesCard":
        docRef = doc(infoDataCollectionRef, "essentials", "essentialsCollection", "bcServicesCard")
        break;
    }
    const docSnap = await getDoc(docRef)
    return docSnap.data();
  } catch (err){
    console.log(err)
  }
}
