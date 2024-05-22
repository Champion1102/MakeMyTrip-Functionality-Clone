import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from '../Utilities/logo.png';
import './style.css';
import {  toast } from 'react-toastify';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://academics.newtonschool.co/api/v1/user/login', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'projectId': 'treoo5dhf86s',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        appType: 'bookingportals'
      })
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(data.message || 'Login failed');
        });
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      localStorage.setItem('token', data.token);
      toast.success('Successfully logged in');
      navigate('/'); 
    })
    .catch(error => {
      console.error(error);
      toast.error(error.message || 'Invalid email or password');
    });
  };

  return (
    <div>
      <Link to="/">
        <img src={logo} className="w-15 h-12 ml-4 cursor-pointer" alt="Makemytrip" />
      </Link>
      <p className="text-3xl font-light pl-20 ml-96 mt-16 gap-10 text-[#515151]">Sign In</p>
      <form onSubmit={handleSubmit} className="pl-20 ml-96 mt-14">
        <div>
          <label htmlFor="email" className="text-[16px] text-[#757575] font-light mb-1">Email address</label><br />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email address"
            required
            className="box-border w-[482px] h-[45px] font-light mb-2 pl-4"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-[16px] font-light text-[#757575] mb-1">Password</label><br />
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="box-border w-[482px] h-[45px] font-light mb-14 pl-4"
          />
        </div>
        <button type="submit" className="bg-[#378BE9] text-[29px] text-[#C4DDF8] font-light box-border w-[480px] h-[67px] rounded">Sign In</button>
        <div className="flex self-center mt-1 text-xs">
          <div className="flex text-neutral-600 text-[16px] text-[#797979] ml-20">
            Don't have an account?
          </div>
          <Link to='/register' className="text-blue-400 ml-5 text-[16px] font-light">Register Here</Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
