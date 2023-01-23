import React from 'react'
import Flex from '../Flex'
import { Tab } from '../Tab'
import {Link} from 'react-router-dom'
import {AiFillTwitterCircle, AiFillGithub} from 'react-icons/ai'
export const NavBar = () => {
  return (
    <Flex justifyContent='justify-between' width='w-full' alignItems='align-center' backgroundColor='bg-orange-900' paddingY='py-2'>
    <Flex alignItems='items-center' marginLeft='ml-5'><div className='font-bold text-orange-100'>Pokemon Portfolio</div></Flex>
    <Flex alignItems='items-center' marginRight='mr-5' justifyContent='justify-end'>
      <Flex justifyContent='justify-around' grow='grow' flexWrap='flex-nowrap'>
        <Link to='/about'>
          <Tab >About</Tab>
        </Link>
        <Link to='/about'>
          <Tab>Card Vault</Tab>
        </Link>
        <Link to='/about'>
          <Tab>Portfolio</Tab>
        </Link>
      </Flex>
        <a href='https://twitter.com/AlexDotDev' target='_blank'>
          <AiFillTwitterCircle fontSize='35px' color='#FFEDD5' style={{marginRight: '25px'}}/>
        </a>
        <a href='https://github.com/AlexanderLeino?tab=repositories' target='_blank'>
          <AiFillGithub fontSize='35px' color='#FFEDD5'/>
        </a>
    </Flex>
    </Flex>
  )
}
