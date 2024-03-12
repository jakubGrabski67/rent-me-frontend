import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetCarsQuery } from '../../features/cars/carsApiSlice';
import { selectAllUsers } from '../../features/users/usersApiSlice';
import CarDetailsForm from './CarDetailsForm';

const CarDetails = () => {
  const { id } = useParams();

  // useGetCarsQuery hook automatycznie wykonuje zapytanie do API
  const { data: cars, isSuccess: isCarsSuccess/*, refetch*/ } = useGetCarsQuery();

  // Wykonaj zapytanie o użytkowników w sposób, w jaki to już robisz
  const users = useSelector(selectAllUsers);

  // Sprawdź, czy pobranie danych o samochodzie zakończyło się sukcesem i jeśli tak, znajdź samochód o określonym id
  const car = isCarsSuccess ? cars.entities[id] : null;

  // Jeśli samochód został znaleziony i masz dane użytkowników, przekaż je do EditCarForm
  const content = car && users ? <CarDetailsForm car={car} users={users} /> : <p>Loading...</p>;
  //console.log("Car:", car);

  return (
    <div>
      {content}
    </div>
  );
};

export default CarDetails;