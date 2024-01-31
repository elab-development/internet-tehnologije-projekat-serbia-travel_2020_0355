import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Button({ text, to, onClick, data }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to, { state: { data: data } });
    } else if (onClick) {
      onClick();
    }
  };

  return <Btn onClick={handleClick}>{text}</Btn>;
}

const Btn = styled.button`
  padding: 1rem 2rem;
  background-color: var(--primary-color);
  border: none;
  font-size: 1.1rem;
  color: white;
  cursor: pointer;
`;
