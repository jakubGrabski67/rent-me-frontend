import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)
    const [name, setName] = useState(user.name)
    const [surname, setSurname] = useState(user.surname)
    const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth)
    const [nationality, setNationality] = useState(user.nationality)
    const [address, setAddress] = useState(user.address)
    const [gender, setGender] = useState(user.gender)
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
    const [profilePicture, setProfilePicture] = useState(user.profilePicture)

   
    

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
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

    }, [isSuccess, isDelSuccess, navigate])

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

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, username, password, roles, active, name, surname, dateOfBirth, nationality, address, gender, phoneNumber, profilePicture })
        } else {
            await updateUser({ id: user.id, username, roles, active, name, surname, dateOfBirth, nationality, address, gender, phoneNumber, profilePicture })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    let canSave
    if (password) {
        canSave = [roles.length, validUsername, validPassword, name, surname, dateOfBirth, nationality,
            address, gender, phoneNumber, profilePicture].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validUsername, name, surname, dateOfBirth, nationality, 
            address, gender, phoneNumber, profilePicture].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    const validNameClass = !name ? 'form__input--incomplete' : '';
    const validSurnameClass = !surname ? 'form__input--incomplete' : ''
    const validDateOfBirthClass = !dateOfBirth ? 'form__input--incomplete' : ''
    const validNationalityClass = !nationality ? 'form__input--incomplete' : ''
    const validAddressClass = !address ? 'form__input--incomplete' : ''
    const validGenderClass = !gender ? 'form__input--incomplete' : ''
    const validPhoneNumberClass = !phoneNumber ? 'form__input--incomplete' : ''
    const validProfilePictureClass = !profilePicture ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form text-white" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edytuj użytkownika</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
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
                    Hasło: <span className="nowrap">[puste = brak zmian]</span> <span className="nowrap">[4-12 znaków zawierających !@#$%]</span></label>
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
    

                <label className="form__label form__checkbox-container" htmlFor="user-active">
                    Czy użytkownik ma być aktywny:
                    <input
                        className="form__checkbox"
                        id="user-active"
                        name="user-active"
                        type="checkbox"
                        checked={active}
                        onChange={onActiveChanged}
                    />
                </label>

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
export default EditUserForm