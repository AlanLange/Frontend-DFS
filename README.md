# Frontend – Barber Shop Management System

This repository contains the frontend application for the Barber Shop Management System developed in the *Fullstack Development* course.  
Built with **React (Vite)**, it interacts with a REST API to manage users, authentication, plans, services, categories, and general shop data.  
The architecture prioritizes clarity, modularity, and scalability, ensuring a clean separation between views, components, state logic, and API communication.

---

## Technologies

- **React + Vite** – UI development and build tooling  
- **React Router DOM** – client-side routing  
- **Redux Toolkit** – global state management  
- **Axios** – HTTP client for API requests  
- **TailwindCSS** – utility-first styling  
- **Framer Motion** – view and component animations  
- **Lucide-React** – lightweight icon library  
- **i18next** – internationalization support (English / Spanish)

---

## Main Features

- User registration and authentication with JWT.
- Automatic session validation and persistence.
- Protected routes for authenticated users.
- Service management: creation, edition, visualization and deletion.
- Category management with dynamic backend synchronization.
- Plan management (Plus / Premium) with restricted actions.
- Dashboard displaying usage and system metrics.
- Consistent layout structure using a sidebar and routed content.

---

## Future Improvements

- Comprehensive barber management (creation, edition, and assignment).  
- Appointment scheduling system allowing customers to choose date, time, and barber.  
- Expanded analytics and performance insights on the dashboard.  
- Optional integration for reminders and administrative notifications.

---

## Project Structure

A clear directory organization is used to separate concerns and improve maintainability:

src
│
├── api
│ └── Axios configuration and API handlers
│
├── auth
│ └── Authentication utilities and session validation logic
│
├── components
│ └── Reusable UI elements and shared components
│
├── features
│ ├── slices
│ │ └── Redux Toolkit slices for global state
│ └── Feature-specific logic
│
├── i18n
│ └── locales
│ ├── en
│ └── es
│
├── pages
│ └── Application pages (Login, Register, Dashboard, Services, Categories, Plans, etc.)
│
└── store
└── Redux store configuration