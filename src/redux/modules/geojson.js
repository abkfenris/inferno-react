import fetch from 'isomorphic-fetch'

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_GEOJSON = 'LOAD_GEOJSON'
export const LOADING_GEOJSON = 'LOADING_GEOJSON'
export const RECIEVE_GEOJSON = 'RECIEVE_GEOJSON'
export const FAILED_GEOJSON = 'FAILED_GEOJSON'
export const JSON_URL = 'https://gist.githubusercontent.com/abkfenris/d979f32ffcda7e528031/raw/259d179b3c348d577cbc1f17c8561903e85764ef/map.geojson' //eslint-disable-line

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
    console.log('about to fetch')
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

// ------------------------------------
// Action Handlers
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
const geojsonReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_GEOJSON:
      return Object.assign({}, state, {loading: true})
    case RECIEVE_GEOJSON:
      return Object.assign({}, action.json)
    case FAILED_GEOJSON:
      return Object.assign({}, state, {loading: false, failed: true})
    case LOAD_GEOJSON:
    default:
      return state
  }
}

export default geojsonReducer
