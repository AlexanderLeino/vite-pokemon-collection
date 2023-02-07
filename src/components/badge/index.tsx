import React from 'react'
import { colors } from '../../utlis/colors'
import Flex from '../Flex'
import './index.css'
type props = {
    tags: string[]
}

let tags = ["V", "Psychic", "Pokemon GO", "Mewtwo", "2022"]

export const Badges = ({tags}:props) => {
  return (
    <Flex horizontalChild='space-x-1' width='w-72'>
        {
            tags.map((tag: string, index) => {
                return <div className={`px-2 font-bold rounded-full badge text-sm mt-1`}>{tag}</div>
            })
        }
    </Flex>
  )
}
