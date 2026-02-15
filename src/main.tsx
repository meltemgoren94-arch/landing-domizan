import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";
import App from "./app/App.tsx";
import DocsPage from "./app/DocsPage.tsx";
import BlogPage from "./app/BlogPage.tsx";
import BlogPost from "./app/BlogPost.tsx";
import AnalyticsTracker from "./components/AnalyticsTracker.tsx";
import "./styles/index.css";

// Initialize Google Analytics
// Initialize Google Analytics
const MEASUREMENT_ID = "G-BR04V8XFX5";
if (MEASUREMENT_ID) {
  ReactGA.initialize(MEASUREMENT_ID);
}

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <AnalyticsTracker />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/docs" element={<DocsPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  </HashRouter>
);