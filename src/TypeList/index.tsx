import React, { useState } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { Text, Button, ListItem, Header } from 'react-native-elements'
import Details from '../Details'
import { GetTypesQuery, useGetTypesQuery } from '../graphql/generated/output'

interface Props {
  search: string
}

type ResponseType = GetTypesQuery[
  | 'specieses'
  | 'vehicles'
  | 'persons'
  | 'planets'
  | 'starships'][number]

const TypeList: React.FC<Props> = ({ search }) => {
  const [visibleId, setVisibleId] = useState<string | undefined>(undefined)

  const { data, loading, error } = useGetTypesQuery({
    variables: {
      search,
    },
    fetchPolicy: 'network-only',
  })

  if (loading) {
    return (
      <View style={styles.centeredView}>
        <Text>...loading</Text>
      </View>
    )
  }

  if (error)
    return (
      <View style={styles.centeredView}>
        <Text>{error.message}</Text>
      </View>
    )

  const types = [
    ...data!.specieses,
    ...data!.vehicles,
    ...data!.persons,
    ...data!.planets,
    ...data!.starships,
  ]

  if (types.length === 0) {
    return (
      <View style={styles.centeredView}>
        <Text>...no types found</Text>
      </View>
    )
  }

  return (
    <ScrollView>
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
              <ListItem.Subtitle style={styles.subtitle}>
                {type?.__typename}
              </ListItem.Subtitle>
            </ListItem.Content>
            <Button
              title="Details"
              onPress={() => setVisibleId(type?.id)}
              buttonStyle={styles.button}
            />
          </ListItem>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    height: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  button: {
    backgroundColor: 'red',
  },
  subtitle: {
    color: 'grey',
  },
})

export default TypeList
