import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Nav from './assets/Navbar';
import Bg from './assets/Bg';
export default function App() {
  return (
    <BrowserRouter >
      <div className='relative'>
      <Bg/>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}
