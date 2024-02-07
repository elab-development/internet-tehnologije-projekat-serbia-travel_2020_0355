import React, { useState } from "react";
import styled from "styled-components";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import Button from "./Button";

export default function LoginSignup() {
  const [action, setAction] = useState("Login");

  function login() {}
  function signUp() {}

  return (
    <Container>
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
              <input type="text" placeholder="Name" />
            </div>
          )}
          <div className="input">
            <img src={email_icon} alt="" />
            <input type="email" placeholder="Email" />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Password" />
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
