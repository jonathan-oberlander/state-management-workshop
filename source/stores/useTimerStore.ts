import { useInput } from 'ink'
import { useRef, useEffect } from 'react'
import { selectionForTimer } from './stateStore'

export const useTimerStore = (interval: number) => {
  const { actionToggle, toggle, incrementCounter } = selectionForTimer()
  const timerRef = useRef<NodeJS.Timer>()

  const timer = () => setInterval(incrementCounter, interval)

  useEffect(() => {
    timerRef.current = timer()
    return () => timerRef.current && clearInterval(timerRef.current)
  }, [])

  useInput((input) => {
    switch (input) {
      case 'q':
        actionToggle()
        toggle
          ? (timerRef.current = timer())
          : timerRef.current && clearInterval(timerRef.current)
        break
      default:
        break
    }
  })
}
