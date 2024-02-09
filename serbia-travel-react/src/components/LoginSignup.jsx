import React, { useState } from "react";
import styled from "styled-components";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import Logo from "../assets/logo.png";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginSignup() {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function login() {
    const userLogin = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/login",
          { email, password }
        );
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', response.data.name);
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('role', response.data.role);
        navigate("/");
      } catch (error) {
        console.error("An error occurred during login:", error);
      }
    };
    userLogin();
  }

  function signUp() {
    const userSignUp = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/register",
          { name, email, password }
        );
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', response.data.data.name);
        localStorage.setItem('userId', response.data.data.id);
        localStorage.setItem('role', response.data.data.role);
        navigate("/");
      } catch (error) {
        console.error("An error occurred during login:", error);
      }
    };
    userSignUp();
  }

  return (
    <Container>
      <div className="brand">
        <img onClick={() => navigate("/")} src={Logo} alt="logo" />
      </div>
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Login" ? (
            <div></div>
          ) : (
            <div className="input">
              <img src={user_icon} alt="" />
              <input type="text"
               placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)} />
            </div>
          )}
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {action === "Sign Up" ? (
          <div></div>
        ) : (
          <div className="forgot-password">
            Don't have an account?{" "}
            <span onClick={() => setAction("Sign Up")}>Sign Up!</span>
          </div>
        )}
        {action === "Login" ? (
          <div className="button">
            <Button onClick={() => login()} text="Login" />
          </div>
        ) : (
          <div className="button">
            <Button onClick={() => signUp()} text="Sign Up" />
          </div>
        )}
      </div>
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

  .header {
    text-align: center;
    margin-bottom: 20px;
  }

  .text {
    font-size: 24px;
    font-weight: bold;
  }

  .underline {
    width: 50px;
    height: 2px;
    background-color: #333;
    margin: 10px auto;
  }

  .inputs {
    margin-bottom: 20px;
  }

  .input {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  input {
    padding: 10px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
  }

  .forgot-password {
    text-align: center;
    margin-bottom: 20px;
  }

  .forgot-password span {
    color: blue;
    cursor: pointer;
  }

  .button {
    display: flex;
    justify-content: center;
  }

  .submit {
    width: 48%;
    padding: 10px;
    text-align: center;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #333;
    color: #fff;
  }
`;
