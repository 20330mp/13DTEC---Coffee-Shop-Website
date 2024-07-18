let cart = [];
let total = 0;

function addItemToCart(productName, productPrice, productImg){
  // Check if the product is already in the cart
  const existingProduct = cart.find(product => product.name === productName);
  if (existingProduct) {
      existingProduct.quantity += 1;
  } else {
      cart.push({ name: productName, price: productPrice, quantity: 1, image: productImg});
  }
  updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${product.name} (${product.quantity})</span>
            <span>$${(product.price * product.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart('${product.name}')">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

function removeFromCart(productName) {
    cart = cart.filter(product => product.name !== productName);
    updateCart();
}

function updateCart() {
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