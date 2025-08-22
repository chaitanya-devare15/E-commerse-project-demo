// Sample product data (backup list if needed)
const products = [
  {
    id: 1,
    name: "Men's Casual T-Shirt",
    price: 700,
    image: "https://riwazah.com/wp-content/uploads/2025/03/lion-t-shirt.png"
  },
  {
    id: 2,
    name: "Women's Summer Dress",
    price: 999,
    image: "https://via.placeholder.com/200x220?text=Dress"
  },
  {
    id: 3,
    name: "Kids' Hoodie",
    price: 600,
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQfMIvkcIrc4gRevKMtYV3qOxseHt05bNbfzOxJ_Wq1oISrznwaxHII_y_bkFkcWze2BeIvmtVopvS-_U6YETWfVzEOOpzDHLOCiHxBeUNMpNrZRdjjn5i4KKqEWLIXCtAR05zVc_o&usqp=CAc"
  },
  {
    id: 4,
    name: "Stylish Jeans",
    price: 395,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQicF-G6KfimYz_BIitGDcNNmTiY5eL-8QFJoghoGlcYm9p84t-VSlEO0Luw7lUdkiRSpJVSCgONdiF4dW_QpUN-DWd3W2wOhHfMiIRcQTzLc1xIL1odDsvDwGg_X9pnX-ph_Agsw&usqp=CAc"
  },
  {
    id: 5,
    name: "Kids' Hoodie",
    price: 500,
    image: "https://via.placeholder.com/200x220?text=Jacket"
  },
  {
    id: 6,
    name: "Vivo Y200e 5G 6GB RAM 128GB Saffron Delight Mobile",
    price: 20000,
    image: "mob1.pmg"
  },
  {
    id: 7,
    name: "Realme C63 4G (4 GB RAM and 64GB Storage) Leather Blue Mobile Phone",
    price: 9990,
    image: "mob2.png"
  },
  {
    id: 8,
    name: "OnePlus Nord 512 GB RAM + 512 GB ROMPhantom Grey",
    price: 37000,
    image: "mob3.png"
  },
  {
    id: 9,
    name: "Apple iPhone 15 Pro Max Black",
    price: 50000,
    image: "mob4.png"
  },
  {
    id: 10,
    name: "Oppo A18 4GB 64GB Blue Mobile",
    price: 18000,
    image: "mob5.png"
  }
];

// ✅ Function to add product to cart
function addToCart(id) {
  let card = document.querySelector(`.product-card[data-id="${id}"]`);
  if (!card) return;

  let name = card.querySelector("#pro-name").innerText;
  let priceText = card.querySelector("#pro-price").innerText.replace(/[^\d]/g, "");
  let price = parseInt(priceText) || 0;
  let img = card.querySelector("#pro-img").src;
  let size = card.querySelector(".size.selected")?.innerText || "N/A";

  let procs = {
    id: id,
    name: name,
    price: price,
    img: img || "https://via.placeholder.com/200x220?text=No+Image",
    size: size,
    qty: 1
  };

  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Agar same product + size already hai to qty ++
  let existing = cart.find(item => item.id === id && item.size === size);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push(procs);
  }

  localStorage.setItem("cartItems", JSON.stringify(cart));
  alert("Item Added to Cart!");
}

// ✅ Function to render product list in cart.html
function renderProducts() {
  let list = document.getElementById("pro-list");
  if (!list) return;

  list.innerHTML = "";
  products.forEach(pro => {
    let div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${pro.image || "https://via.placeholder.com/200x220?text=No+Image"}" alt="${pro.name}">
      <div class="product-name">${pro.name}</div>
      <div class="product-price">₹${pro.price}</div>
      <button onclick="addToCart(${pro.id})">Add to Cart</button>
    `;
    list.appendChild(div);
  });
}

// ✅ Function to render cart in cart.html
function renderCart() {
  let cartDiv = document.getElementById("cart");
  if (!cartDiv) return;

  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>No items in cart.</p>";
    return;
  }

  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    let div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>
        <img src="${item.img}" width="40" height="40"> 
        ${item.name} (Size: ${item.size}) x ${item.qty}
      </span>
      <span>₹${item.price * item.qty}</span>
      <button class="remove" onclick="removeFromCart(${index})">Remove</button>
    `;
    cartDiv.appendChild(div);
  });

  let totalDiv = document.createElement("div");
  totalDiv.className = "cart-total";
  totalDiv.innerText = "Total: ₹" + total;
  cartDiv.appendChild(totalDiv);
}

// ✅ Remove item from cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cart));
  renderCart();
}

// ✅ Auto run in cart.html
window.onload = function () {
  renderProducts();
  renderCart();
};
