import React, { FC } from 'react'
import { Box, Newline, Text } from 'ink'
import { Title, RoundRobin, Dice } from '.'
import { selectToggle } from '../stores'

export const HelloBox: FC = () => {
  const toggle = selectToggle()

  return (
    <Box
      margin={2}
      padding={1}
      width={40}
      flexDirection="column"
      borderStyle="classic"
      borderColor="#ffffff"
      justifyContent="center"
      alignItems="center"
    >
      <Title />
      <Text>Press "Q" to choose: {String(toggle)}</Text>
      <Newline />
      <RoundRobin />
      <Dice propy="Propy" />
    </Box>
  )
}
