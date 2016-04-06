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
          color={this.props.feature.properties.stroke}
        />
      )
    }
  }

  renderStyle (style, properties) {
    if (properties.stroke) {
      let obj = {}
      obj[style] = properties.stroke
      return (obj)
    }
  }

  renderIcon () {
    return (
      <img
        className='stage-icon'
        style={this.renderStyle('background', this.props.feature.properties)}
        src={iconUrl(this.props.feature)} />
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
          <h3
            className='stage-name'
            style={properties.highlight ? null : this.renderStyle('color', properties)}
            >{properties.name}</h3>
          <div className='description'>{properties.description}</div>
          {this.renderElevation()}
        </div>
      </li>
    )
  }
}

export default InfoListItem
