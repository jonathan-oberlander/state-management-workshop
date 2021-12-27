import React, { FC, useEffect } from 'react'
import { Text } from 'ink'
import { selectDice } from '../stores'

export const Dice: FC<{ propy: string }> = () => {
  const { dice, setDice } = selectDice()

  useEffect(() => {
    const timer = setInterval(() => {
      setDice(Math.ceil(Math.random() * 6))
    }, 400)
    return () => clearInterval(timer)
  }, [])

  return <Text bold>Dice: {dice}</Text>
}
