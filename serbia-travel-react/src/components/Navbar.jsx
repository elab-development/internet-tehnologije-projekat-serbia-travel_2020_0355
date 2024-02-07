import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import Logo from "../assets/logo.png";
export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const html = document.querySelector("html");
  html.addEventListener("click", (e) => setIsNavOpen(false));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container state={isNavOpen ? 1 : 0}>
      <div className="brand">
        <img onClick={() => navigate("/")} src={Logo} alt="logo" />
      </div>
      <div className="toggle">
        {isNavOpen ? (
          <MdClose onClick={() => setIsNavOpen(false)} />
        ) : (
          <GiHamburgerMenu
            onClick={(e) => {
              e.stopPropagation();
              setIsNavOpen(true);
            }}
          />
        )}
      </div>
      <div className={`links ${isNavOpen ? "show" : ""}`}>
        <ul>
          <li>
            <a onClick={() => navigate("/")} href="#services">
              Services
            </a>
          </li>
          <li>
            <a onClick={() => navigate("/")} href="#destination">
              {" "}
              Destination
            </a>
          </li>
          <li>
            <a onClick={() => navigate("/")} href="#offer">
              Offer
            </a>
          </li>
          <li>
            <a onClick={() => navigate("/")} href="#tour">
              Tour
            </a>
          </li>
          <li>
            <a onClick={() => navigate("/")} href="#blog">
              Customers
            </a>
          </li>
          <li className="download">
            <a onClick={() => navigate("/download")}>Download App</a>
          </li>
          <li>
            {token ? (
              <a onClick={handleLogout}>Logout</a>
            ) : (
              <a onClick={() => navigate("/login")}>Login</a>
            )}
          </li>
        </ul>
      </div>
    </Container>
  );
}

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .brand {
    img {
      cursor: pointer;
    }
  }
  .toggle {
    display: none;
  }
  .links {
    ul {
      display: flex;
      gap: 3rem;
      list-style-type: none;
      li {
        a {
          text-decoration: none;
          color: black;
          cursor: pointer;
          transition: var(--default-transition);
          &:hover {
            color: var(--primary-color);
          }
        }
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    position: relative;
    padding: 1rem 0.5rem;
    z-index: 10;
    .account-info {
      display: none;
    }
    .brand {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .toggle {
      padding-right: 1rem;
      display: block;
      z-index: 1;
    }
    .show {
      opacity: 1 !important;
      visibility: visible !important;
    }

    .links {
      position: absolute;
      overflow-x: hidden;
      top: 0;
      right: 0;
      width: ${({ state }) => (state ? "60%" : "0%")};
      height: 100vh;
      background-color: var(--primary-color);
      opacity: 0;
      visibility: hidden;
      transition: 0.4s ease-in-out;
      ul {
        flex-direction: column;
        text-align: center;
        height: 100%;
        justify-content: center;
        li {
          a {
            color: white;
          }
        }
      }
    }
  }
`;
