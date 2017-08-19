import React from 'react'
import {
  QueryRenderer,
  graphql
} from 'react-relay'
import environment from '../Environment'
import { ITEMS_PER_PAGE } from '../constants'
import LinkList from './LinkList'

const LinkListPageQuery = graphql`
  query LinkListPageQuery(
      $count: Int!,
      $after: String
  ) {
    viewer {
      ...LinkList_viewer
    }
  }
`

class LinkListPage extends React.Component {
  render () {
    return (
      <QueryRenderer
        environment={ environment }
        query={ LinkListPageQuery }
        variables={{ count: ITEMS_PER_PAGE }}
        render={
          ({ error, props }) => {
            if (error) {
              return <div>{ error.message }</div>
            }
            if (props) {
              return <LinkList viewer={ props.viewer } />
            }
            return <div>Loading...</div>
          }
        }
      />
    )
  }
}

export default LinkListPage
