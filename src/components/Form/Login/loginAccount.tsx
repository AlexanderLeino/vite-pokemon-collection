import React, {FC, useState} from 'react'
import Input from '../../Input'
import Flex from '../../Flex'
import { Button } from '../../Button'
import Label from '../../label'
import { loginUserState } from '../../../interfaces/form-states'
import axios from 'axios'
import AuthService from '../../../utlis/Auth'
import { Layout } from '../../Layout'
import { useAuthContext } from '../../../context/AuthCtx'
import { redirect } from 'react-router-dom'
export const LoginForm = () => {
  let Auth = useAuthContext()
  

  const [loginInfo, setLoginInfo] = useState({userName: 'Winter', password: 'Winter'})

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    let {userName, password} = loginInfo
    let response = await AuthService.login(userName,password)
    Auth?.setCurrentUser(response)
    
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({...loginInfo, [e.target.name]: e.target.value})
  };
  return (
  <Flex width='w-full' height='h-full' backgroundColor='bg-orange-300' justifyContent='justify-center'>
    <form className='mt-20' onSubmit={(e) => handleSubmit(e)}>
      <Flex justifyContent='justify-center'  alignItems='items-center' flexDirection='flex-col'>
        <div className='text-orange-500 font-bold text-7xl'>Welcome back</div>
        <div className='text-orange-400 mt-2 font-bold'>Please enter your creditials to access your portfolio</div>
        <Input margin='mt-3' label='Username:' name={'userName'} onChange={handleChange} type='text'/>
        <Input margin='mt-3' label='Password'name={'password'} onChange={handleChange} type='text'/>
        <Button border='border-0' width='w-3/5' margin='mt-5' onClick={handleSubmit}>Submit</Button>
        <div className='text-orange-400 font-bold mt-4'>Dont Have An Account? <a href='/signup' className='text-orange-500 font-extrabold'>Sign Up</a></div>
      </Flex>
    </form>
  </Flex>
  )
}