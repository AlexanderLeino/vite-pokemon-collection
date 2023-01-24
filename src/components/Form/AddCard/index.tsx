import { useEffect, useState } from "react"
import Input from "../../Input"
import Flex from "../../Flex"
import { Button } from "../../Button"
import {Select} from '../../Select'
import CardSets from "../../../data/CardSetData"
import CardTypeArray from "../../../data/CardType"
import SubTypeArray from "../../../data/TrainerTypes"
import ElementTypesArray from "../../../data/ElementTypes"
import { useAuthContext } from "../../../context/AuthCtx"
import axios from "axios"
const AddCardForm = () => {
    const {currentUser} = useAuthContext()
    const [card, setCard] = useState({prefix: '', name: '', suffix: '', CardNumber: '', cardType: 'Pokemon', cardSet: '', userId: currentUser.userId })
   
    const handleChange = (e: any) => {
        let value = e.target.value
        let name = e.target.name
        setCard({ ...card, [name]: value })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await axios.post('http://localhost:3001/api/card/findCard', {
          data: card
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Flex flexDirection="flex-col">
                <Input onChange={handleChange} name='prefix' label="Prefix" type='text'/>
                <Input name='name' label="Name" onChange={handleChange} type='text' />
                <Input name='suffix' label="Suffix" onChange={handleChange} type='text'/>
                <Input name='cardNumber' label='Card Number / Secret Number' onChange={handleChange} type='string' />
                <Select name='cardType' label='Card Type' data={CardTypeArray} handleChange={handleChange}/>
                <Select name='cardSet' label='Card Set' data={CardSets} handleChange={handleChange}/>
                {
                card.cardType === 'Trainer' 
                ? 
                <Select handleChange={handleChange} data={SubTypeArray} name='trainerType' label='Trainer Type'/> 
                : 
                card.cardType === 'Pokemon'
                ?
                <Select handleChange={handleChange} data={ElementTypesArray} label='Element Type' name='elementalType'/>
                :
                null
                }
                <Input name='artist' label='Artist' onChange={handleChange} type='string' />
                <Flex justifyContent="justify-center" width="w-full">
                <Button margin="mt-3" onClick={handleSubmit}>Submit</Button>
                </Flex>
            </Flex>
        </form>
    )
}

export default AddCardForm