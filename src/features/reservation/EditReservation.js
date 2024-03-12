import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetReservationsQuery /*, useUpdateReservationMutation*/ } from '../reservation/reservationApiSlice';
import { selectAllUsers } from '../users/usersApiSlice';
import EditReservationForm from '../reservation/EditReservationForm';

const EditReservation = () => {
  const { id } = useParams();

  // useGetCarsQuery hook automatycznie wykonuje zapytanie do API
  const { data: reservations, isSuccess: isReservationsSuccess/*, refetch*/ } = useGetReservationsQuery();

  // Wykonaj zapytanie o użytkowników w sposób, w jaki to już robisz
  const users = useSelector(selectAllUsers);

  // Sprawdź, czy pobranie danych o samochodzie zakończyło się sukcesem i jeśli tak, znajdź samochód o określonym id
  const reservation = isReservationsSuccess ? reservations.entities[id] : null;

  // Jeśli samochód został znaleziony i masz dane użytkowników, przekaż je do EditCarForm
  const content = reservation && users ? <EditReservationForm reservation={reservation} users={users} /> : <p>Loading...</p>;
  //console.log("Car:", car);

  return (
    <div>
      {content}
    </div>
  );
};

export default EditReservation;