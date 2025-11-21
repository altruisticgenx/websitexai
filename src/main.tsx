import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./utils/preloadCriticalAssets";
import { initImageFormats } from "./utils/initImageFormats";

// Initialize image format detection
initImageFormats();

createRoot(document.getElementById("root")!).render(<App />);
