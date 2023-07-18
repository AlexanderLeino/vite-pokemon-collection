import React, { useState, useEffect } from 'react'
import { Button } from '../Button'
import Flex from '../Flex'
import { useAuthContext } from '../../context/AuthCtx'
import axios from 'axios'
type props = {
    cardName: string,
    cardNumber: string,
    getUserCollection: () => void,
    quantity: number,
    notify: () => void
}

export const QuantityController = ({ getUserCollection, cardName, cardNumber, quantity, notify }: props) => {
    const { currentUser } = useAuthContext()
    const [displayedQuantity, setDisplayedQuantity] = useState(quantity)


    
    useEffect(() => {

        if (quantity != displayedQuantity) {
            let timer = setTimeout(submitQuanityChange, 1000)
            return () => {
                clearTimeout(timer)
            }
        }
    }, [displayedQuantity])



    const handleQuantityChange = (e: any) => {
        let name = e.target.name
        if (displayedQuantity === 0 && name === 'decrement') return
        name === 'increment'
            ? setDisplayedQuantity(displayedQuantity + 1)
            : setDisplayedQuantity(displayedQuantity - 1)

    }

    const submitQuanityChange = async () => {
        console.log("Quantity Change Submitted")
        let results = await axios.post("http://localhost:3001/api/user/updateCardList", {
            data: { quantityValue: displayedQuantity, userId: currentUser.userId, cardData: { cardName, cardNumber } },
        })

        getUserCollection()
        notify()

    }

    const handleDelete = async () => {

        await axios.post('http://localhost:3001/api/user/deleteCardFromCollection', {
            data: {
                userId: currentUser.userId, cardData: {
                    cardName, cardNumber
                }
            }
        })

        getUserCollection()
    }


    return (
        <>

            {
                displayedQuantity === 0
                    ?
                    <>
                        <Flex horizontalChild='space-x-5' marginTop='mt-1' justifyContent='justify-center' width='w-full' alignItems='items-center' flexWrap='nowrap'>
                            <Button
                                width='w-full'
                                backgroundColor='bg-orange-400'
                                fontSize='text-lg'
                                onClick={handleDelete}
                                name='decrement'
                                borderRadiusBottomLeft='rounded-bl-xl'
                                border='border-0'

                            >Delete</Button>
                            <div className='text-xl font-extrabold text-orange-600'>{quantity}</div>
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
                        <div className='text-xl font-extrabold text-orange-600'>{displayedQuantity}</div>
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
