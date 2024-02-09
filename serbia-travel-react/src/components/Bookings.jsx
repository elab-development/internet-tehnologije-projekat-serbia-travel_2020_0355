import React from 'react'
import BookingModal from './Booking';
import Footer from "./Footer";
import Navbar from "./Navbar";
import styled from "styled-components";

function Bookings() {
    return (
        <PageContainer>
        <Navbar />
        <BookingModal />
        <Footer />
        </PageContainer>
      );
}

const PageContainer = styled.nav``;

export default Bookings