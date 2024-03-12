import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewReservationForm from '../reservation/NewReservationForm'

const NewReservation = () => {
    const users = useSelector(selectAllUsers)

    if (!users?.length) return <p>Not Currently Available</p>

    const content = <NewReservationForm users={users} />

    return content
}
export default NewReservation