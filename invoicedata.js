function showInvoices(){

    const searchTRN =
    document.getElementById("searchTRN").value;


    const invoices =
    JSON.parse(localStorage.getItem("AllInvoices")) || [];


    const results =
    invoices.filter(invoice => invoice.trn === searchTRN);


    console.log(results);


    displayInvoices(results);

}

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

function displayInvoices(invoices){

    const container =
    document.getElementById("invoiceResults");


    container.innerHTML = "";


    if(invoices.length === 0){

        container.innerHTML =
        "<p>No invoices found.</p>";

        return;

    }


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