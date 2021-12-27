import { useInput } from 'ink'
import { useRef, useEffect } from 'react'
import { useAppState } from './stateContext'

export const useTimerContext = (interval: number) => {
  const {
    state: { toggle },
    dispatch
  } = useAppState()

  const timerRef = useRef<NodeJS.Timer>()

  const timer = () =>
    setInterval(() => {
      dispatch({ type: 'increment' })
    }, interval)

  useEffect(() => {
    timerRef.current = timer()
    return () => timerRef.current && clearInterval(timerRef.current)
  }, [])

  useInput((input) => {
    switch (input) {
      case 'q':
        dispatch({ type: 'toggle' })
        toggle
          ? (timerRef.current = timer())
          : timerRef.current && clearInterval(timerRef.current)
        break
      default:
        break
    }
  })
}
