import {useState, useEffect} from 'react'
import Flex from "../components/Flex"
import axios from 'axios'
import { useAuthContext } from '../context/AuthCtx'
import { Card } from '../components/Card'
import Select from 'react-select'

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
  const [portValue, setPortValue] = useState(0)
  const [tags, setTags] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {currentUser} = useAuthContext()
  const [selectedOptions, setSelectedOptions] = useState([])
  console.log("SELECTED OPTIONS", selectedOptions)

  const getUserCollection = async () => {
    setIsLoading(true)
    let {data: {cardCollection, portfolioValue, tags}} = await axios.post('http://localhost:3001/api/user/userCollection', {
      data: currentUser.userId
    })
    setPortValue(portfolioValue)
    setUserCollection(cardCollection)
    setTags(tags)
    setSelectedOptions([])
    setIsLoading(false)
}
  useEffect(() => {
    getUserCollection()
  }, [])

  const handleSelectChange = (e: any) => {
    setSelectedOptions(e)
  }

  useEffect(() => {
    if(selectedOptions.length >= 1){
      console.log("WE HAVE AN OPTION")
    }
  }, [selectedOptions])

  return (
    <>
    <Select 
      options={tags} isMulti={true} defaultValue={tags}
      onChange={(e) => handleSelectChange(e)}
    />
    
      <Flex justifyContent='justify-end' width='w-full'>
        <div className="font-bold text-2xl text-orange-100 bg-orange-600 p-2">Current Value Of ${portValue?.toFixed(2)}</div>
      </Flex>
     
      <Flex horizontalChild="space-x-4">

        {
          userCollection?.map((card) => {
            return <Card getUserCollection={getUserCollection} elementType={card?.elementType} prefix={card?.prefix} suffix={card?.suffix} name={card?.name} cardType={card?.cardType} artist={card?.artist} cardNumber={card?.cardNumber} quantity={card?.quantity} picture={card?.picture} price={card?.price} tags={card?.tags}/>
          })
        }
        
      </Flex>
    </>
  )
}

export default CardVault
