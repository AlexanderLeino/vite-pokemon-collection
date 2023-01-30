import React, { useState } from 'react'
import axios from 'axios'
import { Select } from '../../Select'
import Flex from '../../Flex'
import Input from '../../Input'
import { Button } from '../../Button'
import CardSets from "../../../data/CardSetData"
import CardTypeArray from "../../../data/CardType"
import SubTypeArray from "../../../data/TrainerTypes"
import ElementTypesArray from "../../../data/ElementTypes"
import { useAuthContext } from '../../../context/AuthCtx'
export const FindCard = () => {

    const { currentUser } = useAuthContext()
    const [card, setCard] = useState({ name: '', CardNumber: '', cardType: 'Pokemon', cardSet: '', userId: currentUser.userId })

    const handleChange = (e: any) => {
        let value = e.target.value
        let name = e.target.name
        setCard({ ...card, [name]: value })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        let results = await axios.post('http://localhost:3001/api/card/findCard', {
            data: card
        })
        console.log(results.data.fullName)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Flex flexDirection="flex-col">
                
                <Input name='name' label="Name" onChange={handleChange} type='text' />
                
                <Input name='cardNumber' label='Card Number / Secret Number' onChange={handleChange} type='text' />
                
                <Flex justifyContent="justify-center" width="w-full">
                    <Button margin="mt-3" onClick={handleSubmit}>Submit</Button>
                </Flex>
            </Flex>
        </form>
    )
}
