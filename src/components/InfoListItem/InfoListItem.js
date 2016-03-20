import React from 'react'

import iconUrl from '../../utils/icons'
import InfoElevation from '../InfoElevation/InfoElevation'

type Props = {
  feature: Object,
  onInfoListClick: Function
};
export class InfoListItem extends React.Component {
  props: Props;

  constructor () {
    super()
    this.onClick = this._onClick.bind(this)
  }

  renderElevation () {
    if (this.props.feature.properties.elevations) {
      return (
        <InfoElevation
          elevations={this.props.feature.properties.elevations}
        />
      )
    }
  }

  renderIcon () {
    return (
      <img className='stage-icon' src={iconUrl(this.props.feature)} />
    )
  }

  _onClick (stage) {
    return () => {
      this.props.onInfoListClick(this.props.feature.properties.stage)
    }
  }

  render () {
    const { properties } = this.props.feature
    let classes = properties.type
    if (properties.highlight === true) {
      classes += ' highlight'
    }
    return (
      <li className={classes} onClick={this._onClick(properties.stage)}>
        {this.renderIcon()}
        <div className='stage-info'>
          <h3 className='stage-name'>{properties.name}</h3>
          <div className='description'>{properties.description}</div>
          {this.renderElevation()}
        </div>
      </li>
    )
  }
}

export default InfoListItem
