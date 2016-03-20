import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import configureStore from './redux/configureStore'
import { loadGeojson } from './redux/modules/geojson'

// Set initial state of store
const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState)

// Now that we have the Redux store, we can create our routes. We provide
// the store to the route definitions so that routes have access to it for
// hooks such as `onEnter`.

// Now that redux has been configured, we can render the
// React application to the DOM!
ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
)

// Load initial geojson
store.dispatch(loadGeojson())
