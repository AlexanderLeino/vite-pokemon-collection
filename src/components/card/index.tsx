import React from 'react'
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
  picture: string 
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


export const Card = ({rating, picture, tags, quantity, name, prefix, suffix, price}: pokemonObj) => {
  console.log(prefix, suffix)
  return (
    <Flex flexDirection='flex-col' margin='mt-2' justifyContent='justify-center' alignItems='items-center'>
          <Flex horizontalChild='space-x-1.5'>
            {prefix 
            ? 
            <div>{prefix}</div>
            :
            null
          }
            <div>{name}</div>
          {
            suffix
            ?
            <div>{suffix}</div>
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
