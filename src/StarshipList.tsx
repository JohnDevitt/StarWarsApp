import React from 'react'
import { Text, View } from 'react-native'
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
        <Text key={ship!.name}>{ship!.name}</Text>
      ))}
    </View>
  )
}

export default StarshipList
