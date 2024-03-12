import React from "react";
import "../DashboardStyles/DashboardCustomers.css";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import DashboardNavbarLeft from "../DashboardNavbarLeft/DashboardNavbarLeft";
import Helmet from "../../Helmet/Helmet";

const DashboardCustomers = () => {
  return (
    <Helmet title ={'Dashboard - Klienci'}>
    <>
    {/*Importuje DashboarNavbar i NavbarLeft do Dashboard/Customers*/}
    <DashboardNavbar/>
    <DashboardNavbarLeft/>
    

    <div className="bookings">
      <div className="booking__wrapper">
        <h2 className="booking__title">Wybierz klienta do podglądu lub edycji.</h2>


        
      </div>
    </div>
    </>
    </Helmet>
  );
  
};

export default DashboardCustomers;
