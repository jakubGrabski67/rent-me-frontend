import React, { useState } from "react";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";
import { useGetCarsQuery } from "./carsApiSlice";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carsList.css";
import DashboardNavbarLeft from "../../components/Dashboard/DashboardNavbarLeft/DashboardNavbarLeft";
import DashboardNavbar from "../../components/Dashboard/DashboardNavbar/DashboardNavbar";

import { Modal } from "react-bootstrap";

const CarsList = () => {
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image
  // const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [openDescriptionIds, setOpenDescriptionIds] = useState([]);

  const toggleDescription = (carId) => {
    setOpenDescriptionIds((prevOpenDescriptionIds) => {
      if (prevOpenDescriptionIds.includes(carId)) {
        return prevOpenDescriptionIds.filter((id) => id !== carId);
      } else {
        return [...prevOpenDescriptionIds, carId];
      }
    });
  };

  const {
    data: cars,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCarsQuery("carsList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const formatDateTime = (dateTime) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateTime).toLocaleString(undefined, options);
  };

  const formatCompleted = (completed) => {
    return completed ? "Dostępny" : "Wynajęty";
  };

  const selectedFields = [
    { label: "Indeks pojazdu", field: "ticket" },
    { label: "Marka", field: "brand" },
    { label: "Rodzaj paliwa", field: "fuelType" },
    { label: "Rok produkcji", field: "productionYear" },
    { label: "Liczba pasażerów", field: "numOfPassengers" },
  
    { label: "Rodzaj pojazdu", field: "type" },
    { label: "Pojazd przypisany do", field: "username" },
    { label: "Model", field: "model" },
    { label: "Skrzynia biegów", field: "gearboxType" },
    { label: "Moc (KM)", field: "hp" },
    { label: "Przebieg pojazdu", field: "vehicleMileage" },
    { label: "Cena za dzień (PLN)", field: "price" },
    { label: "Opis pojazdu", field: "description" },
    {
      label: "Zdjęcia pojazdu",
      field: "images",
      format: (value) => (
        <div className="car-images">
          {value.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`${index + 1}`}
              style={{ maxWidth: "100px" }}
            />
          ))}
        </div>
      ),
    },
    {
      label: "Completed",
      field: "completed",
      format: (value) => formatCompleted(value),
    },
    {
      label: "Utworzono",
      field: "createdAt",
      format: (value) => formatDateTime(value),
    },
    {
      label: "Edytowano",
      field: "updatedAt",
      format: (value) => formatDateTime(value),
    },
  ];

  const [searchType, setSearchType] = useState("");
  const [searchBrand, setSearchBrand] = useState("");
  const [filteredIds, setFilteredIds] = useState([]);

  const handleSearch = () => {
    const { ids, entities } = cars;

    const filteredCars = ids.filter((carId) => {
      const car = entities[carId];
      const typeMatch = car.type
        .toLowerCase()
        .includes(searchType.toLowerCase());
      const brandMatch = car.brand
        .toLowerCase()
        .includes(searchBrand.toLowerCase());
      return typeMatch && brandMatch;
    });

    setFilteredIds(filteredCars);
  };

  const navigate = useNavigate();

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = cars;

    let displayedIds = filteredIds.length > 0 ? filteredIds : ids;

    const PrevArrow = (props) => {
      const { onClick } = props;
      return (
        <button className="slick-prev" onClick={onClick}>
          {"<"}
        </button>
      );
    };

    const NextArrow = (props) => {
      const { onClick } = props;
      return (
        <button className="slick-next" onClick={onClick}>
          {">"}
        </button>
      );
    };

    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
    };

    const typeOptions = [...new Set(ids.map((carId) => entities[carId].type))];
    const brandOptions = [
      ...new Set(ids.map((carId) => entities[carId].brand)),
    ];

    const openModal = (imageUrl) => {
      setSelectedImage(imageUrl);
    };

    const closeModal = () => {
      setSelectedImage(null);
    };

    content = (
      <>
        <DashboardNavbarLeft />
        <DashboardNavbar />

        <div className="container-fluid mt-0 content-container">
          <div className="mt-3 custom-filters-container">
            <label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="">Wybierz typ</option>
                {typeOptions.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <div className="spacer" />
            </label>
            <label>
              <select
                value={searchBrand}
                onChange={(e) => setSearchBrand(e.target.value)}
              >
                <option value="">Wybierz markę</option>
                {brandOptions.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </label>
            <button className="btn btn-primary" onClick={handleSearch}>
              Szukaj pojazdów
            </button>
            <button
              className="btn btn-success ms-3"
              onClick={() => navigate("/dash/dashboard/flota/new")}
            >
              Dodaj nowy pojazd
            </button>
          </div>
          <div className="custom-card-container">
            {" "}
            {/* Dodaj klasę przesunięcia */}
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {displayedIds.length > 0 ? (
                displayedIds.map((carId) => (
                  <div key={carId} className="col mb-3">
                    <div className="card h-100 custom-card-shift">
                      {" "}
                      {/* Dodaj klasę przesunięcia */}
                      <Slider {...sliderSettings}>
                        {entities[carId].images.map((image, index) => (
                          <div key={index} onClick={() => openModal(image)}>
                            <img
                              src={image}
                              alt={`${index + 1}`}
                              className="card-img-top clickable-image"
                            />
                          </div>
                        ))}
                      </Slider>
                      <div className="card-body">
                        <div className="row pt-4">
                          <div className="col-md-6">
                            {selectedFields.slice(0, 6).map((field) => (
                              <div key={field.field} className="mb-2">
                                <p className="fw-bold mb-1">{field.label}</p>
                                <p>
                                  {field.format
                                    ? field.format(entities[carId][field.field])
                                    : entities[carId][field.field]}
                                </p>
                              </div>
                            ))}
                          </div>
                          <div className="col-md-6">
                            {selectedFields.slice(6, 12).map((field) => (
                              <div key={field.field} className="mb-2">
                                <p className="fw-bold mb-1">{field.label}</p>
                                <p>
                                  {field.format
                                    ? field.format(entities[carId][field.field])
                                    : entities[carId][field.field]}
                                </p>
                              </div>
                            ))}
                          </div>

                          <div className="col-md-12 text-center">
                            <div className="text-center mt-2">
                              <button
                                className="btn btn-link toggle-button"
                                onClick={() => toggleDescription(carId)}
                              >
                                {openDescriptionIds.includes(carId) ? (
                                  <BsFillArrowUpCircleFill />
                                ) : (
                                  <BsFillArrowDownCircleFill />
                                )}
                              </button>
                              <div
                                className={`description-container${
                                  openDescriptionIds.includes(carId)
                                    ? " open"
                                    : ""
                                }`}
                              >
                                <p className="description ">
                                  {selectedFields[12].format
                                    ? selectedFields[12].format(
                                        entities[carId][
                                          selectedFields[12].field
                                        ]
                                      )
                                    : entities[carId][selectedFields[12].field]}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <p
                            className={`fw-bold ${
                              entities[carId].completed
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {entities[carId].completed
                              ? "Dostępny"
                              : "Wynajęty"}
                          </p>
                          <Link to={`${carId}`} className="btn btn-primary">
                            Edytuj pojazd
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No cars found.</p>
              )}
            </div>
          </div>
        </div>

        <Modal
          show={selectedImage !== null}
          onHide={closeModal}
          centered
          dialogClassName="modal-dialog-centered"
          contentClassName="modal-content-image"
        >
          <Modal.Body className="modal-body">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected"
                className="img-fluid modal-image"
              />
            )}
          </Modal.Body>
        </Modal>
      </>
    );
  }

  return content;
};

export default CarsList;
