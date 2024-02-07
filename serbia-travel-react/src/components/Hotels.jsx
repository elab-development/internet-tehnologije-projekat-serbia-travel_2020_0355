import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import styled from "styled-components";
import Footer from "./Footer";
import HotelCards from "./HotelCards";
import "../App.css";

export default function Hotels() {
  const location = useLocation();
  const formParams = location.state.data;

  return (
    <PageContainer>
      <HotelNavBar>
        <Navbar />
      </HotelNavBar>
      <MainContent>
        <HotelCards formParams={formParams}/>
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

const HotelNavBar = styled.div`
  margin-bottom: 70px;
`

const MainContent = styled.div`
  flex: 1;
`;
