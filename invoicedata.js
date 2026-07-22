/* CIT2011 Group Project – Nyante Luxe Nails

File: invoicedata.js

Group Members:
- Shanté Smith      | ID: 1902101
- Romone Grant      | ID: 2405928
- Horace Bandoo     | ID: 2306043
- Bradley Adams     | ID: 2206964

Purpose:
This file retrieves and displays stored invoices.
It allows users to search invoices using a TRN and
displays matching invoice information retrieved from
Local Storage.
*/

// Searches for all invoices that match the TRN entered
// by the administrator and displays the matching results.
function showInvoices(){
    // Get the TRN entered by the user.
    const searchTRN =
    document.getElementById("searchTRN").value;

    // Retrieve all stored invoices from Local Storage.
    const invoices =
    JSON.parse(localStorage.getItem("AllInvoices")) || [];

    // Filter invoices that match the entered TRN.
    const results =
    invoices.filter(invoice => invoice.trn === searchTRN);


    console.log(results);


    displayInvoices(results);

}

// Retrieves all invoices belonging to a specific user
// based on the TRN entered and displays the results.
function getUserInvoices(){

    const userTRN =
    document.getElementById("userTRN").value;


    const invoices =
    JSON.parse(localStorage.getItem("AllInvoices")) || [];


    const userInvoices =
    invoices.filter(invoice => invoice.trn === userTRN);


    console.log(userInvoices);


    displayInvoices(userInvoices);

}

// Displays the invoice details returned from the search.
// If no invoices are found, an appropriate message is shown.
function displayInvoices(invoices){

    const container =
    document.getElementById("invoiceResults");


    container.innerHTML = "";


    if(invoices.length === 0){

        container.innerHTML =
        "<p>No invoices found.</p>";

        return;

    }

    // Display each matching invoice on the webpage.
    invoices.forEach(invoice => {


        container.innerHTML += `

        <div style="border:1px solid black;padding:15px;margin:10px;">

        <h3>${invoice.company}</h3>

        <p>
        Invoice Number:
        ${invoice.invoiceNumber}
        </p>


        <p>
        Date:
        ${invoice.date}
        </p>


        <p>
        Customer:
        ${invoice.customerName}
        </p>


        <p>
        TRN:
        ${invoice.trn}
        </p>


        <p>
        Total:
        JMD $${invoice.total}
        </p>


        </div>

        `;


    });

}
