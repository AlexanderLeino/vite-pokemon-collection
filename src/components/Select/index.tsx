import Label from "../label"

interface Props {
  data: any[],
  name: string,
  handleChange: any,
  label: string,
  labelColor?: string,
  fontSize?: string,
  required?: boolean,
}

export const Select = ({ data, name, handleChange, label, labelColor, fontSize, required = false }: Props) => {

  return (
    <>
      <Label required={required} labelColor={labelColor} fontSize={fontSize}>{label}</Label>
      <select className="border-solid border-2 border-slate-300 hover:border-orange-500 p-1 outline-none focus-visible:outline-none focus-visible:border-orange-500 " name={name} onChange={handleChange} style={{height: '32px'}}>
        {data?.map((value, index) => {
          return <option key={index}>{value?.name}</option>
        })}
      </select>
    </>
  )
}
