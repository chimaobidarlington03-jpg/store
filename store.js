let cart = [];

const phone = "2347049884342"; // your WhatsApp number


fetch("https://docs.google.com/spreadsheets/d/1h1AOC9Y7Kp-jTobt4DKLOnFtBY5gzo9Me87qJp2i7LI/gviz/tq?tqx=out:csv")
.then(res => res.text())
.then(data => {

let rows = data.split("\n")

rows.slice(1).forEach(row => {

let cols = row.split(",")

let name = cols[0]
let price = cols[1]
let img = cols[2]

let card = document.createElement("div")

card.className = "card"

card.innerHTML = `
<img src="${img}">
<h3>${name}</h3>
<p class="price">₦${price}</p>
<button onclick="addToCart('${name}',${price})">Add to Cart</button>
`

document.getElementById("productList").appendChild(card)

})

})


function addToCart(name,price){
cart.push({name,price})
alert(name + " added to cart")
}

function checkout(){

if(cart.length==0){
alert("Your cart is empty")
return
}

let message="Hello, I want to order:\n"
let total=0

cart.forEach(item=>{
message+=item.name+" - ₦"+item.price+"\n"
total+=item.price
})

message+="Total: ₦"+total

let url="https://wa.me/"+phone+"?text="+encodeURIComponent(message)

window.open(url,"_blank")

}