import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const HotelModal = ({ hotelName, rooms, onClose, startDate, endDate }) => {
    const [selectedRoomId, setSelectedRoomId] = useState(null);

    const handleBookRoom = async () => {
        if (!selectedRoomId) {
          console.error("No room selected.");
          return;
        }
    
        const formattedStartDate = startDate.toISOString().split('T')[0] + ' 00:00:00';
        const formattedEndDate = endDate.toISOString().split('T')[0] + ' 00:00:00';
    
        const bookingData = {
          start_date: formattedStartDate,
          end_date: formattedEndDate,
          room_id: selectedRoomId.toString()
        };

        const token = localStorage.getItem("token");
    
        try {
            const response = await axios.post('http://localhost:8000/api/bookings', bookingData, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            console.log('Booking successful:', response.data);
          } catch (error) {
            console.error('Error booking room:', error);
          }
        };

    const handleRoomSelection = (roomId) => {
        setSelectedRoomId(roomId);
    };

  return (
    <ModalContainer>
      <h2>{hotelName}</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <input type="checkbox" id={room.id} onChange={() => handleRoomSelection(room.id)} />
            <label htmlFor={room.id}>{room.room_number} {room.price}$</label>
        </li>
        ))}
      </ul>
      {/* <p>Check In Date: {startDate}</p>
      <p>Check Out Date: {endDate}</p> */}
      <button onClick={onClose}>Close</button>
      <button onClick={handleBookRoom}>Book</button>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
`;

export default HotelModal;
