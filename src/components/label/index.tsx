
interface props {
    children: string,
    className?: string
}

const Label = ({children} :props) => {
  return (
    <div className='text-left w-full'>{children}</div>
  )
}

export default Label
