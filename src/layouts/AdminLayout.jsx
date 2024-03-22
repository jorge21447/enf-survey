import SidebarAdmin from "../components/SidebarAdmin";
import { useState } from "react";
import Header from "../components/Header/Index";
import { Outlet } from "react-router-dom";
import Modal from "react-modal";
import { useAuth } from "../hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserModal from "../components/UserModal";
import useSurvey from "../hooks/useSurvey";
import ModalTest from "../components/ModalTest";

const AdminLayout = () => {
  const { modalUser, changeStateModalUser } = useSurvey();

  const { user, error } = useAuth({ middleware: "admin"});

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const customStyles = {
    overlay: {
      zIndex: 200,
    },
    content: {
      position: 'absolute',
      background: 'none',
      overflow: 'auto',
      border: 'none',
    },
  }

  Modal.setAppElement('#root')

  return (
    <>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex h-screen overflow-hidden">
          <SidebarAdmin
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main className="bg-gray-50 h-auto dark:bg-gray-900">
              <div className="mx-auto  max-w-screen-2xl p-4 md:p-6 2xl:p-6">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalUser}
        style={customStyles}
      >
        <UserModal />
      </Modal>

      <ToastContainer />
    </>
  );
};

export default AdminLayout;
