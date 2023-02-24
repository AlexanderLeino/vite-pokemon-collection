import React, { useState, useEffect } from 'react'
import { Button } from '../Button'
import Flex from '../Flex'
import { useAuthContext } from '../../context/AuthCtx'
import axios from 'axios'
type props = {
    cardName: string,
    cardNumber: string,
    getUserCollection?: () => void,
    setOriginalQuantity: (quantity: number) => void
    originalQuantity: number,
   
}



export const QuantityController = ({ getUserCollection, originalQuantity, cardName, setOriginalQuantity, cardNumber }: props) => {
    const [quantityValue, setQuantityValue] = useState(originalQuantity)
    const { currentUser } = useAuthContext()

    useEffect(() => {
        let timer = setTimeout(submitQuanityChange, 3000)
        return () => {
            clearTimeout(timer)
        }
    }, [quantityValue])

    const handleQuantityChange = (e: any) => {
        let name = e.target.name
        name === 'increment'
            ? setQuantityValue(quantityValue + 1)
            : setQuantityValue(quantityValue - 1)

    }

    const submitQuanityChange = async () => {
        if (originalQuantity === quantityValue || quantityValue <= 0) return

        await axios.post("http://localhost:3001/api/user/updateCardList", {
            data: { quantityValue, userId: currentUser.userId, cardData: { cardName, cardNumber } },
            quantity : quantityValue
        })
        setOriginalQuantity(quantityValue)
        if (getUserCollection) {
            getUserCollection()
        }
    }

    const handleDelete = async () => {
        console.log("HANDLING DELETE")
    }


    return (
        <>
           
            {
                quantityValue === 0
                    ?
                <>
                    <Flex horizontalChild='space-x-5' marginTop='mt-1' justifyContent='justify-center' width='w-full' alignItems='items-center' flexWrap='nowrap'>
                    <Button
                        width='w-full'
                        backgroundColor='bg-orange-400'
                        fontSize='text-lg'
                        onClick={(e: any) => handleQuantityChange(e)}
                        name='decrement'
                        borderRadiusBottomLeft='rounded-bl-xl'
                        border='border-0'
    
                    >Delete</Button>
                    <div className='text-xl font-extrabold text-orange-600'>{quantityValue}</div>
                    <Button
                        width='w-full'
                        backgroundColor='bg-orange-500'
                        fontSize='text-lg'
                        onClick={(e: any) => handleQuantityChange(e)}
                        name='increment'
                        border='border-0'
                        borderRadiusBottomRight='rounded-br-xl'
                    >Add</Button>
                </Flex>
                </>
                    :
                    <Flex horizontalChild='space-x-5' marginTop='mt-1' justifyContent='justify-center' width='w-full' alignItems='items-center' flexWrap='nowrap'>
                    <Button
                        width='w-full'
                        fontWeight='font-bold'
                        backgroundColor='bg-orange-400'
                        fontSize='text-xl'
                        onClick={(e: any) => handleQuantityChange(e)}
                        name='decrement'
                        borderRadiusBottomLeft='rounded-bl-xl'
                        border='border-0'
    
                    >-</Button>
                    <div className='text-xl font-extrabold text-orange-600'>{quantityValue}</div>
                    <Button
                        width='w-full'
                        fontWeight='font-bold'
                        backgroundColor='bg-orange-500'
                        fontSize='text-xl'
                        onClick={(e: any) => handleQuantityChange(e)}
                        name='increment'
                        border='border-0'
                        borderRadiusBottomRight='rounded-br-xl'
                    >+</Button>
                </Flex>
            }
        </>

    )
}
