import { Button } from './components/Button'
import { CreateAccount } from './components/Form/AccountCreation/createAccount'
import { LoginForm } from './components/Form/Login/loginAccount'
import { NavBar } from './components/Navbar'
import { useAuthContext } from './context/AuthCtx'
import {Footer} from './components/Footer'
import { Profile } from './pages/Profile'
import { Login } from './pages/Login'
import AuthService from './utlis/Auth'
import { Layout } from './components/Layout'
import {
  Routes,
  Route,

} from "react-router-dom";
import { Signup } from './pages/Signup'

function App() {
  const {currentUser, setCurrentUser} = useAuthContext()
  
  
  return (
    <>
    <NavBar />
     <Layout >
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/profile/:id' element={<Profile />}/>
          <Route path='/signup' element={<Signup />}/>
        </Routes>
 
     <Footer />
     </Layout>
    </>
  )
}

export default App
