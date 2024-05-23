import "./App.css";
import { Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import VerifyOTP from "./pages/VerifyOTP";
import { ToastContainer} from 'react-toastify';
import ErrorPage from "./pages/ErrorPage";
import AboutUs from "./pages/AboutUs";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import MyProfile from "./pages/MyProfile";
import AddCourse from "./components/core/Dashboard/AddCourse/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import CategoryPage from "./pages/CategoryPage";
import Course from "./pages/Course";
  

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <ToastContainer stacked/>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/verify-otp" element={<VerifyOTP/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="update-password/:token" element={<UpdatePassword/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/catalog/:categoryName" element={<CategoryPage/>}/>
        <Route path="/course/:courseId" element={<Course/>}/>
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route path="my-profile" element={<MyProfile/>}/>
          <Route path="settings" element={<Settings/>}/>
          <Route path="enrolled-courses" element={<EnrolledCourses/>}/>
          <Route path="add-course" element={<AddCourse/>}/>
          <Route path="my-courses" element={<MyCourses/>}/>
          <Route path="edit-course/:courseId" element={<EditCourse/>}/>
        </Route>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
