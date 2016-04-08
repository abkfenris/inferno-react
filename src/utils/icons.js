export const iconUrl = (feature) => {
  let base = 'images/icons/'
  if (feature.properties.icon) {
    if (feature.properties.icon.includes('http')) {
      return feature.properties.icon
    }
    return base + feature.properties.icon
  } else {
    return base + 'maki-svg/marker-24.svg'
  }
}

export default iconUrl
