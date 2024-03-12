import React, { useState } from "react";
import HomepageHeader from "../HomepageHeader/HomepageHeader";
import HomepageFooter from "../HomepageFooter/HomepageFooter";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";
import { useGetCarsQuery } from "../../features/cars/carsApiSlice";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./shop.css";
import { Modal } from "react-bootstrap";
import Helmet from "../Helmet/Helmet";


const Shop = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [openDescriptionIds, setOpenDescriptionIds] = useState([]);
  const [sortByPrice, setSortByPrice] = useState(""); // Ascending or Descending
  const [priceRange, setPriceRange] = useState(""); // Price range

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
    isError,
    error,
  } = useGetCarsQuery("carsListPublic");

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
    { label: "Pojazd przypisany do", field: "username" },
    { label: "Marka", field: "brand" },
    { label: "Rodzaj paliwa", field: "fuelType" },
    { label: "Rok produkcji", field: "productionYear" },
    { label: "Liczba pasażerów", field: "numOfPassengers" },
  
    { label: "Rodzaj pojazdu", field: "type" },
    { label: "Model", field: "model" },
    { label: "Skrzynia biegów", field: "gearboxType" },
    { label: "Moc (KM)", field: "hp" },
    { label: "Przebieg pojazdu (km)", field: "vehicleMileage" },
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

  

  // const navigate = useNavigate();

  let content;

  if (isLoading) content = <p>Ładowanie...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (cars) {
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
    const brandOptions = [...new Set(ids.map((carId) => entities[carId].brand)),];

    const openModal = (imageUrl) => {
      setSelectedImage(imageUrl);
    };

    const closeModal = () => {
      setSelectedImage(null);
    };

    const handleSortByPrice = (e) => {
      setSortByPrice(e.target.value);
    };
  
    const handlePriceRange = (e) => {
      setPriceRange(e.target.value);
    };
  
    const applyFilters = () => {
      // Filter cars based on sortByPrice and priceRange
      let filteredCars = [...displayedIds];
  
      if (sortByPrice === "asc") {
        filteredCars = filteredCars.sort((a, b) =>
          entities[a].price - entities[b].price
        );
      } else if (sortByPrice === "desc") {
        filteredCars = filteredCars.sort((a, b) =>
          entities[b].price - entities[a].price
        );
      }
  
      if (priceRange === "low") {
        filteredCars = filteredCars.filter(
          (carId) => entities[carId].price <= 300
        );
      } else if (priceRange === "medium") {
        filteredCars = filteredCars.filter(
          (carId) =>
            entities[carId].price > 300 && entities[carId].price <= 600
        );
      } else if (priceRange === "high") {
        filteredCars = filteredCars.filter(
          (carId) => entities[carId].price > 600
        );
      }
  
      return filteredCars;
    };

    const resetFilters = () => {
      setFilteredIds([]); // Reset filteredIds to an empty array to show all cars
      setSortByPrice(""); // Reset sortByPrice to its initial state
      setPriceRange(""); // Reset priceRange to its initial state
      setSearchType(""); // Reset searchType to its initial state
      setSearchBrand(""); // Reset searchBrand to its initial state
    };

    content = (
      <>
      <Helmet title ={'Flota'}/>
        <HomepageHeader />
        

        <div className="container-fluid mt-0 content-container">
          <div className="custom-filters-container-flota mt-3 ">
            <label>
              <select value={sortByPrice} onChange={handleSortByPrice}>
                <option value="">Sortuj wg. ceny</option>
                <option value="asc">Rosnąco</option>
                <option value="desc">Malejąco</option>
              </select>
            </label>
            <label>
              <select value={priceRange} onChange={handlePriceRange}>
                <option value="">Zakres ceny</option>
                <option value="low">do 300 PLN</option>
                <option value="medium">od 300 do 600 PLN</option>
                <option value="high">od 600 PLN</option>
              </select>
            </label>
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
            <button className="btn btn-primary" onClick={resetFilters}>
              Zresetuj filtry
            </button>

          </div>
          <div className="custom-card-container-flota">
            {" "}
            {/* Dodaj klasę przesunięcia */}
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {applyFilters().map((carId) => (  // Użycie metody applyFilters}
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
                        <div className="row">
                          <div className="col-md-6 pt-3">
                            {selectedFields.slice(2, 7).map((field) => (
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
                          <div className="col-md-6 pt-3">
                            {selectedFields.slice(7, 12).map((field) => (
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
  className={`btn btn-link toggle-button bounce ${openDescriptionIds.includes(carId) ? "active" : ""}`}
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
      Pokaż ofertę
    </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
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
        <HomepageFooter />
      </>
    );
  }

  return content;
};

export default Shop;
