import React, { useState, useEffect } from 'react'
import { Text } from 'ink'
import figlet from 'figlet'

export const Title = () => {
  const [title, setTitle] = useState<string>()

  useEffect(() => {
    figlet(
      'Hello!!',
      {
        font: 'Bulbhead',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
      },
      (_, d) => setTitle(d)
    )
  }, [])

  return <Text>{title}</Text>
}
