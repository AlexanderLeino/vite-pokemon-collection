import React, {useState, useEffect} from 'react'
import Flex from '../Flex'
import { Badges } from '../Badges'
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'
import { QuantityController } from '../QuantityController'
type pokemonObj = {
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
  elementalType?: string,
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

const getRatingStar = (rating: number) => {
  switch(rating){
    case 5:
    return <Flex>
            <AiFillStar className='hover:text-yellow-500 text-2xl'/>
            <AiFillStar className='hover:text-yellow-500 text-2xl'/>
            <AiFillStar className='hover:text-yellow-500 text-2xl'/>
            <AiFillStar className='hover:text-yellow-500 text-2xl'/>
            <AiFillStar className='hover:text-yellow-500 text-2xl'/>
    </Flex>

    case 4: 
      return <Flex>
              <AiFillStar className='hover:text-yellow-500 text-2xl'/>
              <AiFillStar className='hover:text-yellow-500 text-2xl'/>
              <AiFillStar className='hover:text-yellow-500 text-2xl'/>
              <AiFillStar className='hover:text-yellow-500 text-2xl'/>
              <AiOutlineStar className='hover:text-yellow-500 text-2xl'/>
      </Flex>

    case 3: 
      return <Flex>
              <AiFillStar className='hover:text-yellow-500 text-2xl'/>
              <AiFillStar className='hover:text-yellow-500 text-2xl'/>
              <AiFillStar className='hover:text-yellow-500 text-2xl'/>
              <AiOutlineStar className='hover:text-yellow-500 text-2xl'/>
              <AiOutlineStar className='hover:text-yellow-500 text-2xl'/>
      </Flex>
 
    case 2: 
      return <Flex>
              <AiFillStar className='hover:text-yellow-500 text-2xl'/>
              <AiFillStar className='hover:text-yellow-500 text-2xl'/>
              <AiOutlineStar className='hover:text-yellow-500 text-2xl'/>
              <AiOutlineStar className='hover:text-yellow-500 text-2xl'/>
              <AiOutlineStar className='hover:text-yellow-500 text-2xl'/>
      </Flex>
    
    case 1: 
    return <Flex>
            <AiFillStar className='hover:text-yellow-500 text-2xl'/>
            <AiOutlineStar className='hover:text-yellow-500 text-2xl'/>
            <AiOutlineStar className='hover:text-yellow-500 text-2xl'/>
            <AiOutlineStar className='hover:text-yellow-500 text-2xl'/>
            <AiOutlineStar className='hover:text-yellow-500 text-2xl'/>
    </Flex>
    default: 
      return <Flex>
              <AiOutlineStar className='hover:text-yellow-500 text-2xl'/>
              <AiOutlineStar className='hover:text-yellow-500 text-2xl'/>
              <AiOutlineStar className='hover:text-yellow-500 text-2xl'/>
              <AiOutlineStar className='hover:text-yellow-500 text-2xl'/>
              <AiOutlineStar className='hover:text-yellow-500 text-2xl'/>
      </Flex>
}
  }


export const Card = ({rating, picture, tags, quantity, name, prefix, suffix, price, elementalType}: pokemonObj) => {

  useEffect(() => {
    if(elementalType === undefined) {
      elementalType = "trainer"
    }
    const returnedBackgroundColor = getBackgroundColor(elementalType)
      setBackgroundColor(returnedBackgroundColor)

  }, [])
  const [backgroundColor, setBackgroundColor] = useState('bg-green-500')

  return (
    <Flex flexDirection='flex-col' marginTop='mt-2' backgroundColor={backgroundColor} justifyContent='justify-center' alignItems='items-center' borderWidth='border-8' borderColor='border-amber-300' paddingX='px-2' paddingY='py-2' borderRadius='rounded-2xl' >
          <Flex horizontalChild='space-x-1.5'>
            {prefix 
            ? 
            <div className='text-xl font-bold mb-2'>{prefix}</div>
            :
            null
          }
            <div className='text-xl font-bold mb-2'>{name}</div>
          {
            suffix
            ?
            <div className='text-xl font-bold mb-2'>{suffix}</div>
            : 
            null
          }
          </Flex>
            <img style={{width: 'fit-content'}} src={picture}/>
            {getRatingStar(rating)}
        <Badges tags={tags}/>
        <div>Value: {price}</div>
        <div>Total Value: {(quantity * price)} </div>
        <QuantityController quantity={quantity}/>
    </Flex>
  )
}
