import React from 'react'
import Link from './Link'

const mockedLinks = [
  {
    id: '1',
    description: 'l1-desc',
    url: 'l1-url'
  },
  {
    id: '2',
    description: 'l2-desc',
    url: 'l2-url'
  }
]

class LinkList extends React.Component {
  render () {
    return (
      <div>
      {
        mockedLinks.map(link =>
          <Link key={ link.id } link={ link } />
        )
      }
      </div>
    )
  }
}

export default LinkList
