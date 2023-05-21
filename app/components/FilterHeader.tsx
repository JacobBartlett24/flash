import { Form } from "@remix-run/react";
import { FaMoneyBillWaveAlt } from "react-icons/fa";
import { TiSortAlphabetically} from "react-icons/ti";

export default function Filter(){
  return(
    <>
      <div className="filterWrapper">
        <FaMoneyBillWaveAlt size={30}/>
        <TiSortAlphabetically size={30}/>
        <Form>
          <select>
            <option>Colored</option>
            <option>Black and White</option>
          </select>
          <select>
            <option>Gothic</option>
            <option>American Traditional</option>
            <option>Linework</option>
          </select>
        </Form>
      </div>
    </>
  )
}