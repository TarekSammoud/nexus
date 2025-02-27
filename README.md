# Nexus
![logo black](https://github.com/user-attachments/assets/d19dc7d9-2279-4fd5-8ba8-6ae26ee473ef)<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 437.46 490.65"><defs><style>.cls-1,.cls-2{fill:#1d1d1b;}.cls-2{font-size:86.9px;font-family:Nexa-Heavy, Nexa;font-weight:800;}</style></defs><polygon class="cls-1" points="77.94 118.61 151.6 193.54 34.66 310.23 66.07 341.89 213.9 193.29 108.58 87.84 77.94 118.61"/><polygon class="cls-1" points="304.44 47.85 227.76 119.7 113.92 0 81.52 30.64 226.53 181.98 334.47 79.22 304.44 47.85"/><polygon class="cls-1" points="378.09 267.23 304.62 192.11 421.85 75.72 390.52 43.98 242.32 192.21 347.38 297.92 378.09 267.23"/><polygon class="cls-1" points="151.41 337.42 228.27 265.76 341.82 385.75 374.3 355.19 229.67 203.48 121.47 305.98 151.41 337.42"/><text class="cls-2" transform="translate(0 465.97) scale(1.41 1)">NEXUS</text></svg>


**Nexus** is an online game store that empowers indie developers by providing a platform to showcase and sell their games. It includes multiple modules to enhance user experience, support developers, and build a thriving gaming community.

## Features

### 🎮 Games Module
- Browse and purchase games
- Game listings with descriptions, screenshots, and reviews
- Wishlist and favorites functionality

### 💰 Finance Module
- Secure payment processing for game purchases
- Revenue tracking and payouts for developers
- In-app purchases and microtransactions

### 🛠 Tech Support Module
- Customer support ticketing system
- FAQs and troubleshooting guides
- Live chat for real-time assistance

### 🎭 Game Jams Module
- Organize and participate in game jams
- Submission and voting system
- Community engagement through challenges

### 🛒 Item Market Module
- Marketplace for in-game items and skins
- Trading and auction system
- Secure transactions

### 👤 User Management Module
- User authentication and roles (players, developers, admins)
- Profile customization
- Account security settings

### 🗣 Community Forum Module
- Discussion boards for game development and gaming
- Developer blogs and updates
- Community-driven content sharing

## Tech Stack

- **Frontend:** Angular
- **Backend:** Spring Boot
- **Database:**  MySQL
- **Authentication:** JWT-based authentication
- **Payment Gateway:** Stripe / PayPal integration
- **Deployment:** Docker, Kubernetes

## Getting Started

### Prerequisites
- Node.js & npm
- Java 17+ (for Spring Boot)
- MySQL

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/tareksammoud/nexus.git
   cd nexus
   ```

2. Set up the backend:
   ```sh
   cd nexus-backend
   mvn clean install
   mvn spring-boot:run
   ```

3. Set up the frontend:
   ```sh
   cd nexus-frontend
   npm install
   ng serve
   ```

4. Open your browser and visit `http://localhost:4200`.
