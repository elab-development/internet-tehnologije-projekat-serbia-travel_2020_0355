import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Button from "./Button";

const HotelEditModal = ({ hotel, onClose }) => {
  const [editedHotelName, setEditedHotelName] = useState(hotel.name);
  const [editedHotelStars, setEditedHotelStars] = useState(hotel.stars);
  const destinationId = hotel.destination.id;

  const handleUpdateHotel = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `http://localhost:8000/api/hotels/${hotel.id}`,
        {
          name: editedHotelName,
          stars: editedHotelStars,
          destination_id: destinationId
        }, 
        {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
      );
      console.log("Hotel updated successfully:", response.data);
      onClose();
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <ModalBackground>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>Edit Hotel</h2>
        <label>Hotel Name:</label>
        <input
          type="text"
          value={editedHotelName}
          onChange={(e) => setEditedHotelName(e.target.value)}
        />
        <label>Stars:</label>
        <input
          type="number"
          value={editedHotelStars}
          onChange={(e) => setEditedHotelStars(e.target.value)}
        />
        <ButtonContainer>
          <Button text="Cancel" onClick={handleCancel} />
          <Button text="Update" onClick={handleUpdateHotel} />
        </ButtonContainer>
      </ModalContent>
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export default HotelEditModal;
