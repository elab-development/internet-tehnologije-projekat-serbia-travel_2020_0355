import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "./Card";
import axios from "axios";
import tour1 from "../assets/tour1.png";
import HotelEditModal from "./HotelEditModal";

const MyHotelsCards = () => {
  const hotelsPerPage = 6;
  const [hotels, setHotels] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const userId = localStorage.getItem('userId');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const changePageNumber = (page) => {
    setPageNumber(page);
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/hotels/owner/${userId}`, {
            params: {
                page: pageNumber,
                per_page: hotelsPerPage
            }
        });
        setHotels(response.data.data);
      } catch (error) {
        console.log("Error fetching hotels", error);
      }
    };
    fetchHotels();
  }, [pageNumber, refresh]);

  const handleCardClick = async (hotel) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/hotels/${hotel.id}`);
      setSelectedHotel(response.data.hotel);
    } catch (error) {
      console.error("Error fetching hotel details:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedHotel(null);
    setIsEditModalOpen(false);
    setRefresh(prevState => !prevState);
  };

  return (
    <div>
      <HotelCardsContainer>
        <CardContainer>
          {hotels &&
            hotels.map((hotel) => (
              <Card
                key={hotel.id}
                image={tour1}
                title={hotel.name}
                index={hotel.id}
                onClick={() => handleCardClick(hotel)}
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
            disabled={!hotels || hotels.length <= hotelsPerPage}
          >
            Next
          </PaginationButton>
        </Pagination>
      </HotelCardsContainer>
      {selectedHotel && (
        <HotelEditModal
          hotel={selectedHotel}
          onClose={handleCloseModal}
        />
      )}
    </div>
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

export default MyHotelsCards;
