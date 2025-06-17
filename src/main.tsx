import { createRoot } from "react-dom/client";
import { initializeDependencies } from "./utils/dependencies";
import "./index.css";

// Dynamic app loading
const loadApp = async () => {
  try {
    // Initialize all dependencies first
    await initializeDependencies();

    // Dynamically import the main App component
    const { default: App } = await import("./App");

    // Create root and render app
    const root = createRoot(document.getElementById("root")!);
    root.render(<App />);

    console.log("✅ Application loaded successfully");
  } catch (error) {
    console.error("❌ Failed to load application:", error);

    // Fallback error UI
    const errorElement = document.createElement("div");
    errorElement.innerHTML = `
      <div style="
        min-height: 100vh;
        display: flex;
        items-center: center;
        justify-content: center;
        background: linear-gradient(135deg, #1e293b, #0f172a);
        color: white;
        font-family: system-ui, -apple-system, sans-serif;
        text-align: center;
        padding: 2rem;
      ">
        <div>
          <h1 style="font-size: 2rem; margin-bottom: 1rem;">🚨 Application Error</h1>
          <p style="margin-bottom: 1rem; opacity: 0.8;">
            Failed to load the application. Please refresh the page.
          </p>
          <button 
            onclick="window.location.reload()" 
            style="
              background: linear-gradient(135deg, #7c3aed, #3b82f6);
              color: white;
              border: none;
              padding: 0.75rem 1.5rem;
              border-radius: 0.5rem;
              font-weight: bold;
              cursor: pointer;
              font-size: 1rem;
            "
          >
            Reload Page
          </button>
        </div>
      </div>
    `;

    document.getElementById("root")?.appendChild(errorElement);
  }
};

// Load the application
loadApp();
