import React, { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";
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
      <Navbar />
      <MainContent>
        {/* <FilterContainer>
          <label>Filter by Reviews:</label>
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="5k Reviews">5k Reviews</option>
            <option value="7k Reviews">7k Reviews</option>
          </select>
        </FilterContainer> */}
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

const MainContent = styled.div`
  flex: 1;
`;

const FilterContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
  margin-top: 20px;
  label {
    position: absolute;
    top: 0px;
    right: 120px;
    left: auto;
    z-index: 100;
    margin-right: 10px;
    margin-bottom: 20px;
  }
  select {
    position: absolute;
    top: 0px;
    right: 0px;
    left: auto;
    z-index: 100;
    padding: 5px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;
