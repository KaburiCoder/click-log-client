import { createRoot } from "react-dom/client";
import { App } from "../routes/App";
import "./reset.css";
import "./index.css";
import "./globals.css";
import "./fonts.css";

createRoot(document.getElementById("root")!).render(<App />);
