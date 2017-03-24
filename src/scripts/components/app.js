
import 'Styles/app.styl'

import React, { Component } from 'react'

import Experience from './blocks/experience'

export default class App extends Component {
  render () {
    return <div id='app' key={new Date().getTime()}>
      <Experience />
    </div>
  }
}
