import React, {useState, useEffect} from 'react'
import AddCardForm from '../components/Form/AddCard'
import Flex from '../components/Flex'
import { Card } from '../components/Card'

export const CardFinder = () => {
  const [results, setResults] = useState({card: {name: '', elementType: "", prefix: "", cardType: "", suffix: "", rating: "", artist: "", cardNumber: "", quantity: 0, picture: "", price: 0, tags: [""], }, message: ''})
 
  useEffect(() => {
    console.log('RESULTSSSSSSSS', results)
  }, [results])

  return (
    <>
      <Flex horizontalChild={"space-x-20"} marginTop='mt-6'>
        <AddCardForm setResults={setResults}/>
      
      {
        results?.card?.name 
        ?
        <Flex flexDirection='flex-col'>
        <>
          {
            results.message 
            ? <div>{results.message}</div>
            : null
          }
          <Card 
            elementType={results.card?.elementType}
            prefix={results.card?.prefix} 
            suffix={results.card?.suffix} 
            name={results.card?.name} 
            cardType={results.card?.cardType} 
            artist={results.card?.artist} 
            cardNumber={results.card?.cardNumber} 
            quantity={results.card?.quantity} 
            picture={results.card?.picture} 
            price={results.card?.price} 
            tags={results.card?.tags}
            getUserCollection={() => null}
          />
        </>
        </Flex>
        : 
        null
      }
        
      </Flex>
    </>
  )
}
