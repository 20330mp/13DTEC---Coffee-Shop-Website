/**************************************************************/
// fb_login(_save, _procFunc)
// Called by index.html
// Login to Firebase
// Input:  object for login data to save to and the procfunc that processes the data
// Return: n/a
/**************************************************************/
function fb_login(_save, _procFunc) {
  console.log('%cfb_login() ', 'color: brown;');

  firebase.auth().onAuthStateChanged(newLogin);

  /*-----------------------------------------*/
  // newLogin(user)
  /*-----------------------------------------*/
  function newLogin(user) {
    if (user) {
      // user is signed in, so save Google login details in procFunc
      loginStatus = 'logged in';
      _procFunc(loginStatus, user, _save);
    }
    else {
      // user NOT logged in, so redirect to Google login
      loginStatus = 'logged out';

      // Force user to select account
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        loginStatus = 'logged in via popup';
        _procFunc(loginStatus, result.user, _save);
      })
        // Catch errors
        .catch(function(error) {
          if (error) {
            loginStatus = 'failed';
            console.log('%cfb_login: ' + error.code + ', ' +
              error.message, 'color: red;');
          }
        });
    }
    console.log('fb_login: status = ' + loginStatus);
  }
}

/**************************************************************/
// fb_writeRec(_path, _key, _data, _child)
// Called in multiple places
// Write a specific record & key to the DB 
// Write a specific record to the child of the key inside the key to the DB
// Input:  path to write to, the key and the data to write, the child value of the key
// Return: N/A
/**************************************************************/
function fb_writeRec(_path, _key, _data, _procFunc, _callBack) {
  console.log('%cfb_WriteRec() path= ' + _path + '  key= ' + _key +
    '  data= ' + _data.name + '/' + _data.score + '/' + _data.highScore,
    'color: brown;');

  writeStatus = 'waiting';

  //Writes to the database
  firebase.database().ref(_path + '/' + _key).set(_data,
    fb_writeError);

  function fb_writeError(error) {
    _procFunc(error, _callBack);
  }
  console.log("fb_writeRec:exit");
}

/**************************************************************/
// fb_readRec(_path, _key, _data)
// Read a specific DB record
// Input:  path & key of record to read and where to save the data
// Return:  
/**************************************************************/
function fb_readRec(_path, _key, _data, _procFunc, _callBack) {
  console.log('%cfb_readRec() path= ' + _path +
    '  key= ' + _key, 'color: brown;');

  readStatus = 'waiting';

  firebase.database().ref(_path + '/' + _key).once('value', gotRecord, readErr)

  function gotRecord(snapshot) {
    _procFunc(snapshot, _data, _callBack)
  }

  function readErr(error) {
    readStatus = 'failed';
    console.log(error)
  }
}

/**************************************************************/
// fb_readAll(_path, _data, _procFunc)
// Read all DB records for the path
// Input:  path to read from, where to save the data and the procces of data function
// Return:
/**************************************************************/
function fb_readAll(_path, _data, _procFunc) {
    firebase.database().ref(_path).once('value').then(snapshot => {
        _procFunc(snapshot);
    }).catch(error => {
        console.error('Read failed', error);
    });
}

/**************************************************************/
// fb_logout()
// Logout of Firebase
// Input:  n/a
// Return: n/a
/**************************************************************/
function fb_logout() {
  console.log('%cfb_logout() ', 'color: brown;');

  fbV_userLoggedIn = "n"
  fbV_userAdmin = "n"
  sessionStorage.setItem("fbV_userLoggedIn", fbV_userLoggedIn)
  sessionStorage.setItem("fbV_userAdmin", fbV_userAdmin)


  firebase.auth().signOut();
  window.location = "/index.html";
}