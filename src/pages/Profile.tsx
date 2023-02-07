import React from 'react'
import { useAuthContext } from '../context/AuthCtx'
import { Button } from '../components/Button'
import axios from 'axios'
export const Profile = () => {
    const {currentUser, setCurrentUser} = useAuthContext()
    const getUserCollection = async () => {

      let results = await axios.post('http://localhost:3001/api/user/userCollection', {
        data: currentUser.userId
      })
     
      let {data: { cardCollection, portfolioValue}} = results
      console.log("cardCollection", cardCollection, 'Portfolio Value', portfolioValue)

    }
  
  return (
    <>
      <h2>Welcome Back {currentUser.userName}!</h2>
      <Button onClick={getUserCollection}>Click To Fetch Users Collection</Button>
    </>
  )
}
