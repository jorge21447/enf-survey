import { Outlet } from "react-router-dom";
import CustomGradientWaveSVG from "../components/CustomGradientWaveSVG";
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


const AuthLayout = () => {
  return (
    <>
      <div className=" bg-bluenf sm:bg-white dark:bg-gray-900  h-screen w-full">
        <div >
          <CustomGradientWaveSVG />
        </div>

        <Outlet />
      </div>
      
      <ToastContainer />
    </>
  );
};

export default AuthLayout;
