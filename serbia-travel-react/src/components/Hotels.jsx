import React from 'react';
import Navbar from './Navbar';
import styled from "styled-components";
import Footer from './Footer'
import HotelCards from "./HotelCards";
import tour1 from "../assets/tour1.png";
import tour2 from "../assets/tour2.png";
import tour3 from "../assets/tour3.png";
import "../App.css";

export default function Hotels() {
  const hotels = [
    { image: tour1, title: "Hotel 1", price: 200, reviews: "5k Reviews" },
    { image: tour3, title: "Hotel 2", price: 300, reviews: "7k Reviews" },
    { image: tour1, title: "Hotel 1", price: 200, reviews: "5k Reviews" },
    { image: tour2, title: "Hotel 2", price: 300, reviews: "7k Reviews" },
    { image: tour1, title: "Hotel 1", price: 200, reviews: "5k Reviews" },
    { image: tour2, title: "Hotel 2", price: 300, reviews: "7k Reviews" },
    { image: tour1, title: "Hotel 1", price: 200, reviews: "5k Reviews" },
    { image: tour2, title: "Hotel 2", price: 300, reviews: "7k Reviews" },
    { image: tour1, title: "Hotel 1", price: 200, reviews: "5k Reviews" },
    { image: tour2, title: "Hotel 2", price: 300, reviews: "7k Reviews" },
    { image: tour1, title: "Hotel 1", price: 200, reviews: "5k Reviews" },
    { image: tour2, title: "Hotel 2", price: 300, reviews: "7k Reviews" },
    { image: tour2, title: "Hotel 2", price: 300, reviews: "7k Reviews" },
  ];

  return (
    <PageContainer>
      <Navbar />
      <MainContent>
        <HotelCards hotels={hotels} />
      </MainContent>
      <Footer />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
`;