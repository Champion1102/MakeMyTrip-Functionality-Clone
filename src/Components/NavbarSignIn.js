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
    <div className="w-[1383px] h-[84px]">
      <nav className="flex justify-between items-center">
        <div>
          <Link to="/">
            <img src={logo} className="w-15 h-12 ml-4" alt="Makemytrip" />
          </Link>
        </div>
        <div className="flex items-center">
          <img src={my} className="" alt="my" />
          {isLoggedIn ? (
            <div className="ml-2 text-[11px] mr-16">
              <button onClick={handleLogout} className="font-light text-[17px]">Logout</button>
            </div>
          ) : (
            <div className="ml-2 text-[11px] mr-16">
              <button className="font-light text-[10px]" onClick={() => navigate('/signin')}>Login</button>
              <span className="text-[10px] ml-1">or</span><br />
              <button onClick={() => navigate('/register')}>Create account</button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavbarSignIn;
