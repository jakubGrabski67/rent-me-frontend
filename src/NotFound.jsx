import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  h2 {
    font-size: 4em;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    font-size: 1.5em;
    color: #555;
  }

  .home-link {
    margin-top: 20px;
    font-size: 1.2em;
    color: #007bff;
    text-decoration: none;
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <h2>404</h2>
      <p>Nie znaleziono takiej strony</p>
      <Link to="/" className="home-link">
        Wróc na stronę główną
      </Link>
    </NotFoundContainer>
  );
};

export default NotFound;
