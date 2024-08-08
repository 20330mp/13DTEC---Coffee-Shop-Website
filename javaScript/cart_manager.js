let cart = [];
let total = 0;

function addItemToCart(productName, productPrice, productImg){
    console.log('addItemToCart()')
    // Check if the product is already in the cart
    const existingProduct = cart.find(product => product.name === productName);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ name: productName, price: productPrice, quantity: 1, image: productImg, timestamp: Date.now()});
    }
    updateCart();
}

function removeFromCart(productName) {
    console.log('removeFromCart()')
    cart = cart.filter(product => product.name !== productName);
    updateCart();
}

function updateCart() {
    console.log('updateCart()')
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
            
            <button onclick="removeFromCart('${product.name}')">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateTotal();
}

function updateTotal() {
    total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    document.getElementById('total').textContent = total.toFixed(2);
}

function cart_checkout(){
    console.log('cart_checkout()')
    fb_writeRec("userOrder", fbV_userDetails.uid, cart, fbR_procWrite)
    //Clears the cart
    cart = [];
    updateCart();
    showPopup();
    
}

function showPopup() {
    document.getElementById('order-complete-popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('order-complete-popup').style.display = 'none';
}