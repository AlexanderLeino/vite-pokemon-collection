import React, { useState } from 'react'
import { Button } from '../../Button'
import Input from '../../Input'
import Flex from '../../Flex'
import Label from '../../label'
import AuthService from '../../../utlis/Auth'
const localStorage = window.localStorage
export const CreateAccount = () => {

  const [accountInfo, setAccountInfo] = useState({ userName: '', password: '', firstName: '', lastName: '', email: '' })

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
    <form onSubmit={(e) => handleSubmit(e)}>
      <Flex justifyContent='justify-center' alignItems='items-center' flexDirection='flex-col' borderRadius='rounded-md' boxShadow='shadow-lg'>
        <div>Create An Account</div>
        <Input label='Username' type='string' name={'userName'} onChange={handleChange} />
        <Input label='Password' type='string' name={'password'} onChange={handleChange} />
        <Input label='Email' type='string' name={'email'} onChange={handleChange} />
        <Input label='First Name' type='string' name={'firstName'} onChange={handleChange} />
        <Input label='Last Name' type='string' name={'lastName'} onChange={handleChange} />
        <Button onClick={handleSubmit} backgroundColor={'bg-slate-600'} margin='mt-3'>Submit</Button>
      </Flex>
    </form>
  )
}
