import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Logo from '../assets/logo.png';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

export default function NewDestination() {
  
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [destinationName, setDestinationName] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/countries');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleDestinationNameChange = (event) => {
    setDestinationName(event.target.value);
  };

  const handleAddDestination = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:8000/api/destinations',
        {
          name: destinationName,
          country_id: selectedCountry,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowPopup(true);
      setDestinationName('');
    } catch (error) {
      console.error('Error adding destination:', error);
    }
  };

  return (
    <Container>
      <div className="brand">
        <img onClick={() => navigate('/')} src={Logo} alt="logo" />
      </div>
      <div className="container">
        <h2>Add a New Destination</h2>
        <div className="inputs">
          <div className="input">
            <label htmlFor="country">Select Country:</label>
            <select id="country" onChange={handleCountryChange}>
              <option value="">Select a Country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input">
            <label htmlFor="destinationName">Destination Name:</label>
            <input
              type="text"
              id="destinationName"
              value={destinationName}
              onChange={handleDestinationNameChange}
            />
          </div>
        </div>
        <div className="button">
          <Button onClick={handleAddDestination} text="Add Destination" />
        </div>
      </div>
      {showPopup && (
        <Popup type="success">
            <p>Destination added successfully!</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
        </Popup>
)}
    </Container>
  );
}

const Container = styled.div`
  padding-top: 150px;
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    h2 {
      text-align: center;
    }
  }

  .brand {
    text-align: center;
    margin-bottom: 20px;
  }

  .brand img {
    cursor: pointer;
    height: 50px;
    width: 175px;
  }

  .inputs {
    margin-bottom: 20px;
  }

  .input {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  select,
  input[type='text'] {
    padding: 10px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
  }

  .button {
    display: flex;
    justify-content: center;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ type }) => (type === 'success' ? 'lightgreen' : 'lightcoral')};
  color: ${({ type }) => (type === 'success' ? 'green' : 'red')};  
  padding: 20px;
  border-radius: 5px;
  z-index: 999;
  text-align: center;

  button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: ${({ type }) => (type === 'success' ? 'green' : 'red')};  
    border: none;
    color: white;
    cursor: pointer;
  }
`;
