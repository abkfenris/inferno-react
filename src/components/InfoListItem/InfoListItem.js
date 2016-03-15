import React from 'react'

type Props = {
  feature: Object
};
export class InfoListItem extends React.Component {
  props: Props;

  render () {
    return (
      <li>{this.props.feature.properties.name}</li>
    )
  }
}

export default InfoListItem
