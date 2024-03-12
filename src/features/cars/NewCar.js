import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewCarForm from '../cars/NewCarForm'

const NewCar = () => {
    const users = useSelector(selectAllUsers)

    if (!users?.length) return <p>Not Currently Available</p>

    const content = <NewCarForm users={users} />

    return content
}
export default NewCar