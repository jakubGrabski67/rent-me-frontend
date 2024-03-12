import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #28a745; /* Zielone tło */

  h2 {
    font-size: 3em;
    margin-bottom: 10px;
    color: #ffffff; /* Biały tekst */
  }

  p {
    font-size: 1.5em;
    color: #ffffff;
  }

  .home-link {
    margin-top: 20px;
    font-size: 1.2em;
    color: #ffffff;
    text-decoration: none;
    border: 2px solid #ffffff;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: #ffffff;
      color: #28a745;
    }
  }
`;

const CheckoutSuccess = () => {
  return (
    <SuccessContainer>
      <h2>Potwierdzenie</h2>
      <p>Rezerwacja została pozytywnie zatwierdzona!</p>
      <Link to="/" className="home-link">
        Wróć na stronę główną
      </Link>
    </SuccessContainer>
  );
};

export default CheckoutSuccess;
