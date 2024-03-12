import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditNote from './features/notes/EditNote'
import NewNote from './features/notes/NewNote'
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequiredAuth';
import {ROLES} from './config/roles';

import DashboardHomepage from './components/Dashboard/DashboardPages/DashboardHomepage'

import DashboardSettings from './components/Dashboard/DashboardPages/DashboardSettings'
import DashboardServiceHistory from './components/Dashboard/DashboardPages/DashboardServiceHistory'
// import DashboardFlota from './components/Dashboard/DashboardPages/DashboardFlota'
import DashboardCustomers from './components/Dashboard/DashboardPages/DashboardCustomers'
import DashboardDocumentation from './components/Dashboard/DashboardPages/DashboardDocumentation'
import Shop from './components/HomepagePages/Shop';
// import NewCarForm from './features/cars/NewCarForm';
// import CarsList from './features/cars/CarsList';
// import EditCar from './features/cars/EditCar';
// import NewCar from './features/cars/NewCar';

import CarsList from './features/cars/CarsList'
import EditCar from './features/cars/EditCar'
import NewCar from './features/cars/NewCar'
import Voucher from './components/HomepagePages/Voucher';
import FAQ from './components/HomepagePages/FAQ';
import Kontakt from './components/HomepagePages/Kontakt';
import CarDetails from './components/HomepagePages/CarDetails';
import ReservationsList from './features/reservation/ReservationsList';
import EditReservation from './features/reservation/EditReservation';
import NewReservation from './features/reservation/NewReservation';
import DashboardHomepageManagement from './components/Dashboard/DashboardPages/DashboardHomepageManagement'
import EditCarCategory from './features/homepageManagement/EditCarCategory';
import NotFound from './NotFound';
import CheckoutSuccess from './CheckoutSuccess';


  function App() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          {/*Public routes*/}
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="shop" element={<Shop />} />

          <Route path='checkout-success' element={<CheckoutSuccess/>} />
          <Route path="*" element={<NotFound/>} />
          
          <Route path="shop">
              <Route path=":id" element={<CarDetails/>}/>
          </Route>

          <Route path="voucher" element={<Voucher />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="kontakt" element={<Kontakt />} />

          {/*Protected routes*/}
          <Route element={<PersistLogin/>}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]}/>}>
          <Route element={<Prefetch/>}>

          {/*Protected pages*/}
          <Route path="dash" element={<DashLayout />}>

            <Route index element={<Welcome />} />

            <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]}/>}>
            <Route path="users">
              <Route index element={<UsersList />} />
              <Route path=":id" element={<EditUser/>}/>
              <Route path="new" element={<NewUserForm/>}/>
            </Route>
           

            <Route path="notes">
              <Route index element={<NotesList />} />
              <Route path=":id" element={<EditNote/>}/>
              <Route path="new" element={<NewNote/>}/>
            </Route>

            <Route path="dashboard/flota">
              <Route index element={<CarsList />} />
              <Route path=":id" element={<EditCar/>}/>
              <Route path="new" element={<NewCar/>}/>
            </Route>

            <Route path="dashboard/homepageManagement">
              
              <Route index element={<DashboardHomepageManagement />} />
              <Route path=":id" element={<EditCarCategory/>}/>
            </Route>

            <Route path="dashboard/reservations">
              <Route index element={<ReservationsList />} />
              <Route path=":id" element={<EditReservation/>}/>
              <Route path="new" element={<NewReservation/>}/> 
            </Route>

              <Route path='/dash/dashboard/panel' element={<DashboardHomepage/>}/>


              {/* <Route path="/dash/dashboard/new" element={<NewNoteForm />} /> */}
              <Route path="/dash/dashboard/service-history" element={<DashboardServiceHistory />} />
              <Route path="/dash/dashboard/settings" element={<DashboardSettings />} />
              {/* <Route path="/dash/dashboard/flota" element={<DashboardFlota />} /> */}
              <Route path="/dash/dashboard/customers" element={<DashboardCustomers />} />
              <Route path="/dash/dashboard/homepageManagement" element={<DashboardHomepageManagement />} />
              <Route path="/dash/dashboard/documentation" element={<DashboardDocumentation />} />
            
              </Route>

            </Route>{/* End Dash */}
          </Route>
          </Route>
        </Route> {/*End protected routes */}

        </Route>
      </Routes>
    );
  }

  export default App;
