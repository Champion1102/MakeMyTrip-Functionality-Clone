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
    <div>
      <Link to="/">
        <img src={logo} className="w-15 h-12 ml-4 cursor-pointer" alt="Makemytrip" />
      </Link>
      <p className="text-3xl font-light pl-20 ml-96 mt-16 gap-10 text-[#515151]">Create an account</p>
      <form onSubmit={handleSubmit} className="pl-20 ml-96 mt-14">
        <div>
          <label htmlFor="name" className="text-[16px] text-[#757575] font-light mb-1">Your name</label><br />
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            className="box-border w-[482px] h-[45px] font-light mb-2 pl-4"
          />
        </div>
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
        <button type="submit" className="bg-[#378BE9] text-[29px] text-[#C4DDF8] font-light box-border w-[480px] h-[67px] rounded">Register</button>
        <div className="flex self-center mt-1 text-xs">
          <div className="flex text-neutral-600 text-[16px] text-[#797979] ml-20">
            Already have an account?
          </div>
          <Link to="/signin" className="text-blue-400 ml-5 text-[16px] font-light">Sign In</Link>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
