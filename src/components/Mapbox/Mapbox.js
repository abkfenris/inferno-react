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
    L.mapbox.accessToken = this.props.accessToken //eslint-disable-line
    this.map = L.mapbox.map('map', 'mapbox.streets').fitBounds(this.props.bounds) //eslint-disable-line
    L.mapbox.styleLayer(this.props.layer).addTo(this.map) //eslint-disable-line

    this.featureLayer = L.mapbox.featureLayer(null, { //eslint-disable-line
      pointToLayer: function (feature, latlng) {
        let smallIcon = L.icon({ //eslint-disable-line
          iconSize: [27, 27],
          iconAnchor: [13, 27],
          popupAnchor: [1, -24],
          iconUrl: iconUrl(feature)
        })
        return L.marker(latlng, {icon: smallIcon}) //eslint-disable-line
      }
    })
    this.featureLayer.addTo(this.map)
    this.setGeoJSON()
  }

  componentDidUpdate () {
    this.setGeoJSON()
    var map = this.map
    this.featureLayer.eachLayer(function (marker) {
      if (marker.feature.properties.highlight === true) {
        marker.openPopup()
        map.setView(marker.getLatLng(), 13)
      }
    })
  }

  render () {
    return (
      <div id='map'></div>
    )
  }
}

export default Mapbox
