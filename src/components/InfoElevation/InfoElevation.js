import React from 'react'
import {LineChart} from 'react-d3-basic'

type Props = {

};

var width = 250
var height = 300
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

export class InfoElevation extends React.Component {
  props: Props;

  render () {
    let elevations = this.props.elevations
    console.log(elevations)

    return (
      <LineChart
        margins={margins}
        data={elevations}
        width={width}
        height={height}
        chartSeries={chartSeries}
        x={x}
        />
      //<div>Test Words</div>
    )
  }
}

export default InfoElevation
