import Label from "../label"
import Flex from "../Flex"
interface props {
    onChange: any,
    name: string,
    label: string,
    type: string,
    required?: boolean,
    fontSize?: string,
    width?: string,
    labelColor?: string,
    margin?: string,
}


const Input = ({onChange, name, label, type = 'string', required = false, fontSize = 'text-base', width = 'w-fit', labelColor = 'text-orange-500', margin} : props) => {

  return (
    <Flex justifyContent="justify-start" flexDirection="flex-col">
        <Label required={required} labelColor={labelColor} fontSize={fontSize} margin={margin}>{label}</Label>
        { 
          required ?  
          <input name={name} className={`${width} valid:border-green-600 ${fontSize} h-fit focus:invalid:border-red-500 border-2 outline-none border-slate-300 rounded-md p-1`} onChange={onChange} type={type} required /> 
          : 
          <input name={name} className={`${width} border-2 outline-none ${fontSize} h-fit border-slate-300 rounded-md p-1`} onChange={onChange} type={type} /> 
        }
      
    </Flex>
  );
};

export default Input