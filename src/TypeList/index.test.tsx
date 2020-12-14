import { fireEvent, render } from '@testing-library/react-native'
import { MockedProvider } from '@apollo/client/testing'
import React from 'react'
import TypeList from '.'
import { GetTypesDocument } from '../graphql/generated/output'

const mocks = [
  {
    request: {
      query: GetTypesDocument,
      variables: { search: '' },
    },
    result: {
      data: {
        specieses: [],
        vehicles: [],
        persons: [
          {
            __typename: 'Person',
            birthYear: '41BBY',
            eyeColor: ['ORANGE'],
            gender: 'MALE',
            hairColor: [],
            height: 180,
            id: 'cj0nv9phmewhy0130he5s0k5r',
            mass: 83,
            name: 'Ackbar',
            skinColor: ['BROWNMOTTLE'],
          },
          {
            __typename: 'Person',
            birthYear: null,
            eyeColor: ['BLUE'],
            gender: 'FEMALE',
            hairColor: [],
            height: 184,
            id: 'cj0nv9pq1ewrh0130n96scghp',
            mass: 50,
            name: 'Adi Gallia',
            skinColor: ['DARK'],
          },
        ],
        planets: [],
        starships: [],
      },
    },
  },
  {
    request: {
      query: GetTypesDocument,
      variables: { search: 'abc123' },
    },
    result: {
      data: {
        specieses: [],
        vehicles: [],
        persons: [],
        planets: [],
        starships: [],
      },
    },
  },
]

const failedMock = [
  {
    request: {
      query: GetTypesDocument,
      variables: { search: '' },
    },
    error: new Error('Something bad happened'),
  },
]

test('renders the list after fetching the data', async () => {
  const { getByText, findByText, getAllByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TypeList search="" />
    </MockedProvider>
  )

  expect(getByText('...loading')).toBeTruthy()
  expect(await findByText('Adi Gallia')).toBeTruthy()
  expect(getAllByText('Person')).toHaveLength(2)
})

test('clicking "Details" renders the overlay', async () => {
  const { findAllByText, getByText, queryByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TypeList search="" />
    </MockedProvider>
  )

  const detailsButtons = await findAllByText('Details')
  fireEvent.press(detailsButtons[0])
  expect(getByText('cj0nv9phmewhy0130he5s0k5r')).toBeTruthy()
  fireEvent.press(getByText('Back to Overview'))
  expect(queryByText('cj0nv9phmewhy0130he5s0k5r')).toBeNull()
})

test('clicking "Details" renders the overlay', async () => {
  const { findAllByText, getByText, queryByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TypeList search="" />
    </MockedProvider>
  )

  const detailsButtons = await findAllByText('Details')
  fireEvent.press(detailsButtons[0])
  expect(getByText('cj0nv9phmewhy0130he5s0k5r')).toBeTruthy()
  fireEvent.press(getByText('Back to Overview'))
  expect(queryByText('cj0nv9phmewhy0130he5s0k5r')).toBeNull()
})

test('a message is displayed when no results are found', async () => {
  const { findByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TypeList search="abc123" />
    </MockedProvider>
  )

  expect(await findByText('...no types found')).toBeTruthy()
})

test('An error message is displayed when something goes wrong in the query', async () => {
  const { findByText } = render(
    <MockedProvider mocks={failedMock} addTypename={false}>
      <TypeList search="" />
    </MockedProvider>
  )

  expect(await findByText('Something bad happened')).toBeTruthy()
})
