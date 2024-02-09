import React from "react";
import styled from "styled-components";
import { BsFillStarFill } from "react-icons/bs";

const Card = ({ image, title, stars, reviews, index, onClick }) => {
  const starArray = Array.from({ length: stars }, (_, index) => index + 1);

  return (
    <StyledCard key={title} index={index}>
      <div className="image">
        <img src={image} alt="tour" />
      </div>
      <div className="info">
        <div className="details">
          <h4>{title}</h4>
          <div className="price-details">
            <div className="reviews">
              <div className="stars">
                {starArray.map((_, index) => (
                  <BsFillStarFill key={index} />
                ))}
              </div>
              <span className="review">{reviews}</span>
            </div>
          </div>
        </div>
        <button onClick={onClick}>+</button>
      </div>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  position: relative;
  .image {
    img {
      height: 25rem;
    }
  }
  .info {
    position: absolute;
    bottom: -30px;
    right: 0;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    width: 100%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transform: translateY(-40%);
    button {
      margin-left: auto;
      padding: 0.5rem 0.7rem;
      background-color: var(--primary-color);
      border: none;
      font-size: 1.1rem;
      color: white;
      cursor: pointer;
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      .price-details {
        display: flex;
        gap: 1rem;
        .price {
          color: var(--primary-color);
          font-weight: bolder;
        }
        .reviews {
          display: flex;
          gap: 0.5rem;
          .stars {
            svg {
              color: #ffc01e;
            }
          }
          .review {
            color: var(--secondary-text);
          }
        }
      }
    }
  }
`;

export default Card;
