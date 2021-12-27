import { Box, Text, Newline } from 'ink'
import React, { useEffect } from 'react'
import {
  selectAuthStatus,
  selectAuthError,
  selectAuthData,
  actionAuthenticate
} from '../stores'

export const AuthBox = () => {
  const authenticate = actionAuthenticate()

  useEffect(() => {
    authenticate()
  }, [])

  return (
    <Box margin={2} padding={1} flexDirection="column">
      <AuthStatus />
      <Newline />
      <ErrorHandler />
      <Newline />
      <AuthData />
      <Newline />
    </Box>
  )
}

const AuthStatus = () => {
  const status = selectAuthStatus()

  return (
    <Text color={status === 'authorised' ? 'greenBright' : 'red'}>
      Status: {status}
    </Text>
  )
}

const ErrorHandler = () => {
  const error = selectAuthError()

  return error ? (
    <Text>An Error Occured{typeof error === 'string' && ': ' + error}</Text>
  ) : null
}

const AuthData = () => {
  const data = selectAuthData()

  return (
    <>
      {Object.keys(data).length > 0.2 && (
        <>
          <Text>Name: {data.forename}</Text>
          <Text>Surname: {data.surname}</Text>
          <Text>User ID: {data.userId}</Text>
        </>
      )}
    </>
  )
}
