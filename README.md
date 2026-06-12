# Food Delivery Platform

A fully functional, front-end only Food Delivery Platform built using pure HTML, CSS, and Vanilla JavaScript. It features a modern, premium user interface, a cart system, order history, and simulated live tracking—all persisting locally in your browser.

## Features
- **Restaurant Listings**: Browse authentic Pakistani restaurants and dishes.
- **Search & Filter**: Search restaurants by name or filter them by categories (Desi, BBQ, Rice, Desserts).
- **Restaurant Details Modal**: Click on any restaurant to view its specific menu and prices.
- **Cart System**: Add items to your cart, adjust quantities, and calculate totals (including delivery fee and taxes).
- **Checkout & Tracking**: Simulate placing an order which redirects you to a live tracking page showing order progression.
- **Order History**: View your past orders categorized by their completion status.
- **Image Fallback System**: A built-in JavaScript handler ensures that any missing image degrades gracefully to a consistent placeholder.

## Technologies Used
- **HTML5**: For semantic page structure.
- **Vanilla CSS3**: Pure CSS styling with modern layout techniques (Grid/Flexbox) and no preprocessors or frameworks. Styles are separated page-by-page.
- **Vanilla JavaScript (ES6)**: For DOM manipulation, mock data management, and state persistence using `localStorage`.

## Screenshots

### Home Page
<img width="1349" height="1073" alt="image" src="https://github.com/user-attachments/assets/90e4d603-8961-4843-8f31-c621417f6bdc" />
<img width="1364" height="651" alt="image" src="https://github.com/user-attachments/assets/3c09c9e1-2b59-494d-bf39-f2af5218cf20" />

### Cart Page
<img width="1364" height="651" alt="image" src="https://github.com/user-attachments/assets/7c063b17-6fa4-4e04-8473-d34e27522d03" />

### Order Tracking
<img width="1349" height="1137" alt="image" src="https://github.com/user-attachments/assets/a9210094-e7b5-4559-9948-c85599e96130" />

### Order History
<img width="1349" height="785" alt="image" src="https://github.com/user-attachments/assets/6b89d6fc-5e07-4838-b580-c1bd522f8959" />

## Installation & Usage
1. Clone or download this repository.
2. Ensure you have the `images` folder created in the root directory for your pictures.
3. Open `index.html` in any modern web browser to start using the platform. No backend server or build steps are required.

## File Structure
- `index.html` - The main restaurant listing page.
- `cart.html` - The user's shopping cart and checkout page.
- `history.html` - Displays the user's past orders.
- `tracking.html` - The live order tracking interface.
- `styles/` - Contains separated CSS files for each HTML page (`global.css`, `index.css`, `cart.css`, etc.).
- `scripts/app.js` - Contains the mock data, application logic, and state management.
- `images/` - Directory for all image assets.
