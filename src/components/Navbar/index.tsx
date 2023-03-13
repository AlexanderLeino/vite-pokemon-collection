import Flex from '../Flex'
import { Tab } from '../Tab'
import { useAuthContext } from '../../context/AuthCtx'
import useWindowDimensions from '../../hooks/getWindowDimensions'
import { Button } from '../Button'
import AuthService from '../../utlis/Auth'
import { MiniNavbar } from '../Mini-Navbar'
export const NavBar = () => {
  const { width } = useWindowDimensions()
  const { currentUser, setCurrentUser } = useAuthContext()
  return (
    <>

      <Flex justifyContent='justify-between' width='w-full' alignItems='align-center' backgroundColor='bg-orange-50' paddingY='py-4' borderWidth='border-b-4' borderColor='border-orange-500' >
        <Flex justifyContent='space-around' width='w-full'>
          <Flex alignItems='items-center'>
            <a href='/'>
              <div className='font-bold text-orange-500 text-3xl ml-4'>Pokemon Portfolio</div>
            </a>
          </Flex>
          {width <= 875 ? <MiniNavbar /> : <Flex alignItems='items-center' justifyContent='justify-end'>

            <Tab to='about'>About</Tab>
            {currentUser?.userId
              ?
              <>
                <Tab to='card-finder'>Card Finder</Tab>
                <Tab to={'card-vault'}>Card Vault</Tab>
                <Tab to='signup'>

                  <Button border='border-0' onClick={() => {
                    AuthService.logout()
                    setCurrentUser({ userId: '', userName: '', email: '', iat: 0, exp: 0 })
                  }}>Logout</Button>
                </Tab>
              </>
              :
              <>
                <Tab to='card-finder'>Card Finder</Tab>
                <Tab to='login'>Login</Tab>
                <Tab to='signup'>
                  <Button border='border-none'>Sign Up </Button>
                </Tab>

              </>

            }
          </Flex>}


        </Flex>
      </Flex>
    </>

  )
}
