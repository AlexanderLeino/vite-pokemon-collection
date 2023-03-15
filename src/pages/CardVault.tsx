import { useState, useEffect } from 'react'
import Flex from "../components/Flex"
import axios from 'axios'
import { useAuthContext } from '../context/AuthCtx'
import { Card } from '../components/Card'
import { Notification } from '../components/Notification'
import { toast } from 'react-toastify';
import { Layout } from '../components/Layout'
import { IPokemon } from '../interfaces/IPokemon'
import { FilterBar } from '../components/Filter-Bar'
import { Spinner } from '../components/Spinner'
const CardVault = () => {
  const [userCollection, setUserCollection] = useState<any[]>([])
  const [filteredCollection, setFilteredCollection] = useState<any[]>([])
  const [filterCriteria, setFilterCriteria] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [portValue, setPortValue] = useState(0)
  const { currentUser } = useAuthContext()

  const notify = () => toast("User has been Updated!")
  const getUserCollection = async () => {
    setIsLoading(true)
    let { data: { cardCollection, portfolioValue } } = await axios.post('http://localhost:3001/api/user/userCollection', {
      data: currentUser.userId
    })
    setPortValue(portfolioValue)
    setUserCollection(cardCollection)
    setIsLoading(false)
  }
  const filterUsersCollection = (pokemon: IPokemon) => {

    let results = filterCriteria.every((criteria) => {

      let founded = pokemon.tags.find(tag => tag === criteria)
      if (founded) {
        return true
      } else {
        return false
      }
    })

    return results
  }

  useEffect(() => {
    getUserCollection()
  }, [])


  useEffect(() => {
    console.log("FILTER USER COLLECTION", filteredCollection)
  }, [])

  useEffect(() => {
    let filteredSelection = userCollection.filter(pokemon => {
      return (filterUsersCollection(pokemon))
    })
    setFilteredCollection(filteredSelection)
  }, [userCollection, filterCriteria])

  if (isLoading){
    return(
      <div className='flex justify-center items-center h-full w-full'>
        <Spinner />
      </div>
       )
  }

  return (
    <>
      <Layout>
        <Flex justifyContent='justify-end' width='w-full'>
          <div className="font-bold text-2xl text-orange-100 bg-orange-600 p-2 mr-1">Cards Displayed: {filteredCollection.length} / {userCollection.length}</div>
          <div className="font-bold text-2xl text-orange-100 bg-orange-600 p-2">Current Value Of ${portValue?.toFixed(2)}</div>
        </Flex>
        <FilterBar setFilterCriteria={setFilterCriteria} />

        <Flex justifyContent='justify-center' horizontalChild='space-x-3' width='w-full'>
          {
            filterCriteria.length > 0
              ?
              filteredCollection.map((card) => {
                return <Card  getUserCollection={getUserCollection} elementType={card?.elementType} prefix={card?.prefix} suffix={card?.suffix} name={card?.name} cardType={card?.cardType} artist={card?.artist} cardNumber={card?.cardNumber} quantity={card?.quantity} picture={card?.picture} price={card?.price} tags={card?.tags} notify={notify} />
              })
              :
              userCollection.map((card) => {
                return <Card getUserCollection={getUserCollection} elementType={card?.elementType} prefix={card?.prefix} suffix={card?.suffix} name={card?.name} cardType={card?.cardType} artist={card?.artist} cardNumber={card?.cardNumber} quantity={card?.quantity} picture={card?.picture} price={card?.price} tags={card?.tags} notify={notify} />
              })
          }

        </Flex>
        <Notification />
      </Layout>
    </>
  )
}

export default CardVault
