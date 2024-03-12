import React from "react";
import "../DashboardStyles/DashboardHomepage.css";

import SingleCard from "../reuseable/SingleCard";

import MileChart from "../../../assets/charts/MileChart";
import CarStatsChart from "../../../assets/charts/CarStatsChart";

// import RecommendCarCard from "../DashboardUI/RecommendCarCard";

// import recommendCarsData from "../../../assets/dummy-data/recommendCars";

import DashboardNavbarLeft from "../DashboardNavbarLeft/DashboardNavbarLeft";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";

import Helmet from '../../Helmet/Helmet'

import { useGetCarsQuery } from "../../../features/cars/carsApiSlice";
import { useGetReservationsQuery } from "../../../features/reservation/reservationApiSlice";



const DashboardHomepage = () => {

  const { data: cars,
    // isLoading,
    isSuccess,
    //isError,
    /*error*/ } = useGetCarsQuery("carsList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  
  const totalRecords = isSuccess ? cars.ids.length : 0;



  const {
    data: reservations,
    //isLoading,
    //isSuccess,
    //isError,
    //error,
  } = useGetReservationsQuery("reservationsList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });


  const countPendingReservations = (reservations) => {
    if (reservations) {
      const { entities } = reservations;
      let count = 0;
  
      for (const reservationId in entities) {
        if (entities[reservationId].reservationStatus === "Oczekuje na potwierdzenie") {
          count++;
        }
      }
  
      return count;
    }
  
    return 0; // Return a default value if reservations is not available.
  };

  const countProcessingReservations = (reservations) => {
    if (reservations) {
      const { entities } = reservations;
      let count = 0;
  
      for (const reservationId in entities) {
        if (entities[reservationId].reservationStatus === "W trakcie") {
          count++;
        }
      }
  
      return count;
    }
  
    return 0; // Return a default value if reservations is not available.
  };
  

  
  const carsAmount = {
    title: "Posiadane pojazdy",
    totalNumber: totalRecords,
    icon: "ri-police-car-line",
  };
  

const pendingReservationsAmount = {
  title: "Niepotwierdzone rezerwacje",
  totalNumber: countPendingReservations(reservations),
  icon: "ri-steering-2-line",
};

const processingReservationsAmount = {
  title: "Aktywne wypożyczenia",
  totalNumber: countProcessingReservations(reservations),
  icon: "ri-user-line",
};

const distanceObj = {
  title: "Aktywny kod promocyjny",
  totalNumber: "summer15",
  icon: "ri-timer-flash-line",
};


  return (
    <Helmet title="Dashboard - Panel">
      <>
        <DashboardNavbar />
        <DashboardNavbarLeft />
  
        <div className="dashboard">
          <div className="dashboard__wrapper">
            <div className="dashboard__cards">
              <SingleCard item={carsAmount} />
              <SingleCard item={pendingReservationsAmount} />
              <SingleCard item={processingReservationsAmount} />
              <SingleCard item={distanceObj} />
            </div>
  
            <div className="statics d-flex justify-content-center align-items-center">
              <div className="stats" >
                <h3 className="stats__title">Popularność rezerwacji w poszczególne dni</h3>
                <MileChart />
              </div>
            </div>

            <div className="statics d-flex justify-content-center align-items-center">
              <div className="stats">
                <h3 className="stats__title">Zestawienie rezerwacji w bieżącym i poprzednim tygodniu</h3>
                <CarStatsChart />
              </div>
            </div>
  
            {/* <div className="recommend__cars-wrapper">
              {recommendCarsData.map((item) => (
                <RecommendCarCard item={item} key={item.id} />
              ))}
            </div> */}
          </div>
        </div>
      </>
    </Helmet>
  );
              };  

export default DashboardHomepage;
