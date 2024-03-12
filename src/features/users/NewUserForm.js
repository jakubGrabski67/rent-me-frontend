import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"

const USER_REGEX = /^(?=.*[A-Z])[A-Za-z]{3,20}$/
const PWD_REGEX = /^(?=.*[A-Z])(?=.*[!@#$%])[A-Za-z0-9!@#$%]{4,12}$/


const NewUserForm = () => {

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(["Employee"])
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [nationality, setNationality] = useState('')
    const [address, setAddress] = useState('')
    const [gender, setGender] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [profilePicture, setProfilePicture] = useState('')

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            setName('')
            setSurname('')
            setDateOfBirth('')
            setNationality('')
            setAddress('')
            setGender('')
            setPhoneNumber('')
            setProfilePicture('')
            navigate('/dash/users')
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onNameChanged = e => setName(e.target.value)
    const onSurnameChanged = e => setSurname(e.target.value)
    const onDateOfBirthChanged = e => setDateOfBirth(e.target.value)
    const onNationalityChanged = e => setNationality(e.target.value)
    const onAddressChanged = e => setAddress(e.target.value)
    const onGenderChanged = e => setGender(e.target.value)
    const onPhoneNumberChanged = e => setPhoneNumber(e.target.value)
    const onProfilePictureChanged = e => setProfilePicture(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }

    const canSave = [roles.length, validUsername, validPassword, name, surname, dateOfBirth, nationality,
        address, gender, phoneNumber, profilePicture].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, password, roles, name, surname, dateOfBirth, nationality,
                address, gender, phoneNumber, profilePicture })
        }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''
    const validNameClass = !name ? 'form__input--incomplete' : '';
    const validSurnameClass = !surname ? 'form__input--incomplete' : ''
    const validDateOfBirthClass = !dateOfBirth ? 'form__input--incomplete' : ''
    const validNationalityClass = !nationality ? 'form__input--incomplete' : ''
    const validAddressClass = !address ? 'form__input--incomplete' : ''
    const validGenderClass = !gender ? 'form__input--incomplete' : ''
    const validPhoneNumberClass = !phoneNumber ? 'form__input--incomplete' : ''
    const validProfilePictureClass = !profilePicture ? 'form__input--incomplete' : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveUserClicked}>
                <div className="form__title-row">
                    <h2>Dodawanie nowego użytkownika</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="username">
                    Nazwa użytkownika: <span className="nowrap">[3-20 liter]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />

                <label className="form__label" htmlFor="password">
                    Hasło: <span className="nowrap">[4-12 znaków zawierających !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

<label className="form__label" htmlFor="name">
                    Imię: <span className="nowrap"></span></label>
                <input
                    className={`form__input ${validNameClass}`}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

<label className="form__label" htmlFor="surname">
                    Nazwisko: <span className="nowrap"></span></label>
                <input
                    className={`form__input ${validSurnameClass}`}
                    id="surname"
                    name="surname"
                    type="text"
                    autoComplete="off"
                    value={surname}
                    onChange={onSurnameChanged}
                />

<label className="form__label" htmlFor="dateOfBirth">
                    Data urodzin: <span className="nowrap"></span></label>
                    <input 
                    className={`form__input ${validDateOfBirthClass}`}
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    autoComplete="off"
                    value={dateOfBirth}
                    onChange={onDateOfBirthChanged}
                />

<label className="form__label" htmlFor="nationality">
                    Kraj: <span className="nowrap"></span></label>
                <input
                    className={`form__input ${validNationalityClass}`}
                    id="nationality"
                    name="nationality"
                    type="text"
                    autoComplete="off"
                    value={nationality}
                    onChange={onNationalityChanged}
                />

<label className="form__label" htmlFor="address">
                    Adres: <span className="nowrap"></span></label>
                <input
                    className={`form__input ${validAddressClass}`}
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="off"
                    value={address}
                    onChange={onAddressChanged}
                />

<label className="form__label" htmlFor="gender">
  Płeć: <span className="nowrap"></span>
</label>
<select style={{minHeight: "50px"}}
  className={`form__input ${validGenderClass}`}
  id="gender"
  name="gender"
  value={gender}
  onChange={onGenderChanged}
>
  
  <option value="Mężczyzna">Mężczyzna</option>
  <option value="Kobieta">Kobieta</option>
</select>

<label className="form__label" htmlFor="phoneNumber">
                    Numer telefonu: <span className="nowrap"></span></label>
                <input
                    className={`form__input ${validPhoneNumberClass}`}
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    autoComplete="off"
                    value={phoneNumber}
                    onChange={onPhoneNumberChanged}
                />
                
                <label className="form__label form__checkbox-container" htmlFor="profilePicture">
        Wklej nowe zdjęcie profilowe w postaci linku:
      </label>
      <input
        type="text"
        className={`form__input ${validProfilePictureClass}`}
        id="profilePicture"
        name="profilePicture"
        value={profilePicture}
        onChange={onProfilePictureChanged}
      />
      
      {profilePicture && (
        <div>
          <p>Podgląd aktualnego zdjęcia:</p>
          <img src={profilePicture} alt="Niepoprawne zdjęcie." style={{ maxWidth: '300px' }} />
        </div>
      )}

                <label className="form__label" htmlFor="roles">
                    Przypisane role:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select ${validRolesClass}`}
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>

            </form>
        </>
    )

    return content
}
export default NewUserForm