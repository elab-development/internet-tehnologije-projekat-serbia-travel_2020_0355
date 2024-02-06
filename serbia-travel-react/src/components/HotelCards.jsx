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

  const changePageNumber = (page) => {
    if(page+pageNumber==0) return;
    setPageNumber(page);
  }

  useEffect(() => {
    if(!destination) return;
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/hotels`, {
          params: {
            destination_name: destination,
            start_date: formParams.startDate,
            end_date: formParams.endDate,
            number_of_beds: numberOfBeds,
            page: pageNumber,
            per_page: hotelsPerPage
          }
        });
        setHotels(response.data.data);
      } catch (error) {
        console.log("Error fetching hotels", error);
      }
    }
    fetchHotels();
  }, [destination, pageNumber]);


  return (
    <HotelCardsContainer>
      <CardContainer>
        {hotels && hotels.map((hotel) => (
          <Card key={hotel.id} image={tour1} title={hotel.name} price={200} reviews={"7k"} index={hotel.id} />
        ))}
      </CardContainer>
      <button onClick={() => changePageNumber(pageNumber+1)}>+1</button>
      <button onClick={() => changePageNumber(pageNumber-1)}>-1</button>
    </HotelCardsContainer>
  );
};

const HotelCardsContainer = styled.div`
  margin-top: 80px;
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const PageNumber = styled.span`
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  background-color: #ddd;
  border-radius: 5px;

  &:hover {
    background-color: #aaa;
    color: white;
  }
`;

export default HotelCards;
