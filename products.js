let cart = [];
const phone = "2347049884342"; // your WhatsApp number

// Google Sheet CSV link (replace with you own)
const csvLink = "https://docs.google.com/spreadsheets/d/1h1AOC9Y7Kp-jTobt4DKLOnFtBY5gzo9Me87qJp2i7LI/gviz/tq?tqx=out:csv";

// Fetch products
Papa.parse(csvLink, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
        results.data.forEach(item => {
            let name = item.name?.trim() || "Unnamed Product";
            let price = parseFloat(item.price?.trim()) || 0;

            // Create product card
            let card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <h3>${name}</h3>
                <p class="price">₦${price}</p>
                <button class="addBtn">Add to Cart</button>
            `;

            // Add click event
            card.querySelector(".addBtn").addEventListener("click", () => {
                addToCart(name, price);
            });

            document.getElementById("productList").appendChild(card);
        });
    }
});

// Add product to cart
function addToCart(name, price){
    cart.push({name, price});
    alert(`${name} added to cart!`);
    updateCartCount();
}

// Update cart count
function updateCartCount(){
    document.getElementById("cartCount").textContent = cart.length;
}

// Checkout via WhatsApp
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