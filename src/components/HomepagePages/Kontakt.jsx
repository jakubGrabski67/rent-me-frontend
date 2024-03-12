import React from "react";
import HomepageHeader from "../HomepageHeader/HomepageHeader";
import HomepageFooter from "../HomepageFooter/HomepageFooter";
import Helmet from "../Helmet/Helmet";
import offer3 from "../../assets/images/offer3.jpg";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";

import "../HomepagePages/kontakt.css";

const Kontakt = () => {
  const whileTap = {
    tap: {
      scale: 1.2,
    },
    hover: {
      scale: 1.1,
    },
  };

  return (
    <>
      <HomepageHeader />
      <Helmet title={"Kontakt"} />
      <div
        className="hero__container"
        style={{
          backgroundImage: `url(${offer3})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover", // Dostosuj wielkość tła
          height: "70vh", // Dostosuj wysokość tła
        }}
      ></div>

      <div className="container">
        <h2 className="voucher__header">Kontakt</h2>

        <div className="text">
          Jeżeli masz pytania lub wątpliwości, skontaktuj się z nami.
          <div className="contact__icons">
            <motion.div
              className="social-icon"
              variants={whileTap}
              whileTap="tap"
              whileHover="hover"
              initial="initial"
              animate="animate"
            >
              <SocialIcon url="https://facebook.com" />
            </motion.div>
            <motion.div
              className="social-icon"
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

        <div className="containerr">
          <form>
            <div className="form-group">
              <label className="label-kontakt" htmlFor="name">Imię i nazwisko:</label>
              <input className="input-kontakt" type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label className="label-kontakt" htmlFor="email">Twój e-mail:</label>
              <input className="input-kontakt" type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label className="label-kontakt" htmlFor="subject">Temat:</label>
              <input className="input-kontakt" type="text" id="subject" name="subject" required />
            </div>
            <div className="form-group">
              <label className="label-kontakt" htmlFor="message">Treść wiadomości:</label>
              <textarea className="textarea-kontakt" id="message" name="message" rows="4" required />
            </div>
            <div className="form-group">
              <button className="button-submit-contact" type="submit">Wyślij</button>
            </div>
          </form>
          <div className="map-container">
            {/* Mapa Google Maps */}
            <iframe
            title="google-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20158.32673556764!2d19.118994599602782!3d50.8350380014764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4710b69c308a74d1%3A0xd12ba81f0fe039eb!2sM1%20Cz%C4%99stochowa!5e0!3m2!1spl!2spl!4v1694909259636!5m2!1spl!2spl"
              width="790"
              height="520"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <HomepageFooter />
    </>
  );
};

export default Kontakt;
