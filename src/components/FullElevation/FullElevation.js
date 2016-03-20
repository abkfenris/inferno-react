import React from 'react'
import {LineChart} from 'react-d3-basic'

type Props = {
  geojson: Object
};

var width = 600
var height = 200
var margins = {
  left: 50,
  right: 10,
  top: 10,
  bottom: 30
}
var chartSeries = [
  {
    field: 'y',
    name: 'Elevation',
    color: '#ff7f0e'
  }
]
var x = function (d) {
  return d.x
}

const newElevations = (elevations, start) => {
  let output = []
  for (var i = 0; i < elevations.length; i++) {
    let point = elevations[i]
    let new_x = start + point.x
    output.push({x: new_x, y: point.y})
  }
  return output
}

const geojsonToElevationArray = (geojson) => {
  let output = []
  let features = geojson.features
  let start = 0
  for (var x = 0; x < features.length; x++) {
    let feature = features[x]
    if (feature.properties.type === 'leg') {
      let elevations = feature.properties.elevations
      let new_elevations = newElevations(elevations, start)
      start = new_elevations[new_elevations.length - 1].x
      output = output.concat(new_elevations)
    }
  }
  return output
}

export class FullElevation extends React.Component {
  props: Props;

  render () {
    let elevationArray = geojsonToElevationArray(this.props.geojson)
    return (
      <div id='elevation'>
        <LineChart
          margins={margins}
          data={elevationArray}
          width={width}
          height={height}
          chartSeries={chartSeries}
          x={x}
          />
      </div>
    )
  }
}

export default FullElevation
