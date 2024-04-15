import Contact from '../pages/Contact';
import DoctorDetails from '../pages/Doctors/DoctorDetails';
import Doctors from '../pages/Doctors/Doctors';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Services from '../pages/Services';
import Signup from '../pages/Signup';
import UserDashboard from '../Dashboard/user-account/UserDashboard';

import { Route, Routes } from 'react-router-dom';
import DoctorDashboard from '../Dashboard/doctor-account/DoctorDashboard';
import ProtectedRoutes from './ProtectedRoutes';
import CheckoutSuccess from '../pages/Doctors/CheckoutSuccess';

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/doctors' element={<Doctors/>}/>
      <Route path='/doctors/:id' element={<DoctorDetails/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Signup/>}/>
      <Route path='/contact' element={<Contact/>}/>
      {/* <Route path='/services' element={<Services/>}/> */}
      <Route path='/checkout-success' element={<CheckoutSuccess/>} />

      <Route path='/users/profile/me' 
      element={<ProtectedRoutes allowedRoles={['patient']}><UserDashboard/></ProtectedRoutes>}/>
      
      <Route path='/doctors/profile/me' 
      element={<ProtectedRoutes allowedRoles={['doctor']}><DoctorDashboard /></ProtectedRoutes>}/>
    </Routes>
    )
}

export default Routers