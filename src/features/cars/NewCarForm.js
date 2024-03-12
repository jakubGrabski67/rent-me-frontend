import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewCarMutation } from "../cars/carsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

import "./newCarForm.css";

const NewCarForm = ({ users }) => {

    const [addNewCar, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewCarMutation()

    const navigate = useNavigate()

    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [type, setType] = useState('')
    const [productionYear, setProductionYear] = useState('')
    const [vehicleMileage, setVehicleMileage] = useState('')
    const [fuelType, setFuelType] = useState('')
    const [gearboxType, setGearboxType] = useState('')
    const [numOfPassengers, setNumOfPassengers] = useState('')
    const [price, setPrice] = useState('')
    const [hp, setHp] = useState('')
    const [description, setDescription] = useState('')
    const [carCategory, setCarCategory] = useState(["Brak"])
    const [images, setImages] = useState([]); // Tablica do przechowywania linków do zdjęć
    const [newImageUrls, setNewImageUrls] = useState(""); // Wprowadzane linki do zdjęć w jednym polu
    const [userId, setUserId] = useState(users[0].id)

    const handleImageSubmit = (e) => {
        e.preventDefault(); // Zapobieganie domyślnej akcji formularza
        if (newImageUrls.trim() !== "") {
          const urls = newImageUrls
            .split(/[\s,]+/)
            .filter((url) => url.trim() !== ""); // Dzieli linki po spacjach i przecinkach, usuwa puste elementy
          setImages((prevImages) => [...new Set([...prevImages, ...urls])]); // Dodawanie tylko unikalnych linków
          setNewImageUrls("");
        }
      };

    useEffect(() => {
        if (isSuccess) {
            setBrand('')
            setModel('')
            setType('')
            setProductionYear('')
            setVehicleMileage('')
            setFuelType('')
            setGearboxType('')
            setNumOfPassengers('')
            setPrice('')
            setHp('')
            setDescription('')
            setCarCategory([])
            setImages('')
            setUserId('')
            navigate('/dash/cars')
        }
    }, [isSuccess, navigate])

    const onBrandChanged = e => setBrand(e.target.value)
    const onModelChanged = e => setModel(e.target.value)
    const onTypeChanged = e => setType(e.target.value)
    const onProductionYearChanged = e => setProductionYear(e.target.value)
    const onVehicleMileageChanged = e => setVehicleMileage(e.target.value)
    const onFuelTypeChanged = e => setFuelType(e.target.value)
    const onGearboxTypeChanged = e => setGearboxType(e.target.value)
    const onNumOfPassengersChanged = e => setNumOfPassengers(e.target.value)
    const onPriceChanged = e => setPrice(e.target.value)
    const onHpChanged = e => setHp(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [brand, model, type, productionYear, vehicleMileage, fuelType, gearboxType, numOfPassengers, price, hp, description, images, userId].every(Boolean) && !isLoading

    const onSaveCarClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewCar({ user: userId, brand, model, type, productionYear, vehicleMileage, fuelType, gearboxType, numOfPassengers, price, hp, description, carCategory, images })
            navigate('/dash/dashboard/flota');
        }
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validBrandClass = !brand ? "form__input--incomplete" : ''
    const validModelClass = !model ? "form__input--incomplete" : ''
    const validTypeClass = !type ? "form__input--incomplete" : ''
    const validProductionYearClass = !productionYear ? "form__input--incomplete" : ''
    const validVehicleMileageClass = !vehicleMileage ? "form__input--incomplete" : ''
    const validFuelTypeClass = !fuelType ? "form__input--incomplete" : ''
    const validGearboxTypeClass = !gearboxType ? "form__input--incomplete" : ''
    const validNumOfPassengersClass = !numOfPassengers ? "form__input--incomplete" : ''
    const validPriceClass = !price ? "form__input--incomplete" : ''
    const validHpClass = !hp ? "form__input--incomplete" : ''
    const validDescriptionClass = !description ? "form__input--incomplete" : ''
    const validImagesClass = !newImageUrls ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveCarClicked}>
                <div className="form__title-row">
                    <h2>Formularz dodawania nowego pojazdu</h2>
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

                                <label className="form__label" htmlFor="title">
                    Marka:</label>
                <input
                    className={`form__input ${validBrandClass}`}
                    id="brand"
                    name="brand"
                    type="text"
                    autoComplete="off"
                    value={brand}
                    onChange={onBrandChanged}
                />

                <label className="form__label" htmlFor="title">
                    Model:</label>
                <textarea
                    className={`form__input form__input--title ${validModelClass}`}
                    id="model"
                    name="model"
                    value={model}
                    onChange={onModelChanged}
                />

                <label className="form__label" htmlFor="title">
                    Typ:</label>
                <select
                    className={`h-25 m-0 w-50 form__input ${validTypeClass}`}
                    id="type"
                    name="type"
                    value={type}
                    onChange={onTypeChanged}
                >
                    <option value="" disabled hidden>
                        Wybierz typ pojazdu...
                    </option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">Coupe</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Kombi">Kombi</option>
                    <option value="VAN">VAN</option>
                    <option value="SUV">SUV</option>
                    <option value="Crossover">Crossover</option>
                </select>

                <label className="form__label" htmlFor="title">
                    Rok produkcji:</label>
                <textarea
                    className={`form__input form__input--title ${validProductionYearClass}`}
                    id="productionYear"
                    name="productionYear"
                    value={productionYear}
                    onChange={onProductionYearChanged}
                />

                <label className="form__label" htmlFor="title">
                    Przebieg pojazdu:</label>
                <textarea
                    className={`form__input form__input--title ${validVehicleMileageClass}`}
                    id="vehicleMileage"
                    name="vehicleMileage"
                    value={vehicleMileage}
                    onChange={onVehicleMileageChanged}
                />

                <label className="form__label" htmlFor="title">
                    Typ paliwa:</label>
                <select
                    className={`h-25 m-0 w-50 form__input ${validFuelTypeClass}`}
                    id="fuelType"
                    name="fuelType"
                    value={fuelType}
                    onChange={onFuelTypeChanged}
                >
                    <option value="" disabled hidden>
                        Wybierz typ paliwa...
                    </option>
                    <option value="Benzyna">Benzyna</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Benzyna + LPG">Benzyna + LPG</option>
                    <option value="Hybryda">Hybryda</option>
                    <option value="Elektryczny">Elektryczny</option>
                </select>

                <label className="form__label" htmlFor="title">
                    Typ skrzyni biegów:</label>
                <select
                    className={`h-25 m-0 w-50 form__input ${validGearboxTypeClass}`}
                    id="gearboxType"
                    name="gearboxType"
                    value={gearboxType}
                    onChange={onGearboxTypeChanged}
                >
                    <option value="" disabled hidden>
                        Wybierz typ skrzyni biegów...
                    </option>
                    <option value="Automatyczna">Automatyczna</option>
                    <option value="Manualna">Manualna</option>
                </select>

                <label className="form__label" htmlFor="title">
                    Liczba miejsc:</label>
                <textarea
                    className={`form__input form__input--title ${validNumOfPassengersClass}`}
                    id="numOfPassengers"
                    name="numOfPassengers"
                    value={numOfPassengers}
                    onChange={onNumOfPassengersChanged}
                />

                <label className="form__label" htmlFor="title">
                    Cena:</label>
                <textarea
                    className={`form__input form__input--title ${validPriceClass}`}
                    id="price"
                    name="price"
                    value={price}
                    onChange={onPriceChanged}
                />

                <label className="form__label" htmlFor="title">
                    Liczba KM:</label>
                <textarea
                    className={`form__input form__input--title ${validHpClass}`}
                    id="hp"
                    name="hp"
                    value={hp}
                    onChange={onHpChanged}
                />

                <label className="form__label" htmlFor="note-text">
                    Opis:</label>
                <textarea
                    className={`form__input form__input--text ${validDescriptionClass}`}
                    id="car-description"
                    name="description"
                    value={description}
                    onChange={onDescriptionChanged}
                />

        
                <label className="form__label form__checkbox-container" htmlFor="username">
                Zdjęcia w postaci linków:</label>
                <input
                    type="text"
                    className={`form__input form__input--text ${validImagesClass}`}
                    id="images"
                    name="images"
                    value={newImageUrls}
                    onChange={(e) => setNewImageUrls(e.target.value)}
                    />
                <button className="addImagesButton" type="button" onClick={handleImageSubmit}>
                    Dodaj zdjęcia
                </button>
  {/* Wyświetlenie liczby dodanych zdjęć */}
                <p className="image-count">
                    Dodane zdjęcia: {images.length}
                </p>

                <div className="image-row">
                    {images.map((imageUrl, index) => (
                        <div key={index} className="image-item">
                            <img src={imageUrl} alt={`${index + 1}`} />
                            <button
                                className="remove-button"
                                onClick={(e) => {
                                e.preventDefault(); // Zapobiegaj odświeżeniu strony
                                setImages(images.filter((_, i) => i !== index));
                                }}
                            >
                            Usuń zdjęcie
                            </button>
                        </div>
                        ))}
                </div>
        

                <label className="form__label form__checkbox-container" htmlFor="username">
                    Pojazd przypisany do użytkownika:</label>
                <select
                    id="username"
                    name="username"
                    className="form__select"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>

            </form>
        </>
    )

    return content
}

export default NewCarForm