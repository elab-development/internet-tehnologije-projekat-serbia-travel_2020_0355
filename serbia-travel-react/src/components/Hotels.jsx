import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import Footer from "./Footer";
import HotelCards from "./HotelCards";
import { useLocation } from "react-router-dom";
import "../App.css";

export default function Hotels() {
  const location = useLocation();
  const hotels = location.state.data;
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
