import create from 'zustand'
import shallow from 'zustand/shallow'

export type ZuState = {
  toggle: boolean
  counter: number
  actionToggle(): void
  incrementCounter(): void
}

// Application Store ------------------------------------------------
export const useStore = create<ZuState>((set) => ({
  // state
  toggle: false,
  counter: 0,

  // actions
  actionToggle: () =>
    set((state) => ({
      ...state,
      toggle: !state.toggle
    })),
  incrementCounter: () =>
    set((state) => ({
      ...state,
      counter: state.counter + 1
    }))
}))

// selector Hooks ------------------------------------------------
export const selectToggle = () => useStore((state: ZuState) => state.toggle)
export const selectCounter = () => useStore((state: ZuState) => state.counter)
export const selectionForTimer = () =>
  useStore(
    ({ actionToggle, toggle, incrementCounter }: ZuState) => ({
      actionToggle,
      toggle,
      incrementCounter
    }),
    shallow
  )
