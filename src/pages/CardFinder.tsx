import {useState, useEffect} from 'react'
import AddCardForm from '../components/Form/AddCard'
import Flex from '../components/Flex'
import { Notification } from '../components/Notification'
import { ExpandedCard } from '../components/Expanded-Card'
import { toast } from 'react-toastify';

export const CardFinder = () => {
  const [results, setResults] = useState({card: {name: '', elementType: "", prefix: "", cardType: "", suffix: "", rating: "", artist: "", cardNumber: "", quantity: 0, picture: "", price: 0, tags: [""], }, message: ''})


  useEffect(() => {
    if(results.card.name){
      notify()
    }
  }, [results])

  const notify = () => toast("User has been updated!");
  return (
    <>
      <Flex horizontalChild={"space-x-20"} marginTop='mt-6'>
        <AddCardForm setResults={setResults} notify={notify}/>
      
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
          <ExpandedCard 
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
            notify={() => notify()}
            getUserCollection={() => null}
          />
        </>
        </Flex>
        : 
        null
      }
        
      </Flex>
      
      <Notification />
    </>
  )
}
