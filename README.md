# 🏸 Badminton E-Commerce App

This is a feature-rich badminton e-commerce application built with **Next.js 14
(Pages Router)** and **NextUI v2**. The project aims to provide a seamless
online shopping experience for badminton enthusiasts, offering a variety of
products, an AI-powered recommendation system, and user-friendly authentication.

---

## 🚀 Features

- **Dynamic Product Listings** – Browse rackets, shoes, shuttlecocks, and more.
- **AI-Powered Chat Assistant** – Get personalized recommendations.
- **Authentication System** – Secure user login & registration.
- **Shopping Cart & Checkout** – Smooth purchasing flow.
- **Dark Mode Support** – Seamless UI with theme switching.
- **Responsive Design** – Optimized for all devices.
- **Admin Dashboard** – Manage products, users, and orders.

---

## 🛠️ Technologies Used

- **Frontend:**
  - [Next.js 14](https://nextjs.org/docs) (Pages Router)
  - [NextUI](https://nextui.org) (UI components)
  - [Tailwind CSS](https://tailwindcss.com) (Styling)
  - [Tailwind Variants](https://tailwind-variants.org) (Variants for UI
    components)
  - [Framer Motion](https://www.framer.com/motion) (Animations)
  - [next-themes](https://github.com/pacocoursey/next-themes) (Dark mode
    support)
- **State Management & Data Fetching:**

  - [React Query](https://tanstack.com/query/latest/docs/framework/react/overview)
    (Server state management)
  - Context API (User authentication & global state)

- **Backend:**
  - [Flask](https://flask.palletsprojects.com/) (Python-based backend)
  - PostgreSQL (Relational database for storing products & orders)
- **Linting & Formatting:**
  - [ESLint](https://eslint.org/) (Code quality)
  - [Prettier](https://prettier.io/) (Code formatting)

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/TheCodister/badminton-econ-app.git
cd badminton-econ-app
```

### 2️⃣ Install Dependencies

This project uses **pnpm** as the package manager:

```bash
pnpm install
```

### 3️⃣ Run the Development Server

```bash
pnpm dev
```

Visit **`http://localhost:3000`** in your browser to see the app.

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory and add the necessary API keys
and database credentials:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
DATABASE_URL=postgresql://user:password@localhost:5432/badminton_db
NEXTAUTH_SECRET=your-secret-key
```

---

## 📜 Folder Structure

```
├── components/            # Reusable UI components
├── constants/             # Constant values (e.g., categories)
├── context/               # Authentication & global state context
├── hooks/                 # Custom React hooks (e.g., useGetRacket)
├── icons/                 # SVG Icons
├── layouts/               # Layout components
├── pages/                 # Next.js pages
│   ├── index.tsx          # Home page
│   ├── profile.tsx        # User profile page
│   ├── chat.tsx           # AI chat assistant
│   ├── cart.tsx           # Shopping cart page
│   ├── login.tsx          # Authentication page
│   ├── api/               # API routes
├── public/                # Static assets
├── styles/                # Global styles
└── utils/                 # Helper functions
```

---

## 🔥 Roadmap & Future Improvements

- ✅ Implement OAuth-based authentication
- ✅ Add product reviews & ratings
- 🚧 Improve AI chat assistant accuracy
- 🚧 Add order tracking system
- 🚧 Implement admin dashboard for better product management

---

## 📄 License

This project is licensed under the
[MIT License](https://github.com/TheCodister/badminton-econ-app/blob/main/LICENSE).

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve this project:

1. Fork the repository
2. Create a new branch (`feature-new-functionality`)
3. Commit your changes
4. Push the branch and create a pull request

---

## 📬 Contact

For questions or suggestions, feel free to reach out:

- 📧 Email: your.email@example.com
- 🐦 Twitter: [@YourHandle](https://twitter.com/YourHandle)
- 💼 LinkedIn: [YourProfile](https://linkedin.com/in/YourProfile)

---

🎉 **Happy coding & shopping! 🏸**
