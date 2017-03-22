import React, { Component } from 'react'

import App from 'WebGL/app'
import './style.styl'

export default class Experience extends Component {
  componentDidMount () {
    this.DOM = {
      experience: this.node
    }
    this.app = new App(this.DOM.experience)
  }

  render () {
    return <div ref={node => this.node = node} className='experience' />
  }
}
