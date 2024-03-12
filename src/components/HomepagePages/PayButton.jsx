import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "../../app/api/apiStripe";
import React from 'react';

const PayButton = ({ reservedCar, onReserveClick, roundedTotalRentalPrice, startDate, endDate }) => {
  const customer = useSelector((state) => state.auth);

  const handleCheckoutAndReserve = () => {
    const priceAsFloat = parseFloat(roundedTotalRentalPrice);

    if (isNaN(priceAsFloat)) {
      console.error('Invalid roundedTotalRentalPrice: ', roundedTotalRentalPrice);
      return;
    }

    // Formatowanie daty rozpoczęcia i zakończenia do postaci "data + godzina"
    const formattedStartDate = startDate.toLocaleString("pl-PL", { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    const formattedEndDate = endDate.toLocaleString("pl-PL", { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });

    axios.post(`${url}/stripe/create-checkout-session`, {
      reservedCar,
      customerId: customer._id,
      roundedTotalRentalPrice: priceAsFloat,
      startDate: formattedStartDate, // Użyj sformatowanej daty rozpoczęcia
      endDate: formattedEndDate,     // Użyj sformatowanej daty zakończenia
    })
    .then((res) => {
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    })
    .catch((err) => {
      if (err.response) {
        console.error(err.response.data);
      } else {
        console.error(err.message);
      }
    });

    if (onReserveClick) {
      onReserveClick();
    }
  }

  return (
    <button className="btn btn-primary" onClick={handleCheckoutAndReserve}>Przejdź do płatności</button>
  );
}

export default PayButton;
