function generateInvoice() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('date').value;
    const items = document.getElementById('items').value.split('\n');
    
    let itemList = '';
    let total = 0;

    items.forEach(item => {
        const [description, quantity, price] = item.split(',');
        const itemTotal = parseFloat(quantity) * parseFloat(price);
        total += itemTotal;
        itemList += `<p>${description.trim()} - ${quantity.trim()} x ${price.trim()} = ${itemTotal.toFixed(2)}</p>`;
    });

    document.getElementById('invoice-preview').innerHTML = `
        <h2>Invoice</h2>
        <p><strong>From:</strong> ${from}</p>
        <p><strong>To:</strong> ${to}</p>
        <p><strong>Date:</strong> ${date}</p>
        <h3>Items</h3>
        ${itemList}
        <h3>Total: ${total.toFixed(2)}</h3>
    `;
}

function previewPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.html(document.getElementById('invoice-preview'), {
        callback: function (doc) {
            const pdfBlob = doc.output('blob');
            const url = URL.createObjectURL(pdfBlob);
            const iframe = document.getElementById('pdf-preview');
            iframe.src = url;
            iframe.style.display = 'block';
        },
        x: 10,
        y: 10
    });
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.html(document.getElementById('invoice-preview'), {
        callback: function (doc) {
            doc.save('invoice.pdf');
        },
        x: 10,
        y: 10
    });
}
