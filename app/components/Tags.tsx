import { json } from '@remix-run/node'
import { ReactNode } from 'react'

type props = {
  tags: JSON
}

export default function Tags({ tags }: props) {
  return (
    <div>
      {Object.keys(tags).map((tag: string) => {
        return tags[tag] ? (
          <span key={tag} className="tags">
            {tag}
          </span>
        ) : null
      })}
    </div>
  )
}
