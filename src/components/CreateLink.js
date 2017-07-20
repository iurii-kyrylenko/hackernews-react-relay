import React from 'react'
import CreateLinkMutation from '../mutations/CreateLinkMutation'

class CreateLink extends React.Component {

  constructor () {
    super()
    this.state = {
      description: '',
      url: ''
    }
  }

  render () {
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            placeholder="A description for the link"
            value={ this.state.description }
            onChange={ e => this.setState({ description: e.target.value }) }
          />
          <input
            className="mb2"
            placeholder="The URL for the link"
            value={ this.state.url }
            onChange={ e => this.setState({ url: e.target.value }) }
          />
        </div>
        <div className="button" onClick={ () => this._createLink() }>submit</div>
      </div>
    )
  }

  _createLink () {
    const { description, url } = this.state
    CreateLinkMutation(description, url, () => console.log('-- mutation completed --'))
  }
}

export default CreateLink
