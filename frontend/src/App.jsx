
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signin.jsx';
import Dashboard from './pages/Dashboard.jsx'
import SendMoney from './pages/SendMoney.jsx';
function App() {

  return (
    <>
     <BrowserRouter>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
