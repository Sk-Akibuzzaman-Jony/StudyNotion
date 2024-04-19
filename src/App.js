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
import MyProfile from "./pages/MyProfile";
import Settings from "./pages/Settings"

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
        <Route path="/not-found" element={<ErrorPage/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="update-password/:token" element={<UpdatePassword/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route path="my-profile" element={<MyProfile/>}/>
          <Route path="settings" element={<Settings/>}/>
        </Route>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
