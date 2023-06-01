import { json } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { ReactNode } from 'react'

type props = {
  tags: JSON
}

export default function Tags({ tags }: props) {
  return (
    <div>
      {Object.keys(tags).map((tag: string) => {
        return tags[tag] ? (
          <Link className="tagLink" to={`/gallery/${tag}`} key={tag}>
            <span className="tags">{tag}</span>
          </Link>
        ) : null
      })}
    </div>
  )
}
