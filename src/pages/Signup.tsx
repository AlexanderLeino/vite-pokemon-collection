import React from 'react'
import { CreateAccount } from '../components/Form/AccountCreation/createAccount'
import Flex from '../components/Flex'
import StockImg from '../assets/stockImg.svg'
export const Signup = () => {
  return (
  
    <Flex justifyContent='justify-center' width='w-full' marginTop='mt-10'>
      <img src={StockImg}/>
      <div className='bg-orange-500'>
        <CreateAccount />
      </div>
    </Flex>
  )
}
