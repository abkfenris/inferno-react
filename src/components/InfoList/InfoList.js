import React from 'react'

import InfoListItem from '../InfoListItem/InfoListItem'

type Props = {
  geojson: Object
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
              />
          )}
        </ul>
      </div>
    )
  }
}

export default InfoList
