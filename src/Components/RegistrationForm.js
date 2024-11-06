import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from '../Utilities/logo.png';
import './style.css';
import { toast } from "react-toastify";

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    fetch('https://academics.newtonschool.co/api/v1/user/signup', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        projectId: 'treoo5dhf86s',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        appType: 'bookingportals'
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.status === 'success') {
        toast.success('User Created');
        navigate('/signin');
      } else {
        toast.error(data.message);
      }
    })
    .catch(error => {
      console.error(error);
      toast.error('Error creating user');
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white px-4">
      <Link to="/" className="absolute top-4 left-4">
        <img src={logo} className="w-15 h-12 cursor-pointer" alt="Makemytrip" />
      </Link>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <p className="text-3xl font-light text-center text-[#515151] mb-8">Create an account</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-[16px] text-[#757575] font-light mb-1">Your name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full h-[45px] px-4 font-light border border-blue-300 focus:border-blue-500 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-[16px] text-[#757575] font-light mb-1">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email address"
              required
              className="w-full h-[45px] px-4 font-light border border-blue-300 focus:border-blue-500 rounded"
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
              className="w-full h-[45px] px-4 font-light border border-blue-300 focus:border-blue-500 rounded"
            />
          </div>
          <button type="submit" className="w-full h-[67px] bg-[#378BE9] text-[29px] text-[#C4DDF8] font-light rounded mb-4">Register</button>
          <div className="flex justify-center items-center mt-2 text-xs text-[#797979]">
            <span className="text-[16px]">Already have an account?</span>
            <Link to="/signin" className="text-blue-400 ml-2 text-[16px] font-light">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
