import {useState, useEffect} from 'react'
import Flex from "../components/Flex"
import axios from 'axios'
import { useAuthContext } from '../context/AuthCtx'
import { Card } from '../components/Card'
import { Notification } from '../components/Notification'
import { toast } from 'react-toastify';
import { Layout } from '../components/Layout'
import { IPokemon } from '../interfaces/IPokemon'
const CardVault = () => {
  const [userCollection, setUserCollection] =  useState<any[]>([])
  const [filteredCollection, setFilteredCollection] = useState<any[]>([])
  const [filterCriteria, setFilterCriteria] = useState(['VMAX'])
  const [portValue, setPortValue] = useState(0)
  const {currentUser} = useAuthContext()

  const notify = () => toast("User has been Updated!")
  const getUserCollection = async () => {
    let {data: {cardCollection, portfolioValue}} = await axios.post('http://localhost:3001/api/user/userCollection', {
      data: currentUser.userId
    })
    setPortValue(portfolioValue)
    setUserCollection(cardCollection)
  }
  const filterUsersCollection = (pokemon: IPokemon) => {
    let results = pokemon.tags.some(tag => {
      let founded = filterCriteria.find(element => element === tag)
      if(founded) {
          return true
      } else {
          return false
      }
  })
  console.log("RESULTS", results)
  return results
}

useEffect(() => {
  getUserCollection()
}, [])

useEffect(() => {
  let filteredSelection = userCollection.filter(pokemon => {
    console.log("POKEMONNNN", pokemon)
    if(filterUsersCollection(pokemon)) {
      return true
  } else {
      return false
  }
    
  })
  setFilteredCollection(filteredSelection)
}, [userCollection, filterCriteria])


  return (
    <>
    <Layout>
      <Flex justifyContent='justify-end' width='w-full'>
        <div className="font-bold text-2xl text-orange-100 bg-orange-600 p-2">Current Value Of ${portValue?.toFixed(2)}</div>
      </Flex>
     
      <Flex horizontalChild="space-x-4">

        {
          filteredCollection.map((card) => {
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
