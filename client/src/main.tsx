/**
 * APPLICATION ENTRY POINT
 * 
 * This file initializes the React application using React 18's createRoot API.
 * It mounts the App component into the #root div from index.html.
 */

import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
