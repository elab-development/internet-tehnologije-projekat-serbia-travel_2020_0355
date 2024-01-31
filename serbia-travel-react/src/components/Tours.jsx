import React from "react";
import styled from "styled-components";
import Card from "./Card";
import ellipse from "../assets/ellipse.png";
import tour1 from "../assets/tour1.png";
import tour2 from "../assets/tour2.png";
import tour3 from "../assets/tour3.png";

export default function Tours() {
  const data = [
    {
      image: tour1,
      title: "Santorini, Oia Greece",
      price: 2000,
      reviews: "5k Reviews",
    },
    {
      image: tour2,
      title: "Lighthouse, Bellwood",
      price: 4000,
      reviews: "5k Reviews",
    },
    {
      image: tour3,
      title: "Riverfront, Japan",
      price: 3000,
      reviews: "5k Reviews",
    },
  ];

  return (
    <Section id="tour">
      <h2>Choose Your Destination</h2>
      <img src={ellipse} alt="ellipse" className="ellipse" />
      <div className="tours">
        {data.map(({ image, title, price, reviews }, index) => (
          <Card
            key={title}
            index={index}
            image={image}
            title={title}
            price={price}
            reviews={reviews}
          />
        ))}
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin-bottom: 5rem;
  position: relative;
  .ellipse {
    position: absolute;
    right: -5rem;
    top: -20rem;
    height: 30rem;
  }
  h2 {
    text-align: center;
    transform: translateY(-75px);
    font-size: 3rem;
  }
  .tours {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin: 0 2rem;
    .ellipse {
      display: none;
    }
    h2 {
      transform: translateY(0px);
      font-size: 2rem;
    }
    .tours {
      flex-direction: column;
      gap: 5rem;
    }
  }
`;
