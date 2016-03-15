/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Mapbox from '../../components/Mapbox/Mapbox'

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
type Props = {
  geojson: Object
}
// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class HomeView extends React.Component<void, Props, void> {
  static propTypes = {
    geojson: PropTypes.object.isRequired
  };

  renderMain () {
    if ((this.props.geojson.type !== 'FeatureCollection') || (this.props.geojson.loading === true)) {
      <div id='main'><h2>Loading...</h2></div>
    } else {
      return (
        <div id='main'>
          <div id='main-column'>
            <div id='elevation'>Elevation</div>
            <Mapbox
              layer='mapbox.streets'
              geojson={this.props.geojson}
              bounds={[
                [44.0738, -71.3150],
                [44.2762, -71.1653]
              ]}
          </div>
          <div id='info'>
            <ul>
              {this.props.geojson.features.map((feature) =>
                <li key={feature.properties.id}><h3>{feature.properties.name}</h3></li>
              )}
            </ul>
          </div>
        </div>
      )
    }
  }

  render () {
    return (
      <div id='inferno-flex'>
        <div id='header'><h1>Tuckerman Inferno</h1></div>
        {this.renderMain()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  geojson: state.geojson
})
export default connect((mapStateToProps), {})(HomeView)
