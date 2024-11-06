import React from 'react';
import { Link } from 'react-router-dom';
import Ero from '../Utilities/Ero.png';
import NSTIANLogo from '../Utilities/nstlogo.png'; 
import { toast } from 'react-toastify';

const Error = () => {
  return (
    <div className="relative flex flex-col items-center mt-12">
      <img src={Ero} alt="Cute 404" className="w-72 md:w-96" />
      <h1 className="text-4xl md:text-8xl font-extrabold">Oops!</h1>
      <p className="text-center mx-4 pt-4">Looks like this page doesn't exist. The monkey ate it!</p>
      <p className="text-center mx-4">But don't worry, you can click the button below to go back to the home page:</p>
      <Link to="/" className="text-decoration-none">
        <button 
          className="px-6 py-2 text-lg font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 mt-4"
          onClick={() => toast.success("Reached Home")}
        >
          Take me home!
        </button>
      </Link>
      <div className="fixed bottom-4 right-4 flex items-center">
        <img src={NSTIANLogo} alt="NSTIAN Logo" className="w-8 mr-2" />
        <span className="text-sm">Made By NSTIAN</span>
      </div>
    </div>
  );
};

export default Error;
