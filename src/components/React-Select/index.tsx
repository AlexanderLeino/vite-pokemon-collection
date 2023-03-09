import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import Flex from '../Flex'

const ops = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]


const ReactSelect = () =>{ 
  const [selectedOptions, setSelectedOptions] = useState(ops)
  const handleSelectChange = (e: any) => {
    setSelectedOptions(e)
  }



return (
  <>
    <Select options={ops} isMulti={true} defaultValue={ops} onChange={(e) => handleSelectChange(e)} />
    <div className='mt-3'>
      
        <Flex flexDirection='flex-col'>
        {selectedOptions.map((choice) => {
          return <>
          <Flex>
             
              <div className='ml-3'>Name: {choice.value}</div>
          </Flex>
          </>
        })}
        </Flex>
      
    </div>
  </>
)}

export default ReactSelect
