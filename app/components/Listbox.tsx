import { useState } from 'react'
import { Listbox } from '@headlessui/react'

export type Option = {
  id: number
  name: string
  unavailable: boolean
}

export default function MyListbox({ options }: Option[]) {
  const [option, setoption] = useState(options[0])

  return (
    <Listbox value={option} onChange={setoption}>
      <Listbox.Button className="selectButton">{option.name}</Listbox.Button>
      <Listbox.Options className="selectList">
        {options.map((option) => (
          <Listbox.Option
            key={option.id}
            value={option}
            disabled={option.unavailable}
          >
            {option.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}
