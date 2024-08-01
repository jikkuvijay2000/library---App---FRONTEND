import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header'
import { Route, Routes } from 'react-router-dom'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Admin from './Pages/Admin'
import Library from './Pages/Library'
import UploadBooks from './Pages/UploadBooks'
import AllBooks from './Pages/AllBooks'

function App() {


  return (
    <>
      <Header/>
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/library' element={<Library/>}/>
          <Route path='/uploadbooks' element={<UploadBooks/>}/>
          <Route path='/allbooks' element={<AllBooks/>}/>
        </Routes>
      
      

      <Routes>
      <Route path='/admin' element={<Admin/>}/>
      </Routes>

      <Footer/> 
    </>
  )
}

export default App
