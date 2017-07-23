import {
  commitMutation,
  graphql
} from 'react-relay'
import environment from '../Environment'

const mutation = graphql`
  mutation CreateVoteMutation($input: CreateVoteInput!) {
    createVote(input: $input) {
      vote {
        id
        link {
          id
          votes {
            count
          }
        }
      }
      user {
        id
      }
    }
  }
`
export default (linkId, userId, callback) => {
  const variables = {
    input: {
      linkId,
      userId,
      clientMutationId: ''
    }
  }

  commitMutation(
    environment,
    {
      mutation,
      variables,
      optimisticUpdater (proxyStore) {
        const link = proxyStore.get(linkId)
        const votes = link.getLinkedRecord('votes')
        const newCount = votes.getValue('count') + 1
        votes.setValue(newCount, 'count')
      },
      updater (proxyStore) {
        const payload = proxyStore.getRootField('createVote')
        const updatedCount = payload
          .getLinkedRecord('vote')
          .getLinkedRecord('link')
          .getLinkedRecord('votes')
          .getValue('count')
        const link = proxyStore.get(linkId)
        const votes = link.getLinkedRecord('votes')
        votes.setValue(updatedCount, 'count')
      },
      onError (err) {
        console.error(err)
      }
    }
  )
}
