# Somshubhro Guha - Personal Portfolio Website V1

[![React](https://img.shields.io/badge/React-^18-blue?logo=react&logoColor=white)](https://reactjs.org/) [![Vite](https://img.shields.io/badge/Vite-%5E5.x-blueviolet?logo=vite&logoColor=white)](https://vitejs.dev/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-^3-cyan?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) [![Framer Motion](https://img.shields.io/badge/Framer_Motion-^10-purple?logo=framer&logoColor=white)](https://www.framer.com/motion/) [![Node.js](https://img.shields.io/badge/Node.js-Backend-green?logo=nodedotjs&logoColor=white)](https://nodejs.org/) [![MongoDB](https://img.shields.io/badge/MongoDB-Database-darkgreen?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

Welcome! This is the repository for my personal portfolio website, meticulously crafted to showcase my journey as a web developer[cite: 1], my skills[cite: 5], and the projects I've brought to life. Built using React, Vite, Tailwind CSS, and powered by Framer Motion for animations, this portfolio emphasizes a clean, modern aesthetic with smooth interactions. Key design elements include responsive layouts, engaging light/dark themes, and subtle glassmorphism effects.

---

**✨ Live Demo:** [**portfolio.somshubhro.com**](https://portfolio.somshubhro.com) 

---

**(Strongly Recommended: Add a high-quality screenshot or GIF of your portfolio here!)**
---

## 🚀 Features

* **Modern & Responsive UI:** Fully adaptable design optimized for desktop, tablet, and mobile screens, using Poppins and Inter fonts.
* **Dual Themes:** Seamless light and dark mode toggle with user preference saved via `localStorage`.
* **Smooth Navigation:** JavaScript-powered smooth scrolling for internal section links and active link highlighting in the navbar.
* **Dynamic Animations:**
    * Subtle, animated gradient background in light mode.
    * Sophisticated text entrance animations in the Hero section via Framer Motion.
    * Consistent scroll-triggered fade/slide entrance animations for all content sections using a custom HOC.
    * Polished glassmorphism effects on the navbar and cards.
    * Engaging hover/tap microinteractions on buttons, links, skills tags, and project cards.
* **Content Sections:**
    * **Hero:** Eye-catching animated headline and clear call-to-action buttons.
    * **About:** Professional overview, personal interests/facts, and social media links[cite: 1].
    * **Skills:** Categorized display of technical skills with animated, interactive tags[cite: 5].
    * **Projects:** Glassmorphic cards featuring auto-scrolling image galleries (with pagination dots), descriptions, tech tags, and links to live demos/GitHub repos.
    * **Contact:** Interactive contact form with loading/success/error states (requires backend server to be running).
    * **Footer:** Clean footer with copyright and social links.

---

## 🛠️ Tech Stack

* **Frontend:**
    * [React](https://reactjs.org/) (v18+)
    * [Vite](https://vitejs.dev/)
    * [Tailwind CSS](https://tailwindcss.com/)
    * [Framer Motion](https://www.framer.com/motion/)
    * [React Icons](https://react-icons.github.io/react-icons/)
* **Backend (for Contact Form):**
    * [Node.js](https://nodejs.org/)
    * [Express.js](https://expressjs.com/)
    * [Mongoose](https://mongoosejs.com/)
    * [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
    * [cors](https://www.npmjs.com/package/cors)
    * [dotenv](https://www.npmjs.com/package/dotenv)

---

## 🎨 Customization Notes

* **Personal Details:** Update your name, tagline, overview, and links in `/src/components/Navbar.jsx`, `/src/components/Hero.jsx`, `/src/components/About.jsx`, and `/src/components/Footer.jsx`.
* **Project Details:** Edit the `projectsData` array in `/src/components/Projects.jsx`. Ensure you import your project images correctly from `/src/assets/images/` (or your chosen path) and replace any placeholders.
* **Backend Connection:** Ensure the `server/.env` file contains your correct MongoDB Atlas connection string (with password).

---

## ✨ Author

* **Name:** Somshubhro Guha [cite: 1]
* **GitHub:** [@Somshubhro07](https://github.com/Somshubhro07/) [cite: 1]
* **LinkedIn:** [linkedin.com/in/somshubhro-guha-46b892272](https://www.linkedin.com/in/somshubhro-guha-46b892272/) [cite: 1]
* **Email:** [guha.somshubhro07@gmail.com] [cite: 1]

---