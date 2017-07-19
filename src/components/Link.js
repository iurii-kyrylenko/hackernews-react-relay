import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'

class Link extends React.Component {
  render () {
    const { link } = this.props
    return (
      <div>
        { link.description } ({ link.url })
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
    }
  `
)
