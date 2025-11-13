💈 Barbería Fullstack – Frontend

![React](https://img.shields.io/badge/React-18+-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-build-purple?logo=vite)
![Redux](https://img.shields.io/badge/Redux_Toolkit-global_state-764abc?logo=redux)
![Tailwind](https://img.shields.io/badge/TailwindCSS-styling-38bdf8?logo=tailwindcss)
![i18next](https://img.shields.io/badge/i18n-multilanguage-yellow?logo=i18next)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)
![License](https://img.shields.io/badge/License-Academic-lightgrey)

**Obligatorio 1 — Desarrollo Fullstack (ORT Uruguay, 2025)**  
Autores: **Alan Langelan** y **Gastón Jaurena**

Frontend for the **Barber Shop Management System** developed in the *Fullstack Development* course.  
Built with **React (Vite)** and connected to a REST API to manage users, authentication, plans, services, categories, and general shop data.

The architecture focuses on **clarity**, **modularity**, and **scalability**, keeping views, components, state logic, and API communication clearly separated.

---

## 🚀 Tech Stack

- **React + Vite** – UI development and build tooling  
- **React Router DOM** – Client-side routing  
- **Redux Toolkit** – Global state management  
- **Axios** – HTTP client for API requests  
- **TailwindCSS** – Utility-first styling  
- **Framer Motion** – View and component animations  
- **Lucide-React** – Lightweight icon library  
- **i18next** – Internationalization (English / Spanish)

---

## ✨ Main Features

- User registration and authentication with **JWT**.  
- Automatic session validation and persistence.  
- Protected routes for authenticated users.  
- Service management:
  - Create, edit, view, and delete services.  
- Category management synchronized dynamically with the backend.  
- Plan management (Plus / Premium) with restricted actions based on plan.  
- Dashboard with usage and system metrics.  
- Consistent layout with a fixed **sidebar** and routed main content.

---

## 🔮 Future Improvements

- Full barber management (creation, edition, and assignment).  
- Appointment scheduling system:
  - Customers can choose date, time, and barber.  
- Extended analytics and performance insights in the dashboard.  
- Optional integration for reminders and administrative notifications.

---

## 📁 Project Structure

```text
src
├── api
│   └── Axios configuration and API handlers
├── auth
│   └── Authentication utilities and session validation logic
├── components
│   └── Reusable UI elements and shared components
├── features
│   ├── slices
│   │   └── Redux Toolkit slices for global state
│   └── Feature-specific logic
├── i18n
│   └── locales
│       ├── en
│       └── es
├── pages
│   └── Application pages (Login, Register, Dashboard, Services, Categories, Plans, etc.)
└── store
    └── Redux store configuration
