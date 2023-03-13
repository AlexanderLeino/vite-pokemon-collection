import React, {useState} from 'react'
import Input from '../Input'
import ReactSelect from '../React-Select'
type props = {
  setFilterCriteria: (card: any) => void
}

export const FilterBar = ({setFilterCriteria}: props) => {
  const [componentState, setComponentState] = useState({prefix: '', name: '', suffix: '', elements: [] }) 
  const handleSubmit = (e: any ) => {
    e.preventDefault()
  }

  const handleChange = (e: React.ChangeEvent<FormDataEvent>) => {
    console.log(e)
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <ReactSelect setFilterCriteria={setFilterCriteria}/>
    </form>
  )
}
