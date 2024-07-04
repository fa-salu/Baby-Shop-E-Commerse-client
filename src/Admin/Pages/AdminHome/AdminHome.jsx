import React from 'react'
import Navbar from '../../Component/AdminNavbar'
import Sidebar from '../../Component/AdminSidebar'

const AdminHome = ({children}) => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="absolute top-0  ml-12">
          {children}
        </div>
    </div>
  )
}

export default AdminHome
