
export const compactVersionMediaQuery = `(max-width: 750px)`
export const wideVersionMediaQuery = `(min-width: 751px)`

const screenSizes = {
  small: 414,
  medium: 575,
  large: 1024,
}

export const allQueries = {
  small: `(max-width: ${screenSizes.small}px)`,
  medium: `(max-width: ${screenSizes.large}px)`,
  large: `(min-width: ${screenSizes.large + 1}px)`,
  smallScreen: `(max-width: ${screenSizes.small}px) and (max-device-width: ${screenSizes.small}px)`,
  mediumScreen: `(max-width: ${screenSizes.large}px) and (max-device-width: ${screenSizes.large}px)`,
  largeScreen: `(min-width: ${screenSizes.large + 1}px) and (min-device-width: ${screenSizes.large + 1}px)`,
}
