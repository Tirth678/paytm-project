import Heading from '../components/Heading.jsx'
import SubHeading from '../components/SubHeading.jsx'
import Input from '../components/Input.jsx'
import Btn from '../components/Btn.jsx'
import BottomWarning from '../components/BottomWarning.jsx'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api.js';

function Signup () {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      console.log('API_ENDPOINTS:', API_ENDPOINTS);
      console.log('Signup URL:', API_ENDPOINTS.SIGNUP);
      console.log('Sending signup request with:', {
        username: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      });
      
      const response = await axios.post(API_ENDPOINTS.SIGNUP, {
        username: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      });
      
      console.log('Signup response:', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Request URL:', error.config?.url);
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <>
    <div className="flex justify-center mt-50">
      <div className="h-140 w-88 rounded-2xl border-2">
        <Heading title={'Sign Up'}/>
        <SubHeading sub1={'Enter your information to create an'} sub2={'account'}/>
        <Input onChange={
          (e) => 
          {setFirstName(e.target.value)}} label="First Name" id="fname" for="fname" type={"text"} placeholder={"John"}/>
        <Input onChange={
          (e) => {setLastName(e.target.value)}
        } label="Last Name" id="lname" for="lname" type={"text"} placeholder={"Doh"}/>
        <Input onChange={
          (e) => {setEmail(e.target.value)}
        } label="Email" id="mail" for="mail" type={"email"} placeholder={"johndoe12@work.com"}/>
        <Input onChange={
          (e) => {setPassword(e.target.value)}
        } label="Password" id="pass" for="pass" type={"password"} placeholder={"johndoe@12090"}/>
        <Btn onClick={handleSignup} btn={"Sign up"}/>
        <BottomWarning href={'./signin'} link={'Sign In'}/>
      </div>
    </div>
    </>
  )
};

export default Signup
