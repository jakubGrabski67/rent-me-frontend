import React, { useState, useEffect, forwardRef  } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Modal } from "react-bootstrap";
import "./carDetailsForm.css";
import HomepageFooter from "../HomepageFooter/HomepageFooter";
import Helmet from "../Helmet/Helmet";
import HomepageHeader from "../HomepageHeader/HomepageHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";
import { addDays, isToday } from "date-fns";

//import { useNavigate } from "react-router-dom";
import { useAddNewReservationMutation } from "../../features/reservation/reservationApiSlice";
import PayButton from "./PayButton";

const CarDetailsForm = ({ car }) => {
  const [addNewReservation, { isLoading }] = useAddNewReservationMutation();

  // const navigate = useNavigate();

  const roundToNearestInterval = (date, interval) => {
    const roundedMinutes = Math.round(date.getMinutes() / interval) * interval;
    const roundedDate = new Date(date);
    roundedDate.setMinutes(roundedMinutes);
    return roundedDate;
  };
  

  registerLocale("pl", pl);

  const [startDate, setStartDate] = useState(roundToNearestInterval(new Date(), 15));
  const [calendarOpened, setCalendarOpened] = useState(false);

  const [endDate, setEndDate] = useState(roundToNearestInterval(addDays(new Date(), 1), 15));

  const [dateError, setDateError] = useState("");
  const [currentStep, setCurrentStep] = useState("dateSelection");
  const [showModal, setShowModal] = useState(false);
  const [protectionPackage, setProtectionPackage] = useState("STANDARD");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("Online");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [driverLicenseNumber, setDriverLicenseNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [reservationStatus /*, setReservationStatus*/] = useState(
    "Oczekuje na potwierdzenie"
  );
  const CustomDatePickerInput = forwardRef(({ value, onClick }, ref) => (
    <input
      type="text"
      value={value}
      onClick={onClick}
      readOnly // Ustaw readOnly na true, aby zablokować wpisywanie z klawiatury
      style={{ cursor: 'pointer' }} // Dodaj styl kursora, aby sygnalizować, że można kliknąć
      ref={ref} // Przypisz ref
    />
  ));

  
  useEffect(() => {
    let timeoutId;

    if (calendarOpened && isToday(startDate)) {
      timeoutId = setTimeout(() => {
        setStartDate(new Date());
      }, 600000); // Oczekuj co najmniej 10 minuty przed kolejną aktualizacją
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [calendarOpened, startDate]);

  const handleNextStep = () => {
    switch (currentStep) {
      case "dateSelection":
        if (startDate && endDate) {
          setCurrentStep("protectionPackageSelection");
        } else {
          setDateError("Proszę wybrać poprawne daty.");
        }
        break;
      case "protectionPackageSelection":
        if (protectionPackage) {
          setCurrentStep("optionsSelection");
        } else {
          console.log("Proszę wybrać pakiet ochronny.");
        }
        break;
      case "optionsSelection":
        setCurrentStep("personalInformation");
        break;
      case "personalInformation":
        // Sprawdź, czy wszystkie pola są wypełnione
        const isPersonalInfoValid =
          firstName &&
          lastName &&
          country &&
          street &&
          houseNumber &&
          city &&
          postalCode &&
          driverLicenseNumber &&
          email &&
          phoneNumber;

        // Jeśli niektóre pola nie są wypełnione, zablokuj przejście i wyświetl komunikat
        if (!isPersonalInfoValid) {
          alert("Wypełnij wszystkie pola.");
          return;
        }

        // Jeśli wszystkie pola są wypełnione, przejdź do kolejnego kroku
        setCurrentStep("finalConfirmation");
        break;
      case "finalConfirmation":
        // Dodaj kod obsługujący potwierdzenie
        break;
      default:
        break;
    }
  };

  const handlePreviousStep = () => {
    // Dodaj kod obsługujący cofanie kroku wstecz
    switch (currentStep) {
      case "protectionPackageSelection":
        setCurrentStep("dateSelection");
        break;
      case "optionsSelection":
        setCurrentStep("protectionPackageSelection");
        break;
      case "personalInformation":
        setCurrentStep("optionsSelection");
        break;
      case "finalConfirmation":
        setCurrentStep("personalInformation");
        break;
      default:
        break;
    }
  };

  const protectionPackages = [
    {
      name: "STANDARD",
      description:
        "Podstawowe ubezpieczenie OC, AC i NW gwarantujące bezpieczne użytkowanie pojazdu.",
      description2:
        "Przy wyborze opcji STANDARD udział własny wynosi 4000 złotych.",
      price: 0,
    },
    {
      name: "GOLD",
      description: "Podstawowy pakiet + ubezpieczenie od kradzieży.",
      description2:
        "Przy wyborze opcji ZŁOTY udział własny wynosi 3000 złotych.",
      price: 300,
    },
    {
      name: "PLATINIUM",
      description: "Złoty pakiet + ubezpieczenie na wypadek awarii.",
      description2:
        "Przy wyborze opcji PLATYNOWY udział własny wynosi 2000 złotych.",
      price: 400,
    },
  ];

  const options = [
    {
      name: "Fotelik: podkładka",
      price: 19,
    },
    {
      name: "Fotelik dziecięcy: 9-36 kg",
      price: 19,
    },
    {
      name: "Zestaw nawigacji GPS",
      price: 19,
    },
    {
      name: "Końcowe mycie pojazdu",
      description:
        "Usługa obejmuje możliwość zwrotu zabrudzonego pojazdu wewnątrz i na zewnątrz.",
      price: 59,
    },
  ];

  // const paymentOptions = [
  //   "Karta kredytowa",
  //   "Przelew bankowy",
  //   "PayPal",
  //   "Gotówka",
  // ];

  // const handlePaymentOptionChange = (event) => {
  //   setSelectedPaymentOption(event.target.value);
  // };

  const handleSelectPackage = (packageName) => {
    setProtectionPackage(packageName);
  };

  const openReservationForm = () => {
    setShowModal(true);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  

  
  const handleOptionClick = (optionName) => {
    if (selectedOptions.includes(optionName)) {
      setSelectedOptions((prevOptions) =>
        prevOptions.filter((option) => option !== optionName)
      );
    } else {
      setSelectedOptions((prevOptions) => [...prevOptions, optionName]);
    }
  };

  function formatDateTime(dateTimeString) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateTimeString).toLocaleString("pl-PL", options);
  }

  const pricePerDay = car.price;
  const timeDiffInMillis = Math.abs(endDate - startDate);
  const totalMinutes = timeDiffInMillis / (60 * 1000);

  const days = Math.floor(totalMinutes / (24 * 60));
  const remainingMinutes = totalMinutes % (24 * 60);
  const hours = Math.floor(remainingMinutes / 60);
  const minutes = remainingMinutes % 60;

  let countedRentalPrice =
    days * pricePerDay +
    hours * (pricePerDay / 24) +
    minutes * (pricePerDay / (24 * 60));

  const priceForDateRange = Math.ceil(countedRentalPrice);

  let packagePrice = 0;
  if (protectionPackage) {
    const selectedPackage = protectionPackages.find(
      (packageInfo) => packageInfo.name === protectionPackage
    );
    if (selectedPackage && selectedPackage.price !== 0) {
      packagePrice = selectedPackage.price;
      countedRentalPrice += packagePrice;
    }
  }

  let optionsPrice = 0;
  selectedOptions.forEach((selectedOption) => {
    const option = options.find((option) => option.name === selectedOption);
    if (option) {
      optionsPrice += option.price;
      countedRentalPrice += option.price;
    }
  });

  const roundedTotalRentalPrice = countedRentalPrice.toFixed(2);

  console.log(roundedTotalRentalPrice);

  const clearFormData = () => {
    setStartDate(null);
    setEndDate(null);
    setProtectionPackage("STANDARD");
    setSelectedOptions([]);
    setSelectedPaymentOption("");
    setCurrentStep("dateSelection");
  };

  // const onCarChanged = (e) => setCar(e.target.value);
  // const onStartDateChanged = (e) => setStartDate(e.target.value);
  // const onEndDateChanged = (e) => setEndDate(e.target.value);
  // const onProtectionPackageChanged = (e) => setProtectionPackage(e.target.value);
  // const onSelectedOptionsChanged = (e) => setSelectedOptions(e.target.value);
  // const onSelectedPaymentOptionChanged = (e) => setSelectedPaymentOption(e.target.value);

  const isAlphabetic = (input) => /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/.test(input);

  const onFirstNameChanged = (e) => {
    const { value } = e.target;
    const maxValueLength = value.slice(0, 20);
    if (
      (isAlphabetic(maxValueLength) || maxValueLength === "") &&
      maxValueLength.length <= 20
    ) {
      setFirstName(maxValueLength);
    }
  };

  const onLastNameChanged = (e) => {
    const { value } = e.target;
    const maxValueLength = value.slice(0, 20);
    if (
      (isAlphabetic(maxValueLength) || maxValueLength === "") &&
      maxValueLength.length <= 20
    ) {
      setLastName(maxValueLength);
    }
  };

  const onCountryChanged = (e) => {
    const { value } = e.target;
    const maxValueLength = value.slice(0, 20);
    if (
      (isAlphabetic(maxValueLength) || maxValueLength === "") &&
      maxValueLength.length <= 20
    ) {
      setCountry(maxValueLength);
    }
  };

  const onCityChanged = (e) => {
    const { value } = e.target;
    const maxValueLength = value.slice(0, 20);
  
    // Wyrażenie regularne dopuszcza wszelkie znaki Unicode oprócz cyfr
    const regex = /^[^\d]*$/;
  
    if (regex.test(maxValueLength) || maxValueLength === "") {
      setCity(maxValueLength);
    }
  };
  

  const onStreetChanged = (e) => {
    const { value } = e.target;
    const maxValueLength = value.slice(0, 20);
  
    // Wyrażenie regularne dopuszcza wszelkie znaki Unicode oprócz cyfr
    const regex = /^[^\d]*$/;
  
    if (regex.test(maxValueLength) || maxValueLength === "") {
      setStreet(maxValueLength);
    }
  };
  
  

  const onHouseNumberChanged = (e) => {
    const { value } = e.target;
    const maxValueLength = value.slice(0, 10);
  
    // Sprawdź, czy wprowadzone dane to liczby, litery lub ewentualnie jeden znak '/'
    if (
      (/^[a-zA-Z\d/]*$/.test(maxValueLength) || maxValueLength === "") &&
      (maxValueLength.indexOf("/") === maxValueLength.lastIndexOf("/") ||
        maxValueLength.indexOf("/") === -1)
    ) {
      setHouseNumber(maxValueLength);
    }
  };
  

  const onPostalCodeChanged = (e) => {
    const { value } = e.target;
    const maxValueLength = value.slice(0, 10);

    // Sprawdź, czy wprowadzone dane to liczby i ewentualnie jeden znak '-'
    if (
      (/^[\d-]*$/.test(maxValueLength) || maxValueLength === "") &&
      (maxValueLength.indexOf("-") === maxValueLength.lastIndexOf("-") ||
        maxValueLength.indexOf("-") === -1)
    ) {
      setPostalCode(maxValueLength);
    }
  };

  const onDriverLicenseNumberChanged = (e) => {
    const { value } = e.target;
    const maxValueLength = value.slice(0, 16);
    // Sprawdź, czy wprowadzone dane to litery i cyfry (lub puste)
    if (
      (/^[a-zA-Z0-9/]*$/.test(maxValueLength) || maxValueLength === "") &&
      maxValueLength.length <= 16
    ) {
      setDriverLicenseNumber(maxValueLength);
    }
  };

  const onEmailChanged = (e) => {
    const { value } = e.target;
    const maxValueLength = value.slice(0, 30);

    // Sprawdź, czy wprowadzone dane to litery, cyfry, tylko jeden znak '@' i jeden znak '.'
    if (
      (/^[a-zA-Z0-9@.]*$/.test(maxValueLength) || maxValueLength === "") &&
      maxValueLength.indexOf("@") === maxValueLength.lastIndexOf("@") &&
      maxValueLength.indexOf("...") === maxValueLength.lastIndexOf("...")
    ) {
      setEmail(maxValueLength);
    }
  };

  const onPhoneNumberChanged = (e) => {
    const { value } = e.target;
  
    // Usuń spacje i znak '+', jeśli istnieją, aby dodać je na nowo po trzech cyfrach
    const cleanValue = value.replace(/[\s+]/g, '');
  
    // Podziel wartość na części po trzech cyfrach
    const parts = cleanValue.match(/\d{1,3}/g);
  
    // Jeśli istnieją części, połącz je spacją i dodaj ewentualny znak '+'
    let formattedValue = '';
    if (parts) {
      formattedValue = parts.join(' ');
      if (value.indexOf('+') === 0) {
        formattedValue = `+${formattedValue}`;
      }
    }
  
    // Ustaw sformatowany numer telefonu
    setPhoneNumber(formattedValue);
  };
  

  const onPromoCodeChanged = (e) => {
    const { value } = e.target;
    const maxValueLength = value.slice(0, 20);
    // Sprawdź, czy wprowadzone dane to litery i cyfry (lub puste)
    if (
      (/^[a-zA-Z0-9]*$/.test(maxValueLength) || maxValueLength === "") &&
      maxValueLength.length <= 20
    ) {
      setPromoCodeInput(maxValueLength);
    }
  };

  //const onReservationStatusChanged = (e) => setReservationStatus(e.target.value);
  //const onTotalRentalPrice = (e) => setTotalRentalPrice(roundedTotalRentalPrice);

  const [totalRentalPrice, setTotalRentalPrice] = useState("");

  

  useEffect(() => {
    setPromoCode("Brak");
  }, []);

  useEffect(() => {
    setTotalRentalPrice(roundedTotalRentalPrice);
  }, [roundedTotalRentalPrice]);

  //Komunikat znikający po 10 sekundach
  useEffect(() => {
    if (dateError) {
      const timeoutId = setTimeout(() => {
        setDateError(null);
      }, 10000);

      // Wyczyszczenie timeoutu, gdy komponent jest odmontowywany
      return () => clearTimeout(timeoutId);
    }
  }, [dateError]);

  const canSave =
    [
      car,
      startDate,
      endDate,
      protectionPackage,
      selectedOptions,
      selectedPaymentOption,
      firstName,
      lastName,
      country,
      city,
      street,
      houseNumber,
      postalCode,
      driverLicenseNumber,
      email,
      phoneNumber,
      promoCode,
      reservationStatus,
      totalRentalPrice,
    ].every(Boolean) && !isLoading;

  const onSaveReservationClicked = async () => {
    if (canSave) {
      const finalPromoCode = promoCodeInput || "Brak";
      await addNewReservation({
        car,
        startDate,
        endDate,
        protectionPackage,
        selectedOptions,
        selectedPaymentOption,
        firstName,
        lastName,
        country,
        city,
        street,
        houseNumber,
        postalCode,
        driverLicenseNumber,
        email,
        phoneNumber,
        promoCode: finalPromoCode,
        reservationStatus,
        totalRentalPrice, // Używamy totalRentalPrice
      });
      // navigate("/dash/dashboard/reservations");
    }
  };

  // const errClass = isError ? "errmsg" : "offscreen";
  // const validCarClass = !car ? "form__input--incomplete" : "";
  // const validStartDateClass = !startDate ? "form__input--incomplete" : "";
  // const validEndDateClass = !endDate ? "form__input--incomplete" : "";
  // const validProtectionPackageClass = !protectionPackage ? "form__input--incomplete" : "";
  // const validSelectedOptionsClass = !selectedOptions ? "form__input--incomplete" : "";
  // const validSelectedPaymentOptionClass = !selectedPaymentOption ? "form__input--incomplete" : "";

  const validFirstNameClass = !firstName ? "form__input--incomplete" : "";
  const validLastNameClass = !lastName ? "form__input--incomplete" : "";
  const validCountryClass = !country ? "form__input--incomplete" : "";
  const validCityClass = !city ? "form__input--incomplete" : "";
  const validStreetClass = !street ? "form__input--incomplete" : "";
  const validHouseNumberClass = !houseNumber ? "form__input--incomplete" : "";
  const validPostalCodeClass = !postalCode ? "form__input--incomplete" : "";
  const validDriverLicenseNumberClass = !driverLicenseNumber
    ? "form__input--incomplete"
    : "";
  const validEmailClass = !email ? "form__input--incomplete" : "";
  const validPhoneNumberClass = !phoneNumber ? "form__input--incomplete" : "";

  // const validPromoCodeClass = !promoCode ? "form__input--incomplete" : "";

  return (
    <>
      <Helmet title={"Podgląd pojazdu"} />
      <HomepageHeader />

      <div className="slider-placement">
        <div className="slider-container">
          {car.images.length >= 1 ? (
            <Slider {...sliderSettings}>
              {car.images.map((image, index) => (
                <div key={index} className="slider-slide">
                  <div
                    className="slider-slide-content"
                    style={{
                      backgroundImage: `url(${image})`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "100%",
                    }}
                  />
                </div>
              ))}
            </Slider>
          ) : null}
        </div>
      </div>

      <h2 className="faq__header">Parametry pojazdu</h2>

      <section className="section-center">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="col">
              <div className="card__details custom-card-shift-details text-center">
                <div className="card-body-details">
                  {/* Wartości danych pojazdu */}
                  <div className="row-details">
                    <hr className="hr__details"></hr>
                    <div className="d-flex flex-wrap justify-content-center">
                      <div className="col-md-2 pt-1">
                        <div className="mb-2">
                          <p className="fw-bold mb-1 text-label">Marka</p>
                          <p className="text-field">{car.brand}</p>
                        </div>
                      </div>

                      <div className="col-md-2 pt-1">
                        <div className="mb-2">
                          <p className="fw-bold mb-1 text-label">
                            Rodzaj paliwa
                          </p>
                          <p className="text-field">{car.fuelType}</p>
                        </div>
                      </div>

                      <div className="col-md-2 pt-1">
                        <div className="mb-2">
                          <p className="fw-bold mb-1 text-label">
                            Rok produkcji
                          </p>
                          <p className="text-field">{car.productionYear}</p>
                        </div>
                      </div>

                      <div className="col-md-2 pt-1">
                        <div className="mb-2">
                          <p className="fw-bold mb-1 text-label">Typ pojazdu</p>
                          <p className="text-field">{car.type}</p>
                        </div>
                      </div>

                      <div className="col-md-2 pt-1">
                        <div className="mb-2">
                          <p className="fw-bold mb-1 text-label">
                            Liczba pasażerów
                          </p>
                          <p className="text-field">{car.numOfPassengers}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row-details">
                    <hr className="hr__details"></hr>
                    <div className="d-flex flex-wrap justify-content-center">
                      <div className="col-md-2 pt-1">
                        <div className="mb-2">
                          <p className="fw-bold mb-1 text-label">Model</p>
                          <p className="text-field">{car.model}</p>
                        </div>
                      </div>

                      <div className="col-md-2 pt-1">
                        <div className="mb-2">
                          <p className="fw-bold mb-1 text-label">
                            Skrzynia biegów
                          </p>
                          <p className="text-field">{car.gearboxType}</p>
                        </div>
                      </div>

                      <div className="col-md-2 pt-1">
                        <div className="mb-2">
                          <p className="fw-bold mb-1 text-label">
                            Przebieg pojazdu
                          </p>
                          <p className="text-field">{car.vehicleMileage}</p>
                        </div>
                      </div>

                      <div className="col-md-2 pt-1">
                        <div className="mb-2">
                          <p className="fw-bold mb-1 text-label">
                            Cena za dzień (PLN)
                          </p>
                          <p className="text-field">{car.price}</p>
                        </div>
                      </div>

                      <div className="col-md-2 pt-1">
                        <div className="mb-2">
                          <p className="fw-bold mb-1 text-label">Moc (KM)</p>
                          <p className="text-field">{car.hp}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row-details">
                    <hr className="hr__details"></hr>
                    <div className="d-flex flex-wrap justify-content-center">
                      <div className="col-md-12 pt-1">
                        <div className="mb-2">
                          <p className="fw-bold mb-1 text-label">
                            Opis pojazdu
                          </p>
                          <p className="text-field-description">
                            {car.description}
                          </p>
                          <hr className="hr__details"></hr>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="fw-bold mb-1 text-label">Status pojazdu</p>
<div className="d-flex justify-content-center align-items-center">
  <p
    className={`fw-bold ${
      car.completed ? "text-success" : "text-danger"
    }`}
  >
    {car.completed ? "Dostępny" : "Wynajęty"}
  </p>
</div>
<hr className="hr__details"></hr>
<div className="d-flex justify-content-center align-items-center">
  <button
    onClick={openReservationForm}
    className={`btn btn-primary ${car.completed ? "" : "disabled"}`}
    disabled={!car.completed}
  >
    Zarezerwuj teraz
  </button>
</div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>











      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <div className="form-container">
          <Modal.Header closeButton>
            <Modal.Title>Formularz rezerwacji pojazdu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {currentStep === "dateSelection" && (
  <div className="mb-3 datePickerForm text-center">
    <h2 className="h2-final">Wybierz okres rezerwacji pojazdu</h2>

    <div className="start-end-date-picker">
      <div className="mb-3">
        <label htmlFor="startDatePicker" className="form-label">
          Data i godzina rozpoczęcia wynajmu:
        </label>
        <DatePicker
      popperPlacement=""
      className="rent-datePicker"
      id="startDate"
      name="startDate"
      selected={startDate}
      onChange={(date) => {
        console.log("StartDate changed:", date);
        setStartDate(date);
      }}
      onCalendarOpen={() => {
        // Ustaw minTime tylko dla dzisiejszej daty
        setCalendarOpened(true);
      }}
      onCalendarClose={() => {
        // Resetuj flagę po zamknięciu kalendarza
        setCalendarOpened(false);
      }}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      minTime={
        isToday(startDate) && startDate
          ? new Date().setMinutes(new Date().getMinutes())
          : new Date().setHours(6, 0, 0, 0)
      }
      maxTime={
        isToday(startDate)
          ? new Date().setHours(18, 0, 0, 0)
          : new Date().setHours(18, 0, 0, 0) // Ustaw maksymalną godzinę dla dat w przyszłości
      }
      timeCaption="Godzina"
      dateFormat="Pp"
      locale="pl"
      placeholderText="Wybierz termin rozpoczęcia"
      minDate={new Date()}
      customInput={<CustomDatePickerInput />}
    />
      </div>

      <div className="mb-3">
        <label htmlFor="endDatePicker" className="form-label">
          Data i godzina zakończenia wynajmu:
        </label>
        <DatePicker
  popperPlacement=""
  className="rent-datePicker"
  id="endDatePicker"
  selected={roundToNearestInterval(endDate || addDays(new Date(), 1), 15)}

  onChange={(date) => {
    console.log("EndDate changed:", date);
    setEndDate(date);
  }}
  showTimeSelect
  timeFormat="HH:mm"
  timeIntervals={15}
  minTime={
    isToday(endDate)
      ? new Date().setMinutes(new Date().getMinutes() + 15) // Ustawienie minTime na obecną godzinę z zaokrągleniem do najbliższego kwartału godziny
      : new Date().setHours(6, 0, 0, 0) // Ustawienie minTime na północ (00:00) dla dat w przyszłości
  }
  maxTime={new Date().setHours(18, 0, 0, 0)}
  timeCaption="Godzina"
  dateFormat="Pp"
  locale="pl"
  placeholderText="Wybierz termin zakończenia"
  minDate={addDays(new Date(), 1)} // Ustawienie minDate na obecną datę + 2 dni
  customInput={<CustomDatePickerInput />}
/>
      </div>
    </div>
    {/* Komunikat o błędzie */}
    {dateError && <div className="error-message">{dateError}</div>}
  </div>
)}



            {currentStep === "protectionPackageSelection" && (
              <div className="protection-packages">
                <h2>Wybierz pakiet ochronny</h2>
                <div className="package-list">
                  {protectionPackages.map((packageInfo) => (
                    <div
                      className={`protection-package ${
                        protectionPackage === packageInfo.name ? "selected" : ""
                      }`}
                      key={packageInfo.name}
                      onClick={() => handleSelectPackage(packageInfo.name)}
                    >
                      <h3
                        className={`h3__details ${
                          protectionPackage === packageInfo.name
                            ? "selected-text"
                            : ""
                        }`}
                      >
                        {packageInfo.name}
                      </h3>
                      <div className="data">
                        <p
                          className={`p__details__price ${
                            protectionPackage === packageInfo.name
                              ? "selected-text"
                              : ""
                          }`}
                        >
                          {packageInfo.price} PLN
                        </p>
                        {packageInfo.description && (
                          <p
                            className={`p__details ${
                              protectionPackage === packageInfo.name
                                ? "selected-text"
                                : ""
                            }`}
                          >
                            <span style={{ color: "green" }}>&#10004;</span>
                            {packageInfo.description}
                          </p>
                        )}
                        {packageInfo.description2 && (
                          <p
                            className={`p__details ${
                              protectionPackage === packageInfo.name
                                ? "selected-text"
                                : ""
                            }`}
                          >
                            <span style={{ color: "green" }}>&#10004;</span>
                            {packageInfo.description2}
                          </p>
                        )}
                        {packageInfo.description3 && (
                          <p
                            className={`p__details ${
                              protectionPackage === packageInfo.name
                                ? "selected-text"
                                : ""
                            }`}
                          >
                            &#10004; {packageInfo.description3}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === "optionsSelection" && (
              <div className="options-selection">
                <h2 className="centered">Wybierz dodatkowe opcje</h2>
                <div className="option-list centered">
                  {options.map((option) => (
                    <div
                      className={`option-item ${
                        selectedOptions.includes(option.name) ? "selected" : ""
                      }`}
                      key={option.name}
                      onClick={() => handleOptionClick(option.name)}
                    >
                      <div className="option-content">
                        <span className="option-name">{option.name}</span>
                        <span className="option-description">
                          {option.description}
                        </span>
                        <span className="option-price">{option.price} PLN</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* {currentStep === "paymentOptions" && (
              <div className="options-selection">
                <h2 className="centered">Wybierz opcję płatności</h2>
                <div className="centered">
                  <select
                    value={selectedPaymentOption}
                    onChange={handlePaymentOptionChange}
                    className="payment-options-select"
                  >
                    <option value="">Wybierz opcję płatności</option>
                    {paymentOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )} */}

            {currentStep === "personalInformation" && (
              <div className="personal-info-form">
                <h2 className="centered pb-4">Wprowadź dane osobowe</h2>
                <form className="personal-info-form">
                  <div className="row personal-info-row">
                    {/* Pierwsza kolumna */}

                    <div className="col-md-4">
                      <input
                        className={`personal-info-input ${validFirstNameClass}`}
                        type="text"
                        placeholder="Imię"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={onFirstNameChanged}
                      />

                      <input
                        className={`personal-info-input ${validLastNameClass}`}
                        type="text"
                        placeholder="Nazwisko"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={onLastNameChanged}
                      />

                      <input
                        className={`personal-info-input ${validCountryClass}`}
                        type="text"
                        placeholder="Kraj"
                        id="country"
                        name="country"
                        value={country}
                        onChange={onCountryChanged}
                      />

                      <input
                        className={`personal-info-input ${validStreetClass}`}
                        type="text"
                        placeholder="Ulica"
                        id="street"
                        name="street"
                        value={street}
                        onChange={onStreetChanged}
                      />

                      <input
                        className={`personal-info-input ${validHouseNumberClass}`}
                        type="text"
                        placeholder="Numer domu lub mieszkania"
                        id="houseNumber"
                        name="houseNumber"
                        value={houseNumber}
                        onChange={onHouseNumberChanged}
                      />
                    </div>

                    {/* Druga kolumna */}

                    <div className="col-md-4">
                      <input
                        className={`personal-info-input-2 ${validCityClass}`}
                        type="text"
                        placeholder="Miasto"
                        id="city"
                        name="city"
                        value={city}
                        onChange={onCityChanged}
                      />

                      <input
                        className={`personal-info-input-2 ${validPostalCodeClass}`}
                        type="text"
                        placeholder="Kod pocztowy"
                        id="postalCode"
                        name="postalCode"
                        value={postalCode}
                        onChange={onPostalCodeChanged}
                      />

                      <input
                        className={`personal-info-input-2 ${validDriverLicenseNumberClass}`}
                        type="text"
                        placeholder="Numer prawa jazdy"
                        id="driverLicenseNumber"
                        name="driverLicenseNumber"
                        value={driverLicenseNumber}
                        onChange={onDriverLicenseNumberChanged}
                      />

                      <input
                        className={`personal-info-input-2 ${validEmailClass}`}
                        type="text"
                        placeholder="Email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={onEmailChanged}
                      />

                      <input
                        className={`personal-info-input-2 ${validPhoneNumberClass}`}
                        type="text"
                        placeholder="Numer telefonu"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={onPhoneNumberChanged}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className={`personal-info-input-2 `}
                        type="text"
                        placeholder="Kod promocyjny"
                        id="promoCode"
                        name="promoCode"
                        value={promoCodeInput}
                        onChange={(e) => onPromoCodeChanged(e)}
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}

            {currentStep === "finalConfirmation" && (
              <div className="final-confirmation">
                <h2 className="h2-final text-center">
                  Podsumowanie rezerwacji
                </h2>
                <div className="row checkout">
                  <div className="col-md-6">
                    <h5>Początek okresu wypożyczenia:</h5>
                    <p className="mb-3">{formatDateTime(startDate)}</p>
                    <h5>Koniec okresu wypożyczenia:</h5>
                    <p className="mb-3">{formatDateTime(endDate)}</p>
                    <h5>Wybrany pakiet ochronny:</h5>
                    <p className="mb-3">{protectionPackage}</p>
                    <h5>Wybrane dodatkowe opcje:</h5>

                    {selectedOptions.length === 0 ? (
                      <p>Brak wybranych opcji</p>
                    ) : (
                      selectedOptions.map((option) => (
                        <p key={option}>{option}</p>
                      ))
                    )}
                  </div>

                  <div className="col-md-6">
                    <div className="price-item">
                      <h5>Cena wypożyczenia pojazdu za 1 dzień:</h5>
                      <p className="mb-3">{car.price} PLN</p>
                    </div>
                    <div className="price-item">
                      <h5>Cena wypożyczenia pojazdu za cały okres:</h5>
                      <p className="mb-3">{priceForDateRange} PLN</p>
                    </div>
                    <div className="price-item">
                      <h5>Cena za wybrany pakiet ochronny:</h5>
                      <p className="mb-3">{packagePrice} PLN</p>
                    </div>
                    <div className="price-item">
                      <h5>Cena za wybrane dodatkowe opcje:</h5>
                      <p className="mb-3">{optionsPrice} PLN</p>
                    </div>
                    <div className="price-item-full">
                      <hr className="hr__final-price"></hr>
                      <h5>Całkowita kwota wypożyczenia pojazdu:</h5>
                      <p className="final-price">
                        {roundedTotalRentalPrice} PLN
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-danger"
              onClick={() => {
                setShowModal(false);
                clearFormData(); // Wywołaj funkcję czyszczenia danych
              }}
            >
              Anuluj rezerwację
            </button>

            {currentStep === "finalConfirmation" ? (
              <>
                <button
                  className="btn btn-secondary"
                  onClick={handlePreviousStep}
                >
                  Wróć
                </button>
                <PayButton
                  reservedCar={car}
                  onReserveClick={onSaveReservationClicked}
                  roundedTotalRentalPrice={roundedTotalRentalPrice}
                  startDate={startDate}
                  endDate={endDate}
                />
              </>
            ) : (
              <>
                {currentStep !== "dateSelection" && (
                  <button
                    className="btn btn-secondary"
                    onClick={handlePreviousStep}
                  >
                    Wróć
                  </button>
                )}
                <button className="btn btn-primary" onClick={handleNextStep}>
                  Przejdź dalej
                </button>
              </>
            )}
          </Modal.Footer>
        </div>
      </Modal>
      <HomepageFooter />
    </>
  );
};

export default CarDetailsForm;
