import React, { useState } from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import Footer from "./Footer";
import HotelCards from "./HotelCards";
import { useLocation } from "react-router-dom";
import "../App.css";

export default function Hotels() {
  const location = useLocation();
  const allHotels = location.state.data;
  const [filter, setFilter] = useState("all");
  const [filteredHotels, setFilteredHotels] = useState(allHotels);

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);

    if (selectedFilter === "all") {
      setFilteredHotels(allHotels);
    } else {
      const filtered = allHotels.filter(
        (hotel) => hotel.reviews === selectedFilter
      );
      setFilteredHotels(filtered);
    }
  };

  return (
    <PageContainer>
      <Navbar />
      <MainContent>
        <FilterContainer>
          <label>Filter by Reviews:</label>
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="5k Reviews">5k Reviews</option>
            <option value="7k Reviews">7k Reviews</option>
          </select>
        </FilterContainer>
        <HotelCards hotels={filteredHotels} />
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
