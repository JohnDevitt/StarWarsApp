import React from 'react'
import { Text, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import {
  GetStarshipsQuery,
  useGetStarshipsQuery,
} from './graphql/generated/output'

const StarshipList = () => {
  const { data, loading, error } = useGetStarshipsQuery()

  if (loading && data === undefined) return <Text>...loading</Text>
  if (loading && data?.starships === undefined) return <Text>...loading 2</Text>
  if (error) return <Text>{error.message}</Text>
  return (
    <View>
      {data!.starships.map((ship: GetStarshipsQuery['starships'][number]) => (
        <ListItem key={ship!.id} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{ship!.name}</ListItem.Title>
            <ListItem.Subtitle>{'starship'}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  )
}

export default StarshipList
