import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from '../Utilities/logo.png';
import my from '../Utilities/my.png';

const NavbarSignIn = ({ onLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    onLogout();
    navigate('/');
  };

  return (
    <div className="relative w-full h-20 sm:h-24 md:h-22 lg:h-22 px-4 py-4 bg-white shadow-md">
      <nav className="flex justify-between items-center max-w-screen-xl mx-auto">
        {/* Left Section: Logo */}
        <Link to="/">
          <img src={logo} className="absolute top-4 left-4 w-22 h-12" alt="Makemytrip" />
        </Link>

        {/* Right Section: Profile & Login/Logout */}
        <div className="absolute top-4 right-16 flex items-center space-x-4">
          <img src={my} className="w-8 h-8" alt="my" />
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-base font-light text-gray-700 hover:text-blue-500"
            >
              Logout
            </button>
          ) : (
            <div className="flex items-center space-x-1 text-sm font-light">
              <button
                className="text-gray-700 hover:text-blue-500"
                onClick={() => navigate('/signin')}
              >
                Login
              </button>
              <span className="text-gray-500">or</span>
              <button
                onClick={() => navigate('/register')}
                className="text-blue-500 hover:underline"
              >
                Create account
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavbarSignIn;
