import React, {useState} from 'react'
import { Button } from '../Button'
import axios from 'axios';
import Input from '../Input';
import Flex from '../Flex';
import './index.css'
interface Props {
    isOpen: boolean,
    title?: string,
    setIsOpen: (isOpen: boolean) => void;
}

export const Modal = ({isOpen, title, setIsOpen}: Props) => {
    const [cardSetData, setCardSetData] = useState({})
    //name, year, totalNumberOfCardsInSet
    const addCardSet = async (e:any ) => {
     
       await axios.post("http://localhost:3001/api/cardSet/addCardSet", {
        data: cardSetData
       })
    }

    const onChange = (e:any) => {
        setCardSetData( { ...cardSetData, [e.target.name]: e.target.value})
    }
  return (
   
    <>
    {
        isOpen ? 
        <div className="modal-container">
        <section className="modal p-3">
            <h2 className="text-3xl font-bold text-orange-600 text-center">Add Cardset</h2>
            <Flex justifyContent='justify-center' width='w-full' flexDirection='flex-col' alignItems='items-center'>
                <Input labelColor='text-orange-600'  type='string' label='Name' name='cardSetName' required={true} onChange={onChange}></Input>
                <Input labelColor='text-orange-600' type='number' label='Year' name='year' required={true} onChange={onChange}></Input>
                <Input labelColor='text-orange-600' type='number' label='Number Of Cards in Set' name='totalNumberOfCardsInSet' required={true} onChange={onChange}></Input>
            </Flex>
        <Flex marginTop='mt-3'justifyContent='justify-center' width='w-full' height='h-full' alignItems='items-center'>
            <Button onClick={() => setIsOpen(!isOpen) } border='border-0'>Close</Button>
            <Button margin='ml-2' onClick={addCardSet} border='border-0'>Submit</Button>
        </Flex>
        </section>
      </div>
     : null}
    </>


  )
}
