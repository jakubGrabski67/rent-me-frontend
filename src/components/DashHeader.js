import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
    faRightFromBracket,
    faCar,
    faTicket
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'

import useAuth from '../hooks/useAuth'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const CARS_REGEX = /^\/dash\/dashboard\/flota(\/)?$/
const RESERVATIONS_REGEX = /^\/dash\/dashboard\/reservations(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
    const { isManager, isAdmin } = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const onNewNoteClicked = () => navigate('/dash/notes/new')
    const onNewCarClicked = () => navigate('/dash/dashboard/flota/new')
    const onNewReservationClicked = () => navigate('/dash/dashboard/reservations/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onNotesClicked = () => navigate('/dash/notes')
    const onCarsClicked = () => navigate('/dash/dashboard/flota')
    const onReservationsClicked = () => navigate('/dash/dashboard/reservations')
    const onUsersClicked = () => navigate('/dash/users')

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !CARS_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    let newNoteButton = null
    if (NOTES_REGEX.test(pathname)) {
        newNoteButton = (
            <button
                className="icon-button"
                title="Dodaj nowe zadanie"
                onClick={onNewNoteClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newCarButton = null
    if (CARS_REGEX.test(pathname)) {
        newCarButton = (
            <button
                className="icon-button"
                title="Dodaj nowy pojazd"
                onClick={onNewCarClicked}
            >
                <FontAwesomeIcon icon={faCar} />
            </button>
        )
    }

    let newReservationButton = null
    if (RESERVATIONS_REGEX.test(pathname)) {
        newReservationButton = (
            <button
                className="icon-button"
                title="Dodaj nową rezerwację"
                onClick={onNewReservationClicked}
            >
                <FontAwesomeIcon icon={faTicket} />
            </button>
        )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="icon-button"
                title="Dodaj nowego użytkownika"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }

    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className="icon-button"
                    title="Użytkownicy"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            )
        }
    }

    let notesButton = null
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
        notesButton = (
            <button
                className="icon-button"
                title="Zadania"
                onClick={onNotesClicked}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        )
    }

    let carsButton = null
    if (!CARS_REGEX.test(pathname) && pathname.includes('/dash/dashboard')) {
        carsButton = (
            <button
                className="icon-button"
                title="Pojazdy"
                onClick={onCarsClicked}
            >
                <FontAwesomeIcon icon={faCar} />
            </button>
        )
    }

    let reservationsButton = null
    if (!RESERVATIONS_REGEX.test(pathname) && pathname.includes('/dash/dashboard')) {
        carsButton = (
            <button
                className="icon-button"
                title="Rezerwacje"
                onClick={onReservationsClicked}
            >
                <FontAwesomeIcon icon={faTicket} />
            </button>
        )
    }

    const logoutButton = (
        <button
            className="icon-button"
            title="Wyloguj się"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    const errClass = isError ? "errmsg" : "offscreen"

    let buttonContent
    if (isLoading) {
        buttonContent = <p>Trwa wylogowywanie...</p>
    } else {
        buttonContent = (
            <>
                {newNoteButton}
                {newCarButton}
                {newReservationButton}
                {newUserButton}
                {notesButton}
                {carsButton}
                {reservationsButton}
                {userButton}
                {logoutButton}
            </>
        )
    }

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <header className="dash-header">
                <div className={`dash-header__container ${dashClass}`}>
                    <Link to="/dash">
                        <h1 className="dash-header__title">RENT ME! - PANEL PRACOWNIKA</h1>
                    </Link>
                    <nav className="dash-header__nav">
                        {buttonContent}
                    </nav>
                </div>
            </header>
        </>
    )

    return content
}
export default DashHeader