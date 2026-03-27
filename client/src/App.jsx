import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import DashLayout from './component/DashLayout'
import Dashboard from './page/Dashboard'
import New from './page/New'
import Employees from './page/Employees'
import  { Toaster } from 'react-hot-toast';


const App = () => {
  return (
    <div>
      <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashLayout />} >
          {/* <Route index element={<Dashboard/>}/> */}
          <Route index element={<New/>}/>
          <Route path='employees' element={<Employees/>}/>
          </Route>
          
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
