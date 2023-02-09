import React from 'react'
import { colors } from '../../utlis/colors'
import Flex from '../Flex'
import './index.css'
type props = {
    tags: string[]
}
export const Badges = ({tags}:props) => {
  return (
    <Flex horizontalChild='space-x-1'>
        {
            tags.map((tag: string, index) => {
                return <div key={index} className={`px-2 font-bold rounded-full badge text-sm mt-1`}>{tag}</div>
            })
        }
    </Flex>
  )
}
