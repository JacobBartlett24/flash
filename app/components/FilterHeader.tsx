import { FaArrowDown, FaArrowUp, FaMoneyBillWaveAlt } from 'react-icons/fa'
import { TiSortAlphabetically } from 'react-icons/ti'
import type { filters } from '../routes/gallery.$'

export default function Filter(filters: filters) {
  const handleChange = () => {}

  return (
    <>
      <div className="filterWrapper">
        <a href="#" className="price">
          <FaMoneyBillWaveAlt size={30} />
          <div className="filter">
            <FaArrowUp size={15} />
            <FaArrowDown size={15} />
          </div>
        </a>
        <a href="#" className="alphabetical">
          <TiSortAlphabetically size={30} />
          <div className="filter">
            <FaArrowUp size={15} />
            <FaArrowDown size={15} />
          </div>
        </a>
        <select>
          <option>Colored</option>
          <option>Black and White</option>
        </select>
        <select>
          <option>Gothic</option>
          <option>American Traditional</option>
          <option>Linework</option>
        </select>
      </div>
    </>
  )
}
