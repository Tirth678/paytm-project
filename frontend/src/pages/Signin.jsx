
import Heading from '../components/Heading.jsx'
import SubHeading from '../components/SubHeading'
import Input from '../components/Input'
import BottomWarning from '../components/BottomWarning.jsx'
import Btn from '../components/Btn.jsx'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api.js';

function Signin ()  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const response = await axios.post(API_ENDPOINTS.SIGNIN, {
        username: email,
        password: password
      });
      
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Signin failed');
    }
  };

  return (
    <>
    <div className="flex justify-center mt-50">
      <div className="h-110 w-88 rounded-2xl border-2">
        <Heading title={'Sign In'}/>
        <SubHeading sub1={'Enter your credentials to access'} sub2={'your account'}/>
        <Input onChange={(e) => setEmail(e.target.value)} label="email" id="mail" for="mail" type={"text"} placeholder={"enter email"}/>
        <Input onChange={(e) => setPassword(e.target.value)} label="password" id="pass" for="pass" type={"password"} placeholder={"enter password"}/>
        <Btn onClick={handleSignin} btn={"Sign In"}/>
         <BottomWarning href={'./signup'} link={'Sign Up'}/>
      </div>
    </div>
    </>
  )
}
export default Signin