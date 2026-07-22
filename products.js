/*
CIT2011 Group Project – Nyante Luxe Nails

File: products.js

Group Members:
- Shanté Smith      | ID: 1902101
- Romone Grant      | ID: 2405928
- Horace Bandoo     | ID: 2306043
- Bradley Adams     | ID: 2206964

Purpose:
This file manages the product catalogue and shopping cart.
It initializes products, displays products, allows users
to add items to the cart, update quantities, remove items,
calculate totals, and redirect users to the checkout page.
*/

// 1. Array of Product Objects (All 9 Nail Sets)
const defaultProducts = [
  { 
    id: "p1", 
    name: "Burgundy Gloss Stiletto", 
    price: 3500.00, 
    description: "Sleek, high-shine glossy press-on nails in a rich, deep burgundy shade.", 
    image: "images/set1.jpg" 
  },
  { 
    id: "p2", 
    name: "Pearl Embedded French Tip", 
    price: 4200.00, 
    description: "Nude base French manicure embellished with raised pearls and metallic micro-beads.", 
    image: "images/set2.jpg" 
  },
  { 
    id: "p3", 
    name: "3D Floral & Gold Baroque", 
    price: 4800.00, 
    description: "Intricate pink-toned set featuring 3D sculpted white flowers and gold metallic accents.", 
    image: "images/set3.jpg" 
  },
  { 
    id: "p4", 
    name: "Polka Dot & Pink Hibiscus", 
    price: 3900.00, 
    description: "Nude French tips with black polka dots, gold beads, and 3D pink hibiscus flowers.", 
    image: "images/set4.jpg" 
  },
  { 
    id: "p5", 
    name: "Deep V-Cut White French", 
    price: 3200.00, 
    description: "Crisp, minimalist deep V-cut French tips with a soft pink base.", 
    image: "images/set5.jpg" 
  },
  { 
    id: "p6", 
    name: "Tortoiseshell & Metallic Gold", 
    price: 4900.00, 
    description: "Amber tortoiseshell nail art paired with 3D gold bows and molten metal accents.", 
    image: "images/set6.jpg" 
  },
  { 
    id: "p7", 
    name: "Tropical Tiger & Rhinestone Cross", 
    price: 4600.00, 
    description: "Tiger-stripe design with 3D tropical flowers and gold rhinestone cross charms.", 
    image: "images/set7.jpg" 
  },
  { 
    id: "p8", 
    name: "Pink Seashell & Tropical Bloom", 
    price: 4500.00, 
    description: "Beach-inspired design with 3D seashell ridges, flowers, and gold starfish charms.", 
    image: "images/set8.jpg" 
  },
  { 
    id: "p9", 
    name: "Pink Spiral & Botanical Dream", 
    price: 4700.00, 
    description: "Dynamic design featuring silver line-art spirals and 3D sculpted pink blossoms.", 
    image: "images/set9.jpg" 
  }
];

// Constant for GCT Tax (15%)
const TAX_RATE = 0.15;

// Initialize script when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeProducts();
  displayProducts();
  displayCart();
  setTodayDate();
});

// 2. Initialize Products in localStorage under 'AllProducts'
function initializeProducts() {
  // Always update AllProducts to ensure all items load correctly
  localStorage.setItem("AllProducts", JSON.stringify(defaultProducts));
}

// 3. Dynamically Display Products in #product-grid
function displayProducts() {
  const productGrid = document.getElementById("product-grid");
  const products = JSON.parse(localStorage.getItem("AllProducts")) || [];

  if (!productGrid) return;

  productGrid.innerHTML = ""; // Clear existing content

  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-img">
      <h3>${product.name}</h3>
      <p class="description">${product.description}</p>
      <p class="price">JMD $${product.price.toFixed(2)}</p>
      <button class="add-cart-btn" onclick="addToCart('${product.id}')">Add to Cart</button>
    `;

    productGrid.appendChild(productCard);
  });
}

// 4. Add Product to Shopping Cart in localStorage
function addToCart(productId) {
  const products = JSON.parse(localStorage.getItem("AllProducts")) || [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const selectedProduct = products.find(p => p.id === productId);

  if (!selectedProduct) return;

  // Check if item already exists in cart
  const existingItemIndex = cart.findIndex(item => item.id === productId);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart(); // Re-render sidebar cart
}

// 5. Display Cart Items and Calculations in #cart-items-container & Sidebar
function displayCart() {
  const cartContainer = document.getElementById("cart-items-container");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div style="color:#aaa;font-size:0.85rem;font-style:italic;">
        No items added yet.
      </div>`;
    updateTotals(0);
    return;
  }

  cartContainer.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    const itemSubtotal = item.price * item.quantity;
    subtotal += itemSubtotal;

    const itemRow = document.createElement("div");
    itemRow.className = "cart-item-row";
    itemRow.style = "margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;";

    itemRow.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <strong>${item.name}</strong><br>
          <small>JMD $${item.price.toFixed(2)} x ${item.quantity}</small>
        </div>
        <div>
          <button onclick="changeQuantity('${item.id}', -1)" style="padding:2px 6px;">-</button>
          <button onclick="changeQuantity('${item.id}', 1)" style="padding:2px 6px;">+</button>
          <button onclick="removeFromCart(${index})" style="color:red; background:none; border:none; cursor:pointer;">✕</button>
        </div>
      </div>
      <div style="text-align:right; font-size:0.85rem;">Subtotal: JMD $${itemSubtotal.toFixed(2)}</div>
    `;

    cartContainer.appendChild(itemRow);
  });

  updateTotals(subtotal);
}

// 6. Update Quantities
function changeQuantity(productId, amount) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemIndex = cart.findIndex(item => item.id === productId);

  if (itemIndex > -1) {
    cart[itemIndex].quantity += amount;
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// 7. Remove Single Item from Cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// 8. Clear All Items from Cart
function clearCart() {
  localStorage.removeItem("cart");
  displayCart();
}

// 9. Calculate and Display Subtotal, Tax (15%), and Total
function updateTotals(subtotal) {
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const subtotalEl = document.getElementById("invoice-subtotal");
  const taxEl = document.getElementById("invoice-tax");
  const totalEl = document.getElementById("invoice-total");

  if (subtotalEl) subtotalEl.textContent = `JMD $${subtotal.toFixed(2)}`;
  if (taxEl) taxEl.textContent = `JMD $${tax.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `JMD $${total.toFixed(2)}`;
}

// 10. Display Today's Date in Order Summary
function setTodayDate() {
  const dateElement = document.getElementById("invoice-date");
  if (dateElement) {
    const today = new Date();
    dateElement.textContent = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  }
}

// Redirect to Checkout Page
function sendOrderEmail() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  window.location.href = "checkout.html";
}
