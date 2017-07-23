import React from 'react'
import Link from './Link'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'

class LinkList extends React.Component {
  render () {
    const { edges } = this.props.viewer.allLinks
    return (
      <div>
      {
        edges.map(({ node }, index) =>
          <Link key={ node.__id } index={ index } link={ node } />
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
