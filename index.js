const cart = [];

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
            <span>${item.name} - ₱ ${item.price.toFixed(2)} x ${
      item.quantity
    }</span>
            <button onclick="updateQuantity('${item.name}', -1)">-</button>
            <button onclick="updateQuantity('${item.name}', 1)">+</button>
        `;
    cartItems.appendChild(cartItem);
  });

  updateTotal();
}

function updateQuantity(name, change) {
  const item = cart.find((item) => item.name === name);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      const index = cart.indexOf(item);
      cart.splice(index, 1);
    }
    renderCart();
  }
}

function updateTotal() {
  const totalAmount = document.getElementById("totalAmount");
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalAmount.textContent = `₱${total.toFixed(2)}`;
}

function checkout() {
  const message = document.getElementById("message");
  if (cart.length > 0) {
    message.textContent = "Thank you for shopping with us!";
    cart.length = 0;
    renderCart();
  } else {
    message.textContent = "Your cart is empty. Add items to checkout.";
  }
}
