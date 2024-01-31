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
  const hotels = [
    { image: tour1, title: "Hotel 1", price: 200, reviews: "5k Reviews" },
    { image: tour3, title: "Hotel 2", price: 300, reviews: "7k Reviews" },
    { image: tour1, title: "Hotel 3", price: 400, reviews: "5k Reviews" },
    { image: tour2, title: "Hotel 4", price: 250, reviews: "7k Reviews" },
    { image: tour1, title: "Hotel 5", price: 200, reviews: "5k Reviews" },
    { image: tour2, title: "Hotel 6", price: 300, reviews: "7k Reviews" },
    { image: tour1, title: "Hotel 7", price: 200, reviews: "5k Reviews" },
    { image: tour2, title: "Hotel 8", price: 300, reviews: "7k Reviews" },
    { image: tour1, title: "Hotel 9", price: 200, reviews: "5k Reviews" },
    { image: tour2, title: "Hotel 10", price: 350, reviews: "7k Reviews" },
    { image: tour1, title: "Hotel 11", price: 200, reviews: "5k Reviews" },
    { image: tour2, title: "Hotel 12", price: 300, reviews: "7k Reviews" },
    { image: tour2, title: "Hotel 13", price: 300, reviews: "7k Reviews" },
  ];

  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Home hotels={hotels} />
      <Services />
      <Destinations />
      <Offer />
      <Tours />
      <Testimonial />
      <Footer />
    </div>
  );
}
