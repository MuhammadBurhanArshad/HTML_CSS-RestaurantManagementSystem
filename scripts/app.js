document.addEventListener('error', function(e) {
  if (e.target.tagName && e.target.tagName.toLowerCase() === 'img') {
      if (e.target.src !== 'https://placehold.co/600x400/eeeeee/718096?text=Placeholder') {
          e.target.src = 'https://placehold.co/600x400/eeeeee/718096?text=Placeholder';
      }
  }
}, true);

const restaurants = [
  {
      id: 1,
      name: "Karachi Biryani Center",
      categories: ["Desi", "Rice"],
      rating: "4.8",
      reviews: "320+",
      deliveryTime: "20-30 min",
      image: "images/biryani.jpeg",
      menu: [
          { id: 101, name: "Chicken Biryani", desc: "Spicy and aromatic chicken biryani with raita", price: 399, image: "images/chicken-biryani.jpeg" },
          { id: 102, name: "Beef Pulao", desc: "Traditional beef pulao with tender meat", price: 499, image: "images/beef-pulao.jpeg" },
          { id: 103, name: "Zarda", desc: "Sweet colored rice with nuts", price: 250, image: "images/zarda.jpeg" }
      ]
  },
  {
      id: 2,
      name: "Lahori Karahi & BBQ",
      categories: ["Desi", "BBQ"],
      rating: "4.9",
      reviews: "150+",
      deliveryTime: "30-45 min",
      image: "images/karahi.jpeg",
      menu: [
          { id: 201, name: "Chicken Karahi", desc: "Wok-cooked chicken in tomato and green chili gravy", price: 1099, image: "images/chicken-karahi.jpeg" },
          { id: 202, name: "Seekh Kebab", desc: "Charcoal grilled minced beef kebabs", price: 699, image: "images/seekh-kabab.jpeg" },
          { id: 203, name: "Garlic Naan", desc: "Fresh tandoori naan brushed with garlic butter", price: 150, image: "images/garlic-naan.jpeg" }
      ]
  },
  {
      id: 3,
      name: "Peshawari Charsi Tikka",
      categories: ["BBQ", "Desi"],
      rating: "4.7",
      reviews: "500+",
      deliveryTime: "40-50 min",
      image: "images/tikka.jpeg",
      menu: [
          { id: 301, name: "Mutton Tikka", desc: "Tender mutton pieces with minimal spices grilled on charcoal", price: 1499, image: "images/mutton-tikka.jpeg" },
          { id: 302, name: "Namkeen Gosht", desc: "Slow-cooked salty meat delicacy", price: 1699, image: "images/namkeen-gosht.jpeg" },
          { id: 303, name: "Afghani Pulao", desc: "Rice with carrots, raisins, and meat", price: 899, image: "images/afghani-pulao.jpeg" }
      ]
  },
  {
      id: 4,
      name: "Dhaba Sweets & Snacks",
      categories: ["Desserts", "Desi"],
      rating: "4.6",
      reviews: "200+",
      deliveryTime: "10-20 min",
      image: "images/sweet-snack.jpeg",
      menu: [
          { id: 401, name: "Gulab Jamun", desc: "Warm sweet milk solids soaked in sugar syrup", price: 399, image: "images/gulab-jamun.jpeg" },
          { id: 402, name: "Samosa Chaat", desc: "Crispy samosas topped with chickpeas, yogurt, and chutney", price: 299, image: "images/samosa-chaat.jpeg" },
          { id: 403, name: "Jalebi", desc: "Crispy, syrup-soaked spiral sweets", price: 250, image: "images/jalebi.jpeg" }
      ]
  }
];

let cart = JSON.parse(localStorage.getItem('craveCart')) || [];
let activeCategory = "All";

function saveCart() {
  localStorage.setItem('craveCart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const countEls = document.querySelectorAll('#cart-count');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  countEls.forEach(el => el.textContent = totalItems);
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<img src="icons/check.svg" width="20" height="20" alt="Success"> ${message}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}


updateCartCount();

const restaurantGrid = document.getElementById('restaurantGrid');
if (restaurantGrid) {
  const searchInput = document.getElementById('searchInput');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  function renderRestaurants(filterText = "") {
      restaurantGrid.innerHTML = "";
      const filtered = restaurants.filter(r => {
          const matchCategory = activeCategory === "All" || r.categories.includes(activeCategory);
          const matchSearch = r.name.toLowerCase().includes(filterText.toLowerCase());
          return matchCategory && matchSearch;
      });

      if (filtered.length === 0) {
          restaurantGrid.innerHTML = `<div class="empty-state" style="grid-column: 1/-1;">No restaurants found.</div>`;
          return;
      }

      filtered.forEach(r => {
          const card = document.createElement('div');
          card.className = 'restaurant-card';
          card.innerHTML = `
              <div class="restaurant-img-wrapper">
                  <span class="restaurant-badge">${r.deliveryTime}</span>
                  <img src="${r.image}" class="restaurant-img" alt="${r.name}">
              </div>
              <div class="restaurant-info">
                  <h3 class="restaurant-title">${r.name}</h3>
                  <div class="restaurant-meta">
                      <span class="restaurant-meta-item">⭐ ${r.rating} (${r.reviews})</span>
                  </div>
                  <div class="restaurant-tags">
                      ${r.categories.map(c => `<span class="tag">${c}</span>`).join('')}
                  </div>
              </div>
          `;
          card.addEventListener('click', () => openRestaurantModal(r));
          restaurantGrid.appendChild(card);
      });
  }


  filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          activeCategory = btn.dataset.category;
          renderRestaurants(searchInput.value);
      });
  });

  searchInput.addEventListener('input', (e) => {
      renderRestaurants(e.target.value);
  });

  renderRestaurants();
}

const modal = document.getElementById('restaurantModal');
if (modal) {
  const closeModalBtn = document.getElementById('closeModalBtn');
  
  closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
  });

  window.openRestaurantModal = function(restaurant) {
      document.getElementById('modalRestaurantName').textContent = restaurant.name;
      document.getElementById('modalRestaurantRating').textContent = `⭐ ${restaurant.rating} (${restaurant.reviews})`;
      document.getElementById('modalRestaurantDelivery').textContent = `${restaurant.deliveryTime} • Free Delivery`;
      document.getElementById('modalRestaurantImg').src = restaurant.image;

      const menuGrid = document.getElementById('menuGrid');
      menuGrid.innerHTML = '';

      restaurant.menu.forEach(item => {
          const card = document.createElement('div');
          card.className = 'menu-card';
          card.innerHTML = `
              <img src="${item.image}" alt="${item.name}" class="menu-img">
              <div class="menu-details">
                  <div class="menu-title">${item.name}</div>
                  <div class="menu-desc">${item.desc}</div>
                  <div class="menu-bottom">
                      <span class="menu-price">Rs. ${item.price.toFixed(0)}</span>
                      <button class="add-to-cart-btn" data-id="${item.id}">+</button>
                  </div>
              </div>
          `;
          
          card.querySelector('.add-to-cart-btn').addEventListener('click', (e) => {
              e.stopPropagation();
              addToCart(restaurant.id, restaurant.name, item);
          });
          
          menuGrid.appendChild(card);
      });

      modal.classList.add('active');
  }
}

function addToCart(restaurantId, restaurantName, item) {
  const existing = cart.find(c => c.itemId === item.id);
  if (existing) {
      existing.quantity++;
  } else {
      cart.push({
          restaurantId,
          restaurantName,
          itemId: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1
      });
  }
  saveCart();
  showToast(`Added ${item.name} to cart`);
}

const cartContainer = document.getElementById('cartContainer');
if (cartContainer) {
  const cartItemsList = document.getElementById('cartItemsList');
  
  function renderCart() {
      if (cart.length === 0) {
          cartContainer.innerHTML = `
              <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem; color: #718096;">
                  <img src="icons/cart-empty.svg" width="64" height="64" style="margin-bottom: 1rem;" alt="Empty Cart">
                  <h2>Your cart is empty</h2>
                  <p>Looks like you haven't added any food yet.</p>
                  <br>
                  <a href="index.html" class="nav-cart-btn" style="display:inline-flex;">Browse Restaurants</a>
              </div>
          `;
          return;
      }

      cartItemsList.innerHTML = '';
      let subtotal = 0;

      cart.forEach((item, index) => {
          subtotal += item.price * item.quantity;
          const div = document.createElement('div');
          div.className = 'cart-item';
          div.innerHTML = `
              <img src="${item.image}" alt="${item.name}" class="cart-item-img">
              <div class="cart-item-details">
                  <div class="cart-item-title">${item.name}</div>
                  <div style="font-size:0.85rem; color:#718096; margin-bottom: 0.5rem;">From ${item.restaurantName}</div>
                  <div class="cart-item-price">Rs. ${item.price.toFixed(0)}</div>
              </div>
              <div class="cart-item-actions">
                  <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                  <span style="font-weight:600;">${item.quantity}</span>
                  <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                  <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
              </div>
          `;
          cartItemsList.appendChild(div);
      });

      const delivery = 150;
      const tax = subtotal * 0.08;
      const total = subtotal + delivery + tax;

      document.getElementById('subtotalAmount').textContent = `Rs. ${subtotal.toFixed(0)}`;
      document.getElementById('taxAmount').textContent = `Rs. ${tax.toFixed(0)}`;
      document.getElementById('totalAmount').textContent = `Rs. ${total.toFixed(0)}`;
  }

  window.updateQty = function(index, change) {
      if (cart[index].quantity + change > 0) {
          cart[index].quantity += change;
      } else {
          cart.splice(index, 1);
      }
      saveCart();
      renderCart();
  }

  window.removeItem = function(index) {
      cart.splice(index, 1);
      saveCart();
      renderCart();
  }

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
          if(cart.length === 0) return;
          

          const orders = JSON.parse(localStorage.getItem('craveOrders')) || [];
          const newOrder = {
              id: 'ORD-' + Math.floor(Math.random() * 1000000),
              date: new Date().toISOString(),
              items: cart.map(c => ({ name: c.name, qty: c.quantity })),
              total: parseFloat(document.getElementById('totalAmount').textContent.replace('Rs. ', '')),
              status: 'Preparing'
          };
          orders.unshift(newOrder);
          localStorage.setItem('craveOrders', JSON.stringify(orders));
          

          localStorage.setItem('craveActiveOrder', JSON.stringify(newOrder));
          

          cart = [];
          saveCart();
          
          showToast('Order placed successfully!');
          setTimeout(() => {
              window.location.href = 'tracking.html';
          }, 1500);
      });
  }

  renderCart();
}

const historyList = document.getElementById('historyList');
if (historyList) {
  const orders = JSON.parse(localStorage.getItem('craveOrders')) || [];
  
  if (orders.length === 0) {
      historyList.innerHTML = `<div class="empty-state">No past orders found.</div>`;
  } else {
      orders.forEach(order => {
          const date = new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          const itemsStr = order.items.map(i => `${i.qty}x ${i.name}`).join(', ');
          
          const isCompleted = order.status === 'Completed' || order.status === 'Delivered';
          const badgeClass = isCompleted ? 'status-completed' : 'status-processing';
          
          const card = document.createElement('div');
          card.className = 'history-card';
          card.innerHTML = `
              <div class="order-info">
                  <div class="order-id">${order.id}</div>
                  <div class="order-date">${date}</div>
                  <div class="order-items">${itemsStr}</div>
              </div>
              <div class="order-status-total">
                  <span class="status-badge ${badgeClass}">${order.status}</span>
                  <div class="order-total">Rs. ${order.total.toFixed(0)}</div>
                  <button class="reorder-btn" onclick="showToast('Items added to cart')">Reorder</button>
              </div>
          `;
          historyList.appendChild(card);
      });
  }
}

const trackingContent = document.getElementById('trackingContent');
if (trackingContent) {
  const activeOrder = JSON.parse(localStorage.getItem('craveActiveOrder'));
  
  if (!activeOrder) {

  } else {
      document.getElementById('noActiveOrder').style.display = 'none';
      
      const statuses = [
          { id: 'accepted', title: 'Order Accepted', desc: 'The restaurant has confirmed your order.', icon: 'icons/timeline-accepted.svg' },
          { id: 'preparing', title: 'Preparing Food', desc: 'Your food is being prepared.', icon: 'icons/timeline-preparing.svg' },
          { id: 'way', title: 'On the Way', desc: 'Your driver is on the way to you.', icon: 'icons/timeline-way.svg' },
          { id: 'delivered', title: 'Delivered', desc: 'Enjoy your food!', icon: 'icons/timeline-accepted.svg' }
      ];

      
      let currentStep = 1; 
      
      trackingContent.innerHTML = `
          <h2>Order ${activeOrder.id}</h2>
          <div style="color: #718096; margin-bottom: 2rem;">Total: Rs. ${activeOrder.total.toFixed(0)}</div>
          
          <div class="map-placeholder">
              <img src="images/map.png" alt="Map Area">
          </div>
          
          <div class="eta-box">
              ETA: 25 mins
          </div>
          
          <div class="timeline" id="timelineContainer"></div>
          
          <button class="checkout-btn" style="background:#ffffff; color:#1a1a2e; border:1px solid #edf2f7; margin-top:2rem;" onclick="cancelOrder()">Cancel Order</button>
      `;

      function renderTimeline() {
          const container = document.getElementById('timelineContainer');
          if(!container) return;
          container.innerHTML = '';
          
          statuses.forEach((s, i) => {
              const isActive = i <= currentStep;
              const isCurrent = i === currentStep;
              
              container.innerHTML += `
                  <div class="timeline-item ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}">
                      <div class="timeline-icon">
                          <img src="${s.icon}" width="16" height="16" alt="${s.title}">
                      </div>
                      <div class="timeline-content">
                          <div class="timeline-title">${s.title}</div>
                          <div class="timeline-desc">${s.desc}</div>
                      </div>
                  </div>
              `;
          });
      }

      renderTimeline();

      window.cancelOrder = function() {
          localStorage.removeItem('craveActiveOrder');
          window.location.reload();
      }


      setInterval(() => {
          if(currentStep < 3) {
              currentStep++;
              renderTimeline();
              if(currentStep === 3) {

                  const orders = JSON.parse(localStorage.getItem('craveOrders')) || [];
                  const o = orders.find(x => x.id === activeOrder.id);
                  if(o) {
                      o.status = 'Delivered';
                      localStorage.setItem('craveOrders', JSON.stringify(orders));
                  }
                  localStorage.removeItem('craveActiveOrder');
                  document.querySelector('.eta-box').textContent = 'Arrived!';
              }
          }
      }, 10000);
  }
}
