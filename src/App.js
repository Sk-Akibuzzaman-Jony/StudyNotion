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
      </Routes>
    </div>
  );
}

export default App;
