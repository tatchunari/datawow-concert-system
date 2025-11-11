# 🎟️ Concert Reservation System

A full-stack web application built using **Next.js (Frontend)** and **NestJS (Backend)** with a **SQLite** database.  
The project simulates an online concert ticket reservation system, featuring both **Admin** and **User** dashboards.

---

## 📁 Project Structure

This project follows a **monorepo structure**:

```
/apps
  ├── /frontend  # Next.js (React)
  └── /backend   # NestJS (API server)
```

### backend

```
backend/
├── src/
│   ├── concerts/
│   │   ├── dto/
│   │   ├── concerts.controller.spec.ts
│   │   ├── concerts.controller.ts
│   │   ├── concerts.module.ts
│   │   ├── concerts.service.spec.ts
│   │   └── concerts.service.ts
│   ├── entities/
│   │   ├── concert.entity.ts
│   │   ├── history.entity.ts
│   │   ├── reservation.ts
│   │   └── user.entity.ts
│   ├── history/
│   │   ├── history.controller.spec.ts
│   │   ├── history.controller.ts
│   │   ├── history.module.ts
│   │   ├── history.service.spec.ts
│   │   └── history.service.ts
│   ├── reservations/
│   │   ├── dto/
│   │   ├── reservations.controller.spec.ts
│   │   ├── reservations.controller.ts
│   │   ├── reservations.module.ts
│   │   ├── reservations.service.spec.ts
│   │   └── reservations.service.ts
│   └── users/
│       ├── app.controller.spec.ts
│       ├── app.controller.ts
│       ├── app.module.ts
│       └── app.service.ts
├── database.sqlite
└── main.ts
```

### frontend

```
frontend/
├── .next/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── admin-section/
│   │   │   │   ├── CreateSection.tsx
│   │   │   │   ├── OverviewSection.tsx
│   │   │   │   ├── StatSection.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── ConcertCard.tsx
│   │   │   ├── ConcertTable.tsx
│   │   │   ├── DeleteModal.tsx
│   │   │   ├── InputBox.tsx
│   │   │   ├── ReactQueryProvider.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Statcard.tsx
│   │   ├── dashboard/
│   │   │    ├── admin/
│   │   │    │   ├── history/
│   │   │    │   │    └── page.tsx
│   │   │    │   ├── page.tsx
│   │   │    ├──user/
│   │   │       ├── history/
│   │   │       │    └── page.tsx
│   │   │       └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── hooks/
│   │   └── useFetch.ts
│   ├── lib/
│   │   ├── axios.ts
│   │   └── historyService.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
```

---

## ⚙️ Setup & Configuration

### 🧩 Prerequisites

- Node.js (v18+)
- npm or yarn
- SQLite Viewer (for checking the database)

### 🛠️ Installation

Clone the repository and install dependencies for both apps:

```bash
# Clone the project
git clone <https://github.com/tatchunari/datawow-concert-system.git>

# Install dependencies for backend
cd apps/backend
npm install

# Install dependencies for frontend
cd ..apps/frontend
npm install
```

### 🚀 Running the Applications

**Backend (NestJS):**

```bash
cd apps/backend
npm run start
```

**Frontend (Next.js):**

```bash
cd apps/frontend
npm run dev
```

### 🗄️ Database Setup

This project uses **SQLite**.  
The database file is located at:

```
apps/backend/database.sqlite
```

You can open it with any SQLite viewer to inspect the tables.

---

## 🧱 Architecture Overview

The app is divided into two main layers:

### **Frontend (Next.js + Tailwind CSS)**

- Handles the UI and routing for Admin and User dashboards.
- Uses **Axios** for API calls.
- Uses **TanStack Query (React Query)** for efficient server state management.
- Fully **responsive** for both desktop and mobile.

### **Backend (NestJS + TypeORM + SQLite)**

- Provides RESTful APIs for users, concerts, reservations, and history.
- Handles business logic such as seat reservations, cancellations, and logging user actions.
- Uses **TypeORM** for data access and entity relationships.

---

## 📦 Main Libraries Used

### Frontend

- **Next.js** — React framework for SSR & routing.
- **Tailwind CSS** — Utility-first CSS framework for styling.
- **Axios** — HTTP client for API communication.
- **TanStack Query** — Server state and caching management.
- **Lucide-react** — Icon library for consistent UI visuals.

### Backend

- **NestJS** — Node.js framework for building scalable APIs.
- **TypeORM** — ORM for handling database entities and relations.
- **SQLite** — Lightweight database used for development.
- **Jest** — Unit testing framework (built-in with NestJS).

---

## 🧪 Testing

The backend uses **Jest** for unit testing (included with NestJS).

### Run Tests:

```bash
cd apps/backend
npm run test
```

This will execute all `.spec.ts` test files in the backend directory.

---

## 👥 Multiple Users Simulation

This project does **not include authentication**, but you can easily simulate multiple users using **query parameters**.

To simulate a specific user, simply append `?user_id={id}` to the URL.  
For example:

```
/dashboard/user?user_id=1
/dashboard/user/history?user_id=1
```

This lets you test how the application behaves for different users (e.g., different reservations, history records, or seat availability).  
The **username** of the currently simulated user is displayed at the top of the User Sidebar for clarity.

---

## 🧠 Project Assumptions & Behavior

- The app **always loads into the Admin Dashboard** first by default.
- The **date/time** displayed in the History Page refers to the **latest date a reservation was updated** (either reserved or canceled).
- **Users can view their own history**, and the UI has been improved with additional details.
  - The **History** page is also accessible from the User Sidebar.
- The **Stats Card** dynamically updates according to the **selected concert**.
- When a user **cancels** a reservation, they can **re-book** the same concert ticket afterward.
- The **"History" tab** in the Admin Sidebar acts as a global **Activity Log**, showing **all user actions** (reserve, cancel, etc.).
- Added a **"Home" tab** in the User Dashboard for easier navigation.
- Added **username display** in the User Sidebar to clearly indicate which simulated user is active.

---

## ✅ Input Validations

**Concert Form Validations:**

- **Concert name:** 3–50 characters
- **Total seats:** 1–1000
- **Description:** 10–500 characters

---

## 🧾 Review Criteria Alignment

| Criteria                       | Description                                                    |
| ------------------------------ | -------------------------------------------------------------- |
| **Correctness & Completeness** | Application meets all required user stories and behaviors.     |
| **Code Clarity & Structure**   | Code is modular, readable, and maintainable.                   |
| **Responsive Design**          | The UI is optimized for both desktop and mobile.               |
| **Error Handling**             | Both frontend and backend handle errors gracefully.            |
| **Testing**                    | Backend covered with Jest unit tests.                          |
| **Documentation**              | Comprehensive README with setup, structure, and testing guide. |

---

## Bonus

**Bonus Task** can be found in `BONUS.md` in the project root

---

## 🧑‍💻 Author

Developed by Orathai Saengsoemsap (Mayom) — for the DataWow Fullstack Assessment Project.
