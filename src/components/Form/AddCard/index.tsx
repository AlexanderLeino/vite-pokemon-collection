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

type props = {
    setFoundCard: (card: any) => void
}

const AddCardForm = ({setFoundCard}: props) => {
    const {currentUser} = useAuthContext()
    const [isLoading , setIsLoading] = useState(false)
    const [createCard , setCreateCard] = useState(false)
    const [card, setCard] = useState({prefix: '', name: '', suffix: '', cardNumber: '', cardType: 'Pokemon', cardSet: 'Base Set', userId: currentUser.userId, tags: [""], elementType: 'Fire', artist: "" })

    useEffect(() => {
       if(createCard){
        handleSubmit()
       } 
    }, [createCard])
   
   
    const handleChange = (e: any) => {
        let value = e.target.value
        let name = e.target.name
        setCard({ ...card, [name]: value})
    }

    const updateUserCardList = async (pokemon: any) => {
        await axios.post('http://localhost:3001/api/user/updateCardList', {
            data: {cardData: pokemon, userId: currentUser.userId}
        })
    }

    const handleSubmit = async () => {
        let {data} = await axios.post('http://localhost:3001/api/card/createCard', {
          data: card
        })
       
        if(data.message) {
            console.log(data.cardData)
            updateUserCardList(data.cardData)
        } else {
            console.log(data)
            setFoundCard(data)
            updateUserCardList(data)
        }
        setCreateCard(false)
    }

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault()
                setCard({...card, tags:[card.suffix, card.elementType, card.cardSet, card.name]})
                setCreateCard(true)
                }}>
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
                    <Select handleChange={handleChange} data={ElementTypesArray} label='Element Type' name='elementType'/>
                    :
                    null
                    }
                    <Input name='artist' label='Artist' onChange={handleChange} type='string' />
                    <Flex justifyContent="justify-center" width="w-full">
                    <Button margin="mt-3" onClick={() => {
                        setCard({...card, tags:[card.suffix, card.elementType, card.cardSet, card.name]})
                        setCreateCard(true)
                        }}>Submit</Button>
                    </Flex>
                </Flex>
            </form>
           
        </>
    )
}

export default AddCardForm