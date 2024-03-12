// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
// import { useNavigate } from 'react-router-dom'

// import { useSelector } from 'react-redux'
// import { selectReservationById } from './reservationApiSlice'

// const Reservation = ({ reservationId }) => {
//     const reservation = useSelector(state => selectReservationById(state, reservationId))
//     console.log("Reservation Object for ID", reservationId, reservation);
//     const navigate = useNavigate()

//     if (reservation) {
//         const created = new Date(reservation.createdAt).toLocaleString('pl-PL', { day: 'numeric', month: 'long' })

//         const updated = new Date(reservation.updatedAt).toLocaleString('pl-PL', { day: 'numeric', month: 'long' })

//         const handleEdit = () => navigate(`/dash/reservation/${reservationId}`)//zmienic

//         return (
//             <tr className="table__row">
//                 <td className="table__cell note__status">
//                     {reservation.completed
//                         ? <span className="note__status--completed">Zakończono</span>
//                         : <span className="note__status--open">W trakcie</span>
//                     }
//                 </td>
//                 <td className="table__cell note__created">{created}</td>
//                 <td className="table__cell note__updated">{updated}</td>
//                 <td className="table__cell note__title">{reservation.title}</td>
//                 <td className="table__cell note__title">{reservation.car}</td>
//                 <td className="table__cell note__username">{reservation.username}</td>

//                 <td className="table__cell">
//                     <button
//                         className="icon-button table__button"
//                         onClick={handleEdit}
//                     >
//                         <FontAwesomeIcon icon={faPenToSquare} />
//                     </button>
//                 </td>
//             </tr>
//         )

//     } else return null
// }
// export default Reservation