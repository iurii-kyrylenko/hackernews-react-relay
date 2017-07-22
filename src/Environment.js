import {
  Environment,
  Network,
  RecordSource,
  Store
} from 'relay-runtime'
import { GC_AUTH_TOKEN } from './constants'

const store = new Store(new RecordSource())

const network = Network.create((operation, variables) => {
  return fetch('https://api.graph.cool/relay/v1/cj5aygx77gtgu0113o7zcuxmw', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authentication': `Bearer ${localStorage.getItem(GC_AUTH_TOKEN)}`
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    })
  }).then(response => {
    return response.json()
  })
})

const environment = new Environment({
  network,
  store
})

export default environment
