import React, {useState} from 'react'
import { Button } from '../Button'
import Flex from '../Flex'
import { Modal } from '../Modal'
export const AddCardset = () => {
  const [isOpen, setIsOpen] = useState(true)
  return (
  <>
  <Flex justifyContent='justify-end' width='w-full' marginTop='mt-2'>
    <Button fontSize='text-sm' onClick={() => setIsOpen(true)} >Add Cardset</Button>
  </Flex>
  <Modal setIsOpen={setIsOpen} isOpen={isOpen}/>
  </>
  )
}
