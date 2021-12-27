import React from 'react'
import { Text } from 'ink'
import { useTimerStore, selectCounter } from '../stores'

const elements = [
  <Text color="green">I am green</Text>,
  <Text color="green" dimColor>
    I am dimmed green
  </Text>,
  <Text color="black" backgroundColor="yellow">
    I am black on white
  </Text>,
  <Text color="#ffffff">I am white</Text>,
  <Text bold>I am bold</Text>,
  <Text italic>I am italic</Text>,
  <Text underline>I am underline</Text>,
  <Text strikethrough>I am strikethrough</Text>,
  <Text inverse>I am inversed</Text>
]

export const RoundRobin = () => {
  useTimerStore(100)
  const counter = selectCounter()

  return <>{elements[counter % elements.length]}</>
}
