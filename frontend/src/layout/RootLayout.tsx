import {Outlet} from 'react-router-dom'

function RootLayout() {
  return (
    <div className='min-h-screen flex flex-col p-4 bg-gradient-to-tr from-teal-300 via-cyan-400 to-blue-500'>
        <Outlet/>
    </div>
  )
}

export default RootLayout
