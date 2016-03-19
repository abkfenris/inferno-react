import fetch from 'isomorphic-fetch'
import distance from 'turf-distance'

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_GEOJSON = 'LOAD_GEOJSON'
export const LOADING_GEOJSON = 'LOADING_GEOJSON'
export const RECIEVE_GEOJSON = 'RECIEVE_GEOJSON'
export const FAILED_GEOJSON = 'FAILED_GEOJSON'
export const JSON_URL = 'https://gist.githubusercontent.com/abkfenris/d979f32ffcda7e528031/raw/map.geojson' //eslint-disable-line
export const ACTIVE_STAGE = 'ACTIVE_STAGE'

// ------------------------------------
// Actions
// ------------------------------------
export function loadingGeojson () {
  return {
    type: LOADING_GEOJSON
  }
}

export function recieveGeojson (json) {
  return {
    type: RECIEVE_GEOJSON,
    json
  }
}

export function failedGeojson (exception) {
  return {
    type: FAILED_GEOJSON,
    exception
  }
}

export function loadGeojson () {
  return function (dispatch) {
    // inform app that we are attempting to load
    dispatch(loadingGeojson())
    return fetch(JSON_URL)
      .then((response) => response.json())
      .then((json) =>
        // update state with new geojson
        dispatch(recieveGeojson(json))
      ).catch((exception) =>
        dispatch(failedGeojson(exception))
      )
  }
}

export function activeStage (stage) {
  return {
    type: ACTIVE_STAGE,
    stage
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

// ------------------------------------
// Geojson sorter
// ------------------------------------

const geojsonCompare = (a, b) => {
  if (a.properties.stage < b.properties.stage) {
    return -1
  } else if (a.properties.stage > b.properties.stage) {
    return 1
  } else {
    return 0
  }
}

// ------------------------------------
// Geojson elevations along distance
// ------------------------------------

const makePoint = (coordinates) => {
  return {type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates
    }
  }
}

const lineDistanceElevation = (coordinates_array) => {
  let output = []
  let dist = 0
  for (let i = 0; i < coordinates_array.length; i++) {
    if (i === 0) {
      output.push({x: 0, y: coordinates_array[i][2]})
    } else {
      let pointA = makePoint(coordinates_array[i - 1])
      let pointB = makePoint(coordinates_array[i])
      let distanceAB = distance(pointA, pointB, 'miles')
      dist = dist + distanceAB
      output.push({x: dist, y: coordinates_array[i][2]})
    }
  }
  return output
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
const geojsonReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_GEOJSON:
      return Object.assign({}, state, {loading: true})
    case RECIEVE_GEOJSON:
      let features = action.json.features.map((feature, index) => {
        // add display, highlight, and id properties to each feature
        var new_properties
        if (feature.geometry.type === 'LineString') {
          let elevations = lineDistanceElevation(feature.geometry.coordinates)
          new_properties = {
            display: true,
            highlight: false,
            stage: parseFloat(feature.properties.stage),
            elevations
          }
        } else {
          new_properties = {
            display: true,
            highlight: false,
            id: index, stage:
            parseFloat(feature.properties.stage),
            elevation: feature.geometry.coordinates[2]}
        }
        return Object.assign(
          {}, feature,
          {properties: Object.assign({}, feature.properties, new_properties)})
      })
      features.sort(geojsonCompare)
      return Object.assign({}, action.json, {features: features})
    case FAILED_GEOJSON:
      console.log(action.exception)
      return Object.assign({}, state, {loading: false, failed: true})
    case ACTIVE_STAGE:
      let active_features = state.features.map((feature) => {
        var new_properties
        if (feature.properties.stage === action.stage) {
          new_properties = Object.assign({}, feature.properties, {highlight: true})
        } else {
          new_properties = Object.assign({}, feature.properties, {highlight: false})
        }
        return Object.assign({}, feature, {properties: new_properties})
      })
      return Object.assign({}, state, {features: active_features})
    case LOAD_GEOJSON:
    default:
      return state
  }
}

export default geojsonReducer
