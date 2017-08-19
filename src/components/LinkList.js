import React from 'react'
import Link from './Link'
import NewVoteSubscription from '../subscriptions/NewVoteSubscription'
import { ITEMS_PER_PAGE } from '../constants'
import {
  createPaginationContainer,
  graphql
} from 'react-relay'

class LinkList extends React.Component {
  constructor (props) {
    super(props)
    this._loadMore = this._loadMore.bind(this)
  }

  componentDidMount () {
    NewVoteSubscription()
  }

  _loadMore () {
    const { relay } = this.props
    if (!relay.hasMore()) {
      console.log(`Nothing more to load`)
    } else if (relay.isLoading()) {
      console.log(`Request is already pending`)
    } else {
      relay.loadMore(ITEMS_PER_PAGE)
    }
  }

  render () {
    const { edges } = this.props.viewer.allLinks
    return (
      <div>
        <div>
        {
          edges.map(({ node }, index) =>
            <Link key={ node.__id } index={ index } link={ node } />
          )
        }
        </div>
        <div className="flex ml4 mv3 gray">
          <div className="pointer" onClick={ this._loadMore }>More</div>
        </div>
      </div>
    )
  }
}

export default createPaginationContainer (
  LinkList,
  {
    viewer: graphql`
      fragment LinkList_viewer on Viewer {
        allLinks(
          first: $count,
          after: $after,
          orderBy: createdAt_DESC
        ) @connection(key: "LinkList_allLinks") {
          edges {
            node {
              ...Link_link
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `
  },
  {
    direction: 'forward',
    // will be used for all the requests triggered through loadMore
    query: graphql`
      query LinkListForwardQuery(
        $count: Int!,
        $after: String
      ) {
        viewer {
          ...LinkList_viewer
        }
      }
    `,
    // should return the connection you want to paginate on
    getConnectionFromProps: ({ viewer }) => viewer && viewer.allLinks,
    // the variables used to read the data from the fragment
    getFragmentVariables: (prevVariables, count) => ({ ...prevVariables, count }),
    // the variables to use when sending the pagination query
    getVariables: (props, { count, cursor: after }) => ({ count, after })
  }
)
