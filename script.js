// --- Amazon-like Frontend Logic ---
const apiBase = 'http://localhost:5000/api';
let currentUser = localStorage.getItem('user') || null;

// --- Firebase Integration ---
// Add your Firebase config here
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// --- Auth Functions ---
function signup() {
  const email = document.getElementById('signupUser').value;
  const password = document.getElementById('signupPass').value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById('authMsg').innerText = 'Signup successful! Please login.';
    })
    .catch(e => {
      document.getElementById('authMsg').innerText = e.message;
    });
}

function login() {
  const email = document.getElementById('loginUser').value;
  const password = document.getElementById('loginPass').value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById('authMsg').innerText = 'Login successful!';
      setTimeout(() => {
        document.getElementById('authPage').style.display = 'none';
        document.getElementById('products').style.display = '';
        loadProducts();
      }, 1000);
    })
    .catch(e => {
      document.getElementById('authMsg').innerText = e.message;
    });
}

// --- Product Functions ---
function loadProducts() {
  db.collection('products').get().then(snapshot => {
    const products = [];
    snapshot.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() });
    });
    const productsDiv = document.getElementById('products');
    if (!productsDiv) return;
    let filtered = products;
    if (currentCategory !== 'all') {
      filtered = products.filter(p => (p.category || '').toLowerCase() === currentCategory);
    }
    productsDiv.innerHTML = filtered.map(p => `
      <div class="product-card" onclick="showProductDetail('${p.id}')">
        <img src="${p.image}" alt="${p.name}">
        ${renderStars(p.rating || 0)}
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="event.stopPropagation();addToCart('${p.id}')">Add to Cart</button>
      </div>
    `).join('');
  });
}

// Product ratings helper
function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += i <= rating ? '★' : '☆';
  }
  return `<span class='stars'>${stars}</span>`;
}

// --- Product Detail Modal ---
function showProductDetail(productId) {
  // Demo product data (in real app, fetch from DB)
  const products = [
    {
      id: '1',
      name: 'Noise Smartwatch',
      image: 'https://m.media-amazon.com/images/I/71K84j2O2eL._AC_UL480_FMwebp_QL65_.jpg',
      price: 1999,
      rating: 4,
      category: 'Electronics',
      description: 'Noise ColorFit Pulse Spo2 Smart Watch with 1.4" Full Touch, 10 Days Battery, SpO2, Heart Rate Monitor.'
    },
    {
      id: '2',
      name: 'Samsung Galaxy M14',
      image: 'https://m.media-amazon.com/images/I/71TPda7cwUL._AC_UL480_FMwebp_QL65_.jpg',
      price: 10999,
      rating: 5,
      category: 'Electronics',
      description: 'Samsung Galaxy M14 5G (Smoky Teal, 6GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery.'
    },
    {
      id: '3',
      name: 'Apple MacBook Air M1',
      image: 'https://m.media-amazon.com/images/I/81vpsIs58WL._AC_UL480_FMwebp_QL65_.jpg',
      price: 84990,
      rating: 5,
      category: 'Electronics',
      description: 'Apple MacBook Air Laptop M1 chip, 13.3-inch/33.74 cm Retina Display, 8GB RAM, 256GB SSD.'
    },
    {
      id: '4',
      name: 'The Psychology of Money',
      image: 'https://m.media-amazon.com/images/I/71g2ednj0JL._AC_UL480_FMwebp_QL65_.jpg',
      price: 299,
      rating: 4,
      category: 'Books',
      description: 'Timeless lessons on wealth, greed, and happiness by Morgan Housel.'
    },
    {
      id: '5',
      name: "Men's Casual Shirt",
      image: 'https://m.media-amazon.com/images/I/81p1L85KinL._AC_UL480_FMwebp_QL65_.jpg',
      price: 499,
      rating: 3,
      category: 'Fashion',
      description: 'Men Regular Fit Solid Spread Collar Casual Shirt.'
    },
    {
      id: '6',
      name: 'boAt Airdopes 141',
      image: 'https://m.media-amazon.com/images/I/61Mblg0vQzL._AC_UL480_FMwebp_QL65_.jpg',
      price: 1299,
      rating: 4,
      category: 'Electronics',
      description: 'boAt Airdopes 141 Bluetooth TWS Earbuds with 42H Playtime, Low Latency, ENx Tech.'
    },
    {
      id: '7',
      name: 'OnePlus Nord CE 3 Lite',
      image: 'https://m.media-amazon.com/images/I/81QpkIctqPL._AC_UL480_FMwebp_QL65_.jpg',
      price: 19999,
      rating: 4,
      category: 'Electronics',
      description: 'OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage).'
    },
    {
      id: '8',
      name: 'Apple iPhone 13',
      image: 'https://m.media-amazon.com/images/I/71vFKBpKakL._AC_UL480_FMwebp_QL65_.jpg',
      price: 52999,
      rating: 5,
      category: 'Electronics',
      description: 'Apple iPhone 13 (128GB) - Blue.'
    },
    {
      id: '9',
      name: 'Atomic Habits',
      image: 'https://m.media-amazon.com/images/I/81bGKUa1e0L._AC_UL480_FMwebp_QL65_.jpg',
      price: 399,
      rating: 5,
      category: 'Books',
      description: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones.'
    },
    {
      id: '10',
      name: "Women's Kurti",
      image: 'https://m.media-amazon.com/images/I/71v0T8QyJIL._AC_UL480_FMwebp_QL65_.jpg',
      price: 599,
      rating: 3,
      category: 'Fashion',
      description: 'Women Rayon Printed Straight Kurta.'
    }
  ];
  const p = products.find(x => x.id === productId);
  if (!p) return;
  document.getElementById('productDetailContent').innerHTML = `
    <img src="${p.image}" alt="${p.name}" style="width:100%;height:200px;object-fit:contain;">
    <h2>${p.name}</h2>
    <div class='stars'>${'★'.repeat(p.rating)}${'☆'.repeat(5-p.rating)}</div>
    <div class='category'><strong>Category:</strong> ${p.category}</div>
    <p>${p.description}</p>
    <p><strong>Price:</strong> ₹${p.price}</p>
    <button onclick="addToCart('${p.id}')">Add to Cart</button>
  `;
  document.getElementById('productDetailModal').style.display = '';
}
function closeProductDetail() {
  document.getElementById('productDetailModal').style.display = 'none';
}

// --- Cart Functions ---
function addToCart(productId) {
  const user = auth.currentUser;
  if (!user) {
    showAuth();
    return;
  }
  const cartRef = db.collection('users').doc(user.uid).collection('cart').doc(productId);
  cartRef.get().then(doc => {
    if (doc.exists) {
      cartRef.update({ quantity: doc.data().quantity + 1 });
    } else {
      cartRef.set({ quantity: 1 });
    }
    alert('Added to cart!');
  });
}

function showCart() {
  const user = auth.currentUser;
  if (!user) {
    showAuth();
    return;
  }
  document.getElementById('products').style.display = 'none';
  document.getElementById('cartPage').style.display = '';
  document.getElementById('authPage').style.display = 'none';
  db.collection('users').doc(user.uid).collection('cart').get().then(snapshot => {
    let items = [];
    let productPromises = [];
    snapshot.forEach(doc => {
      items.push({ id: doc.id, ...doc.data() });
      productPromises.push(db.collection('products').doc(doc.id).get());
    });
    Promise.all(productPromises).then(productDocs => {
      document.getElementById('cartItems').innerHTML = items.map((i, idx) => {
        const p = productDocs[idx].data();
        return `<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <img src="${p.image}" alt="${p.name}" style="width:50px;height:50px;object-fit:contain;">
          <span>${p.name}</span>
          <span>$${p.price}</span>
          <input type='number' min='1' value='${i.quantity}' style='width:40px;' onchange='updateCartQuantity("${i.id}", this.value)'>
          <button onclick='removeFromCart("${i.id}")'>Remove</button>
        </div>`;
      }).join('');
    });
  });
}

function updateCartQuantity(productId, qty) {
  const user = auth.currentUser;
  if (!user) return;
  db.collection('users').doc(user.uid).collection('cart').doc(productId).update({ quantity: parseInt(qty) }).then(updateCartCount);
}

function removeFromCart(productId) {
  const user = auth.currentUser;
  if (!user) return;
  db.collection('users').doc(user.uid).collection('cart').doc(productId).delete().then(() => {
    showCart();
    updateCartCount();
  });
}

// --- Order History ---
function showOrderHistory() {
  const user = auth.currentUser;
  if (!user) { showAuth(); return; }
  document.getElementById('products').style.display = 'none';
  document.getElementById('cartPage').style.display = 'none';
  document.getElementById('authPage').style.display = 'none';
  document.getElementById('orderHistory').style.display = '';
  db.collection('users').doc(user.uid).collection('orders').orderBy('created', 'desc').get().then(snapshot => {
    let orders = [];
    snapshot.forEach(doc => orders.push(doc.data()));
    document.getElementById('ordersList').innerHTML = orders.map(order => `
      <div>
        <div><strong>Date:</strong> ${order.created.toDate().toLocaleString()}</div>
        <div><strong>Items:</strong> ${order.items.map(i => `Product ID: ${i.id}, Qty: ${i.quantity}`).join('<br>')}</div>
      </div>
    `).join('');
  });
}
function hideOrderHistory() {
  document.getElementById('orderHistory').style.display = 'none';
  document.getElementById('products').style.display = '';
}

// Show products
function loadProducts() {
  fetch(`${apiBase}/products`)
    .then(res => res.json())
    .then(products => {
      const productsDiv = document.getElementById('products');
      if (!productsDiv) return;
      productsDiv.innerHTML = products.map(p => `
        <div class="product-card" onclick="showProductDetail(${p.id})">
          <img src="${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>$${p.price}</p>
          <button onclick="event.stopPropagation();addToCart(${p.id})">Add to Cart</button>
        </div>
      `).join('');
    });
}

// Add to cart
function addToCart(productId) {
  if (!currentUser) {
    showAuth();
    return;
  }
  fetch(`${apiBase}/cart/${currentUser}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity: 1 })
  })
    .then(res => res.json())
    .then(() => alert('Added to cart!'));
}

// Show cart
function showCart() {
  if (!currentUser) {
    showAuth();
    return;
  }
  document.getElementById('products').style.display = 'none';
  document.getElementById('cartPage').style.display = '';
  document.getElementById('authPage').style.display = 'none';
  fetch(`${apiBase}/cart/${currentUser}`)
    .then(res => res.json())
    .then(items => {
      document.getElementById('cartItems').innerHTML = items.map(i => `
        <div>Product ID: ${i.productId} | Quantity: ${i.quantity}</div>
      `).join('');
    });
}

// Show login/signup
function showAuth() {
  document.getElementById('products').style.display = 'none';
  document.getElementById('cartPage').style.display = 'none';
  document.getElementById('authPage').style.display = '';
}

// Login
function login() {
  const username = document.getElementById('loginUser').value;
  const password = document.getElementById('loginPass').value;
  fetch(`${apiBase}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        currentUser = username;
        localStorage.setItem('user', username);
        document.getElementById('authMsg').innerText = 'Login successful!';
        setTimeout(() => { document.getElementById('authPage').style.display = 'none'; document.getElementById('products').style.display = ''; loadProducts(); }, 1000);
      } else {
        document.getElementById('authMsg').innerText = data.error || 'Login failed';
      }
    });
}

// Signup
function signup() {
  const username = document.getElementById('signupUser').value;
  const password = document.getElementById('signupPass').value;
  fetch(`${apiBase}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        document.getElementById('authMsg').innerText = 'Signup successful! Please login.';
      } else {
        document.getElementById('authMsg').innerText = data.error || 'Signup failed';
      }
    });
}

// Checkout (demo)
function checkout() {
  alert('Checkout not implemented in demo.');
}

// Update cart count in header
function updateCartCount() {
  const user = auth.currentUser;
  if (!user) {
    document.getElementById('cartCount').innerText = '0';
    return;
  }
  db.collection('users').doc(user.uid).collection('cart').get().then(snapshot => {
    let count = 0;
    snapshot.forEach(doc => { count += doc.data().quantity; });
    document.getElementById('cartCount').innerText = count;
  });
}

// Update user greeting
function updateUserGreeting() {
  const user = auth.currentUser;
  const greeting = document.getElementById('userGreeting');
  if (user && greeting) {
    greeting.innerHTML = `Hello, ${user.email.split('@')[0]}<br><strong>Account & Lists</strong>`;
  } else if (greeting) {
    greeting.innerHTML = 'Hello, Sign in<br><strong>Account & Lists</strong>';
  }
}

// Update cart and greeting on auth/cart changes
if (typeof auth !== 'undefined') {
  auth.onAuthStateChanged(user => {
    updateUserGreeting();
    updateCartCount();
  });
}

// Call updateCartCount after cart changes
function addToCart(productId) {
  const user = auth.currentUser;
  if (!user) {
    showAuth();
    return;
  }
  const cartRef = db.collection('users').doc(user.uid).collection('cart').doc(productId);
  cartRef.get().then(doc => {
    if (doc.exists) {
      cartRef.update({ quantity: doc.data().quantity + 1 }).then(updateCartCount);
    } else {
      cartRef.set({ quantity: 1 }).then(updateCartCount);
    }
    alert('Added to cart!');
  });
}

function showCart() {
  const user = auth.currentUser;
  if (!user) {
    showAuth();
    return;
  }
  document.getElementById('products').style.display = 'none';
  document.getElementById('cartPage').style.display = '';
  document.getElementById('authPage').style.display = 'none';
  db.collection('users').doc(user.uid).collection('cart').get().then(snapshot => {
    let items = [];
    let productPromises = [];
    snapshot.forEach(doc => {
      items.push({ id: doc.id, ...doc.data() });
      productPromises.push(db.collection('products').doc(doc.id).get());
    });
    Promise.all(productPromises).then(productDocs => {
      document.getElementById('cartItems').innerHTML = items.map((i, idx) => {
        const p = productDocs[idx].data();
        return `<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <img src="${p.image}" alt="${p.name}" style="width:50px;height:50px;object-fit:contain;">
          <span>${p.name}</span>
          <span>$${p.price}</span>
          <input type='number' min='1' value='${i.quantity}' style='width:40px;' onchange='updateCartQuantity("${i.id}", this.value)'>
          <button onclick='removeFromCart("${i.id}")'>Remove</button>
        </div>`;
      }).join('');
    });
  });
}

function updateCartQuantity(productId, qty) {
  const user = auth.currentUser;
  if (!user) return;
  db.collection('users').doc(user.uid).collection('cart').doc(productId).update({ quantity: parseInt(qty) }).then(updateCartCount);
}

function removeFromCart(productId) {
  const user = auth.currentUser;
  if (!user) return;
  db.collection('users').doc(user.uid).collection('cart').doc(productId).delete().then(() => {
    showCart();
    updateCartCount();
  });
}

// --- Navigation (for demo) ---
document.addEventListener('DOMContentLoaded', () => {
  auth.onAuthStateChanged(user => {
    if (user) {
      document.getElementById('authPage').style.display = 'none';
      document.getElementById('products').style.display = '';
      loadProducts();
    } else {
      showAuth();
    }
  });
  if (document.getElementById('products')) {
    loadProducts();
    document.getElementById('products').style.display = '';
  }
  if (document.getElementById('cartPage')) {
    document.getElementById('cartPage').style.display = 'none';
  }
  if (document.getElementById('authPage')) {
    document.getElementById('authPage').style.display = 'none';
  }
  // Add navigation buttons if needed
});

// Mobile menu toggle
function toggleMobileMenu() {
  const navList = document.getElementById('navbarList');
  navList.classList.toggle('active');
}

// Category filter
let currentCategory = 'all';
function filterByCategory() {
  currentCategory = document.getElementById('categoryDropdown').value;
  loadProducts();
}
