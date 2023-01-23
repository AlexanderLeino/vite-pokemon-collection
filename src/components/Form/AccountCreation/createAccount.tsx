import React, { useState } from 'react'
import { Button } from '../../Button'
import Input from '../../Input'
import Flex from '../../Flex'
import Label from '../../label'
import AuthService from '../../../utlis/Auth'
const localStorage = window.localStorage
export const CreateAccount= () => {

  const [accountInfo, setAccountInfo] = useState({userName: '', password:'', firstName: '', lastName: '', email: ''})

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
        <Label className='text-left w-full'>Username:</Label>
        <Input name={'userName'} onChange={handleChange} />
        <Label>Password:</Label>
        <Input name={'password'} onChange={handleChange} />
        <Label>Email:</Label>
        <Input name={'email'} onChange={handleChange} />
        <Label>First Name:</Label>
        <Input name={'firstName'} onChange={handleChange} />
        <Label>Last Name</Label>
        <Input name={'lastName'} onChange={handleChange} />

        <Button onClick={handleSubmit} backgroundColor={'bg-slate-600'} margin='mt-3'>Submit</Button>
      </Flex>
    </form>
  )
}
