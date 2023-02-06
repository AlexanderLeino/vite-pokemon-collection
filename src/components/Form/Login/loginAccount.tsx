import React, {FC, useState} from 'react'
import Input from '../../Input'
import Flex from '../../Flex'
import { Button } from '../../Button'
import Label from '../../label'
import { loginUserState } from '../../../interfaces/form-states'
import axios from 'axios'
import AuthService from '../../../utlis/Auth'
import { useAuthContext } from '../../../context/AuthCtx'
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
    <form onSubmit={(e) => handleSubmit(e)}>
    <Flex justifyContent='justify-center'  alignItems='items-center' flexDirection='flex-col '>
    <div>Log Into An Acccount!</div>
      <Input label='Username:' name={'userName'} onChange={handleChange} type='text'/>
      <Input label='Password'name={'password'} onChange={handleChange} type='text'/>
      <Button margin='mt-3' onClick={handleSubmit}>Submit</Button>
    </Flex>
</form>
  )
}