import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from "../hooks/useAuth"
import React, { useState, useEffect } from "react";

// import './dashFooter.css'

const DashFooter = () => {

    const {username, status} = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onGoHomeClicked = () => navigate('/dash')

    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Aktualizuj co sekundę

        return () => {
            clearInterval(interval);
        };
    }, []);

    const formattedDateTime = currentDateTime.toLocaleString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
    

    let goHomeButton = null
    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                className="dash-footer__button icon-button"
                title="Home"
                onClick={onGoHomeClicked}
            >
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }

    const content = (
<footer className="dash-footer d-flex justify-content-between align-items-center">
    <div className="d-flex align-items-center">
        {goHomeButton}
        <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <p className="m-0 me-2">Aktualnie zalogowany: {username}</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <p className="m-0">Rola: {status}</p>
    </div>
    <div className="text-end">
        <p className="m-0">{formattedDateTime}</p>
    </div>
</footer>

    )
    return content
}
export default DashFooter