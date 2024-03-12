import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewReservationMutation } from "../reservation/reservationApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";

// import "./newCarForm.css";

const NewReservationForm = ({ users }) => {

  registerLocale("pl", pl);

  const options = [
    "Fotelik: podkładka",
    "Fotelik dziecięcy: 9-36 kg",
    "Zestaw nawigacji GPS",
    "Końcowe mycie pojazdu",
    "Brak",
  ];

  const handleOptionChange = (option) => {
    if (option === "Brak") {
      // Jeśli wybrano "Brak", usuń wszystkie inne opcje
      setSelectedOptions(["Brak"]);
    } else if (selectedOptions.includes("Brak")) {
      // Jeśli "Brak" jest obecny w tablicy, zamień go na wybraną opcję
      setSelectedOptions([option]);
    } else if (selectedOptions.includes(option)) {
      // Jeśli opcja jest już zaznaczona, usuwamy ją z tablicy
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      // W przeciwnym razie dodaj opcję do tablicy
      setSelectedOptions([...selectedOptions, option]);
    }
  };

    const [addNewReservation, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewReservationMutation()

    const navigate = useNavigate()

    const [car, setCar] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [protectionPackage, setProtectionPackage] = useState('');
    const [selectedOptions, setSelectedOptions] = useState('');
    const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [driverLicenseNumber, setDriverLicenseNumber] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [reservationStatus, setReservationStatus] = useState('');
    const [totalRentalPrice, setTotalRentalPrice] = useState('');

    useEffect(() => {
        if (isSuccess) {
      setCar("");
      setStartDate("");
      setEndDate("");
      setProtectionPackage("");
      setSelectedOptions("");
      setSelectedPaymentOption("");
      setFirstName("");
      setLastName("");
      setCountry("");
      setCity("");
      setStreet("");
      setHouseNumber("");
      setPostalCode("");
      setDriverLicenseNumber("");
      setEmail("");
      setPhoneNumber("");
      setPromoCode("");
      setReservationStatus("");
      setTotalRentalPrice("");
      navigate("/dash/dashboard/reservations");
        }
    }, [isSuccess, navigate])

  const onCarChanged = (e) => setCar(e.target.value);
  //const onStartDateChanged = (e) => setStartDate(e.target.value);
 // const onEndDateChanged = (e) => setEndDate(e.target.value);
  const onProtectionPackageChanged = (e) => setProtectionPackage(e.target.value);
  //const onSelectedOptionsChanged = (e) => setSelectedOptions(e.target.value);
  const onSelectedPaymentOptionChanged = (e) => setSelectedPaymentOption(e.target.value);
  const onFirstNameChanged = (e) => setFirstName(e.target.value);
  const onLastNameChanged = (e) => setLastName(e.target.value);
  const onCountryChanged = (e) => setCountry(e.target.value);
  const onCityChanged = (e) => setCity(e.target.value);
  const onStreetChanged = (e) => setStreet(e.target.value);
  const onHouseNumberChanged = (e) => setHouseNumber(e.target.value);
  const onPostalCodeChanged = (e) => setPostalCode(e.target.value);
  const onDriverLicenseNumberChanged = (e) => setDriverLicenseNumber(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPhoneNumberChanged = (e) => setPhoneNumber(e.target.value);
  const onPromoCodeChanged = (e) => setPromoCode(e.target.value);
  const onReservationStatusChanged = (e) => setReservationStatus(e.target.value);
  const onTotalRentalPriceChanged = (e) => setTotalRentalPrice(e.target.value);

    const onStartDateChange = (newStartDate, setStartDate) => {
      console.log("Nowa data rozpoczęcia:", newStartDate);
      setStartDate(newStartDate); // Aktualizacja stanu komponentu
    };
  
    const onEndDateChange = (newEndDate, setEndDate) => {
      console.log("Nowa data zakończenia:", newEndDate);
      setEndDate(newEndDate); // Aktualizacja stanu komponentu
    };

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
    totalRentalPrice
  ].every(Boolean) && !isLoading;

  const onSaveReservationClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
        await addNewReservation({ car,
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
            totalRentalPrice
          })
        navigate('/dash/dashboard/reservations');
    }
}

    // const options = users.map(user => {
    //     return (
    //         <option
    //             key={user.id}
    //             value={user.id}
    //         > {user.username}</option >
    //     )
    // })

    const errClass = isError ? "errmsg" : "offscreen"
    const validCarClass = !car ? "form__input--incomplete" : "";
    //const validStartDateClass = !startDate ? "form__input--incomplete" : "";
    //const validEndDateClass = !endDate ? "form__input--incomplete" : "";
    const validProtectionPackageClass = !protectionPackage ? "form__input--incomplete" : "";
    //const validSelectedOptionsClass = !selectedOptions ? "form__input--incomplete" : "";
    const validSelectedPaymentOptionClass = !selectedPaymentOption ? "form__input--incomplete" : "";
    const validFirstNameClass = !firstName ? "form__input--incomplete" : "";
    const validLastNameClass = !lastName ? "form__input--incomplete" : "";
    const validCountryClass = !country ? "form__input--incomplete" : "";
    const validCityClass = !city ? "form__input--incomplete" : "";
    const validStreetClass = !street ? "form__input--incomplete" : "";
    const validHouseNumberClass = !houseNumber ? "form__input--incomplete" : "";
    const validPostalCodeClass = !postalCode ? "form__input--incomplete" : "";
    const validDriverLicenseNumberClass = !driverLicenseNumber ? "form__input--incomplete" : "";
    const validEmailClass = !email ? "form__input--incomplete" : "";
    const validPhoneNumberClass = !phoneNumber ? "form__input--incomplete" : "";
    const validPromoCodeClass = !promoCode ? "form__input--incomplete" : "";

    const content = (
        <>
          <p className={errClass}>{error?.data?.message}</p>
    
          <form className="form" onSubmit={onSaveReservationClicked}>
                <div className="form__title-row">
                    <h2>Formularz dodawania nowej rezerwacji</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            brand="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
    
                <label>Data rozpoczęcia:</label>
        <DatePicker
          className="h-25 m-0 w-50 form__input"
          selected={startDate ? new Date(startDate) : null}
          onChange={(newStartDate) =>
            onStartDateChange(newStartDate, setStartDate)
          }
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="d.MM.yyyy, HH:mm"
          timeCaption="Godzina"
          minTime={new Date().setHours(6, 0, 0, 0)}
          maxTime={new Date().setHours(17, 0, 0, 0)}
          locale="pl"
        />

        <label>Data zakończenia:</label>
        <DatePicker
          className="h-25 m-0 w-50 form__input"
          selected={endDate ? new Date(endDate) : null}
          onChange={(newEndDate) => onEndDateChange(newEndDate, setEndDate)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="d.MM.yyyy, HH:mm"
          timeCaption="Godzina"
          minTime={new Date().setHours(6, 0, 0, 0)}
          maxTime={new Date().setHours(17, 0, 0, 0)}
          locale="pl"
        />
    
            <label className="form__label" htmlFor="title">
              ID zarezerwowanego pojazdu:
            </label>
            <input
              className={`form__input ${validCarClass}`}
              id="car"
              name="car"
              type="text"
              autoComplete="off"
              value={car}
              onChange={onCarChanged}
            />
    
            <label className="form__label" htmlFor="title">
              Pakiet ochronny:
            </label>
            <select
              className={`h-25 m-0 w-50 form__input ${validProtectionPackageClass}`}
              id="protectionPackage"
              name="protectionPackage"
              value={protectionPackage}
              onChange={onProtectionPackageChanged}
            >
              <option value="" disabled hidden>
                Wybierz pakiet ochronny...
              </option>
              <option value="Standard">Standard</option>
              <option value="Gold">Gold</option>
              <option value="Platinium">Platinium</option>
            </select>
    
            <label className="form__label">Opcje dodatkowe:</label>
        <div className="checkbox-grid">
          <div className="row">
            {options.slice(0, 2).map((option) => (
              <div key={option} className="col-md-6">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleOptionChange(option)}
                  />
                  <span className="p-2">{option}</span>
                </label>
              </div>
            ))}
          </div>

          <div className="row">
            {options.slice(2, 4).map((option) => (
              <div key={option} className="col-md-6">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleOptionChange(option)}
                  />
                  <span className="checkbox-text p-2">{option}</span>
                </label>
              </div>
            ))}
          </div>

          <div className="row">
            {options.slice(4, 5).map((option) => (
              <div key={option} className="col-md-6">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleOptionChange(option)}
                  />
                  <span className="checkbox-text p-2">{option}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
    
            <label className="form__label" htmlFor="title">
              Forma płatności:
            </label>
            <select
              className={`h-25 m-0 w-50 form__input ${validSelectedPaymentOptionClass}`}
              id="selectedPaymentOption"
              name="selectedPaymentOption"
              value={selectedPaymentOption}
              onChange={onSelectedPaymentOptionChanged}
            >
              <option value="" disabled hidden>
                Wybierz formę płatności...
              </option>
              <option value="Karta kredytowa">Karta kredytowa</option>
              <option value="Przelew bankowy">Przelew bankowy</option>
              <option value="Paypal">Paypal</option>
              <option value="Gotówka">Gotówka</option>
            </select>
    
            <label className="form__label" htmlFor="title">
              Imię:
            </label>
            <textarea
              className={`form__input form__input--title ${validFirstNameClass}`}
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={onFirstNameChanged}
            />
    
            <label className="form__label" htmlFor="title">
              Nazwisko:
            </label>
            <textarea
              className={`form__input form__input--title ${validLastNameClass}`}
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={onLastNameChanged}
            />
    
            <label className="form__label" htmlFor="title">
              Kraj:
            </label>
            <textarea
              className={`form__input form__input--title ${validCountryClass}`}
              id="country"
              name="country"
              value={country}
              onChange={onCountryChanged}
            />
    
            <label className="form__label" htmlFor="title">
              Miasto:
            </label>
            <textarea
              className={`form__input form__input--title ${validCityClass}`}
              id="city"
              name="city"
              value={city}
              onChange={onCityChanged}
            />
    
            <label className="form__label" htmlFor="title">
              Ulica:
            </label>
            <textarea
              className={`form__input form__input--title ${validStreetClass}`}
              id="street"
              name="street"
              value={street}
              onChange={onStreetChanged}
            />
    
            <label className="form__label" htmlFor="title">
              Numer domu:
            </label>
            <textarea
              className={`form__input form__input--title ${validHouseNumberClass}`}
              id="houseNumber"
              name="houseNumber"
              value={houseNumber}
              onChange={onHouseNumberChanged}
            />
    
            <label className="form__label" htmlFor="title">
              Kod pocztowy:
            </label>
            <textarea
              className={`form__input form__input--title ${validPostalCodeClass}`}
              id="postalCode"
              name="postalCode"
              value={postalCode}
              onChange={onPostalCodeChanged}
            />
    
            <label className="form__label" htmlFor="title">
              Numer prawa jazdy:
            </label>
            <textarea
              className={`form__input form__input--title ${validDriverLicenseNumberClass}`}
              id="driverLicenseNumber"
              name="driverLicenseNumber"
              value={driverLicenseNumber}
              onChange={onDriverLicenseNumberChanged}
            />
    
    <label className="form__label" htmlFor="note-text">
          Email:
        </label>
        <textarea
          className={`form__input form__input--title ${validEmailClass}`}
          id="email"
          name="email"
          value={email}
          onChange={onEmailChanged}
        />
    
    <label className="form__label" htmlFor="note-text">
          Numer telefonu:
        </label>
        <textarea
          className={`form__input form__input--title ${validPhoneNumberClass}`}
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={onPhoneNumberChanged}
        />

        <label className="form__label" htmlFor="note-text">
          Kod promocyjny:
        </label>
        <textarea
          className={`form__input form__input--title ${validPromoCodeClass}`}
          id="promoCode"
          name="promoCode"
          value={promoCode}
          onChange={onPromoCodeChanged}
        />

<label className="form__label" htmlFor="note-text">
          Cena za okres wypożyczenia:
        </label>
        <textarea
          className={`form__input form__input--title`}
          id="totalRentalPrice"
          name="totalRentalPrice"
          value={totalRentalPrice}
          onChange={onTotalRentalPriceChanged}
        />

<div className="form__divider">
            <label className="form__label" htmlFor="note-text">
              Wybierz status rezerwacji:
            </label>
            <div className="form__checkbox-container">
              <label className="form__checkbox-label">
                <input
                  className="form__checkbox"
                  name="reservationStatus"
                  type="checkbox"
                  value="Zakończono"
                  checked={reservationStatus.includes("Zakończono")}
                  onChange={onReservationStatusChanged}
                />
                <span
                  style={{
                    display: "inline-block",
                    verticalAlign: "7px", // Przykładowa wartość -4 piksele
                    marginLeft: "8px",
                  }}
                >
                  Zakończono
                </span>
              </label>
              <label className="form__checkbox-label">
                <input
                  className="form__checkbox"
                  name="reservationStatus"
                  type="checkbox"
                  value="W trakcie"
                  checked={reservationStatus.includes("W trakcie")}
                  onChange={onReservationStatusChanged}
                />
                <span
                  style={{
                    display: "inline-block",
                    verticalAlign: "7px", // Przykładowa wartość -4 piksele
                    marginLeft: "8px",
                  }}
                >
                  W trakcie
                </span>
              </label>
              <label className="form__checkbox-label">
                <input
                  className="form__checkbox"
                  name="reservationStatus"
                  type="checkbox"
                  value="Oczekuje na potwierdzenie"
                  checked={reservationStatus.includes(
                    "Oczekuje na potwierdzenie"
                  )}
                  onChange={onReservationStatusChanged}
                />
                <span
                  style={{
                    display: "inline-block",
                    verticalAlign: "7px", // Przykładowa wartość -4 piksele
                    marginLeft: "8px",
                  }}
                >
                  Oczekuje na potwierdzenie
                </span>
              </label>
            </div>
          </div>
    
            {/* <label
              className="form__label form__checkbox-container"
              htmlFor="username"
            >
              Zdjęcia w postaci linków:
            </label>
            <input
              type="text"
              className={`form__input form__input--text`}
              id="images"
              name="images"
              value={newImages}
              onChange={(e) => setNewImages(e.target.value)}
            />
            <button
              className="addImagesButton"
              type="button"
              onClick={handleImageSubmit}
            >
              Dodaj zdjęcia
            </button>
    
            <p className="image-count">
              Dodane zdjęcia:{" "}
              {imagesCount.length +
                newImages.split(/[\s,]+/).filter((url) => url.trim() !== "").length}
            </p> */}
    
            {/* <DragDropContext onDragEnd={onDragEnd}>
              {images.length >= 1 && ( // Warunek sprawdzający, czy jest więcej niż 1 zdjęcie
                <Droppable droppableId="droppableImages" direction="horizontal">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="image-row"
                    >
                      {images.map((imageUrl, index) => (
                        <Draggable
                          key={index}
                          draggableId={`image-${index}`}
                          index={index}
                          isDragDisabled={images.length === 1} // Wyłączenie przesuwania, gdy jest tylko 1 zdjęcie
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="image-item"
                            >
                              <img src={imageUrl} alt={`${index + 1}`} />
                              <button
                                className="remove-button"
                                onClick={() => onDeleteImageClicked(index)}
                              >
                                Usuń zdjęcie
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}
            </DragDropContext> */}
    
            {/* <div className="form__row">
              <div className="form__divider">
                <label
                  className="form__label form__checkbox-container"
                  htmlFor="note-completed"
                >
                  Czy pojazd jest dostępny do wypożyczenia?
                  <input
                    className="form__checkbox"
                    id="note-completed"
                    name="completed"
                    type="checkbox"
                    checked={completed}
                    onChange={onCompletedChanged}
                  />
                </label>
    
                <label
                  className="form__label form__checkbox-container"
                  htmlFor="note-username"
                >
                  Pojazd przypisany do użytkownika:
                </label>
                <select
                  id="note-username"
                  name="username"
                  className="form__select"
                  value={userId}
                  onChange={onUserIdChanged}
                >
                  {options}
                </select>
              </div>
              <div className="form__divider">
                <p className="form__created">
                  Utworzono:
                  <br />
                  {created}
                </p>
                <p className="form__updated">
                  Edytowano:
                  <br />
                  {updated}
                </p>
              </div>
            </div> */}
          </form>
        </>
      );
    
      return content;
    };

export default NewReservationForm