import React, {useState, useEffect} from 'react'
import Flex from '../Flex'
import { QuantityController } from '../QuantityController'
type pokemonObj = {
  name: string, 
  prefix?: string, 
  suffix?: string,
  cardType: string,
  artist: string,
  rating: number,
  cardNumber: string,
  price: number,
  quantity: number,
  tags: string[],
  picture: string,
  elementType?: string,
} 

const getBackgroundColor = (elementalType: string) => {
  switch(elementalType){
    case 'Fire':
      return 'bg-amber-600'
    case 'Fighting':
      return 'bg-amber-900'
    case 'Dragon': 
      return 'bg-orange-500'
    case 'Lighting':
      return 'bg-amber-400'
    case 'Grass':
      return 'bg-green-600'
    case 'Water':
      return "bg-blue-600"
    case 'Fairy':
      return "bg-fuchsia-400"
    case 'Psychic':
      return "bg-purple-500"
    case 'Metal': 
      return 'bg-slate-500'
    case 'Colorless': 
      return 'bg-slate-300'
    default: 
      return 'bg-slate-400'
  }
}

export const Card = ({picture,  quantity, name, prefix, suffix, price, elementType}: pokemonObj) => {
  useEffect(() => {
    if(elementType === undefined) {
      elementType = "trainer"
    }
    const returnedBackgroundColor = getBackgroundColor(elementType)
      setBackgroundColor(returnedBackgroundColor)

  }, [])
  const [backgroundColor, setBackgroundColor] = useState('bg-green-500')

  return (
    <Flex flexDirection='flex-col' marginTop='mt-2' backgroundColor={backgroundColor} justifyContent='justify-center' alignItems='items-center' borderWidth='border-8' borderColor='border-orange-200' paddingX='px-2' paddingY='py-2' borderRadius='rounded-2xl' width='w-13' boxShadow='shadow-lg' >
          <Flex horizontalChild='space-x-1.5' backgroundColor='bg-orange-200' paddingX='px-2' paddingY='py-1' borderColor='border-neutral-900' borderWidth='border-2' borderRadius='rounded' marginTop='mt-1' marginBottom='mb-2'>
            {prefix 
            ? 
            <div className='text-xl font-bold'>{prefix}</div>
            :
            null
          }
            <div className='text-xl font-bold '>{name}</div>
          {
            suffix
            ?
            <div className='text-xl font-bold '>{suffix}</div>
            : 
            null
          }
          </Flex>
            <img style={{width: 'fit-content'}} src={picture}/>
        <div className='font-bold text-lg'>Market Value: ${price}</div>
        
        <QuantityController quantity={quantity}/>
          <Flex>
        </Flex>
    </Flex>
  )
}
