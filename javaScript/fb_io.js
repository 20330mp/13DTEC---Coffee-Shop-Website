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