/**************************************************************/
// fb_io.js
//
// Manages the process of placing the order from the shopping cart
// written by Micahel Pushkar  2024
/**************************************************************/

// Variables
let cart = [];
let total = 0;

/**************************************************************/
// cart_addItem()
// Called by "+" button
// Adds the selected object to the cart array or increases the quantity if already present
// Input:  productName, productPrice, productImg
// Return: n/a
/**************************************************************/
function cart_addItem(productName, productPrice, productImg) {
    console.log('cart_addItem()');
    const existingProduct = cart.find(product => product.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1, image: productImg, timestamp: Date.now(), userName: fbV_userDetails.name});
    }
    cart_update();
    updateCartButtonQuantity(productName);
}

/**************************************************************/
// cart_removeItem()
// Called by "-" button
// Decreases the quantity of the selected object from the cart array or removes it if quantity is 1
// Input:  productName
// Return: n/a
/**************************************************************/
function cart_removeItem(productName) {
    console.log('cart_removeItem()');
    const existingProduct = cart.find(product => product.name === productName);
    if (existingProduct) {
        if (existingProduct.quantity > 1) {
            existingProduct.quantity -= 1;
        } else {
            cart = cart.filter(product => product.name !== productName);
            resetButtonQuantity(productName); // Reset button quantity if product is removed
        }
    }
    cart_update();
}

/**************************************************************/
// cart_update()
// Updates the cart UI based on the current cart contents
// Input:  n/a
// Return: n/a
/**************************************************************/
function cart_update() {
    console.log('cart_update()');
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item">
                <img class="cart-item-img" src="${product.image}" alt="product image">
                <div class="content">
                  <h3> ${product.name} (${product.quantity})</h3>
                  <div class="price">$${(product.price * product.quantity).toFixed(2)}</div>
                </div>
            </div>

            <button onclick="cart_removeSingleItem('${product.name}')">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Ensure that buttons are updated correctly after the cart is updated
    cart.forEach(product => {
        updateCartButtonQuantity(product.name);
    });

    updateTotal();
}

/**************************************************************/
// updateTotal()
// Calculates and updates the total price in the cart
// Input:  n/a
// Return: n/a
/**************************************************************/
function updateTotal() {
    total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    document.getElementById('total').textContent = total.toFixed(2);
}

/**************************************************************/
// cart_removeSingleItem()
// Called by the "Remove" button in the cart
// Decreases the quantity of the selected object from the cart array
// or removes it entirely if the quantity is 1
// Also updates the corresponding "Add to Cart" button
// Input:  productName
// Return: n/a
/**************************************************************/
function cart_removeSingleItem(productName) {
    console.log('cart_removeSingleItem()');
    const existingProduct = cart.find(product => product.name === productName);
    if (existingProduct) {
        if (existingProduct.quantity > 1) {
            existingProduct.quantity -= 1;
        } else {
            cart = cart.filter(product => product.name !== productName);
            resetButtonQuantity(productName); // Reset the button quantity to 0 when the item is fully removed
        }
    }
    cart_update();
}

/**************************************************************/
// resetButtonQuantity()
// Resets the quantity on the "Add to Cart" button to zero
// Input:  productName
// Return: n/a
/**************************************************************/
function resetButtonQuantity(productName) {
    const button = document.querySelector(`.btn[data-product-name="${productName}"]`);
    if (button) {  // Ensure the button exists before trying to update it
        button.innerHTML = `<span>-</span> Add to cart <span>+</span>`;
        button.dataset.quantity = 0;  // Reset the data-quantity attribute to 0
    }
}

/**************************************************************/
// updateCartButtonQuantity()
// Updates the corresponding "Add to Cart" button based on the quantity in the cart
// Input:  productName
// Return: n/a
/**************************************************************/
function updateCartButtonQuantity(productName) {
    const product = cart.find(product => product.name === productName);
    const button = document.querySelector(`.btn[data-product-name="${productName}"]`);

    if (product && product.quantity > 0) {
        button.innerHTML = `<span>-</span> ${product.quantity} ADDED <span>+</span>`;
        button.dataset.quantity = product.quantity;  // Update the data-quantity attribute
    } else {
        resetButtonQuantity(productName);  // Reset the button if no product found in cart
    }
}

/**************************************************************/
// Button Event Handlers
// Handles adding and removing items and updating button text
// Input:  n/a
// Return: n/a
/**************************************************************/
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const productName = button.getAttribute('data-product-name');
        const productPrice = parseFloat(button.getAttribute('data-product-price'));
        const productImg = button.getAttribute('data-product-img');
        let quantity = parseInt(button.dataset.quantity) || 0;  // Initialize quantity from data attribute

        // Check if the clicked element is a span and if it contains "-" or "+"
        if (event.target.tagName === 'SPAN') {
            if (event.target.textContent.trim() === '-') {
                // Decrement quantity
                if (quantity > 0) {
                    quantity = Math.max(0, quantity - 1);
                    cart_removeItem(productName);  // Update cart
                }
            } else if (event.target.textContent.trim() === '+') {
                // Increment quantity
                quantity++;
                cart_addItem(productName, productPrice, productImg);  // Update cart
            }
            button.dataset.quantity = quantity;  // Update the data-quantity attribute
        }
    });
});

/**************************************************************/
// Checkout Function
// Clears the cart and resets all button quantities after checkout
// Input:  n/a
// Return: n/a
/**************************************************************/
function cart_checkout(){
    console.log('cart_checkout()')
    fb_writeRec("userOrder", fbV_userDetails.uid, cart, fbR_procWrite);

    // Clear the cart
    cart = [];
    cart_update();

    // Reset all buttons
    document.querySelectorAll('.btn').forEach(button => {
        resetButtonQuantity(button.getAttribute('data-product-name'));
    });

    cart_showPopup();
}

function cart_showPopup() {
    const popup = document.getElementById('order-complete-popup');
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.opacity = '1';
        popup.style.transition = 'opacity 2s ease-in-out';
    }, 100);  // Ensure this runs after a short delay

    setTimeout(() => {
        popup.style.opacity = '0';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 2000);  // Hides the popup after the fade-out transition
    }, 5000);  // Fade out after 2 seconds
}

function cart_hidePopup() {
    document.getElementById('order-complete-popup').style.display = 'none';
}



































// // Variables
// let cart = [];
// let total = 0;

// /**************************************************************/
// // cart_addItem()
// // Called by "add to cart" buttons
// // Adds the selected object ot the cart array
// // Input:  productName, productPrice, productImg
// // Return: n/a
// /**************************************************************/
// function cart_addItem(productName, productPrice, productImg){
//     console.log('cart_addItem()')
//     // Check if the product is already in the cart
//     const existingProduct = cart.find(product => product.name === productName);
//     if (existingProduct) {
//       existingProduct.quantity += 1;
//     } else {
//       cart.push({ name: productName, price: productPrice, quantity: 1, image: productImg, timestamp: Date.now(), userName: fbV_userDetails.name });
//     }
//     cart_update();
// }

// /**************************************************************/
// // cart_remove()
// // Called by "remve" button
// // Removes the selected object from the cart array
// // Input:  productName, productPrice, productImg
// // Return: n/a
// /**************************************************************/
// function cart_remove(productName) {
//     console.log('cart_remove()')
//     cart = cart.filter(product => product.name !== productName);
//     cart_update();
// }

// function cart_update() {
//     console.log('cart_update()')
//     const cartItemsContainer = document.getElementById('cart-items');
//     cartItemsContainer.innerHTML = '';

//     cart.forEach(product => {
//         const cartItem = document.createElement('div');
//         cartItem.className = 'cart-item';
//         cartItem.innerHTML = `
//             <div class="cart-item">
//                 <img class="cart-item-img" src="${product.image}" alt="product image">
//                 <div class="content">
//                   <h3> ${product.name} (${product.quantity})</h3>
//                   <div class="price">$${(product.price * product.quantity).toFixed(2)}</div>
//                 </div>
//             </div>

//             <button onclick="cart_remove('${product.name}')">Remove</button>
//         `;
//         cartItemsContainer.appendChild(cartItem);
//     });

//     updateTotal();
// }

// function updateTotal() {
//     total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
//     document.getElementById('total').textContent = total.toFixed(2);
// }

// function cart_checkout(){
//     console.log('cart_checkout()')
//     fb_writeRec("userOrder", fbV_userDetails.uid, cart, fbR_procWrite)
//     //Clears the cart
//     cart = [];
//     cart_update();
//     cart_showPopup();

// }

// function cart_showPopup() {
//     document.getElementById('order-complete-popup').style.display = 'block';
// }

// function cart_hidePopup() {
//     document.getElementById('order-complete-popup').style.display = 'none';
// }