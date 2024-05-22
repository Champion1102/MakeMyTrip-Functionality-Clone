import React from 'react';
import { Link } from 'react-router-dom';
import Ero from '../Utilities/Ero.png';
import NSTIANLogo from '../Utilities/nstlogo.png'; 
import {  toast } from 'react-toastify';

const Error = () => {
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <img src={Ero} alt="Cute 404 Image" style={{ width: '300px' }} />
      <h1 className=' text-8xl font-extrabold'>Oops!</h1>
      <p>Looks like this page doesn't exist. The unicorn ate it!</p>
      <p>But don't worry, you can click the button below to go back to the home page:</p>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none' }} onClick={()=> toast.success("Reached Home")} >Take me home!</button>
      </Link>
      <div style={{ position: 'absolute', bottom: 10, right: 10,top:700, display: 'flex', alignItems: 'center' }}>
        <img src={NSTIANLogo} alt="NSTIAN Logo" style={{ width: '30px', marginRight: '5px' }} />
        <span>Made By NSTIAN</span>
      </div>
    </div>
  );
};

export default Error;
