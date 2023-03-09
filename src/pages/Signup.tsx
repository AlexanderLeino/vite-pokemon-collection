import React from 'react'
import { CreateAccount } from '../components/Form/AccountCreation/createAccount'
import Flex from '../components/Flex'
import StockImg from '../assets/stock-women.svg'
import useWindowDimensions from '../hooks/getWindowDimensions'
export const Signup = () => {
  
  const { width } = useWindowDimensions()

  return (
    <>
      {
        width < 1200
          ?
          <div className='flex flex-col-reverse'>

            <div className=' flex flex-col h-full items-center justify-start '>

              <img className='mt-10' style={{ width: '500px', height: 'fit-content', }} src={StockImg} />
              <div className='text-4xl font-bold text-orange-200 mt-10 ml-2'>Start Your Collection <span className='font-extrabold underline'>Today!</span></div>

            </div>
            <CreateAccount />
          </div>
          :
          <div className='grid grid-cols-2 h-full'>

            <CreateAccount />
            <div className=' flex flex-col h-full items-center justify-start pt-[120px]'>

              <img style={{ width: '500px', height: 'fit-content', }} src={StockImg} />
              <div className='text-4xl font-bold text-orange-200 mt-10 ml-2'>Start Your Collection <span className='font-extrabold underline'>Today!</span></div>

            </div>
          </div>
      }

    </>
  )
}
