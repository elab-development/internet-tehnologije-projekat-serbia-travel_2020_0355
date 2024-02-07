import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "./Card";
import axios from "axios";
import tour1 from "../assets/tour1.png";

const HotelCards = ({ formParams }) => {
  const hotelsPerPage = 6;
  const destination = formParams.destination;
  const numberOfBeds = formParams.numberOfBeds;
  const [hotels, setHotels] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [filter, setFilter] = useState("all");

  const changePageNumber = (page) => {
    setPageNumber(page);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    if (!destination) return;
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/hotels`, {
          params: {
            destination_name: destination,
            start_date: formParams.startDate,
            end_date: formParams.endDate,
            number_of_beds: numberOfBeds,
            number_of_stars: filter !== "all" ? filter : undefined,
            page: pageNumber,
            per_page: hotelsPerPage,
          },
        });
        setHotels(response.data.data);
      } catch (error) {
        console.log("Error fetching hotels", error);
      }
    };
    fetchHotels();
  }, [destination, filter, pageNumber]);

  return (
    <HotelCardsContainer>
      <FilterContainer>
        <label>
          Filter by Stars:
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Stars</option>
          </select>
        </label>
      </FilterContainer>
      <CardContainer>
        {hotels &&
          hotels.map((hotel) => (
            <Card
              key={hotel.id}
              image={tour1}
              title={hotel.name}
              price={200}
              reviews={"7k"}
              index={hotel.id}
            />
          ))}
      </CardContainer>
      <Pagination>
        <PaginationButton
          onClick={() => changePageNumber(pageNumber - 1)}
          disabled={pageNumber === 1}
        >
          Prev
        </PaginationButton>
        <PageNumber>{pageNumber}</PageNumber>
        <PaginationButton
          onClick={() => changePageNumber(pageNumber + 1)}
          disabled={!hotels || hotels.length < hotelsPerPage}
        >
          Next
        </PaginationButton>
      </Pagination>
    </HotelCardsContainer>
  );
};


const HotelCardsContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 60px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  justify-items: center;
  margin-bottom: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FilterContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
  margin-top: 20px;

  label {
    position: absolute;
    top: -60px;
    right: 0;
    z-index: 100;
    margin-right: 10px;
    margin-bottom: 20px;
  }

  select {
    margin-left: 10px;
    padding: 5px;
    font-size: 16px;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  padding: 8px 16px;
  margin: 0 5px;
  cursor: pointer;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 5px;
  outline: none;

  &:hover {
    background-color: #ff610c;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PageNumber = styled.span`
  padding: 8px 12px;
  margin: 0 5px;
  background-color: #f0f0f0;
  border-radius: 5px;
`;

export default HotelCards;
