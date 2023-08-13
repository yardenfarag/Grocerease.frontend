import './styles/main.scss'
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Home } from './pages/Home'
import { StoreItems } from './pages/StoreItems'
import { Stores } from './pages/Stores'
import { LoginSignup } from './pages/LoginSignup'
import { useSelector } from 'react-redux'
import { RootState } from './store'
import { User } from './models/user'
import useAuthentication from './customHooks/useAuthentication'
import { Planner } from './pages/Planner'
import {Products} from './pages/Products'

enum Color {
  Red, Green, Blue, Yellow
}

function App() {
  useAuthentication()
  // const isDarkMode = useSelector((state:RootState) => state.settings.isDarkMode)
  function PrivateRoute({ children }: { children: React.ReactNode }) {
    const loggedInUser = useSelector<RootState, User | null>(state => state.auth.user)
    return loggedInUser ? (
      <>{[children]}</>
    ) : (
      <Navigate to='/' />
    )
  }
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/store' element={<PrivateRoute><Stores /></PrivateRoute>} />
          <Route path='/store/:id/products' element={<PrivateRoute><Products /></PrivateRoute>} />
          <Route path='/store/:id/planner' element={<PrivateRoute><Planner /></PrivateRoute>} />
          <Route path='/store/:id/items' element={<PrivateRoute><StoreItems /></PrivateRoute>} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/signup' element={<LoginSignup />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
