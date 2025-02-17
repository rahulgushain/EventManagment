import React from 'react'
import './App.css'
import Home from './Components/Home'
import { Route, Routes } from 'react-router-dom'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import AddEvent from './Components/AddEvent'
import NavBar from './Components/NavBar'
import Calender from './Components/Calender'
import Dashboard from './Components/Dashboard'

function App() {

  return (
    
      <div>
      <div>
      <NavBar/>
      </div>
<Routes>

  <Route path='/' element={<Home/>}/>
  <Route path='/SignUp' element={<SignUp/>}/>
  <Route path='/Login' element={<Login/>}/>
  <Route path='/AddEvent' element={<AddEvent/>}/>
  <Route path='/Calender' element={<Calender/>}/>
  <Route path='/Dashboard' element={<Dashboard/>}/>
</Routes>
      </div>
  )
}

export default App
