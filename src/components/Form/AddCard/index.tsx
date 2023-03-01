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
    setResults: (card: any) => void
}

const AddCardForm = ({setResults}: props) => {
    const {currentUser} = useAuthContext()
    const [isLoading , setIsLoading] = useState(false)
    const [createCard , setCreateCard] = useState(false)
    const [card, setCard] = useState({prefix: '', name: '', suffix: '', cardNumber: '', cardType: 'Pokemon', cardSet: 'Base Set', userId: currentUser.userId, tags: [""], elementType: 'Fire', artist: "" })

    useEffect(() => {
       if(createCard){
        handleSubmit()
       } 
    }, [createCard])
   
    useEffect(() => {
        console.log("CARDY ", card)
    }, [card])

   
    const handleChange = (e: any) => {
        let value = e.target.value
        let name = e.target.name
        setCard({ ...card, [name]: value})
    }

    const updateUserCardList = async (pokemon: any) => {
        let results = await axios.post('http://localhost:3001/api/user/updateCardList', {
            data: {cardData: pokemon, userId: currentUser.userId}
        })
        console.log("update USER CARD LIST", results)
    }

    const handleSubmit = async () => {
        let {data} = await axios.post('http://localhost:3001/api/card/createCard', {
          data: card
        })
        if(data.message) {
            console.log("DATA MESSAGE", data.message)
            incrementQuantityByOne(data.cardData)
        } else {
            console.log("DATA AFTER CARD CREATION", data)
            setResults({card: data, message:'This Card wasnt found in the database so thank you for your contribution :)'})
            updateUserCardList(data)
        }
        setCreateCard(false)
    }
    
    const incrementQuantityByOne = async (pokemon: any) => {
        let {data: {card, message }} = await axios.post('http://localhost:3001/api/user/incrementQuantity', {
            cardData: pokemon, _id: currentUser.userId
        })
        
        setResults({message, card})
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