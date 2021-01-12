import firebase from "firebase/app";

import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBqQaRl9vooePTMLyVpwdknRbCC_uKtQSg",
    authDomain: "abs-gym.firebaseapp.com",
    projectId: "abs-gym",
    storageBucket: "abs-gym.appspot.com",
    messagingSenderId: "63376968665",
    appId: "1:63376968665:web:d62cde2a7bf394954467c8",
    measurementId: "G-ME5FPZV1G3"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export default firebase.database;