
interface props {
    children: string,
    fontSize?: string,
    labelColor?: string,
    margin?: string,
}

const Label = ({children, fontSize = 'text-xl', labelColor = 'text-orange-400', margin} :props) => {
  return (
    <div className={`${fontSize} ${labelColor} ${margin} font-bold h-fit`}>{children}</div>
  )
}

export default Label
