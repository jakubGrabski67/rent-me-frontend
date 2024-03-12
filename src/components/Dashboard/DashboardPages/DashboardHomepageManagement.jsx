import React, { useState } from "react";

import { useGetCarsQuery } from "../../../features/cars/carsApiSlice";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import "./carsList.css";
import DashboardNavbarLeft from "../DashboardNavbarLeft/DashboardNavbarLeft";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";

import { Modal } from "react-bootstrap";

//import { Navigate } from "react-router-dom";

import { useEffect } from "react";

const DashboardHomepageManagement = () => {
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image
  // const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  //const [openDescriptionIds, setOpenDescriptionIds] = useState([]);

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

  const selectedFields = [
    { label: "Marka", field: "brand" },
    { label: "Model", field: "model" },
    { label: "Kategoria:", field: "carCategory" },
  ];

  function mapCarCategory(carCategory) {
    switch (carCategory) {
      case "mostPopularCars":
        return "Najpopularniejsze";
      case "recentlyAddedCars":
        return "Nowo dodane";
      case "cityCars":
        return "Auta miejskie";
      case "familyCars":
        return "Auta rodzinne";
      default:
        return carCategory;
    }
  }

  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredIds, setFilteredIds] = useState([]);

  useEffect(() => {
    const handleCategoryFilter = () => {
      if (!cars) return;

      const { ids } = cars;
      if (!ids) return;

      const filteredCars = ids.filter((carId) => {
        const car = cars.entities[carId];
        if (!car) return false;

        if (selectedCategory === "Brak") {
          // Filtruj tylko rekordy, które mają "Brak" w tablicy carCategory
          return car.carCategory && car.carCategory.includes("Brak");
        }

        // Pozostałe filtry
        if (selectedCategory) {
          const selectedCategories = selectedCategory.split(",");

          // Sprawdzamy, czy samochód ma przynajmniej jedną z wybranych kategorii
          const hasMatchingCategory = selectedCategories.some((selectedCat) => {
            if (car.carCategory && car.carCategory.includes) {
              return car.carCategory.includes(selectedCat.trim());
            }
            return false;
          });

          if (!hasMatchingCategory) return false;
        }

        return true;
      });

      setFilteredIds(filteredCars);
    };

    handleCategoryFilter();
  }, [selectedCategory, cars]);

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
            <button
              className={`btn ${
                selectedCategory === "mostPopularCars"
                  ? "btn-primary"
                  : "btn-secondary"
              }`}
              onClick={() => {
                setSelectedCategory("mostPopularCars");
              }}
            >
              Najpopularniejsze auta
            </button>
            <button
              className={`btn ${
                selectedCategory === "recentlyAddedCars"
                  ? "btn-primary"
                  : "btn-secondary"
              }`}
              onClick={() => {
                setSelectedCategory("recentlyAddedCars");
              }}
            >
              Nowo dodane auta
            </button>
            <button
              className={`btn ${
                selectedCategory === "cityCars"
                  ? "btn-primary"
                  : "btn-secondary"
              }`}
              onClick={() => {
                setSelectedCategory("cityCars");
              }}
            >
              Auta miejskie
            </button>
            <button
              className={`btn ${
                selectedCategory === "familyCars"
                  ? "btn-primary"
                  : "btn-secondary"
              }`}
              onClick={() => {
                setSelectedCategory("familyCars");
              }}
            >
              Auta rodzinne
            </button>

            <button
              className={`btn ${
                selectedCategory === 0 ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => {
                setSelectedCategory("Brak");
                //handleCategoryFilter("Brak"); // Dodaj tę linię, aby wywołać funkcję filtrowania
              }}
            >
              Auta bez kategorii
            </button>

            <button
              className={`btn ${
                selectedCategory !== "" ? "btn-danger ms-5" : "btn-danger ms-5"
              }`}
              onClick={() => {
                setSelectedCategory("");
              }}
            >
              Usuń filtry
            </button>
          </div>

          <div className="custom-card-container pt-3">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {displayedIds.length > 0 ? (
                displayedIds.map((carId) => (
                  <div key={carId} className="col mb-3">
                    <div className="card h-100 custom-card-shift">
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
                        <div className="row pt-2">
                          {selectedFields.slice(0, 2).map((field) => (
                            <div key={field.field} className="col-md-4 mb-1 ">
                              <p className="fw-bold mb-0">{field.label}</p>
                              <p className="field">
                                {field.field === "carCategory"
                                  ? mapCarCategory(entities[carId].carCategory)
                                  : field.format
                                  ? field.format(entities[carId][field.field])
                                  : entities[carId][field.field]}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="col-md-6">
                          {selectedFields.slice(2, 3).map((field) => (
                            <div key={field.field} className="mb-2">
                              <p className="p-carCategory fw-bold mb-1">
                                {field.label}
                              </p>
                              <div className="field-carCategory">
                                {entities[carId][field.field] &&
                                entities[carId][field.field].length > 0 ? (
                                  entities[carId][field.field].map(
                                    (option, index) => (
                                      <p className="field" key={index}>
                                        {option}
                                      </p>
                                    )
                                  )
                                ) : (
                                  <p className="field">Brak</p>
                                )}{" "}
                                {/*warunek kiedy tablica jest pusta*/}
                                {[
                                  ...Array(
                                    Math.max(
                                      4 -
                                        (entities[carId][field.field]?.length ||
                                          0),
                                      0
                                    )
                                  ),
                                ].map((_, index) => (
                                  <p
                                    className="field"
                                    key={index}
                                    style={{ userSelect: "none" }}
                                  >
                                    &nbsp;
                                  </p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="col-md-12 text-center pt-5">
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

export default DashboardHomepageManagement;
