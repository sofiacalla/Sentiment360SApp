// Import createRoot function from react-dom/client for creating React 18 root
// This is the modern way to initialize a React application (replaces ReactDOM.render)
import { createRoot } from "react-dom/client";
// Import the main App component which contains the entire application
import App from "./App";
// Import global CSS styles including Tailwind CSS and custom styles
import "./index.css";

// Create a React root and render the App component
// document.getElementById("root")! - gets the root div from index.html (! asserts it's not null)
// .render(<App />) - renders the App component into the root div
createRoot(document.getElementById("root")!).render(<App />);
