import {useState, useEffect} from 'react'
import { FindCard } from "../components/Form/FindCard"
import { Badges } from "../components/Badges"
import { Card } from "../components/Card"
import Flex from "../components/Flex"
import axios from 'axios'
import { useAuthContext } from '../context/AuthCtx'

interface Collection {
  map(arg0: (card: any) => JSX.Element): import("react").ReactNode
  name: string, 
  prefix?: string, 
  suffix?: string,
  cardType: string,
  artist: string,
  rating: number,
  cardNumber: number,
  price: number,
  quantity: number,
  tags: string[],
  picture: string,
  elementType?: string,
  
} 

const CardVault = () => {
  const [userCollection, setUserCollection] =  useState<Collection | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const {currentUser} = useAuthContext()

  const getUserCollection = async () => {
    setIsLoading(true)
    let {data: {cardCollection}} = await axios.post('http://localhost:3001/api/user/userCollection', {
      data: currentUser.userId
    })
  
    setUserCollection(cardCollection)
    setIsLoading(false)
}
  useEffect(() => {
    getUserCollection()
  }, [])

 
  return (
    <>
      <Flex horizontalChild="space-x-4">

        {
          userCollection?.map((card) => {
            return <Card elementType={card?.elementType} prefix={card?.prefix} suffix={card?.suffix} name={card?.name} cardType={card?.cardType} artist={card?.artist} cardNumber={card?.cardNumber} rating={card?.rating} quantity={card?.quantity} picture={card?.picture} price={card?.price} tags={card?.tags}/>
          })
        }
        
      </Flex>
    </>
  )
}

export default CardVault
