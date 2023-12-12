import React from 'react'
import DrawerComp from '../layoutComponents/Drawer'
import Header from '../layoutComponents/header'
import { Route, Routes } from 'react-router-dom'
import BoatList from '../pages/boatList'
import AccSettings from '../pages/accSettings'
import UserList from '../pages/userList'
import BoatUserList from '../pages/boatUserList'
import CopyBoatUserList from '../pages/copyBoatlist'
import BoatViewDetails from '../pages/boatViewDetailsPage/boatViewDetails'

const Panel = () => {
  return (
    <div className='d-flex'>
      <DrawerComp/>
      <div className='d-flex flex-column' style={{minWidth: '84.2%'}}>
        <Header/>
        <Routes>
          <Route path='/boatList' element={<BoatList/>}/>
          <Route path='/accSetting' element={<AccSettings/>}/>
          <Route path='/userList' element={<UserList/>}/>
          <Route path='/boatUserList' element={<BoatUserList/>}/>
          <Route path='/boatViewDetails' element={<BoatViewDetails/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Panel