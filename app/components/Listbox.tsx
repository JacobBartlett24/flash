import { useState } from 'react'
import { Listbox } from '@headlessui/react'

const sizes = [
  { id: 1, name: '4x4 in', unavailable: false },
  { id: 2, name: '6x4 in', unavailable: false },
  { id: 3, name: '6x6 in', unavailable: false },
  { id: 4, name: '8x6 in', unavailable: true },
  { id: 5, name: '8x8 in', unavailable: false },
  { id: 5, name: 'Other', unavailable: false },
]

export default function MyListbox() {
  const [size, setsize] = useState(sizes[0])

  return (
    <Listbox value={size} onChange={setsize}>
      <Listbox.Button className="selectButton">{size.name}</Listbox.Button>
      <Listbox.Options className="selectList">
        {sizes.map((size) => (
          <Listbox.Option
            key={size.id}
            value={size}
            disabled={size.unavailable}
          >
            {size.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}