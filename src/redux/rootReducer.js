import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import geojson from './modules/geojson'

export default combineReducers({
  geojson,
  router
})
