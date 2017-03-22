import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/app'

import { AppContainer } from 'react-hot-loader'

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('container')
  )
}

if (module.hot) {
  console.log('module is hot')
  module.hot.accept('./components/app', () => {
    console.info('render the app')
    render(App)
  })
}
