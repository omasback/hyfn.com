import React from 'react'
import { useWindowScroll, useDebounce } from 'react-use'

export const ScrollContext = React.createContext(0)

export const ScrollProvider: React.FunctionComponent<{}> = ({ children }) => {
  const { y } = useWindowScroll()
  const previousY = React.useRef(0)
  const [isScrolling, setScrolling] = React.useState(false)

  // Don't let trails get longer than 40px.
  // Reduce length of trail by one to prevent
  // final delta of one causing awkward final frame.
  let deltaY = y - previousY.current
  if (deltaY > 0) {
    deltaY = Math.min(40, deltaY - 1)
  } else if (deltaY < 0) {
    deltaY = Math.max(-40, deltaY + 1)
  }

  previousY.current = y

  if (deltaY !== 0 && !isScrolling) {
    setScrolling(true)
  }

  // need to reset to zero once scrolling stops, because
  // the final delta may be non zero, causing trails to get stuck
  useDebounce(
    () => {
      setScrolling(false)
    },
    50,
    [y]
  )

  return (
    <ScrollContext.Provider value={isScrolling ? deltaY : 0}>
      {children}
    </ScrollContext.Provider>
  )
}
