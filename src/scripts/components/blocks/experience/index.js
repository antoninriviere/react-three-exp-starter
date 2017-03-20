import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import App from 'WebGL/app'

export default class Experience extends Component {
  componentDidMount () {
    this.DOM = {
      experience: ReactDOM.findDOMNode(this)
    }
    this.app = new App(this.DOM.experience)
  }

  render () {
    return <div className='experience' />
  }
}
