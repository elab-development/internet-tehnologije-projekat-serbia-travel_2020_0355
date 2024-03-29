import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import Logo from "../assets/logo.png";
import axios from 'axios';

export default function Navbar() {
  
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const html = document.querySelector("html");
  html.addEventListener("click", (e) => setIsNavOpen(false));

  const handleLogout = () => {  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  
    axios.post('http://localhost:8000/api/logout', null, config)
      .then(response => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
  
        navigate('/login');
      })
      .catch(error => {
        console.error('Logout failed:', error);
      });
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
          <li className="find-us">
            <a onClick={() => navigate("/find-us")}>Find Us</a>
          </li>
          <li className="user">
            {user ? (
              <>
                <span>{user}</span>
                <ul className="dropdown">
                  {role === 'user' && (
                  <li>
                    <a onClick={() => navigate("/bookings")}>
                      Bookings
                    </a>
                  </li>
                  )}
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </ul>
              </>
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

  .user {
    position: relative;
    cursor: pointer;
    span {
      margin-right: 10px;
    }
    .dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      background-color: #fff;
      border: 1px solid #ccc;
      padding: 5px 0;
      z-index: 10;
      display: none;
      li {
        a {
          display: block;
          padding: 10px 20px;
          color: black;
          text-decoration: none;
          &:hover {
            background-color: #f0f0f0;
          }
        }
      }
    }
    &:hover .dropdown {
      display: block;
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
