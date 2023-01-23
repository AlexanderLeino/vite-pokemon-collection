import { Button } from './components/Button'
import { CreateAccount } from './components/Form/AccountCreation/createAccount'
import { LoginForm } from './components/Form/Login/loginAccount'
import { NavBar } from './components/Navbar'
import { useAuthContext } from './context/AuthCtx'
import { Login } from './pages/Login'
import AuthService from './utlis/Auth'
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

function App() {
  const {currentUser, setCurrentUser} = useAuthContext()
 
  
  return (
    <>
    <NavBar />
    <CreateAccount />
    <LoginForm />
    <Button onClick={() => {
      AuthService.logout()
      setCurrentUser({userId: '', userName: '', email: '', iat: 0, exp: 0})
      console.log('Logging out')}}>Logout</Button>
      <Routes>
        <Route path='/about' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
