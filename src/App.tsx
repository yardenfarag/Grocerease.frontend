import { AppHeader } from './components/AppHeader'
import './styles/main.scss'
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { HomePage } from './views/HomePage'
import { StoreDetailsPage } from './views/StoreDetailsPage'
import { StoresPage } from './views/StoresPage'
import { LoginPage } from './views/LoginPage'
import { useSelector } from 'react-redux'
import { RootState } from './store'
import { User } from './models/user'
import useAuthentication from './customHooks/useAuthentication'
import { ShoppingList } from './components/ShoppingList'
import { Info } from './views/Info'
import { Planner } from './views/Planner'

function App() {
  useAuthentication()
  function PrivateRoute({ children }: { children: React.ReactNode }) {
    const loggedInUser = useSelector<RootState, User | null>(state => state.auth.user)
    return loggedInUser ? (
      <>{[children]}</>
    ) : (
      <Navigate to='/' />
    )
  }
  return (
    <div className=''>
      {/* {url.length && <SideNav/>} */}
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/store' element={<PrivateRoute><StoresPage /></PrivateRoute>} />
          <Route path='/store/:id/planner' element={<PrivateRoute><Planner /></PrivateRoute>} />
          <Route path='/store/:id/info' element={<PrivateRoute><Info /></PrivateRoute>} />
          <Route path='/store/:id' element={<PrivateRoute><StoreDetailsPage /></PrivateRoute>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
