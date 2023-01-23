import React, {ReactNode} from 'react'
import {Link} from 'react-router-dom'
type props = {
    children: ReactNode,
}

export const Tab = ({children, }: props) => {
  return (
    <div className='text-orange-100 font-bold hover:text-orange-50 cursor-pointer'>{children}</div>
  )
}
