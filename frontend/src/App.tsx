import { Routes, Route } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './layout/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UserList'

function App() {
   return (
      <Routes>
         <Route path="/" element={<RootLayout />}>
            <Route index element={<Public />} />
            <Route path="login" element={<Login />} />

            <Route path="dash" element={<DashLayout />}>
               <Route index element={<Welcome />} />

               <Route path="notes">
                  <Route index element={<NotesList />} />
               </Route>

               <Route path="users">
                  <Route index element={<UsersList />} />
               </Route>
            </Route>
            {/* End of Dash Route */}
         </Route>
      </Routes>
   )
}

export default App
