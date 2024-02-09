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

  const handleExportToPDF = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/bookings/export-pdf/${hotel.id}`,
        { responseType: 'blob' }
      );
  
      const url = window.URL.createObjectURL(response.data);
  
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'bookings.pdf');
  
      document.body.appendChild(link);
      link.click();
  
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting to PDF:", error);
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
          <div className="edit-buttons">
            <Button text="Cancel" onClick={handleCancel} />
            <Button text="Update" onClick={handleUpdateHotel} />
          </div>
        </ButtonContainer>
        <ExportButtonContainer>
          <Button className="export-button" text="Export to PDF" onClick={handleExportToPDF}/>
        </ExportButtonContainer>
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
  width: 400px;
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 400px;

  h2 {
    margin-bottom: 20px;
    text-align: center;
  }

  label {
    display: block;
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 16px;
    font-size: 16px;
  }

  .input-group {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  .input-group label {
    flex: 1;
    margin-right: 16px;
  }

  .input-group input {
    flex: 2;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
  }
`;

const ButtonContainer = styled.div`

  .edit-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;

    button {
      margin-top: 10px;
    }
  }
`;

const ExportButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export default HotelEditModal;
