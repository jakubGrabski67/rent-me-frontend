import { useState, useEffect } from "react"
import { useUpdateCarMutation, useDeleteCarMutation } from "../cars/carsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"; // Import react-beautiful-dnd

const EditCarForm = ({ car, users }) => {

    

     const onDeleteImageClicked = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

       const onDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedImages = Array.from(images);
        const [moved] = reorderedImages.splice(result.source.index, 1);
        reorderedImages.splice(result.destination.index, 0, moved);

        setImages(reorderedImages);
    };

    const [imagesCount] = useState(car.images);
    const [newImages, setNewImages] = useState(""); // Dodawane linki do zdjęć w jednym polu
    

    useEffect(() => {
        setImages(car.images);
    }, [car.images]);
    


    const { isManager, isAdmin } = useAuth()

    const [updateCar, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateCarMutation()
  
    const [deleteCar, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteCarMutation()

    const navigate = useNavigate()

    const [brand, setBrand] = useState(car.brand)
    const [model, setModel] = useState(car.model)
    const [type, setType] = useState(car.type)
    const [productionYear, setProductionYear] = useState(car.productionYear)
    const [vehicleMileage, setVehicleMileage] = useState(car.vehicleMileage)
    const [fuelType, setFuelType] = useState(car.fuelType)
    const [gearboxType, setGearboxType] = useState(car.gearboxType)
    const [numOfPassengers, setNumOfPassengers] = useState(car.numOfPassengers)
    const [price, setPrice] = useState(car.price)
    const [hp, setHp] = useState(car.hp)
    const [description, setDescription] = useState(car.description)
    const [carCategory, setCarCategory] = useState(car.carCategory)
    const [images, setImages] = useState([]); // Tablica do przechowywania linków do zdjęć

    const [completed, setCompleted] = useState(car.completed)
    const [userId, setUserId] = useState(car.user)

    const handleImageSubmit = (e) => {
        e.preventDefault();
        if (newImages.trim() !== "") {
            const urls = newImages
                .split(/[\s,]+/)
                .filter((url) => url.trim() !== "");
            setImages((prevImages) => [...prevImages, ...urls]);
            setNewImages("");
        }
    };
    
    useEffect(() => {

        if (isSuccess || isDelSuccess) {
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
            setCarCategory('')
            setImages('')
            setUserId('')
            navigate('/dash/dashboard/flota')
        }

    }, [isSuccess, isDelSuccess, navigate])

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
    // const onCarCategoryChanged = e => setCarCategory(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [brand, model, type, productionYear, vehicleMileage, fuelType, gearboxType, numOfPassengers, price, hp, description, carCategory, images, userId].every(Boolean) && !isLoading

    const onSaveCarClicked = async (e) => {
        if (canSave) {
            await updateCar({ id: car.id, user: userId, brand, model, type, productionYear, vehicleMileage, fuelType, gearboxType, numOfPassengers, price, hp, description, carCategory, images: images, completed })
            navigate('/dash/dashboard/flota');
        }
    }

   
    const onDeleteCarClicked = async () => {
        await deleteCar({ id: car.id })
        navigate('/dash/dashboard/flota');
    }

  
    const created = new Date(car.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(car.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
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
    

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                brand="Delete"
                onClick={onDeleteCarClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edytuj pojazd z ID: {car._id}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            brand="Save"
                            onClick={onSaveCarClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
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
                    <option value="Manualna">Manualna</option>
                    <option value="Automatyczna">Automatyczna</option>
                    
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
                className={`form__input form__input--text`}
                id="images"
                name="images"
                value={newImages}
                onChange={(e) => setNewImages(e.target.value)}
            />
            <button className="addImagesButton" type="button" onClick={handleImageSubmit}>
                Dodaj zdjęcia
            </button>

            <p className="image-count">
                Dodane zdjęcia: {imagesCount.length + newImages.split(/[\s,]+/).filter((url) => url.trim() !== "").length}
            </p>

            <DragDropContext onDragEnd={onDragEnd}>
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
</DragDropContext>





                <div className="form__row">
                    <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="note-completed">
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

                        <label className="form__label form__checkbox-container" htmlFor="note-username">
                            Pojazd przypisany do użytkownika:</label>
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
                        <p className="form__created">Utworzono:<br />{created}</p>
                        <p className="form__updated">Edytowano:<br />{updated}</p>
                    </div>
                </div>
            </form>
        </>
    )

    return content
}

export default EditCarForm