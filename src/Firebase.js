import firebase from "firebase/app";

import "firebase/database";
import "firebase/storage"
import "firebase/analytics"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyANz3oWFPxXige0d2b4Wn_4tPIXy-D-K_Q",
  authDomain: "family-tree-47404.firebaseapp.com",
  databaseURL: "https://family-tree-47404-default-rtdb.firebaseio.com",
  projectId: "family-tree-47404",
  storageBucket: "family-tree-47404.appspot.com",
  messagingSenderId: "1094829530457",
  appId: "1:1094829530457:web:a6b0d517f69e5ee37fc048",
  measurementId: "G-RLZ58V5XV9"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics()

export const Firebase=firebase;
export const database= firebase.database;
export const storage =firebase.storage;