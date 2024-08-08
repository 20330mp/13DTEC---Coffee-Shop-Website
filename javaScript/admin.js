let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');

}

/*------------------------------------------------------------*/
// ad_load()
// Called by ad_manager.html onload
// Prepare admin 
// Input:  n/a
// Return: n/a
/*------------------------------------------------------------*/
function admin_load() {
      console.log("admin_load()");

      //Get the items from session storage
      //html_Load();
    
    // Read all orders from the database
    fb_readAll('userOrder', {}, displayOrders);
}

// Function to display orders in table
function displayOrders(snapshot) {
    var ordersTable = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
    snapshot.forEach(childSnapshot => {
        var order = childSnapshot.val();
        for (var item in order) {
            var row = ordersTable.insertRow();
            row.insertCell(0).innerHTML = order[item].userName;
            row.insertCell(1).innerHTML = `<img src="${order[item].image}" alt="${order[item].name}" width="50">`;
            row.insertCell(2).innerHTML = order[item].name;
            row.insertCell(3).innerHTML = order[item].quantity ;
            row.insertCell(4).innerHTML = '$' + order[item].price.toFixed(2);
            // Check if timestamp exists and format it
            if (order[item].timestamp) {
                var orderDate = new Date(order[item].timestamp);
                row.insertCell(5).innerHTML = orderDate.toLocaleString();
            } else {
                row.insertCell(5).innerHTML = 'N/A';
            }
        }
    });
}