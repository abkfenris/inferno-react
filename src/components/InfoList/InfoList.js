import React from 'react'

import InfoListItem from '../InfoListItem/InfoListItem'

type Props = {
  geojson: Object,
  onInfoListClick: Function
};
export class InfoList extends React.Component {
  props: Props;

  render () {
    return (
      <div id='info'>
        <ul>
          {this.props.geojson.features.map((feature) =>
            <InfoListItem
              feature={feature}
              key={feature.properties.stage}
              onInfoListClick={this.props.onInfoListClick}
              />
          )}
        </ul>
      </div>
    )
  }
}

export default InfoList
