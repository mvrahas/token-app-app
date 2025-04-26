import React from 'react'


interface GroupProps {
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void,
    options: { value: string; label: string }[]
}


interface ButtonProps {
    label: string,
    value: string,
    checked: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void
}


const RadioButton : React.FC<ButtonProps> = ({ label, value, checked, onChange }) => {
    return (
      <label>
        <input
          type="radio"
          value={value}
          checked={checked}
          onChange={onChange}
        />
        {label}
      </label>
    )
}


const RadioButtonGroup : React.FC<GroupProps> = ({ options, value, onChange }) =>{      
    return (
      <div>
        {options.map((option) => (
          <RadioButton
            key={option.value}
            label={option.label}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
          />
        ))}
      </div>
    )
}


export default RadioButtonGroup