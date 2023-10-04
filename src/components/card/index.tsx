import { useState, useEffect } from 'react'
import Flex from '../Flex'
import { QuantityController } from '../QuantityController'
import axios from 'axios'
import { useAuthContext } from '../../context/AuthCtx'

type pokemonObj = {
  name: string,
  prefix?: string,
  suffix?: string,
  cardType: string,
  artist: string,
  cardNumber: string,
  price: number,
  quantity: number,
  tags: string[],
  picture: string,
  elementType?: string,
  cardStyle: string,
  getUserCollection: () => void,
  notify: () => void, 
  cardSet: string,
}

const getBackgroundColor = (elementalType: string) => {
  switch (elementalType) {
    case 'Fire':
      return 'border-amber-600'
    case 'Fighting':
      return 'border-amber-900'
    case 'Dragon':
      return 'border-orange-500'
    case 'Lighting':
      return 'border-amber-400'
    case 'Grass':
      return 'border-green-600'
    case 'Water':
      return "border-blue-600"
    case 'Fairy':
      return "border-fuchsia-400"
    case 'Psychic':
      return "border-purple-500"
    case 'Metal':
      return 'border-slate-500'
    case 'Colorless':
      return 'border-slate-300'
    default:
      return 'border-slate-500'
  }
}

export const Card = ({ picture, getUserCollection, quantity, name, prefix, suffix, price, elementType, cardNumber, cardStyle, cardSet, notify }: pokemonObj) => {
  
  const { currentUser } = useAuthContext()
  console.log("CURRENT USER", currentUser.userId)

  const getNameLength = () => {
    if(suffix && prefix){
      return `${suffix} ${name} ${prefix}`.length
    } else if (suffix) {
      return `${name} ${suffix}`.length
    } else if(prefix) {
      return `${prefix} ${name}`.length
    } else {
      return `${name}`.length
    }
  }

  const getURL = async () => {
    let URLs = await axios.post("http://localhost:3001/api/card/generateURL", {data: {name, prefix, suffix, cardStyle, cardNumber, cardSet}})
 
    return URLs
  }


  const getUpdatedImage = async () => {
  
    let {data: {URL, fallBackUrl}} =  await getURL()

    let { data: {picture} }= await axios.post("http://localhost:3001/api/card/getUpdatedImage", {URL, fallBackUrl})
    
    console.log("PICTURE", picture)
   
   
    let result = await axios.post("http://localhost:3001/api/user/updateCardImageOnUser", {cardData: {cardName: name, cardNumber, updatedPicture: picture}, userId:currentUser.userId})

    console.log(result)
  
  }
   
  useEffect(() => {
    if (elementType === undefined) {
      elementType = "trainer"
    }
    const returnedBackgroundColor = getBackgroundColor(elementType)
    setCardBorderColor(returnedBackgroundColor)
  },)

  const [cardBorderColor, setCardBorderColor] = useState('')

  return (
    <Flex
      flexDirection='flex-col'
      marginTop='mt-2'
      justifyContent='justify-center'
      alignItems='items-center'
      borderWidth='border-4'
      backgroundColor='bg-orange-300'
      borderColor={cardBorderColor}
      borderRadius='rounded-2xl'
      width='w-15'
      boxShadow='shadow-lg'
      grow='grow-0'
      flexWrap='flex-wrap'
      maxWidth='max-w-15'
      >
      <Flex
        horizontalChild='space-x-1.5'
        backgroundColor='bg-orange-200'
        paddingX='px-2'
        paddingY='py-1'
        borderColor='border-neutral-900'
        roundedTop='rounded-t-xl'
        marginBottom='mb-2'
        width='w-full'
        justifyContent='justify-center'
        grow='grow-0'
        height='h-10'
        flexWrap='flex-wrap'
        alignItems='items-center'
      >

        {
          getNameLength() >= 25 ?
            <>
              {
                prefix ?
                  <div className='text-xs font-extrabold text-orange-500'>{prefix}</div>
                  :
                  null
              }
              <div className='text-xs font-extrabold text-orange-500'>{name}</div>
              {
                suffix
                  ?
                  <div className='text-xs font-extrabold text-orange-500'>{suffix}</div>
                  :
                  null
              }

            </>
            :
            getNameLength() >= 20 ? 

            <>
              {
                prefix ?

                  <div className='text-base font-extrabold  text-orange-500'>{prefix}</div>
                  :
                  null
              }

              <div className='text-base font-extrabold  text-orange-500'>{name}</div>
              {
                suffix ?
                  <div className='text-base font-extrabold  text-orange-500'>{suffix}</div>
                  :
                  null
              }
            </>
          : 
          <>
          {
            prefix ?

              <div className='text-xl font-extrabold text-orange-500'>{prefix}</div>
              :
              null
          }

          <div className='text-xl font-extrabold text-orange-500'>{name}</div>
          {
            suffix ?
              <div className='text-xl font-extrabold text-orange-500'>{suffix}</div>
              :
              null
          }
        </>
          
        }
      </Flex>
      <img className='mx-3' style={{ width: 'fit-content' }} src={picture} alt="Image Didnt Load" onLoad={() => console.log("Load Successfully")}
    onError={getUpdatedImage}/>
      <div className='bg-orange-200 w-full mt-2 rounded-b-xl'>
        <div className='font-extrabold text-lg text-center text-orange-600'>Value: ${price}</div>
        <QuantityController
          getUserCollection={() => getUserCollection()}
          cardName={name}
          cardNumber={cardNumber}
          quantity={quantity}
          notify={() => notify()}
        />
      </div>
      <Flex>
      </Flex>
    </Flex>
  )
}
