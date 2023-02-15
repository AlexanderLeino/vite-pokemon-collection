import React, {useState, useEffect} from 'react'
import AddCardForm from '../components/Form/AddCard'
import Flex from '../components/Flex'
import { Card } from '../components/Card'

export const CardFinder = () => {
  const [foundCard, setFoundCard] = useState({name: '', elementType: "", prefix: "", cardType: "", suffix: "", rating: "", artist: "", cardNumber: "", quantity: 0, picture: "", price: 0, tags: [""], })

  return (
    <Flex>
      <AddCardForm setFoundCard={setFoundCard}/>
      {
        foundCard?.name 
        ?
        <Card 
        elementType={foundCard?.elementType} prefix={foundCard?.prefix} suffix={foundCard?.suffix} name={foundCard?.name} cardType={foundCard?.cardType} artist={foundCard?.artist} cardNumber={foundCard?.cardNumber}  quantity={foundCard?.quantity} picture={foundCard?.picture} price={foundCard?.price} tags={foundCard?.tags}
        />
        : 
        null
      }
      
    </Flex>
  )
}
