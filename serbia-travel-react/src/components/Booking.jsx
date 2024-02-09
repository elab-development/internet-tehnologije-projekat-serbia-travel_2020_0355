import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import Button from './Button';

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/bookings/user/${userId}`);
      setBookings(response.data.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/bookings/${id}`);
      setBookings(bookings.filter(booking => booking.id !== id));
      setSelectedBooking(null);
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <Container>
      <h1>Bookings</h1>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Room Number</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id} onClick={() => setSelectedBooking(booking)}>
                <td>{booking.start_date}</td>
                <td>{booking.end_date}</td>
                <td>{booking.room.room_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
      {selectedBooking && (
        <BookingDetails>
          <h2>Selected Booking</h2>
          <p>Check In: {selectedBooking.start_date}</p>
          <p>Check Out: {selectedBooking.end_date}</p>
          <p>Room Number: {selectedBooking.room.room_number}</p>
          <DeleteButtonContainer>
            <Button text="Delete" onClick={() => handleDeleteBooking(selectedBooking.id)} />
          </DeleteButtonContainer>
        </BookingDetails>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const TableContainer = styled.div`
  margin-top: 20px;
  table {
    width: 100%;
    border-collapse: collapse;
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    tr:hover {
      background-color: #ddd;
    }
  }
`;

const BookingDetails = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  h2 {
    margin-top: 0;
  }
  p {
    margin-bottom: 5px;
  }
`;

const DeleteButtonContainer = styled.div`
  margin-top: 20px;
`;

export default Booking;
