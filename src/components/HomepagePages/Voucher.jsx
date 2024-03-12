import React from "react";
import HomepageHeader from "../HomepageHeader/HomepageHeader";
import HomepageFooter from "../HomepageFooter/HomepageFooter";
import Helmet from "../Helmet/Helmet";
import voucher from "../../assets/images/voucher.jpg";
import voucher1 from "../../assets/images/voucher1.png";

import "../HomepagePages/voucher.css";

const Voucher = () => {
  return (
    <>
      <HomepageHeader />
      <Helmet title={"Voucher"} />
      <div
        className="hero__container"
        style={{
          backgroundImage: `url(${voucher})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover", // Dostosuj wielkość tła
          height: "70vh", // Dostosuj wysokość tła
        }}
      ></div>

      <div className="block faqPage">
        <div className="container">
          <h2 className="voucher__header">Voucher</h2>

          <div className="containerr">
            <img src={voucher1} alt="Zdjęcie" className="image" />
            <div className="text-voucher">
              Przygotowaliśmy dla Was specjalne vouchery prezentowe, które są
              idealną alternatywą tradycyjnych upominków na różne okazje. Każdy
              fan motoryzacji będzie zadowolony z możliwości przetestowania i
              poczucia na własnej skórze mocy sportowych samochodów.
              <br />
              <br />
              Oferujemy możliwość wysyłki vouchera jak również zakupu osobiście.
              Voucher ważny jest przez rok od daty zakupu.
              <br />
              <br />
              Jesteś zainteresowany voucherem? Odezwij się do nas!
            </div>
          </div>
        </div>
      </div>

      <HomepageFooter />
    </>
  );
};

export default Voucher;
