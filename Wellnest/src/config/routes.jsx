import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import FAQs from '../pages/FAQs';
import EnrollAsPhysician from '../pages/EnrollAsPhysician';
import ContactUs from '../pages/Contact';
import BookAnAppointment from '../pages/BookAppointment';
import DoctorProfile from '../pages/DoctorProfile';
import Forums from '../pages/Forums';
import OurBlogs from '../pages/OurBlogs';
import FullBlog from '../pages/FullBlog';
import SignUp from '../pages/Signup';
import Login from '../pages/Login';
import ProtectedRoute from './middleware';

function BrowserRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/services' element={<Services />} />
                <Route path='/faqs' element={<FAQs />} />
                <Route path='/enrollasphysician' element={<EnrollAsPhysician />} />
                <Route path='/contact' element={<ContactUs />} />
                <Route path='/bookappointment' element={<BookAnAppointment />} />
                <Route path='/doctorprofile' element={<DoctorProfile />} />
                <Route path='/forums' element={<Forums />} />
                <Route path='/blogs' element={<OurBlogs />} />
                <Route path='/fullblog' element={<FullBlog />} />
                <Route path='/login' element={
                    <ProtectedRoute>
                        <Login />
                    </ProtectedRoute>
                } />
                <Route path='/signup' element={
                    <ProtectedRoute>
                        <SignUp />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default BrowserRoute;