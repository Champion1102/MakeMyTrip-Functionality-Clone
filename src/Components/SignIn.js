import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from '../Utilities/logo.png';
import './style.css';
import { toast } from 'react-toastify';

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
    <div className="relative min-h-screen flex items-center justify-center bg-white px-4">
      <Link to="/" className="absolute top-4 left-4">
        <img src={logo} className="w-15 h-12 cursor-pointer" alt="Makemytrip" />
      </Link>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <p className="text-3xl font-light text-center text-[#515151] mb-8">Sign In</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-[16px] text-[#757575] font-light mb-1">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email address"
              required
              className="w-full h-[45px] px-4 font-light border border-blue-400 focus:border-blue-500 rounded"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-[16px] font-light text-[#757575] mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-[45px] px-4 font-light border  border-blue-400 focus:border-blue-500 rounded"
            />
          </div>
          <button type="submit" className="w-full h-[67px] bg-[#378BE9] text-[29px] text-[#C4DDF8] font-light rounded mb-4">Sign In</button>
          <div className="flex justify-center items-center mt-2 text-xs text-[#797979]">
            <span className="text-[16px]">Don't have an account?</span>
            <Link to='/register' className="text-blue-400 ml-2 text-[16px] font-light">Register Here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
