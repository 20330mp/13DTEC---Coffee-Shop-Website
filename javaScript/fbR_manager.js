/**************************************************************/
// fbR_initialise()
// Called by setup
// Initialize firebase
// Input:  n/a
// Return: n/a
/**************************************************************/
function fbR_initialise() {
  console.log('%cfb_initialise() ', 'color: brown;');

  const FIREBASECONFIG = {
    apiKey: "AIzaSyBQ-Z9iJFiyFwHJp9O08Tx6m_A6RiWiZms",
    authDomain: "dtec-2024-michael-pushkar.firebaseapp.com",
    databaseURL: "https://dtec-2024-michael-pushkar-default-rtdb.firebaseio.com",
    projectId: "dtec-2024-michael-pushkar",
    storageBucket: "dtec-2024-michael-pushkar.appspot.com",
    messagingSenderId: "244042099165",
    appId: "1:244042099165:web:27443004fcc40691c52e34",
    measurementId: "G-JD0PFXYBG1"
  };

  // Check if firebase already initialised
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASECONFIG);
    database = firebase.database();
  }
}