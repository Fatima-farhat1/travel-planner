# 🌍 Travel Planner (Angular Demo App)

A modern Angular travel planner app with authentication, city search, and favorites management.  
This project is a **frontend-only demo** using `localStorage` to simulate authentication and saved data.
---

## ✨ Features

- 🔐 Mock Authentication (Login / Signup)
- 🏠 Home page with hero section + “How it works”
- 🔎 City search with mock results
- ⭐ Favorites system (save/remove cities)
- 🔒 Protected routes using Angular Guards
- 🎨 Custom travel-themed design system
- 📱 Responsive UI

---

## ⚙️ Tech Stack

- Angular
- TypeScript
- SCSS
- Reactive Forms
- LocalStorage (mock backend)

---

### 📄 Pages
- `pages/home/` → Landing page with hero section  
- `pages/search-cities/` → City search + mock results  
- `pages/favorites/` → Saved cities (**protected**)  
- `pages/login/` → Login page (mock auth)  
- `pages/signup/` → Signup page (mock auth)  
- `pages/city-details/` → Placeholder for future API integration  

---
### ⚙️ Services & Guards
- `services/auth.service.ts` → Handles mock authentication (localStorage)
- `services/favorites.service.ts` → Manages saved cities
- `guards/auth.guard.ts` → Protects authenticated routes

---
📌 Notes

This project is designed as:

A learning Angular project
A portfolio-ready UI demo
A starter template for full-stack travel apps
