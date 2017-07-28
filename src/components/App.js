import React from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import { createHistory, useBasename } from 'history'
const projectConfig = require('../../project.config')

const browserHistory = useBasename(createHistory)({
    basename: '/' + projectConfig.urlRoot
})

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} children={this.props.routes} path={projectConfig.urlRoot}/>
        </div>
      </Provider>
    )
  }
}

export default App
