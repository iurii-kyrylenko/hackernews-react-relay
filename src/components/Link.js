import React from 'react'

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

export default Link
