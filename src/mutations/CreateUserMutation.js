import {
  commitMutation,
  graphql
} from 'react-relay'
import environment from '../Environment'

const mutation = graphql`
  mutation CreateUserMutation($input1: SignupUserInput!, $input2: SigninUserInput!) {
    createUser(input: $input1) {
      user {
        id
      }
    }

    signinUser(input: $input2) {
      token
      user {
        id
      }
    }
  }
`

export default (name, email, password, callback) => {
  const variables = {
    input1: {
      name,
      clientMutationId: '',
      authProvider: {
        email: {
          email,
          password
        }
      }
    },
    input2: {
      email: {
        email,
        password
      },
      clientMutationId: ''
    }
  }

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: response => {
        const { id } = response.createUser.user.id
        const { token } = response.signinUser.token
        callback(id, token)
      },
      onError: err => console.error(err)
    }
  )
}
