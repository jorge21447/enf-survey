import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Header from "../components/Header/Index";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  
  const {user, error} = useAuth({middleware: 'auth'})

  const [sidebarOpen, setSidebarOpen] = useState(true);
  console.log(user)
  console.log(error)

  return (
    <>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main className="bg-gray-50 h-screen dark:bg-gray-900">
              <div className="mx-auto  max-w-screen-2xl p-4 md:p-6 2xl:p-6">
                <Outlet />
              </div>
            </main>

          </div>
        </div>
      </div>
      
      <ToastContainer />
    </>
  );
};

export default Layout;
