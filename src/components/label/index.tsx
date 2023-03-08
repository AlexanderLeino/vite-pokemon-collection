
interface props {
    children: string,
    fontSize?: string,
    fontColor?: string,
}

const Label = ({children, fontSize, fontColor} :props) => {
  return (
    <div className={`${fontSize} ${fontColor}`}>{children}</div>
  )
}

export default Label
