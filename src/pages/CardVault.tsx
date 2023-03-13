import {useState, useEffect} from 'react'
import Flex from "../components/Flex"
import axios from 'axios'
import { useAuthContext } from '../context/AuthCtx'
import { Card } from '../components/Card'
import { Notification } from '../components/Notification'
import { toast } from 'react-toastify';
import { Layout } from '../components/Layout'

const CardVault = () => {
  const [userCollection, setUserCollection] =  useState<any[]>([])
  const [portValue, setPortValue] = useState(0)
  const {currentUser} = useAuthContext()
  const notify = () => toast("User has been Updated!")
  const getUserCollection = async () => {
    let {data: {cardCollection, portfolioValue}} = await axios.post('http://localhost:3001/api/user/userCollection', {
      data: currentUser.userId
    })
    console.log("USER COLLECTION CALLED", userCollection, portfolioValue)
    setPortValue(portfolioValue)
    setUserCollection(cardCollection)
  }
  
  useEffect(() => {
    getUserCollection()
  }, [])


  return (
    <>
    <Layout>
      <Flex justifyContent='justify-end' width='w-full'>
        <div className="font-bold text-2xl text-orange-100 bg-orange-600 p-2">Current Value Of ${portValue?.toFixed(2)}</div>
      </Flex>
     
      <Flex horizontalChild="space-x-4">

        {
          userCollection.map((card) => {
            return <Card getUserCollection={getUserCollection} elementType={card?.elementType} prefix={card?.prefix} suffix={card?.suffix} name={card?.name} cardType={card?.cardType} artist={card?.artist} cardNumber={card?.cardNumber} quantity={card?.quantity} picture={card?.picture} price={card?.price} tags={card?.tags} notify={notify}/>
          })
        }
        
      </Flex>
      <Notification />
    </Layout>
    </>
  )
}

export default CardVault
