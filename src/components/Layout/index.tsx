import React, {ReactNode} from 'react'

type props = {
    children: ReactNode
}


export const Layout = ({children}: props) => {
  return (
    <div className='mx-0'>{children}</div>
  )
}
