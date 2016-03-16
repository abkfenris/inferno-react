import React, { PropTypes } from 'react'

import iconUrl from '../../utils/icons'

type Props = {
  layer: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  bounds: PropTypes.array.isRequired,
  geojson: PropTypes.object.isRequired
};
export class Mapbox extends React.Component {
  props: Props;

  setGeoJSON () {
    this.featureLayer.setGeoJSON(this.props.geojson)
  }

  componentDidMount () {
    this.map = L.mapbox.map('map', this.props.layer, { //eslint-disable-line
      accessToken: this.props.accessToken
    }).fitBounds(this.props.bounds)
    this.featureLayer = L.mapbox.featureLayer(null, { //eslint-disable-line
      pointToLayer: function (feature, latlng) {
        let smallIcon = L.icon({ //eslint-disable-line
          iconSize: [27, 27],
          iconAnchor: [13, 27],
          popupAnchor: [1, -24],
          iconUrl: iconUrl(feature)
        })
        console.log('figuring out icon for', feature)
        return L.marker(latlng, {icon: smallIcon}) //eslint-disable-line
      }
    })
    this.featureLayer.addTo(this.map)
    this.setGeoJSON()
  }

  componentDidUpdate () {
    this.setGeoJSON()
  }

  render () {
    return (
      <div id='map'></div>
    )
  }
}

export default Mapbox
