import React from 'react'
import {LineChart} from 'react-d3-basic'
import d3 from 'd3'

type Props = {
  elevations: Array
};

var width = 250
var height = 250
var margins = {
  left: 50,
  right: 10,
  top: 10,
  bottom: 30
}
var chartSeries = [
  {
    field: 'y',
    name: 'Elevation in Feet',
    color: '#0A72CE'
  }
]
var x = function (d) {
  return d.x
}

export class InfoElevation extends React.Component {
  props: Props;

  render () {
    let elevations = this.props.elevations

    // get the range of elevation values
    let yDomain = d3.extent(elevations, (d) => (d.y))

    // add some padding to the values so they look nicer
    yDomain[0] = yDomain[0] - 50
    yDomain[1] = yDomain[1] + 50

    let xDomain = d3.extent(elevations, (d) => (d.x))

    let xTickFormat = (e) => {
      // for any xMax's larger than 3, we're only looking for round numbers
      if (xDomain[1] >= 3) {
        if (Math.floor(e) === e) {
          return e
        } else {
          return
        }
      } else {
        // If it is .x0 but not if it is .xy
        // so anything smaller should be tenths
        if (Math.floor(e * 10) === e * 10) {
          return e
        } else {
          return
        }
      }
    }

    return (
      <LineChart
        margins={margins}
        data={elevations}
        width={width}
        height={height}
        chartSeries={chartSeries}
        yDomain={yDomain}
        xTickFormat={xTickFormat}
        x={x}
        />
    )
  }
}

export default InfoElevation
