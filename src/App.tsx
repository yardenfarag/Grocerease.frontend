import { AppHeader } from './components/AppHeader'
import './styles/main.scss'
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { HomePage } from './views/HomePage'
import { StoreDetailsPage } from './views/StoreDetailsPage'
import { StoresPage } from './views/StoresPage'
import { userService } from './services/user.service'
import { LoginPage } from './views/LoginPage'
import { useSelector } from 'react-redux'
import { RootState } from './store'
import { User } from './models/user'

function App() {
  function PrivateRoute({ children }: { children: React.ReactNode }) {
    const loggedInUser = useSelector<RootState, User | null>(state => state.user.loggedInUser)
    return loggedInUser ? (
      <>{[children]}</>
    ) : (
      <Navigate to='/' />
    )
  }
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/store' element={<PrivateRoute><StoresPage /></PrivateRoute>} />
        {/* <Route path='/store' element={<StoresPage />} /> */}
        <Route path='/store/:id' element={<PrivateRoute><StoreDetailsPage /></PrivateRoute>} />
        {/* <Route path='/store/:id' element={<StoreDetailsPage />} /> */}
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
