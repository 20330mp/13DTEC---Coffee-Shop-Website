let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    cartItem.classList.remove('active');
    
}

let cartItem = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () =>{
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
}

/**************************************************************/
// html_googleDetailsStorage()
// Called by fbR_login
// Saves the users details data inside the session storage
// Input: N/A
// Return: N/A
/**************************************************************/
function html_googleDetailsStorage() {
  console.log("html_userDetaislsessionStorage()");
  //Saving the user Details record from Google
  sessionStorage.setItem("uid", fbV_userDetails.uid);
  sessionStorage.setItem("name", fbV_userDetails.name);
  sessionStorage.setItem("email", fbV_userDetails.email);
  sessionStorage.setItem("photoURL", fbV_userDetails.photoURL);

  sessionStorage.setItem("fbV_userLoggedIn",fbV_userLoggedIn);

  html_navLoad();
}

/**************************************************************/
// html_getUserDetails()
// Called by many html files
// Gets the user details for html pages
// Input: N/A
// Return: N/A
/**************************************************************/
function html_getUserDetails() {
  console.log("html_getUserDetails()")
  //Restoring the fbV_userDetails data from index.html
  fbV_userDetails.uid = sessionStorage.getItem("uid");
  fbV_userDetails.name = sessionStorage.getItem("name");
  fbV_userDetails.email = sessionStorage.getItem("email");
  fbV_userDetails.photoURL = sessionStorage.getItem("photoURL");

  // Get the users login status
  fbV_userLoggedIn = sessionStorage.getItem("fbV_userLoggedIn")
}

/**************************************************************/
// html_navLoad()
// Called by multiple files in body onload
// Decides whether to show the admin button
// Input:  n/a
// Return: n/a
/**************************************************************/
function html_navLoad() {
  console.log("html_navLoad")
  //Gets the user login status and their admin status
  fbV_userLoggedIn = sessionStorage.getItem("fbV_userLoggedIn")  
  fbV_userAdmin = sessionStorage.getItem("fbV_userAdmin")    
  console.log("fbV_userAdmin = " + fbV_userAdmin);

  //Check whether the user is admin to display the admin button
  if(fbV_userAdmin == "y"){
      adminButton.style.display = "inline"; // Hide the admin button
    }
    else{
      adminButton.style.display = "none"; // show the admin button"
    }
}

/**************************************************************/
// html_toggleNavigation()
// Called by index.html
// Decides whether to show the admin button and navbar for 
// the index page
// Input:  n/a
// Return: n/a
/**************************************************************/
function html_toggleNavigation() {
  console.log("html_toggleNavigation()")
  if (fbV_userLoggedIn == "y") {
    if(fbV_userAdmin == "n"){
        adminButton.style.display = "none"; // Hide the admin button
        header.style.display = "flex"; // Display the navigation bar
        login_btn.style.display = "none";
        logout_btn.style.display = "block"
        buy_btn.style.display = "block";
        about.style.display = "block";
        menu.style.display = "block";
        products.style.display = "block";
        footer.style.display = "block";
    }
    else{
        adminButton.style.display = "inline";
        header.style.display = "flex"; // Display the navigation bar
        login_btn.style.display = "none";
        logout_btn.style.display = "block"
        buy_btn.style.display = "block";
        about.style.display = "block";
        menu.style.display = "block";
        products.style.display = "block";
        footer.style.display = "block";
    }
  } else {
    header.style.display = "none"; // Hide the navigation bar
    login_btn.style.display = "block";
    logout_btn.style.display = "none"
  }
}

/**************************************************************/
// html_navLoad()
// Called by many files
// saves the admin status in session storage
// Input:  n/a
// Return: n/a
/**************************************************************/
function html_adminStatusStorage(){
  console.log("html_adminStatusStorage()")

  sessionStorage.setItem("fbV_userAdmin", fbV_userAdmin)
}



