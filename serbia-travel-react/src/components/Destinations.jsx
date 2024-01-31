import React, { useState, useEffect } from "react";
import styled from "styled-components";
import paris from "../assets/paris.png";
import japan from "../assets/japan.png";
import Button from "./Button";
import Destination from "./Destination";

export default function Destinations() {

  const europeDestinations = [
    {
      name: "Paris",
      image: paris,
    },
    {
      name: "London",
      image: paris,
    },
    {
      name: "Amsterdam",
      image: paris,
    },
  ];

  const asiaDestinations = [
    {
      name: "Japan",
      image: japan,
    },
    {
      name: "Bangkok",
      image: japan,
    },
    {
      name: "Singapore",
      image: japan,
    },
  ];

  const getDestinations = () => {
    return selectedRegion === "europe" ? europeDestinations : asiaDestinations;
  };

  const [selectedRegion, setSelectedRegion] = useState("europe");
  const [destinations, setDestinations] = useState(getDestinations());

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    setDestinations([]);
  };

  useEffect(() => {
    setDestinations(getDestinations());
  }, [selectedRegion]);

  return (
    <Section id="destination">
      <div className="info">
        <h2>
          Top <span>Destinations</span> In The World
        </h2>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout from it.
        </p>
        <div className="destination-buttons">
          <Button text="Europe" onClick={() => handleRegionChange("europe")} />
          <Button text="Asia" onClick={() => handleRegionChange("asia")} />
        </div>
      </div>

      <div className="destinations">
        {destinations.map(({ name, image }) => (
          <Destination key={name} name={name} image={image} />
        ))}
      </div>
    </Section>
  );
}
const Section = styled.section`
  display: flex;
  gap: 5rem;
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 3rem;
    h2 {
      font-size: 3rem;
      line-height: 3rem;
      span {
        color: var(--primary-color);
      }
    }
    p {
      color: var(--secondary-text);
    }
  }
  
  .destination-buttons {
    display: flex;
    gap: 2rem;
  }

  .destination-buttons button{
    width: 120px;
    height: 50px;
  }

  .destinations {
    flex: 2;
    display: flex;
    gap: 2rem;
    .destination {
      position: relative;
      img {
        height: 20rem;
      }
      .name {
        position: absolute;
        bottom: 0rem;
        height: 100%;
        width: 100%;
        background: linear-gradient(
          to bottom,
          #ffffff14,
          #000000ae
        );
        display: flex;
        flex-direction: column-reverse;
        h3 {
          margin-left: 1rem;
          font-size: 1.5rem;
          color: white;
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin: 0rem 2rem;
    flex-direction: column;
    gap: 3rem;
    .destinations {
      flex-direction: column;
      .destination {
        img {
          width: 100%;
        }
      }
    }
  }
`;