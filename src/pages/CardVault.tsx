import {useState, useEffect} from 'react'
import Flex from "../components/Flex"
import axios from 'axios'
import { useAuthContext } from '../context/AuthCtx'
import { Card } from '../components/Card'
import { Notification } from '../components/Notification'
import { toast } from 'react-toastify';

const CardVault = () => {
  const [userCollection, setUserCollection] =  useState([{name: "Rayquaza", prefix: '', suffix: 'VMAX', cardType: 'Pokemon', artist: 'Unknown', cardNumber: '218', picture: 'https://commondatastorage.googleapis.com/images.pricecharting.com/b49dff0e72cbc9cb4be78a3b2e9fccc5edc4c0375ebd2d26f166f2dd4ecf2d12/240.jpg', quantity: 1, price: 266.24, elementType: 'Dragon', tags: ['Tags']}])
  const [portValue, setPortValue] = useState(0)
  const {currentUser} = useAuthContext()
  const notify = () => toast("User has been Updated!")
  const getUserCollection = async () => {
    let {data: {cardCollection, portfolioValue, tags}} = await axios.post('http://localhost:3001/api/user/userCollection', {
      data: currentUser.userId
    })
    setPortValue(portfolioValue)
    setUserCollection(cardCollection)
  }
  
  useEffect(() => {
    getUserCollection()
  }, [])


  return (
    <>
      <Flex justifyContent='justify-end' width='w-full'>
        <div className="font-bold text-2xl text-orange-100 bg-orange-600 p-2">Current Value Of ${portValue?.toFixed(2)}</div>
      </Flex>
     
      <Flex horizontalChild="space-x-4">

        {
          userCollection?.map((card) => {
            return <Card getUserCollection={getUserCollection} elementType={card?.elementType} prefix={card?.prefix} suffix={card?.suffix} name={card?.name} cardType={card?.cardType} artist={card?.artist} cardNumber={card?.cardNumber} quantity={card?.quantity} picture={card?.picture} price={card?.price} tags={card?.tags} notify={notify}/>
          })
        }
        
      </Flex>
      <Notification />
    </>
  )
}

export default CardVault
