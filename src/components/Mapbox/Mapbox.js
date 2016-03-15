import React from 'react'

type Props = {

};
export class Mapbox extends React.Component {
  props: Props;

  componentDidMount() {
    this.map = L.mapbox.map('map', this.props.layer, {
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
