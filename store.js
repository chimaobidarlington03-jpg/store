let cart = [];
const phone = "2348123456789"; // WhatsApp number

// Your CSV link here (replace with your own)
const csvLink = "https://docs.google.com/spreadsheets/d/1h1AOC9Y7Kp-jTobt4DKLOnFtBY5gzo9Me87qJp2i7LI/gviz/tq?tqx=out:csv";

// Fetch and parse CSV using PapaParse
Papa.parse(csvLink, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
        results.data.forEach(item => {
            let name = item.name;
            let price = item.price;
            let img = item.img;

            let card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <img src="${img || 'https://via.placeholder.com/200'}" alt="${name}">
                <h3>${name}</h3>
                <p class="price">₦${price}</p>
                <button onclick="addToCart('${name}', ${price})">Add to Cart</button>
            `;
            document.getElementById("productList").appendChild(card);
        });
    }
});

function addToCart(name, price){
    cart.push({name, price});
    alert(name + " added to cart");
}

function checkout(){
    if(cart.length==0){
        alert("Your cart is empty");
        return;
    }

    let message="Hello, I want to order:\n";
    let total=0;

    cart.forEach(item=>{
        message+=item.name+" - ₦"+item.price+"\n";
        total+=parseFloat(item.price);
    });

    message+="Total: ₦"+total;
    let url="https://wa.me/"+phone+"?text="+encodeURIComponent(message);
    window.open(url,"_blank");
}