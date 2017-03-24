import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/app'

import { AppContainer } from 'react-hot-loader'

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('container')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./components/app', () => {
    // window.location.reload()
    const newApp = require('./components/app').default
    render(newApp)
  })
}
