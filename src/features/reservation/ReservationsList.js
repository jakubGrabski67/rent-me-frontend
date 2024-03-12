import React, { useState } from "react";
import { useGetReservationsQuery } from "./reservationApiSlice";
import { Link, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./reservationsList.css";
import DashboardNavbarLeft from "../../components/Dashboard/DashboardNavbarLeft/DashboardNavbarLeft";
import DashboardNavbar from "../../components/Dashboard/DashboardNavbar/DashboardNavbar";

const ReservationsList = () => {
  const {
    data: reservations,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetReservationsQuery("reservationsList", {
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

  const selectedFields = [
    { label: "ID rezerwacji", field: "_id" },
    {
      label: "Data rozpoczęcia",
      field: "startDate",
      format: (value) => formatDateTime(value),
    },
    { label: "Imię", field: "firstName" },
    { label: "Kraj", field: "country" },
    { label: "Ulica", field: "street" },
    { label: "Kod pocztowy", field: "postalCode" },
    { label: "Kod promocyjny", field: "promoCode" },
    { label: "Forma płatności", field: "selectedPaymentOption" },
    { label: "E-mail", field: "email" },
    { label: "ID pojazdu", field: "car" },
    {
      label: "Data zakończenia",
      field: "endDate",
      format: (value) => formatDateTime(value),
    },
    { label: "Nazwisko", field: "lastName" },
    { label: "Miasto", field: "city" },
    { label: "Numer domu", field: "houseNumber" },
    { label: "Numer telefonu", field: "phoneNumber" },
    { label: "Numer prawa jazdy", field: "driverLicenseNumber" },
    { label: "Pakiet ochronny", field: "protectionPackage" },
    { label: "Opcje dodatkowe", field: "selectedOptions" },
    {
      label: "Status rezerwacji",
      field: "reservationStatus", // format: (value) => formatReservationStatus(value),
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
    { label: "Cena za okres wypożyczenia", field: "totalRentalPrice" },
  ];

  const [searchSelectedPaymentOption, setSearchSelectedPaymentOption] =
    useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [sortByDate, setSortByDate] = useState(""); // Początkowo nie ma wybranej opcji sortowania

  const [filteredIds, setFilteredIds] = useState([]);

  const handleSearch = () => {
    const { ids, entities } = reservations;

    const filteredReservations = ids.filter((reservationId) => {
      const reservation = entities[reservationId];
      const selectedPaymentOptionMatch = reservation.selectedPaymentOption
        .toLowerCase()
        .includes(searchSelectedPaymentOption.toLowerCase());

      // Przekształć obiekt startDate na obiekt daty
      const reservationStartDate = new Date(reservation.startDate);

      if (searchStartDate === "najnowsze") {
        return selectedPaymentOptionMatch;
      } else if (searchStartDate === "najstarsze") {
        // Porównaj daty na podstawie wartości czasu (getTime())
        const startDateMatch = reservationStartDate >= new Date();
        return selectedPaymentOptionMatch && startDateMatch;
      }

      return selectedPaymentOptionMatch;
    });

    // Sortowanie według daty
    if (sortByDate === "asc") {
      filteredReservations.sort((a, b) => {
        const dateA = new Date(entities[a].startDate);
        const dateB = new Date(entities[b].startDate);
        return dateA - dateB;
      });
    } else if (sortByDate === "desc") {
      filteredReservations.sort((a, b) => {
        const dateA = new Date(entities[a].startDate);
        const dateB = new Date(entities[b].startDate);
        return dateB - dateA;
      });
    }

    setFilteredIds(filteredReservations);
  };

  const clearFilters = () => {
    setSearchSelectedPaymentOption("");
    setSearchStartDate("");
    setSortByDate("");
    setFilteredIds(reservations.ids);
  };

  const navigate = useNavigate();

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = reservations;

    let displayedIds = filteredIds.length > 0 ? filteredIds : ids;

    const selectedPaymentOption = [
      ...new Set(
        ids.map(
          (reservationId) => entities[reservationId].selectedPaymentOption
        )
      ),
    ];

    content = (
      <>
        <DashboardNavbarLeft />
        <DashboardNavbar />

        <div className="container-fluid mt-0 content-container">
          <div className="mt-3 custom-filters-container">
            <label>
              <select
                value={searchSelectedPaymentOption}
                onChange={(e) => setSearchSelectedPaymentOption(e.target.value)}
              >
                <option value="">Wybierz typ płatności</option>
                {selectedPaymentOption.map((selectedPaymentOption, index) => (
                  <option key={index} value={selectedPaymentOption}>
                    {selectedPaymentOption}
                  </option>
                ))}
              </select>
              <div className="spacer" />
            </label>
            <label>
              <select
                className="w-100 "
                value={sortByDate}
                onChange={(e) => setSortByDate(e.target.value)}
              >
                <option value="">Sortuj według daty rozpoczęcia</option>
                <option value="desc">Od najnowszej</option>
                <option value="asc">Od najstarszej</option>
              </select>
            </label>

            <button className="btn btn-primary ms-5" onClick={handleSearch}>
              Szukaj rezerwacji
            </button>

            <button className="btn btn-primary" onClick={clearFilters}>
              Usuń filtry
            </button>

            <button
              className="btn btn-success ms-3"
              onClick={() => navigate("/dash/dashboard/reservations/new")}
            >
              Dodaj nową rezerwację
            </button>
          </div>

          <div className="custom-card-container">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {displayedIds.length > 0 ? (
                displayedIds.map((reservationId) => (
                  <div key={reservationId} className="col mb-3">
                    <div className="card h-100 custom-card-shift">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            {selectedFields.slice(0, 9).map((field) => (
                              <div key={field.field} className="mb-2">
                                <p className="fw-bold mb-1 ">{field.label}</p>
                                <p className="field">
                                  {field.format
                                    ? field.format(
                                        entities[reservationId][field.field]
                                      )
                                    : entities[reservationId][field.field]}
                                </p>
                              </div>
                            ))}
                          </div>
                          <div className="col-md-6">
                            {selectedFields.slice(9, 17).map((field) => (
                              <div key={field.field} className="mb-2">
                                <p className="fw-bold mb-1">{field.label}</p>
                                <p className="field">
                                  {field.format
                                    ? field.format(
                                        entities[reservationId][field.field]
                                      )
                                    : entities[reservationId][field.field]}
                                </p>
                              </div>
                            ))}
                            <div className="col-md-6">
                              {selectedFields.slice(17, 18).map((field) => (
                                <div key={field.field} className="mb-2">
                                  <p className="p-selectedOptions fw-bold mb-1">
                                    {field.label}
                                  </p>
                                  {field.field === "selectedOptions" ? (
                                    <div className="field-selectedOptions">
                                      {entities[reservationId][field.field]
                                        .length > 0 ? (
                                        <>
                                          {entities[reservationId][
                                            field.field
                                          ].map((option, index) => (
                                            <p className="field" key={index}>
                                              {option}
                                            </p>
                                          ))}
                                          {[
                                            ...Array(
                                              Math.max(
                                                4 -
                                                  entities[reservationId][
                                                    field.field
                                                  ].length,
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
                                        </>
                                      ) : (
                                        <>
                                          <p className="field">Brak</p>
                                          {[...Array(3)].map((_, index) => (
                                            <p
                                              className="field"
                                              key={index}
                                              style={{ userSelect: "none" }}
                                            >
                                              &nbsp;
                                            </p>
                                          ))}
                                        </>
                                      )}
                                    </div>
                                  ) : (
                                    <p className="field-selectedOptions">
                                      {field.format
                                        ? field.format(
                                            entities[reservationId][field.field]
                                          )
                                        : entities[reservationId][field.field]}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mt-3 border">
                            {selectedFields.slice(21, 22).map((field) => (
                              <div key={field.field} className="mb-2">
                                <p className="fw-bold mb-1">{field.label}</p>
                                <p className="field text-primary fw-bold">
                                  {field.format
                                    ? field.format(
                                        entities[reservationId][field.field]
                                      )
                                    : entities[reservationId][field.field]}{" "}
                                  PLN
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <p
                            className={`fw-bold ${
                              entities[reservationId].reservationStatus ===
                              "Zakończono"
                                ? "text-danger"
                                : entities[reservationId].reservationStatus ===
                                  "W trakcie"
                                ? "text-success"
                                : entities[reservationId].reservationStatus ===
                                  "Oczekuje na potwierdzenie"
                                ? "text-warning"
                                : ""
                            }`}
                          >
                            {entities[reservationId].reservationStatus}
                          </p>
                          <Link
                            to={`${reservationId}`}
                            className="btn btn-primary"
                          >
                            Edytuj rezerwację
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Nie znaleziono rezerwacji.</p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return content;
};

export default ReservationsList;
