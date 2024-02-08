import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hotels from "./components/Hotels";
import App from "./App";
import LoginSignup from "./components/LoginSignup";
import FindUs from "./components/FindUs";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/find-us" element={<FindUs />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Router />);
