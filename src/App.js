import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import VerifyOTP from "./pages/VerifyOTP";
import { ToastContainer } from 'react-toastify';
import ErrorPage from "./pages/ErrorPage";
import AboutUs from "./pages/AboutUs";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import MyProfile from "./pages/MyProfile";
import AddCourse from "./components/core/Dashboard/AddCourse/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import CategoryPage from "./pages/CategoryPage";
import Course from "./pages/Course";
import Cart from "./components/core/Dashboard/Cart/Cart";
import ViewCourse from "./pages/ViewCourse";
import ViewVideo from "./components/core/ViewCourse/ViewVideo";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import ProtectedRoute from "./utils/ProtectedRoute";
import NotLoggedInRoute from "./utils/NotLoggedInRoute";
import LoggedInRoute from "./utils/LoggedInRoute";
import ResponsiveOverlay from "./pages/ResponsiveOverlay";


function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
          <ToastContainer stacked />
          <ResponsiveOverlay />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<NotLoggedInRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/catalog/:categoryName" element={<CategoryPage />} />
            <Route path="/course/:courseId" element={<Course />} />
            <Route element={<LoggedInRoute />}>
              <Route path="update-password/:token" element={<UpdatePassword />} /> 
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="my-profile" element={<MyProfile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="enrolled-courses" element={<ProtectedRoute role="Student"><EnrolledCourses /></ProtectedRoute>} />
                <Route path="add-course" element={<ProtectedRoute role="Instructor"><AddCourse /></ProtectedRoute>} />
                <Route path="my-courses" element={<ProtectedRoute role="Instructor"><MyCourses /></ProtectedRoute>} />
                <Route path="edit-course/:courseId" element={<ProtectedRoute role="Instructor"><EditCourse /></ProtectedRoute>} />
                <Route path="cart" element={<ProtectedRoute role="Student"><Cart /></ProtectedRoute>} />
                <Route path="instructor" element={<ProtectedRoute role="Instructor"><Instructor /></ProtectedRoute>} />
              </Route>
              <Route path="/view-course/course/:courseId/section/:sectionId/" element={<ProtectedRoute role="Student"><ViewCourse /></ProtectedRoute>}>
                <Route path="subsection/:subsectionId" element={<ProtectedRoute role="Student"><ViewVideo /></ProtectedRoute>} />
              </Route>   
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
    </div>
  );
}

export default App;
