import React, {ReactNode} from 'react'
import {Link} from 'react-router-dom'
type props = {
    children: ReactNode,
    to: string,
}

export const Tab = ({children, to}: props) => {
  return (
    <Link to={`/${to}`} className='text-orange-600 font-bold  hover:text-orange-300 focus:text-orange-300   text-2xl cursor-pointer mr-4'>{children}</Link>
  )
}
