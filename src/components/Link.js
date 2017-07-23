import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'

import { GC_USER_ID } from '../constants'
import { timeDifferenceForDate } from '../utils/timeDiff'
import CreateVoteMutation from '../mutations/CreateVoteMutation'

class Link extends React.Component {
  constructor (props) {
    super(props)
    this._voteForLink = this._voteForLink.bind(this)
    this._userCanVoteOnLink = this._userCanVoteOnLink.bind(this)
  }

  async _voteForLink () {
    const userId = localStorage.getItem(GC_USER_ID)
    const linkId = this.props.link.id
    if (!userId) {
      console.error('Can\'t vote without user ID')
      return
    }
    const canVote = await this._userCanVoteOnLink (linkId, userId)
    if (canVote) {
      CreateVoteMutation(linkId, userId)
    }
    else {
      console.log('Sorry, you have already voted for this link')
    }
  }

  async _userCanVoteOnLink (linkId, userId) {
    const query = `
      query VotesOnLinkQuery($linkId: ID!, $userId: ID!) {
        viewer {
          allVotes(filter: {
            user: { id: $userId }
            link: { id: $linkId }
          }) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    `

    const result = await this.props.relay.environment._network.fetch(
      { text: query },
      { userId, linkId }
    )

    return !result.data.viewer.allVotes.edges.length
  }

  render () {
    const userId = localStorage.getItem(GC_USER_ID)
    return (
      <div className='flex mt2 items-start'>
        <div className='flex items-center'>
          <span className='gray'>{this.props.index + 1}.</span>
          {
            userId &&
            <div
              className='ml1 gray f11 pointer'
              onClick={ this._voteForLink }
            >▲</div>
          }
        </div>
        <div className='ml1'>
          <div>{this.props.link.description} ({this.props.link.url})</div>
          <div className='f6 lh-copy gray'>
            { this.props.link.votes.count } votes |
            by { this.props.link.postedBy ? this.props.link.postedBy.name : 'Unknown' }
            &nbsp;{ timeDifferenceForDate(this.props.link.createdAt) }
          </div>
        </div>
      </div>
    )
  }
}

export default createFragmentContainer(
  Link,
  graphql`
    fragment Link_link on Link {
      id
      description
      url
      createdAt
      postedBy {
        id
        name
      }
      votes {
        count
      }
    }
  `
)
