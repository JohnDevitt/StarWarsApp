import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import Details from '.'

const types = [
  {
    id: 'abc123',
    name: 'Starship One',
    testKey: 'testValue',
    manufacturer: ['big corp', 'other big corp'],
    homeplanet: {
      name: 'testtest',
    },
    __typename: 'Starship',
    crew: null,
    length: undefined,
  },
]

const hideOverlay = jest.fn()

test('nothing should be rendered when the id is undefined', () => {
  const { queryByText } = render(
    <Details id={undefined} types={types} hideOverlay={hideOverlay} />
  )
  expect(queryByText('abc123')).toBeNull()
  expect(queryByText('testValue')).toBeNull()
  expect(queryByText('Starship')).toBeNull()
})

it('name & id of the entity without should be rendered without labels', () => {
  const { getByText, queryByText } = render(
    <Details id="abc123" types={types} hideOverlay={hideOverlay} />
  )
  expect(getByText('Starship One')).toBeTruthy()
  expect(getByText('Starship')).toBeTruthy()
  expect(queryByText('name')).toBeNull()
  expect(queryByText('__typename')).toBeNull()
})

it('the rest of the entity data should be rendered with labels', () => {
  const { getByText } = render(
    <Details id="abc123" types={types} hideOverlay={hideOverlay} />
  )
  expect(getByText('id')).toBeTruthy()
  expect(getByText('abc123')).toBeTruthy()
  expect(getByText('testKey')).toBeTruthy()
  expect(getByText('testValue')).toBeTruthy()
  expect(getByText('manufacturer')).toBeTruthy()
  expect(getByText('big corp, other big corp')).toBeTruthy()
  expect(getByText('homeplanet')).toBeTruthy()
  expect(getByText('testtest')).toBeTruthy()
})

test('labels should not be rendered for null or undefined keys', () => {
  const { queryByText } = render(
    <Details id="abc123" types={types} hideOverlay={hideOverlay} />
  )
  expect(queryByText('crew')).toBeNull()
  expect(queryByText('length')).toBeNull()
})

test('hideOverlay callback should be called when the "Back to Overview" button is pressed', () => {
  const { getByText } = render(
    <Details id="abc123" types={types} hideOverlay={hideOverlay} />
  )
  fireEvent.press(getByText('Back to Overview'))
  expect(hideOverlay).toHaveBeenCalled()
})
