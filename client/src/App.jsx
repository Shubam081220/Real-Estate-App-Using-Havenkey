import './App.css'
import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import {Home} from "./pages/Home"
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import {Profile} from "./pages/Profile"
import {About} from "./pages/About"
import { Headers } from './components/Headers'
import { PrivateRoute } from './components/PrivateRoute'
function App() {

  
  return (
    <BrowserRouter>
     <Headers/>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signIn' element={<SignIn/>} />
      <Route path='/signUp' element={<SignUp />} />
      <Route path='/about' element={<About/>} />
      <Route path="/home" element={<Home/>}/>
      <Route element={<PrivateRoute/>}>
         <Route path='/profile' element={<Profile/>} />
      </Route>
      
     </Routes>
    </BrowserRouter>
  )
}

export default App
