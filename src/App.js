import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ChooseNewPassword from "./pages/ChooseNewPassword";
import ResetComplete from "./pages/ResetComplete";
import NavBar from "./components/common/NavBar";
import About from "./pages/About";
import Contactus from "./pages/Contactus";
import Error from "./pages/Error";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Settings from "./components/core/Dashboard/Settings/Settings";
import Cart from "./components/core/Dashboard/Cart";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/AddCourse";

function App() {

  const {user} = useSelector((state) => state.profile)

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} ></Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/verify-email" element={<VerifyEmail/>} />
        <Route 
            path='/forgot-password' 
            element={
              // add open route by studying the code 
              <ForgotPassword/>
            } />
        <Route path="/update-password/:token" element={<ChooseNewPassword/>} />

        <Route path="/reset-complete" element={<ResetComplete/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contactus" element={<Contactus/>} />
            
        <Route element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }>
            <Route path='/dashboard/my-profile' element={<MyProfile/>} />
            <Route path="/dashboard/settings" element={<Settings/>} />
            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>} />
                  <Route path="/dashboard/cart" element={<Cart/>} />
                </>
              )
            }

            {
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                  <Route path="/dashboard/add-course" element={<AddCourse/>} />
                </>
              )
            }
          
        </Route>

        <Route path="*" element={<Error/>} />

      </Routes>
    </div>
  );
}

export default App;
