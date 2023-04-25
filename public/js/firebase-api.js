var firebaseConfig = {
  apiKey: "AIzaSyDSoliQFT9syjYm7hRmTiiL7YGDzF-Quco",
  authDomain: "lmow-website-333906.firebaseapp.com",
  projectId: "lmow-website-333906",
  storageBucket: "lmow-website-333906.appspot.com",
  messagingSenderId: "725034729418",
  appId: "1:725034729418:web:62e8784e3ce988afe81933"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
//   var storage = firebase.storage();
  // Initialize the FirebaseUI Widget using Firebase.