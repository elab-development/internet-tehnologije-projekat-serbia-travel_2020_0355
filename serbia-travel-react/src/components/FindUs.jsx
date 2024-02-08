import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import DownloadApp from "./DownloadApp";
import GoogleMap from "./GoogleMap";
import styled from "styled-components";
const apiKey = process.env.REACT_APP_API_KEY;

export default function FindUs() {
  return (
    <div>
      <Navbar />
      <Container>
        <GoogleMap apiKey={apiKey}/>
      </Container>
      <DownloadApp />
      <Footer />
    </div>
  );
}

const Container = styled.div`
    margin-top: 30px;
`;