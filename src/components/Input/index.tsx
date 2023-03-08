import Label from "../label"
import Flex from "../Flex"
interface props {
    onChange: any,
    name: string,
    label: string,
    type: string,
}


const Input = ({onChange, name, label, type} : props) => {

  return (
    <Flex justifyContent="justify-start" flexDirection="flex-col">
      <Label>{label}</Label>
      <input name={name} className="max-w-fit focus-visible: border-solid border-2 rounded-md border-slate-500 hover:border-orange-500 p-1 outline-none focus-visible:outline-none focus-visible:border-orange-500 " onChange={onChange} type={type} />
    </Flex>
  );
};

export default Input