# 🛒 Amazon Clone (Inspired by https://www.amazon.in)

This project is a full front-end clone of the official Amazon India website built using **HTML, CSS, and JavaScript**. The goal is to replicate the core features and layout of Amazon.in including login, navigation bar, product listings, cart functionality, and responsive design.

---

## 🔥 Features

- ✅ Amazon-style sticky header and multi-level navbar
- ✅ Sign In / Register page UI
- ✅ Search bar with dropdown category filter
- ✅ Language selector with country flag (EN-IN)
- ✅ Product listing grid with:
  - Product image, name, category
  - Star ratings
  - Price (₹)
  - "Add to Cart" button
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Basic cart system using JavaScript + localStorage
- ✅ Dropdowns for "Account & Lists", "All Categories", "Cart Preview"

---

## 🧱 Folder Structure

amazon-clone/
│
├── index.html # Homepage (navbar + product listings)
├── login.html # Login / Sign-in page
├── product.html # Optional: single product view
├── cart.html # Optional: full cart preview
│
├── /css
│ └── style.css # All custom styles
│
├── /js
│ ├── main.js # Navbar behavior, dropdowns
│ └── cart.js # Add to cart, localStorage management
│
├── /images
│ ├── logo.png # Amazon logo
│ ├── banner.jpg # Hero slider or banner
│ ├── product1.jpg # Sample product images
│ └── ...
│
├── /assets
│ └── fonts, icons # Optional: fonts, flag icons, SVGs
│
├── /data
│ └── products.json # (Optional) JSON file for product data
│
└── README.md # Project documentation