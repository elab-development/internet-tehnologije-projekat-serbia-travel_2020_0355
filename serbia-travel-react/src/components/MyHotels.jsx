import React from 'react';
import styled from "styled-components";
import Navbar from './Navbar';
import Footer from './Footer';
import MyHotelsCards from './MyHotelsCards';


function MyHotels() {
    return (
        <PageContainer>
          <HotelNavBar>
            <Navbar />
          </HotelNavBar>
          <MainContent>
            <MyHotelsCards />
          </MainContent>
          <Footer />
        </PageContainer>
      );
}

export default MyHotels

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