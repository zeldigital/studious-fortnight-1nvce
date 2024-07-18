let itemsList = [];

function addItem() {
    const item = document.getElementById('item').value;
    const service = document.getElementById('service').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);

    if (!isNaN(quantity) && !isNaN(price)) {
        const newItem = `${item} (${service}), ${quantity}, ${price}`;
        itemsList.push(newItem);
        console.log(`Item added: ${newItem}`);
    } else {
        console.error('Invalid quantity or price.');
    }
}

function generateInvoice() {
    console.log("Generating invoice...");
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('date').value;

    let itemList = '';
    let total = 0;

    itemsList.forEach(item => {
        const parts = item.split(',');
        if (parts.length === 3) {
            const [description, quantity, price] = parts;
            const itemTotal = parseFloat(quantity) * parseFloat(price);
            total += itemTotal;
            itemList += `<p>${description.trim()} - ${quantity.trim()} x ${price.trim()} = ${itemTotal.toFixed(2)}</p>`;
        } else {
            console.warn('Invalid item format:', item);
        }
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
    console.log("Invoice generated.");
}

function previewPDF() {
    console.log("Previewing PDF...");
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    html2canvas(document.getElementById('invoice-preview')).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 10, 10);
        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        const iframe = document.getElementById('pdf-preview');
        iframe.src = url;
        iframe.style.display = 'block';
        console.log("PDF preview displayed.");
    }).catch(error => {
        console.error("html2canvas error:", error);
    });
}

function downloadPDF() {
    console.log("Downloading PDF...");
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    html2canvas(document.getElementById('invoice-preview')).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 10, 10);
        doc.save('invoice.pdf');
        console.log("PDF downloaded.");
    }).catch(error => {
        console.error("html2canvas error:", error);
    });
}
