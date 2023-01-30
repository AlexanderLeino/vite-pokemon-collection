import React, {useState, useEffect} from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import { useAuthContext } from '../../context/AuthCtx'
import { Tab } from '../Tab'
import {AiFillCloseSquare} from 'react-icons/ai'
import Flex from '../Flex'
import './style.css'
export const MiniNavbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {currentUser} = useAuthContext()
 
  return (
    <Flex alignItems='items-center' justifyContent='justify-end'>
        {isOpen ? <div className='modal'>
            <Flex flexDirection='flex-col' width='full-w'>
                <Flex justifyContent='justify-end' width='full-w'>
                <AiFillCloseSquare className='text-orange-400 text-4xl mr-4' onClick={() => setIsOpen(!isOpen)}/>
                </Flex>
                {currentUser.userId 
                ?
                <>
                <Tab to='about'>About</Tab>
                <Tab to='card-vault'>Card Vault</Tab>
                <Tab to='card-finder'>Card Finder</Tab>
                <Tab to={`profile/${currentUser.userId}`}>Profile</Tab>
                </> 
                :
                <>
                    <Tab to='about'>About</Tab>
                    <Tab to='card-finder'>Card Finder</Tab>
                    <Tab to='signup'>Sign Up</Tab>
                    <Tab to='login'>Login</Tab>
                </>
            
            }
            </Flex>
        </div>
        : <GiHamburgerMenu className='mr-4 text-4xl text-orange-400' onClick={()=> setIsOpen(!isOpen)} />}
        
    </Flex>
  )
}
