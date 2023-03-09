import React, { useState } from 'react'
import { Button } from '../../Button'
import Input from '../../Input'
import Flex from '../../Flex'
import Label from '../../label'
import AuthService from '../../../utlis/Auth'
import useWindowDimensions from '../../../hooks/getWindowDimensions'
const localStorage = window.localStorage
export const CreateAccount = () => {
  const {width , height } = useWindowDimensions()
  const [accountInfo, setAccountInfo] = useState({ userName: "", password: '', email: '' })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    let response = await AuthService.createUser(accountInfo)

    let signedToken = response.data
    localStorage.setItem('user', JSON.stringify(signedToken))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value })
  };
  return (
    <div className={`flex flex-col justify-start w-full bg-orange-300 items-center ${width > 1200 ? "rounded-tr-3xl rounded-br-3xl" : "rounded-bl-3xl rounded-br-3xl"}  h-full`} >
      <form onSubmit={(e) => handleSubmit(e)} className='h-fit flex flex-col items-center justify-center w-full '>
        <Flex flexDirection='flex-col' alignItems='items-center' justifyContent='justify-center' height='h-full'>
          <div className={`font-bold text-6xl ${width > 1200 ? "mt-40" : "mt-5"} text-orange-500`}>Get started</div>
          <div className='mt-2 text-orange-400 font-bold text-2xl'>Create your account now</div>
        </Flex>
        <Flex justifyContent='justify-center' alignItems='items-center' flexDirection='flex-col' borderRadius='rounded-md' marginTop='mt-5' height='h-full'>
          <Input label='Email' type='email' name={'email'} margin={'mt-0'}  required onChange={handleChange} />
          <Input label='Username' type='string' name={'userName'} margin={'mt-4'}  width={'w-full'} required onChange={handleChange} />
          <Input label='Password' name={'password'} width={'w-full'} margin={'mt-4'}  type='password' required onChange={handleChange} />
          <Button onClick={handleSubmit} margin='mt-4' width='w-full' border='border-none'>Submit</Button>
          <div className='mt-2 mb-5 text-orange-500'>Have an account?<a className='ml-2 font-bold text-orange-500' href='/login'>Login</a></div>
        </Flex>
      </form>
    </div>
  )
}
