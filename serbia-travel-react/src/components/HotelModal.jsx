import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";

const HotelModal = ({ hotelName, rooms, onClose, startDate, endDate }) => {
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [status, setStatus] = useState(undefined);

    const handleBookRoom = async () => {
        if (!selectedRoomId) {
          setStatus({ type: 'error', message: "Please choose a room"});
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
            setStatus({ type: 'error', message: "Room booked successfully!"});
            setTimeout(() => onClose(), 2500);
          } catch (error) {
            console.error('Error booking room:', error);
            setStatus({ type: 'error', message: "Could not book this room!"});
          }
        };

    const handleRoomSelection = (roomId) => {
        setSelectedRoomId(roomId);
    };

    const handleClearStatus = () => {
      setStatus(undefined);
  };

  useEffect(() => {
    let timeout;
    if (status) {
        timeout = setTimeout(() => {
            setStatus(undefined);
        }, 1500);
    }

    return () => clearTimeout(timeout);
}, [status]);

  return (
    <ModalContainer>
      <h2>{hotelName}</h2>
      <ul className="rooms">
        {rooms.map((room) => (
          <li key={room.id}>
            <input type="radio" id={room.id} name="room" onChange={() => handleRoomSelection(room.id)} />
            <label htmlFor={room.id}>{room.room_number} {room.price}$</label>
        </li>
        ))}
      </ul>
      <p>Check In Date: {startDate.toISOString().split('T')[0]}</p>
      <p>Check Out Date: {endDate.toISOString().split('T')[0]}</p>
      <div className="button-holder">
      <Button text={"Close"} onClick={onClose}/>
      <Button text={"Book Room"} onClick={handleBookRoom}/>
      </div>
      {status && (
        <StatusPopup type={status.type} onClick={handleClearStatus}>
          {status.message}
        </StatusPopup>
      )}
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--card-grey);
  padding: 60px 60px 100px 60px;
  border: 1px solid #ccc;
  min-width: 420px;
  min-height: 380px;

  h2 {
   margin-bottom: 20px;
  }

  .rooms {
    list-style: none;
    li {
      margin-bottom: 5px;
    }
  }

  .button-holder {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
`;

const StatusPopup = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${({ type }) => (type === 'success' ? 'lightgreen' : 'lightcoral')};
    padding: 10px 20px;
    border-radius: 5px;
    color: ${({ type }) => (type === 'success' ? 'green' : 'red')};
    z-index: 999;
    cursor: pointer;
`;

export default HotelModal;
