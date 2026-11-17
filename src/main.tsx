import React from "react";
import ReactDOM from "react-dom/client";
import { LazyMotion } from "motion/react";
import App from "./App";
import "./index.css";
import "./mobile.css";
import "./theme.css";

const loadMotionFeatures = () => import('./motionFeatures').then(module => module.default);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LazyMotion features={loadMotionFeatures} strict>
      <App />
    </LazyMotion>
  </React.StrictMode>,
);
