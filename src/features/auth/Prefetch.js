import { store } from '../../app/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';
import { carsApiSlice } from '../cars/carsApiSlice';
import { reservationsApiSlice} from '../reservation/reservationApiSlice'
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const cars = store.dispatch(carsApiSlice.endpoints.getCars.initiate())
        const reservations = store.dispatch(reservationsApiSlice.endpoints.getReservations.initiate())

        return () => {
            console.log('unsubscribing')
            notes.unsubscribe()
            users.unsubscribe()
            cars.unsubscribe()
            reservations.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch
