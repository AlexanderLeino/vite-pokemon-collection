import React, {useState, useEffect} from 'react'
import { Button } from '../Button'
import Flex from '../Flex'
import { useAuthContext } from '../../context/AuthCtx'
import axios from 'axios'
type props = {
    quantity: number
}



export const QuantityController = ({ quantity = 0 }: props) => {
    const [quantityValue, setQuantityValue] = useState(quantity)
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

    const submitQuanityChange = () => {
        console.log(quantity, quantityValue)
        if(quantity === quantityValue) return
        
    }
    
    
    return (
        <Flex horizontalChild='space-x-5' marginTop='mt-2' justifyContent='justify-center' width='w-full' alignItems='items-center'>
            <Button 
                width='w-10' 
                fontWeight='font-bold' 
                backgroundColor='bg-red-700'
                fontSize='text-xl'
                onClick={(e: any) => handleQuantityChange(e)}
                name='decrement'
            >-</Button>
            <div className='text-xl font-bold'>{quantityValue}</div>
            <Button 
                width='w-10' 
                fontWeight='font-bold' 
                backgroundColor='bg-green-700' 
                fontSize='text-xl'
                onClick={(e: any) => handleQuantityChange(e)}
                name='increment'
            >+</Button>
        </Flex>

    )
}
