import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiSun, HiMoon } from "react-icons/hi";
import { AuthContext } from "../contexts/AuthContext";
import { authService } from "../services/";
import { ThemeContext } from "../contexts/ThemeContext";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const location = useLocation();

  const { isDark, toggleTheme } = useContext(ThemeContext);
  const [isBallRight, setIsBallRight] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const logout = async () => {
    await authService.signOut();
    setCurrentUser(null);
    setSidebar(false);
  };

  return (
    <>
      <div
        className={`navbar transition-colors duration-200 ease-linear bg-white  z-40 dark:bg-black fixed top-0 w-full flex justify-between  items-center xl:px-14 xl:py-6 px-7 py-4`}
      >
        <Link
          to="/"
          className=" dark:text-white font-extrabold font-Montserrat xl:text-4xl text-3xl"
        >
          &#60;formify&#62;
        </Link>
        <div className="flex justify-between items-center">
          <div className="xl:mr-11 mr-5 cursor-pointer">
            <input
              type="checkbox"
              id="checkbox"
              onChange={() => toggleTheme()}
              className="opacity-0 absolute"
              onClick={() => setIsBallRight((right) => !right)}
            />
            <label
              htmlFor="checkbox"
              className="xl:w-14 xl:h-7 w-11 h-6 bg-black transition-colors duration-200 ease-linear  dark:bg-white relative  flex rounded-3xl items-center p-2 justify-between"
              id="label"
            >
              <HiSun className="xl:h-5 xl:w-5 h-3 w-3" fill="#f5d313" />
              <HiMoon className="xl:h-5 xl:w-5 h-3 w-3" fill="#f1c40f" />
              <div
                id="ball"
                className={`xl:w-6 xl:h-6 w-5 h-5 cursor-pointer   bg-white dark:bg-black transition-transform transform duration-200 ease-linear absolute top-0.5 rounded-full ${
                  isDark
                    ? `xl:translate-x-5 translate-x-3.5`
                    : `xl:-translate-x-1 -translate-x-1`
                }`}
              ></div>
            </label>
          </div>

          {currentUser ? (
            <>
              <div
                className="font-bold cursor-pointer xl:text-xl xl:block hidden font-Nunito dark:text-white hover:scale-95 transition-transform duration-300 transform ease-in-out"
                onClick={logout}
              >
                Logout
              </div>
              <Link
                to="/dashboard"
                className="rounded-3xl xl:ml-11 hidden font-bold xl:block text-white font-Nunito dark:text-black xl:text-xl text-base bg-mygreen3 px-6 py-2 shadow-custom4 hover:shadow-custom2 transition-shadow ease-in duration-300"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className={`font-bold xl:text-xl xl:block hidden font-Nunito dark:text-white hover:scale-95 transition-transform duration-300 transform ease-in-out ${
                  location.pathname === "/reset-password" && `hidden`
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className={`rounded-3xl xl:ml-11 xl:block hidden font-bold text-white font-Nunito dark:text-black xl:text-xl text-base bg-mygreen3 xl:px-6 xl:py-2 px-3 py-1 shadow-custom hover:shadow-custom2 transition-shadow ease-in duration-300 ${
                  location.pathname === "/reset-password" && `hidden`
                }`}
              >
                Sign Up
              </Link>
            </>
          )}
          <FaBars
            className="xl:hidden dark:text-white h-6 w-6"
            onClick={() => setSidebar(true)}
          />
        </div>
      </div>
      <div
        className={
          sidebar
            ? "duration-300 ease-linear xl:hidden h-screen flex flex-col justify-start items-end fixed w-full z-50 top-0 right-0 py-6 px-6 transition-all dark:bg-black bg-white dark:text-white"
            : "duration-300 ease-linear xl:hidden h-screen flex flex-col justify-start items-end fixed w-full z-50 top-0 -right-full  py-6 px-6 transition-all dark:bg-black bg-white dark:text-white"
        }
      >
        {currentUser ? (
          <>
            <AiOutlineClose
              className=" dark:text-white h-6 w-6 self-end"
              onClick={() => setSidebar(false)}
              strokeWidth="30px"
            />
            <div
              className="font-bold font-Montserrat text-center text-4xl w-full mt-10"
              onClick={logout}
            >
              Logout
            </div>
            <Link
              to="/dashboard"
              className="font-bold font-Montserrat text-center text-4xl mt-5 w-full"
              onClick={() => setSidebar(false)}
            >
              Dashboard
            </Link>
          </>
        ) : (
          <>
            <AiOutlineClose
              className=" dark:text-white h-6 w-6 self-end"
              onClick={() => setSidebar(false)}
              strokeWidth="30px"
            />
            <Link
              to="/signin"
              className={`font-bold font-Montserrat text-center text-3xl w-full mt-10  ${
                location.pathname === "/reset-password" && `hidden`
              }`}
              onClick={() => setSidebar(false)}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className={`font-bold font-Montserrat text-center text-3xl mt-5 w-full ${
                location.pathname === "/reset-password" && `hidden`
              }`}
              onClick={() => setSidebar(false)}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
