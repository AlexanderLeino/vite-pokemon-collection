import React from 'react'
import Flex from '../Flex'
import { Badges } from '../badge'
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'

let pokemonObj = {
    name: "Umbreon", 
    prefix: '',
    suffix: 'VMax',
    cardType: "Pokemon",
    artist: "Artist Name Here",
    cardSet: "Evolving Skies", 
    year: '2022',
    cardNumber: 215, 
    price: 475.17,
    quantity: 1,
    picture: "https://commondatastorage.googleapis.com/images.pricecharting.com/51be4d69dd4d183041e131460ce0073a5b8b4b574749d41b253f7eb8541ab748/240.jpg",
    tags: ['Vmax', "Psychic", "Evolving Skies", "Umbreon"]
}


export const Card = () => {
  return (
    <Flex flexDirection='flex-col' margin='mt-2'>
            <img style={{width: 'fit-content'}} src={pokemonObj.picture}/>
        <Flex justifyContent='justify-center'>
            <AiFillStar className='hover:text-yellow-500 text-2xl'/>
            <AiFillStar className='hover:text-yellow-500 text-2xl'/>
            <AiFillStar className='hover:text-yellow-500 text-2xl'/>
            <AiOutlineStar className='hover:text-yellow-500 text-2xl'/>
            <AiOutlineStar className='hover:text-yellow-500 text-2xl'/>
        </Flex>
        <Badges tags={pokemonObj.tags}/>
    </Flex>
  )
}
