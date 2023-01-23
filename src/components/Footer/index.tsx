import React from 'react'
import Flex from '../Flex'
import {AiFillTwitterCircle, AiFillGithub} from 'react-icons/ai'

export const Footer = () => {
  return (
  <div style={{position: 'fixed', right: 0, bottom: 0}}>
    <Flex alignItems='items-center'>
    <a href='https://twitter.com/AlexDotDev' target='_blank'>
          <AiFillTwitterCircle fontSize='50px' color='#ea580c' />
        </a>
        <a href='https://github.com/AlexanderLeino?tab=repositories' target='_blank'>
          <AiFillGithub fontSize='50px' color='#ea580c'/>
        </a>
    </Flex>
  </div>
  )
}
