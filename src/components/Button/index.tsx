import { ReactNode } from 'react'
interface Props {
  children?: ReactNode
  onClick: any,
  backgroundColor?: string,
  margin?: string,
}


export const Button = ({ children, onClick, backgroundColor='bg-orange-500', margin }: Props) => {
  return (
    <button className={`w-fit ${backgroundColor} ${margin} text-indigo-100 border border-solid border-slate-600 p-2 rounded-lg font-bold hover:text-zinc-50  transition ease-in-out delay-5000 duration-300 hover:bg-purple-500` } onClick={onClick}>{children}</button>
  )
}

