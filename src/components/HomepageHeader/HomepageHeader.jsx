import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./HomepageHeader.css";
import { Row } from "reactstrap";
import { motion } from "framer-motion";
import logo from "../../assets/images/logo.mp4";
import { SocialIcon } from "react-social-icons";

const whileTap = {
  tap: {
    scale: 1.2,
  },
  hover: {
    scale: 1.1,
  },
};

const nav__links = [
  {
    path: "/",
    display: "STRONA GŁÓWNA",
  },
  {
    path: "/shop",
    display: "NASZA FLOTA",
  },
  {
    path: "/voucher",
    display: "VOUCHER",
  },
  {
    path: "/faq",
    display: "FAQ",
  },
  {
    path: "/kontakt",
    display: "KONTAKT",
  },
  {
    path: "/login",
    display: "PANEL PRACOWNIKA",
  },
];

const HomepageHeader = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Oblicz wysokość menu
  const menuHeight = mobileMenuOpen ? "490px" : "auto";

  return (
    <div className="homepageHeader" style={{ height: menuHeight }}>
      <Row>
        <div className="nav__wrapper">
          <div
            className={`menu-button ${mobileMenuOpen ? "active" : ""}`}
            onClick={toggleMobileMenu}
          >
            <div className={`bar ${mobileMenuOpen ? "active" : ""}`}></div>
            <div className={`bar ${mobileMenuOpen ? "active" : ""}`}></div>
            <div className={`bar ${mobileMenuOpen ? "active" : ""}`}></div>
          </div>
          <div className="logo-top">
          <video width="200" height="70" autoPlay  muted>
      <source src={logo} type="video/mp4" />
      Twoja przeglądarka nie obsługuje tagu wideo.
    </video>
          </div>
          
          <div className={`navigation ${mobileMenuOpen ? "active" : ""}`}>
            <ul className={`menu ${mobileMenuOpen ? "active" : ""}`}>
              {nav__links.map((item, index) => (
                <li className="nav__item" key={index}>
                  <a
                    href={item.path}
                    className={`nav__link ${
                      location.pathname === item.path
                        ? "active on-current-page"
                        : "not-active"
                    }`}
                  >
                    {item.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="nav__icons">
            <motion.div
              variants={whileTap}
              whileTap="tap"
              whileHover="hover"
              initial="initial"
              animate="animate"
            >
              <SocialIcon url="https://facebook.com" />
            </motion.div>
            <motion.div
              variants={whileTap}
              whileTap="tap"
              whileHover="hover"
              initial="initial"
              animate="animate"
            >
              <SocialIcon url="https://instagram.com" />
            </motion.div>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default HomepageHeader;
