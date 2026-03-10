let cart = [];
const phone = "2348123456789"; // WhatsApp number

// CSV link from Google Sheets
const csvLink = "https://docs.google.com/spreadsheets/d/1h1AOC9Y7Kp-jTobt4DKLOnFtBY5gzo9Me87qJp2i7LI/gviz/tq?tqx=out:csv";

// Fetch and parse CSV using PapaParse
Papa.parse(csvLink, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
        results.data.forEach(item => {
            let name = item.name?.trim() || "Unnamed Product";
            let price = parseFloat(item.price?.trim()) || 0;

            // Create card
            let card = document.createElement("div");
            card.className = "card";

            // Add card content without image
            card.innerHTML = `
                <h3>${name}</h3>
                <p class="price">₦${price}</p>
                <button class="addBtn">Add to Cart</button>
            `;

            // Attach click event safely
            card.querySelector(".addBtn").addEventListener("click", () => {
                addToCart(name, price);
            });

            document.getElementById("productList").appendChild(card);
        });
    }
});

function addToCart(name, price){
    cart.push({name, price});
    alert(`${name} added to cart!`);
}

function checkout(){
    if(cart.length === 0){
        alert("Your cart is empty");
        return;
    }

    let message = "Hello, I want to order:\n";
    let total = 0;

    cart.forEach(item => {
        message += `${item.name} - ₦${item.price}\n`;
        total += item.price;
    });

    message += `Total: ₦${total}`;
    let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}