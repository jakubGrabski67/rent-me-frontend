// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from 'react-router-dom';

// const Car = ({ car}) => {
//   const navigate = useNavigate();
  
//   if (car) {
//     const created = new Date(car.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' });
//     const updated = new Date(car.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' });

//     const handleEdit = () => navigate(`/dash/cars/${car._id}`);
//     // console.log("Car Object for ID", car);
//     return (
//       <tr className="table__row">
//         <td className="table__cell car__status">
//           {car.completed
//             ? <span className="car__status--completed">Wynajęty</span>
//             : <span className="car__status--open">Dostępny</span>
//           }
//         </td>
//         <td className="table__cell car__created">{created}</td>
//         <td className="table__cell car__updated">{updated}</td>
//         <td className="table__cell car__title">{car.title}</td>
//         <td className="table__cell car__username">{car.username}</td>

//         <td className="table__cell">
//           <button
//             className="icon-button table__button"
//             onClick={handleEdit}
//           >
//             <FontAwesomeIcon icon={faPenToSquare} />
//           </button>
//         </td>
//       </tr>
//     );
//   } else {
//     return null;
//   }
// };

// export default Car;