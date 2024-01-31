import React, { useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const HotelCards = ({ hotels }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 6;
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <HotelCardsContainer>
      <CardContainer>
        {currentHotels.map((hotel, index) => (
          <Card key={index} {...hotel} index={index} />
        ))}
      </CardContainer>
      <Pagination>
        {Array.from({ length: Math.ceil(hotels.length / hotelsPerPage) }).map(
          (_, index) => (
            <PageNumber key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </PageNumber>
          )
        )}
      </Pagination>
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
