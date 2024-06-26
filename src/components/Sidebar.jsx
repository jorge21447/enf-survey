import { useEffect, useState } from "react";
import { useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// React icons
import { RiMenuLine } from "react-icons/ri";

import { IoLogOutOutline } from "react-icons/io5";
import { BiHomeAlt2 } from "react-icons/bi";
import { RiSurveyLine } from "react-icons/ri";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { AiOutlineSetting } from "react-icons/ai";
import { TbReportMoney } from "react-icons/tb";
import { TbUserCircle } from "react-icons/tb";
// Img
import LogoIcon from "../assets/logo-enf.png";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const { logout } = useAuth({ middleware: "auth" });

  const sidebarRef = useRef();
  const { pathname } = useLocation();

  const handleResize = () => {
    const isTabletMid = window.innerWidth <= 768;
    setOpen(isTabletMid ? false : true); // Adjust for smaller screens
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setOpen(false); // Close sidebar on route change in smaller screens
    }
  }, [pathname]);

  console.log(pathname)

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden  inset-0 max-h-screen z-[50] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <div
        ref={sidebarRef}
        className=" bg-white dark:bg-[#182235]  border-b border-slate-200 dark:border-slate-700 text-gray shadow-xl z-[51] max-w-[20rem]  w-[16rem] overflow-hidden md:relative  h-full "
        style={{
          width: open ? "20rem" : "4rem",
        }}
      >
        <div className=" max-h-16 h-full flex items-center align-middle gap-2.5  whitespace-pre  font-medium border-b border-slate-300  mx-3 dark:border-slate-500">
          {open && (
            <>
              <div className="flex gap-2.5  whitespace-pre ">
                <img src={LogoIcon} alt="Logo" className=" w-9" />
                <div className="my-auto">
                  <p className="text-sm font-bold leading-none pt-1 uppercase">
                    Carrera de Enfermería
                  </p>

                  <small>Sistema de Encuestas</small>
                </div>
              </div>
            </>
          )}
          <div
            onClick={() => {
              setOpen(!open);
            }}
            className="m-auto z-50  pb-1 cursor-pointer"
          >
            <RiMenuLine size={20} />
          </div>
        </div>

        <div className="flex flex-col  h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden   md:h-[68%] h-[70%]">
            <li>
              <NavLink
                to={"/"}
                className="p-2.5 theme1 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
                style={({ isActive, isTransitioning }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "white" : "",
                    background: isActive ? "#1242bf" : "",
                    viewTransitionName: isTransitioning ? "slide" : "",
                  };
                }}
              >
                <BiHomeAlt2 size={23} className="min-w-max"/>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/surveys"}
                className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
                style={({ isActive, isTransitioning }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "white" : "",
                    background: isActive ? "#1242bf" : "",
                    viewTransitionName: isTransitioning ? "slide" : "",
                  };
                }}
              >
                <RiSurveyLine  size={23} className="min-w-max" />
                Encuestas
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/users"}
                className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
                style={({ isActive, isTransitioning }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "white" : "",
                    background: isActive ? "#1242bf" : "",
                    viewTransitionName: isTransitioning ? "slide" : "",
                  };
                }}
              >
                <TbUserCircle  size={23} className="min-w-max" />
                Usuarios
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/reports"}
                className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
                style={({ isActive, isTransitioning }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "white" : "",
                    background: isActive ? "#1242bf" : "",
                    viewTransitionName: isTransitioning ? "slide" : "",
                  };
                }}
              >
                <HiOutlineDocumentReport  size={23} className="min-w-max" />
                Reportes
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/pettycash"}
                className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
                style={({ isActive, isTransitioning }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "white" : "",
                    background: isActive ? "#1242bf" : "",
                    viewTransitionName: isTransitioning ? "slide" : "",
                  };
                }}
              >
                <TbReportMoney   size={23} className="min-w-max" />
                Caja Chica
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/settings"}
                className="p-2.5 flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium"
                style={({ isActive, isTransitioning }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "white" : "",
                    background: isActive ? "#1242bf" : "",
                    viewTransitionName: isTransitioning ? "slide" : "",
                  };
                }}
              >
                <AiOutlineSetting  size={23} className="min-w-max" />
                Ajustes
              </NavLink>
            </li>
          </ul>
          {open && (
            <div className="flex text-sm z-50   my-auto  whitespace-pre   w-full    ">
              <div className="flex border-y w-full border-slate-300  items-center px-2.5">
                <button
                  type="button"
                  className="flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium w-full  bg-white dark:bg-[#182235] dark:text-white dark:hover:bg-red-500 p-3  text-black hover:bg-red-500  hover:text-white hover:font-bold"
                  onClick={logout}
                >
                  {" "}
                  <IoLogOutOutline size={23} className="" />
                  Cerrar Sesion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
