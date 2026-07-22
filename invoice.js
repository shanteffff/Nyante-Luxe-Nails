/* CIT2011 Group Project – Nyante Luxe Nails

File: invoice.js

Group Members:
- Shanté Smith      | ID: 1902101
- Romone Grant      | ID: 2405928
- Horace Bandoo     | ID: 2306043
- Bradley Adams     | ID: 2206964

Purpose:
This file generates the customer's invoice after a
successful checkout. It retrieves the customer's
shopping cart and checkout information, calculates
the subtotal, tax, and total amount, stores the
invoice in Local Storage, and displays the invoice
details on the webpage. */

// Retrieve stored data
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkout = JSON.parse(localStorage.getItem("checkoutData"));

// Generate invoice number
const invoiceNumber = "INV" + Date.now();

// Today's date
const invoiceDate = new Date().toLocaleDateString();

// Company information
const companyName = "Nyante Luxe Nails";

// Discount rate (change if needed)
const discountRate = 0;

// Tax rate
const taxRate = 0.15;

// Totals
let subtotal = 0;

// Display customer information
document.getElementById("invoiceNumber").textContent = invoiceNumber;

document.getElementById("invoiceDate").textContent = invoiceDate;

document.getElementById("customerName").textContent =
checkout.customerName;

document.getElementById("shippingAddress").textContent =
checkout.shippingAddress;

document.getElementById("trn").textContent =
checkout.trn;

document.getElementById("amountPaid").textContent =
checkout.amountPaid.toFixed(2);

// Display purchased items
const table = document.getElementById("invoiceItems");

cart.forEach(item => {

    let itemSubtotal = item.price * item.quantity;

    let discount = itemSubtotal * discountRate;

    let total = itemSubtotal - discount;

    subtotal += total;

    table.innerHTML += `

        <tr>

            <td>${item.name}</td>

            <td>${item.price.toFixed(2)}</td>

            <td>${item.quantity}</td>

            <td>J$${discount.toFixed(2)}</td>

            <td>J$${total.toFixed(2)}</td>

        </tr>

    `;

});

// Tax
let tax = subtotal * taxRate;

// Final Total
let totalCost = subtotal + tax;

// Display totals
document.getElementById("subtotal").textContent =
subtotal.toFixed(2);

document.getElementById("tax").textContent =
tax.toFixed(2);

document.getElementById("totalCost").textContent =
totalCost.toFixed(2);

// Create invoice object
const invoice = {

    invoiceNumber: invoiceNumber,

    company: companyName,

    date: invoiceDate,

    customerName: checkout.customerName,

    shippingAddress: checkout.shippingAddress,

    trn: checkout.trn,

    items: cart,

    subtotal: subtotal,

    tax: tax,

    total: totalCost,

    amountPaid: checkout.amountPaid

};

// Retrieve previous invoices
let invoices =
JSON.parse(localStorage.getItem("AllInvoices")) || [];

// Add new invoice
invoices.push(invoice);

// Save updated invoice list
localStorage.setItem("AllInvoices",
JSON.stringify(invoices));

// Remove checkout information
localStorage.removeItem("checkoutData");

// Confirmation message
document.getElementById("message").innerHTML =
"Your invoice has been sent to your email!";
