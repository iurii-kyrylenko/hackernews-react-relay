import React from 'react'
import Link from './Link'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'

// const mockedLinks = [
//   {
//     id: '1',
//     description: 'l1-desc',
//     url: 'l1-url'
//   },
//   {
//     id: '2',
//     description: 'l2-desc',
//     url: 'l2-url'
//   }
// ]

class LinkList extends React.Component {
  render () {
    const { edges } = this.props.viewer.allLinks
    return (
      <div>
      {
        edges.map(({ node }) =>
          <Link key={ node.__id } link={ node } />
        )
      }
      </div>
    )
  }
}

export default createFragmentContainer(
  LinkList,
  graphql`
    fragment LinkList_viewer on Viewer {
      allLinks(last: 100, orderBy: createdAt_DESC) @connection(key: "LinkList_allLinks", filters: []) {
        edges {
          node {
            ...Link_link
          }
        }
      }
    }
  `
)
