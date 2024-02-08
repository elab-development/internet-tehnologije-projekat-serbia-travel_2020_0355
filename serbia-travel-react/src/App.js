import React from "react";
import Destinations from "./components/Destinations";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Offer from "./components/Offer";
import ScrollToTop from "./components/ScrollToTop";
import Services from "./components/Services";
import Testimonial from "./components/Testimonial";
import Tours from "./components/Tours";
import tour1 from "./assets/tour1.png";
import tour2 from "./assets/tour2.png";
import tour3 from "./assets/tour3.png";
import "./App.css";

export default function App() {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Home />
      <Services />
      <Destinations />
      <Offer />
      <Tours />
      <Testimonial />
      <Footer />
    </div>
  );
}
