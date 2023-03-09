import React, {ReactNode} from 'react'

type props = {
    children: ReactNode
}


export const Layout = ({children}: props) => {
  return (
    <div className='mx-3'>{children}</div>
  )
}
