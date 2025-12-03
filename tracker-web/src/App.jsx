import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Nav from './assets/Navbar';
import Bg from './assets/Bg';
export default function App() {
  return (
    <BrowserRouter>
      <Bg/>
      <h1 className='font-title'>Halo udnia</h1>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  )
}
