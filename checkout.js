// Retrieve shopping cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

// Display Cart
function displayCart() {

    const table = document.getElementById("cartSummary");

    table.innerHTML = "";

    total = 0;

    cart.forEach(product => {

        let subtotal = product.price * product.quantity;

        total += subtotal;

        table.innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>${product.quantity}</td>
                <td>${subtotal.toFixed(2)}</td>
            </tr>
        `;

    });

    document.getElementById("totalCost").textContent = total.toFixed(2);

}

displayCart();


// Confirm Checkout
function confirmCheckout() {

    const name = document.getElementById("customerName").value.trim();

    const address = document.getElementById("shippingAddress").value.trim();

    const trn = document.getElementById("trn").value.trim();

    const amountPaid = Number(document.getElementById("amountPaid").value);

    if (name === "" || address === "" || trn === "" || amountPaid === "") {

        alert("Please complete all fields.");

        return;

    }

    if (cart.length === 0) {

        alert("Your shopping cart is empty.");

        return;

    }

    if (amountPaid < total) {

        alert("Amount paid is less than the total cost.");

        return;

    }

    // Store checkout information
    const checkoutData = {

        customerName: name,

        shippingAddress: address,

        trn: trn,

        amountPaid: amountPaid,

        totalCost: total

    };

    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

    // Go to invoice page
    window.location.href = "invoice.html";

}
// Cancel Checkout
function cancelCheckout() {

    window.location.href = "cart.html";

}