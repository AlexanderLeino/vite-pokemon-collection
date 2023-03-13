import React, { KeyboardEventHandler, useEffect } from 'react';

import CreatableSelect from 'react-select/creatable';

const components = {
  DropdownIndicator: null,
};

interface Option {
  readonly label: string;
  readonly value: string;
}

type props = {
  setFilterCriteria: (criteria : string[]) => void
}

const createOption = (label: string) => ({
  label,
  value: label,
});

export default ({setFilterCriteria}: props) => {
  const [inputValue, setInputValue] = React.useState('');
  const [value, setValue] = React.useState<readonly Option[]>([]);

  useEffect(() => {
    console.log('Input Value', value)
    let valueArray = value 
    let newValue = valueArray.map((obj) => obj.value )
    setFilterCriteria(newValue)
  }, [value])

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue('');
        event.preventDefault();
    }
  };

  return (
    <CreatableSelect
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={(newValue) => setValue(newValue)}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      placeholder="Type something and press enter..."
      value={value}
    />
  );
};
