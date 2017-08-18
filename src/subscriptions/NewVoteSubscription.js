import {
  graphql,
  requestSubscription
} from 'react-relay'
import environment from '../Environment'

const subscription = graphql`
  subscription NewVoteSubscription {
    Vote(filter: { mutation_in: [CREATED] }) {
      node {
        id
        user {
          id
        }
        link {
          id
          _votesMeta {
            count
          }
        }
      }
    }
  }
`

const variables = {}

export default () => {
  const subscriptionConfig = {
    subscription,
    variables,
    updater: proxyStore => {
      const updatedLink = proxyStore
        .getRootField('Vote')
        .getLinkedRecord('node')
        .getLinkedRecord('link')
      const linkId = updatedLink.getValue('id')
      const newVoteCount = updatedLink
        .getLinkedRecord('_votesMeta')
        .getValue('count')
      proxyStore
        .get(linkId)
        .getLinkedRecord('votes')
        .setValue(newVoteCount, 'count')
    },
    onError: error => console.log('An error ocurred:', error)
  }

  requestSubscription(environment, subscriptionConfig)
}
