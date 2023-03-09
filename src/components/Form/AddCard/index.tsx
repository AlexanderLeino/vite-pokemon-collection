import { useEffect, useState } from "react"
import Input from "../../Input"
import Flex from "../../Flex"
import { Button } from "../../Button"
import { Select } from '../../Select'
import CardSets from "../../../data/CardSetData"
import CardTypeArray from "../../../data/CardType"
import SubTypeArray from "../../../data/TrainerTypes"
import ElementTypesArray from "../../../data/ElementTypes"
import { useAuthContext } from "../../../context/AuthCtx"
import { Layout } from "../../Layout"
import axios from "axios"

type props = {
    setResults: (card: any) => void,
    notify: (message: string) => void
}

const AddCardForm = ({ setResults, notify }: props) => {
    const { currentUser } = useAuthContext()
    const [createCard, setCreateCard] = useState(false)
    const [card, setCard] = useState({ prefix: '', name: '', suffix: '', cardNumber: '', cardType: 'Pokemon', cardSet: 'Base Set', userId: currentUser.userId, tags: [""], elementType: 'Fire', artist: "" })

    useEffect(() => {
        if (createCard) {
            handleSubmit()
        }
    }, [createCard])

    const handleChange = (e: any) => {
        let value = e.target.value
        let name = e.target.name
        setCard({ ...card, [name]: value })
    }

    const updateUserCardList = async (pokemon: any) => {
        await axios.post('http://localhost:3001/api/user/updateCardList', {
            data: { cardData: pokemon, userId: currentUser.userId }
        })
    }

    const handleSubmit = async () => {
        let { data: { card: foundCard, message } } = await axios.post('http://localhost:3001/api/card/createCard', {
            data: card
        })
        
        setResults({card: foundCard, message})
        if(foundCard){
            let {data: {result}} = await doesCardExistOnUser(foundCard)
            if(result){
                incrementQuantityByOne(foundCard)
            } else {
                updateUserCardList(foundCard)
            }
        }
        setCreateCard(false)
    }

    const incrementQuantityByOne = async (pokemon: any) => {
        let { data: { card, message } } = await axios.post('http://localhost:3001/api/user/incrementQuantity', {
            cardData: pokemon, _id: currentUser.userId
        })

        setResults({ message, card })
    }

    const doesCardExistOnUser = async (card: any) => {
        let result =  await axios.post('http://localhost:3001/api/user/doesCardExistOnUser', {
            data: {userId: currentUser.userId, name: card.name, cardNumber: card.cardNumber}
        })

        return result
    }



    return (
        <>
        <Layout>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    setCard({ ...card, tags: [card.suffix, card.elementType, card.cardSet, card.name] })
                    setCreateCard(true)
                }}
            >
                <Flex flexDirection="flex-col">
                    <div className="grid grid-cols-3 space-x-3 w-fit">
                        <Input onChange={handleChange} name='prefix' label="Prefix" type='text' fontSize="text-md"  labelColor="text-orange-900" />
                        <Input name='name' label="Name" onChange={handleChange} type='text' fontSize="text-md" labelColor="text-orange-900" required />
                        <Input name='suffix' label="Suffix" onChange={handleChange} fontSize="text-md" labelColor="text-orange-900" type='text' />
                    </div>
                    
                    <Input name='cardNumber' label='Card Number / Secret Number' fontSize="text-md" labelColor="text-orange-900" onChange={handleChange} type='string' required />
                    
                    <Select name='cardType' label='Card Type' fontSize="text-md" labelColor="text-orange-900" data={CardTypeArray} handleChange={handleChange} />
                    
                    <Select fontSize="text-md" labelColor="text-orange-900"  name='cardSet' label='Card Set' data={CardSets} handleChange={handleChange} />
                    {
                        card.cardType === 'Trainer'
                            ?
                            <Select handleChange={handleChange} data={SubTypeArray} name='trainerType' label='Trainer Type' fontSize="text-md" labelColor="text-orange-900"  />
                            :
                            card.cardType === 'Pokemon'
                                ?
                                <Select handleChange={handleChange} data={ElementTypesArray} fontSize="text-md" labelColor="text-orange-900"  label='Element Type' name='elementType' />
                                :
                                null
                    }
                    <Input name='artist' fontSize="text-md" labelColor="text-orange-900"  label='Artist' required onChange={handleChange} type='string' />
                    <Flex justifyContent="justify-center" width="w-full">
                        <Button margin="mt-3" onClick={() => {
                            setCard({ ...card, tags: [card.suffix, card.elementType, card.cardSet, card.name] })
                            setCreateCard(true)
                        }}>Submit</Button>
                    </Flex>
                </Flex>
            </form>
        </Layout>

        </>
    )
}

export default AddCardForm