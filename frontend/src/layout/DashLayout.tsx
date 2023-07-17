import { Outlet } from 'react-router-dom'
import DashNavbar from '../components/DashNavbar'
import DashFooter from '../components/DashFooter'

function DashLayout() {
   return (
      <>
         <DashNavbar />
         <div className="flex-[1]">
            <Outlet />
         </div>
         <DashFooter />
      </>
   )
}

export default DashLayout
