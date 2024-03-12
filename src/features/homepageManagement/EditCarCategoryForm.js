import { useState, useEffect } from "react"
import { useUpdateCarMutation, useDeleteCarMutation } from "../cars/carsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"

const EditCarCategoryForm = ({ car, users }) => {

    useEffect(() => {
        setImages(car.images);
    }, [car.images]);
    

    const carCategories = [
      { label: "Najpopularniejsze auta", value: "mostPopularCars" },
      { label: "Nowo dodane auta", value: "recentlyAddedCars" },
      { label: "Auta miejskie", value: "cityCars" },
      { label: "Auta rodzinne", value: "familyCars" },
      { label: "Brak", value: "Brak" },
    ];
    
    const handleCarCategoryChange = (category) => {
      if (category === "Brak") {
        // Jeśli wybrano "Brak", usuń wszystkie inne opcje
        setCarCategory([category]);
      } else if (carCategory.includes("Brak")) {
        // Jeśli "Brak" jest już wybrany, usuń go i dodaj bieżącą opcję
        setCarCategory([category]);
      } else {
        // W przeciwnym razie dodaj bieżącą opcję do tablicy
        setCarCategory([...carCategory, category]);
      }
    };
      
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
    const [images, setImages] = useState([]); // Tablica do przechowywania linków do zdjęć
    const [carCategory, setCarCategory] = useState(car.carCategory)

    const [completed/*, setCompleted*/] = useState(car.completed)
    const [userId, setUserId] = useState(car.user)

    
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
            navigate('/dash/dashboard/homepageManagement')
        }

    }, [isSuccess, isDelSuccess, navigate])

    //const onTypeChanged = e => setType(e.target.value)
    //const onCompletedChanged = e => setCompleted(prev => !prev)
    //const onUserIdChanged = e => setUserId(e.target.value)

    //const onCarCategoryChanged = e => setCarCategory(e.target.value)

    const canSave = [brand, model, type, productionYear, vehicleMileage, fuelType, gearboxType, numOfPassengers, price, hp, description, images, carCategory, userId].every(Boolean) && !isLoading

    const onSaveCarClicked = async (e) => {
        if (canSave) {
            await updateCar({ id: car.id, user: userId, brand, model, type, productionYear, vehicleMileage, fuelType, gearboxType, numOfPassengers, carCategory, price, hp, description, images: images, completed })
            navigate('/dash/dashboard/homepageManagement');
        }
    }

   
    const onDeleteCarClicked = async () => {
        await deleteCar({ id: car.id })
        navigate('/dash/dashboard/homepageManagement');
    }

  
    const created = new Date(car.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(car.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    // const options = users.map(user => {
    //     return (
    //         <option
    //             key={user.id}
    //             value={user.id}

    //         > {user.username}</option >
    //     )
    // })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    //const validTypeClass = !type ? "form__input--incomplete" : ''
    //const validCarCategoryClass = !carCategory ? "form__input--incomplete" : ''


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

                <label className="form__label">Wybierz kategorię pojazdu:</label>
<div className="checkbox-grid">
  <div className="row">
    {carCategories.slice(0, 2).map((category) => (
      <div key={category.value} className="col-md-6">
        <label className="checkbox-label">
          <input
            type="checkbox"
            id={category.value}
            name="carCategories"
            value={category.value}
            checked={carCategory.includes(category.value)}
            onChange={() => handleCarCategoryChange(category.value)}
          />
          <span className="p-2">{category.label}</span>
        </label>
      </div>
    ))}
  </div>

  <div className="row">
    {carCategories.slice(2, 4).map((category) => (
      <div key={category.value} className="col-md-6">
        <label className="checkbox-label">
          <input
            type="checkbox"
            id={category.value}
            name="carCategories"
            value={category.value}
            checked={carCategory.includes(category.value)}
            onChange={() => handleCarCategoryChange(category.value)}
          />
          <span className="checkbox-text p-2">{category.label}</span>
        </label>
      </div>
    ))}
  </div>

  <div className="row">
    {carCategories.slice(4, 5).map((category) => (
      <div key={category.value} className="col-md-6">
        <label className="checkbox-label">
          <input
            type="checkbox"
            id={category.value}
            name="carCategories"
            value={category.value}
            checked={carCategory.includes(category.value)}
            onChange={() => handleCarCategoryChange(category.value)}
          />
          <span className="checkbox-text p-2">{category.label}</span>
        </label>
      </div>
    ))}
  </div>
</div>



                <div className="form__row">
                    <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="note-username">
                            Pojazd przypisany do użytkownika:</label>
                        <p
                            id="note-username">
                            {car.username}
                        </p>
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

export default EditCarCategoryForm