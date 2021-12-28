import React, {
  createContext,
  FC,
  useContext,
  useMemo,
  useReducer
} from 'react'

type State = {
  counter: number
  toggle: boolean
}

const initialState: State = {
  counter: 0,
  toggle: false
}

type Store = {
  state: State
  dispatch: React.Dispatch<Action>
}

// Actions Reducer ------------------------------------------------
type Action = { type: 'toggle' } | { type: 'increment' }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        counter: state.counter + 1
      }
    case 'toggle':
      return { ...state, toggle: !state.toggle }
    default:
      return { ...initialState }
  }
}

// Context Provider ------------------------------------------------
const AppContext = createContext<Store>({
  state: initialState,
  dispatch: () => null
})

export const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const contextValue = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

// Selector Hooks ------------------------------------------------
export const useAppState = () => useContext(AppContext)
export const useContextToggle = () => useAppState().state.toggle
export const useContextCounter = () => useAppState().state.counter

export const useMemoContextToggle = () => {
  const toggle = useAppState().state.toggle
  const memoToggle = useMemo(() => toggle, [toggle])
  return memoToggle
}

export const useMemoContextCounter = () => {
  const counter = useAppState().state.counter
  const memoCounter = useMemo(() => counter, [counter])
  return memoCounter
}
