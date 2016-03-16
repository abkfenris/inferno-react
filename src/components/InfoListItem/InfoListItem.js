import React from 'react'
import iconUrl from '../../utils/icons'

// import Chart from 'react-d3-core'
// import { LineChart } from 'react-d3-basic'

type Props = {
  feature: Object
};
export class InfoListItem extends React.Component {
  props: Props;

  renderElevation () {
    if (this.props.feature.properties.elevations) {
      return (
        <div>Elevation Data!</div>
      )
    }
  }

  renderIcon () {
    return (
      <img src={iconUrl(this.props.feature)} />
    )
  }

  render () {
    const { properties } = this.props.feature
    return (
      <li>
        {this.renderIcon()}
        <div className='stage-info'>
          <div className='stage-name'>{properties.name}</div>
          <div className='description'>{properties.description}</div>
          {this.renderElevation()}
        </div>
      </li>
    )
  }
}

export default InfoListItem
