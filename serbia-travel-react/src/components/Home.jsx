import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HeroImage from "../assets/hero.png";
import Button from "./Button";
import DatePicker from "react-datepicker";
import useFetch from "./useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [destination, setDestination] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [numberOfBeds, setNumberOfBeds] = useState("");
  const {
    data: holidays,
    loading,
    error,
  } = useFetch("https://public-holiday.p.rapidapi.com/2024/RS", {
    headers: {
      "X-RapidAPI-Key": "8ce8b25bfcmsh8fc7f0c21fcfd4ep15bf78jsnaf35ab89190b",
      "X-RapidAPI-Host": "public-holiday.p.rapidapi.com",
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/destinations"
        );
        setDestinations(response.data.data);
      } catch (error) {
        console.log("Error fetching destinations", error);
      }
    };
    fetchDestinations();
  }, []);

  const handleSearchHotels = () => {
    navigate("/hotels", {
      state: { data: { startDate, endDate, destination, numberOfBeds } },
    });
  };

  return (
    <Section>
      <div className="background">
        <img src={HeroImage} alt="Hero" />
      </div>
      <div className="content">
        <div className="info">
          <h1>Where Every</h1>
          <h1>Journey Begins</h1>
          <Button text="Plan Your Trip" />
        </div>
        <div className="planner">
          <form>
            <div className="row">
              <label>Destinations</label>
              <select onChange={(e) => setDestination(e.target.value)}>
                <option value="">Select Destination</option>
                {destinations &&
                  Array.isArray(destinations) &&
                  destinations.map((destination) => {
                    return (
                      <option key={destination.id} value={destination.name}>
                        {destination.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="row">
              <label>Check In</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="row">
              <label>Check Out</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
            <div className="row">
              <label>Number of Beds</label>
              <select
                value={numberOfBeds}
                onChange={(e) => setNumberOfBeds(e.target.value)}
              >
                <option value="">Select Number of Beds</option>
                <option value="1">1 Bed</option>
                <option value="2">2 Beds</option>
                <option value="3">3 Beds</option>
                <option value="4">4 Beds</option>
                <option value="5">5 Beds</option>
              </select>
            </div>
            <div className="row">
              <Button onClick={handleSearchHotels} text="Search Hotels" />
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin-top: 2rem;
  position: relative;
  .background {
    img {
      height: 90vh;
      width: 100%;
    }
  }
  .content {
    .info {
      position: absolute;
      top: 5rem;
      margin-left: 8rem;
      h1 {
        font-size: 5rem;
        margin-bottom: 2rem;
      }
    }
    .planner {
      position: absolute;
      bottom: -2rem;
      right: 0;
      background-color: white;
      padding: 2rem;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      form {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 3rem;
        .row {
          display: flex;
          flex-direction: column;
          text-align: start;
          label {
            font-size: 0.7rem;
            color: var(--secondary-text);
          }
          input[type="date"]::-webkit-calendar-picker-indicator {
            cursor: pointer;
            filter: invert(58%) sepia(69%) saturate(2588%) hue-rotate(325deg)
              brightness(105%) contrast(101%);
          }
          input:focus {
            outline: none;
          }
          input,
          select {
            border: none;
            width: 100%;
            color: var(--primary-color);
            margin-top: 0.5rem;
            background-color: white;
            font-size: 1.1rem;
            border-bottom: 1px solid #f5ebe9;
            padding-bottom: 0.3rem;
          }
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .background {
      img {
        height: 50vh;
      }
    }
    .content {
      .info {
        margin-left: 2rem;
        h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
      }
      .planner {
        position: initial;
        margin: 2rem;
        form {
          align-items: flex-start;
          flex-direction: column;
        }
      }
    }
  }
`;
