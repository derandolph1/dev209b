
### README.md

# 📝 Multi-User Todo App (React + Node)

A full-stack Todo application featuring user authentication, session persistence via cookies, and full CRUD (Create, Read, Update, Delete) operations.

## 🚀 Getting Started

### 1. Prerequisites

* **Node.js** (v16 or higher)
* **npm** or **yarn**

### 2. Backend Setup (Node.js)

Before starting the React app, ensure your backend is running.

1. Navigate to your backend folder.
2. Install dependencies: `npm install`.
3. Create a `.env` file and add your `JWT_SECRET` and `PORT`.
4. Start the server: `npm start`.
* *Default endpoint usually:* `http://localhost:3000`



### 3. Frontend Setup (React)

1. Install dependencies:
```bash
npm install
npm install react-router-dom

```


2. Update the `API_URL` in `src/App.jsx` if your backend port differs.
3. Start the development server:
```bash
npm run dev

```



## 🛠 Features implemented

* **Auth:** Secure Login/Register with JWT stored in browser cookies.
* **Routing:** Protected routes using `react-router-dom`.
* **State Management:** Lifted state to handle real-time UI updates during Create/Edit/Delete.
* **Persistence:** App state survives page refreshes by checking for valid auth cookies on mount.

---

### Important: App.jsx vs Dashboard.jsx

* **App.jsx:** This is the "Traffic Controller." It decides if you should see the Login page or the Dashboard based on your cookie. It wraps the entire application in the `Router`.
* **Dashboard.jsx:** This is the "Workstation." Once you are logged in, this page takes over. It manages the `todos` array and the logic for when you click "Edit" or "Delete" on a specific task.

### Project organization

**Pages** (like Dashboard) represent full views/routes, while **Components** (like forms or lists) are the building blocks used within those pages.

### Folder Structure

```text
my-todo-app/
├── public/
├── src/
│   ├── components/       # Reusable UI pieces
│   │   ├── AuthForm.jsx
│   │   ├── TodoForm.jsx
│   │   └── TodoList.jsx
│   ├── pages/            # Full screen views
│   │   └── Dashboard.jsx   <-- (Your logic lives here)
│   ├── utils/            # Helper functions
│   │   └── cookies.js
│   ├── App.jsx           <-- (Routing & Auth logic)
│   ├── App.css
│   └── main.jsx          # Entry point (standard for Vite/React)
├── package.json
└── README.md

```

---
