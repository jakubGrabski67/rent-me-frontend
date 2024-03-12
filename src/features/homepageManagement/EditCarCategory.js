import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetCarsQuery/*, useUpdateCarMutation*/ } from '../cars/carsApiSlice';
import { selectAllUsers } from '../users/usersApiSlice';
import EditCarCategoryForm from '../homepageManagement/EditCarCategoryForm';


const EditCarCategory = () => {
  const { id } = useParams();

  // useGetCarsQuery hook automatycznie wykonuje zapytanie do API
  const { data: cars, isSuccess: isCarsSuccess/*, refetch*/ } = useGetCarsQuery();

  // Wykonaj zapytanie o użytkowników w sposób, w jaki to już robisz
  const users = useSelector(selectAllUsers);

  // Sprawdź, czy pobranie danych o samochodzie zakończyło się sukcesem i jeśli tak, znajdź samochód o określonym id
  const car = isCarsSuccess ? cars.entities[id] : null;

  // Jeśli samochód został znaleziony i masz dane użytkowników, przekaż je do EditCarForm
  const content = car && users ? <EditCarCategoryForm car={car} users={users} /> : <p>Loading...</p>;
  //console.log("Car:", car);

  return (
    <div>
      {content}
    </div>
  );
};

export default EditCarCategory;