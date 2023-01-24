interface Props {
  data: any[],
  name: string,
  handleChange: any,
  label: string
}

export const Select = ({ data, name, handleChange, label }: Props) => {

  return (
    <>
      <label>{label}</label>
      <select className="border-solid border-2 border-slate-500 hover:border-orange-500 p-1 outline-none focus-visible:outline-none focus-visible:border-orange-500 " name={name} onChange={handleChange} style={{height: '32px'}}>
        {data?.map((value) => {
          return <option>{value?.name}</option>
        })}
      </select>
    </>
  )
}
