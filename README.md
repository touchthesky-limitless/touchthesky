# ✈️ Touch The Sky - Airline Finder

**Touch The Sky** is a modern, high-performance web application designed for aviation enthusiasts and travelers to search for airlines, alliances, and IATA codes. Built as a **Progressive Web App (PWA)**, it allows for a native-like experience on both desktop and mobile.

---
Explore the evolution of this project:
* **[Version 1 (Vanilla JS)](./v1)**: The original build using pure JavaScript and CSS.
* **[Version 2 (React + Vite)](./v2)**: The modern upgrade featuring React components and a manifest for installation.

---

## 🚀 Key Features

* **Real-time Search:** Instantly filter airlines by name, alliance, or IATA code.
* **Adaptive Theme:** Seamlessly toggle between **Light** and **Dark** modes.
* **PWA Ready:** Installable on Desktop (Chrome/Edge/Brave) with specialized installation tips for iOS users.
* **Responsive UI:** Fully optimized for all screen sizes using Tailwind CSS.
* **Performance:** Built with Vite for lightning-fast development and optimized production builds.

---

## 🛠️ Tech Stack

* **Framework:** [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **State Management:** React Hooks (`useState`, `useEffect`)
* **PWA:** Web App Manifest and Service Workers

---

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/touchthesky-limitless/touchthesky.git
    cd touchthesky
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run in Development mode:**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

4.  **Build for Production:**
    ```bash
    npm run build
    ```

---

## 📱 PWA Requirements

To ensure the "Install App" button appears correctly in the header:

1.  **Icons:** The browser requires at least one **PNG** icon (192x192 or 512x512). While `icon.svg` is used for scaling, the PNG is mandatory for installability.
2.  **Manifest:** The `public/manifest.json` must be linked in the `index.html` using an absolute path: `<link rel="manifest" href="/manifest.json" />`.
3.  **Service Worker:** A service worker (`public/sw.js`) must be registered in `main.tsx`.
4.  **Security:** PWAs require **HTTPS** or `localhost` to trigger the installation prompt.

---

## 📂 Project Structure

```text
├── public/              # Static assets (Manifest, PNG/SVG Icons, Service Worker)
├── src/
│   ├── components/      # UI Components (Header, InstallButton, IOSTipBanner)
│   ├── data/            # Airline and Alliance datasets
│   ├── App.tsx          # Main application logic and state
│   ├── index.css        # Tailwind directives and global styles
│   └── main.tsx         # React entry point and SW registration
├── index.html           # HTML5 template
├── vite.config.ts       # Vite configuration
└── tailwind.config.js   # Tailwind CSS theme customization