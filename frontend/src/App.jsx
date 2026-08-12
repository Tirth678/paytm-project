
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {

  return (
    <>
     <BrowserRouter>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
