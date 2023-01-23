import React from 'react'
import { useAuthContext } from '../context/AuthCtx'
import { Navigate } from 'react-router-dom'
export const Profile = () => {
    const {currentUser, setCurrentUser} = useAuthContext()
    
  return (
    <h2>Welcome Back {currentUser.userName}!</h2>
  )
}
