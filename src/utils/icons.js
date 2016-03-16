export const iconUrl = (feature) => {
  let base = 'images/icons/'
  if (feature.properties.icon) {
    return base + feature.properties.icon
  } else {
    return base + 'maki/marker-24@2x.png'
  }
}

export default iconUrl
