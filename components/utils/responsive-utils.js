import { Component } from 'react'
import PropTypes from 'prop-types'

export const compactVersionMediaQuery = `(max-width: 750px)`
export const wideVersionMediaQuery = `(min-width: 751px)`

export const allQueries = {
  compactVersion: compactVersionMediaQuery,
  wideVersion: wideVersionMediaQuery,
}

const matchMedia = query => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia(query).matches
  }
  return { matches: false }
}

export class AllMatchMedia extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }

  state = {}

  componentWillMount () {
    if (typeof window === 'undefined') return
    window.addEventListener('resize', this.updateMatch)
    this.updateMatch()
  }

  componentWillUnmount () {
    if (typeof window === 'undefined') return
    window.removeEventListener('resize', this.updateMatch)
  }

  updateMatch = () => {
    const composeQueryKey = queryName =>
      `is${queryName.charAt(0).toUpperCase() + queryName.slice(1)}Viewport`

    const newState = Object.keys(allQueries).reduce(
      (acc, queryName) => ({
        ...acc,
        [composeQueryKey(queryName)]: matchMedia(allQueries[queryName]),
      }),
      {}
    )
    this.setState(newState)
  }

  render () {
    const { children } = this.props
    return children(this.state)
  }
}
