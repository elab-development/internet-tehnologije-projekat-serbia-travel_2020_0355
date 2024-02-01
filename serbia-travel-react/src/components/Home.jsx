import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HeroImage from "../assets/hero.png";
import Button from "./Button";
import DatePicker from "react-datepicker";
import useFetch from "./useFetch";
import "react-datepicker/dist/react-datepicker.css";

export default function Home({ hotels }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [adjustedHotels, setAdjustedHotels] = useState(hotels);
  const { data: holidays, loading, error } = useFetch(
    "https://public-holiday.p.rapidapi.com/2024/RS",
    {
      headers: {
        "X-RapidAPI-Key":
          "8ce8b25bfcmsh8fc7f0c21fcfd4ep15bf78jsnaf35ab89190b",
        "X-RapidAPI-Host": "public-holiday.p.rapidapi.com",
      },
    }
  );

  useEffect(() => {
    if (!loading && !error && holidays) {
      adjustHotelPrices();
    }
  }, [loading, error, holidays, startDate, endDate]);

  const adjustHotelPrices = () => {
    const newHotels = hotels.map((hotel) => {
      let updatedPrice = hotel.price;
      for (let i = 0; i < holidays.length; i++) {
        const holidayDate = new Date(holidays[i].date);
        if (startDate <= holidayDate && endDate >= holidayDate) {
          updatedPrice *= 0.9;
          break;
        }
      }
      return { ...hotel, price: updatedPrice };
    });
    setAdjustedHotels(newHotels);
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
              <select>
                <option>Belgrade, Serbia</option>
                <option>Tokyo, Japan</option>
                <option>Paris, France</option>
                <option>London, UK</option>
                <option>Sydney, Australia</option>
                <option>Rome, Italy</option>
                <option>Cairo, Egypt</option>
                <option>Moscow, Russia</option>
                <option>Beijing, China</option>
                <option>Berlin, Germany</option>
                <option>Rio de Janeiro, Brazil</option>
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
              <Button to="/hotels" text="Search Hotels" data={adjustedHotels} />
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
