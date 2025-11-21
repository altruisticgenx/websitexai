import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./utils/preloadCriticalAssets";
import { registerServiceWorker } from "./utils/serviceWorkerRegistration";

// Register service worker for offline support and caching
registerServiceWorker({
  onSuccess: () => {
    console.log('Content cached for offline use');
  },
  onUpdate: () => {
    console.log('New content available - consider showing update notification');
  },
});

createRoot(document.getElementById("root")!).render(<App />);
