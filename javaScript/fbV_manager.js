/**************************************************************/
// fbV_manager.js
// written by Micahel Pushkar  2024
// Stores all the GLOBAL constants and variables for the database
/**************************************************************/

MODULENAME = "fbV_manager.js";
console.log('%c' + MODULENAME + ': ', 'color: blue;');

//Details path
const DETAILS_PATH = "userDetails"

//user details object of arrays
var fbV_userDetails = {
  //Google Details
  uid:      '',
  email:    '',
  name:     '',
  photoURL: '',
};