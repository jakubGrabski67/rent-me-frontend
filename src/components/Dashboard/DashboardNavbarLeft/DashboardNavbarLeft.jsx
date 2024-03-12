import React from "react";
import { Link } from 'react-router-dom';
import { useSendLogoutMutation } from '../../../features/auth/authApiSlice';
import { NavLink } from "react-router-dom";
import DashboardNavLinks from "../../../assets/dummy-data/DashboardNavLinks";
import "./DashboardNavbarLeft.css";

const DashboardNavbarLeft = () => {

  const [sendLogout] = useSendLogoutMutation()

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h2>
          <span>
            <i className="ri-taxi-line"></i>
          </span>{" "}
          Rent Me!
        </h2>
      </div>

      <div className="sidebar__content">
        <div className="menu__dashboard">
          <ul className="nav__list">
            {DashboardNavLinks.map((item, index) => (
              <li className="dashboardNav__item" key={index}>
                <NavLink
                  to={item.path}
                  className={(dashboardNavClass) =>
                    dashboardNavClass.isActive ? "nav__active__dashboard nav__link__dashboard" : "nav__link__dashboard"
                  }>
                  
                  <i className={item.icon}></i>

                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar__bottom">
          <span>
            <Link to="/login" onClick={sendLogout}> <i className="ri-logout-circle-r-line"></i> Wyloguj się</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbarLeft;


