import React, { PropTypes } from 'react'

type Props = {
  layer: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  bounds: PropTypes.array.isRequired,
  geojson: PropTypes.object.isRequired
};
export class Mapbox extends React.Component {
  props: Props;

  componentDidMount () {
    this.map = L.mapbox.map('map', this.props.layer, { //eslint-disable-line
      accessToken: this.props.accessToken
    }).fitBounds(this.props.bounds)
  }

  render () {
    return (
      <div id='map'></div>
    )
  }
}

export default Mapbox
