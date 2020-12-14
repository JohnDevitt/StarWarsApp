import React, { useState } from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { Button, Header, ListItem, Overlay } from 'react-native-elements'
import Details from './Details'
import { GetTypesQuery, useGetTypesQuery } from './graphql/generated/output'

interface Props {
  search: string
}

type ResponseType = GetTypesQuery[
  | 'specieses'
  | 'vehicles'
  | 'persons'
  | 'planets'
  | 'starships'][number]

const StarshipList: React.FC<Props> = ({ search }) => {
  const [visibleId, setVisibleId] = useState<string | undefined>(undefined)

  const { data, loading, error } = useGetTypesQuery({
    variables: {
      search,
    },
  })

  if (loading && data === undefined) return <Text>...loading</Text>
  if (loading && data?.starships === undefined) return <Text>...loading 2</Text>
  if (error) return <Text>{error.message}</Text>

  const types = [
    ...data!.specieses,
    ...data!.vehicles,
    ...data!.persons,
    ...data!.planets,
    ...data!.planets,
  ]
  return (
    <View>
      <Details
        id={visibleId}
        types={types}
        hideOverlay={() => setVisibleId(undefined)}
      />

      {types.map((type: ResponseType) => {
        return (
          <ListItem key={type?.id} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{type?.name}</ListItem.Title>
              <ListItem.Subtitle>{type?.__typename}</ListItem.Subtitle>
            </ListItem.Content>
            <Button
              title="Details"
              onPress={() => setVisibleId(type?.id)}
              buttonStyle={{ backgroundColor: 'red' }}
            />
          </ListItem>
        )
      })}
    </View>
  )
}

export default StarshipList
