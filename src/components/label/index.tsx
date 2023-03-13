
interface props {
    children: string,
    fontSize?: string,
    labelColor?: string,
    margin?: string,
    required?: boolean,
}

const Label = ({children, fontSize = 'text-base', labelColor = 'text-orange-400', margin, required = false} :props) => {
  return (
    <>
      {
        required ? <div className={`${fontSize} ${labelColor} ${margin} font-bold h-fit`}>{children}<span className="ml-[2px]">*</span></div>
        : 
        <div className={`${fontSize} ${labelColor} ${margin} font-bold h-fit`}>{children}</div>
      }
    </>
  )
}

export default Label
