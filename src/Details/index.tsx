import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Overlay, Button, Header, ListItem } from 'react-native-elements'
import { GetTypesQuery, Species } from '../graphql/generated/output'

interface Props {
  id: string | undefined
  types: Array<
    | GetTypesQuery['specieses'][number]
    | GetTypesQuery['vehicles'][number]
    | GetTypesQuery['persons'][number]
    | GetTypesQuery['planets'][number]
    | GetTypesQuery['starships'][number]
  >
  hideOverlay: () => void
}

const Details: React.FC<Props> = ({ id, types, hideOverlay }) => {
  const type = id ? types.find((type) => type!.id === id) : undefined

  return (
    <Overlay
      isVisible={!!id}
      onBackdropPress={hideOverlay}
      overlayStyle={styles.overlay}
    >
      <View>
        <Header
          leftComponent={{
            text: type?.name,
            style: styles.headerLeft,
          }}
          rightComponent={{
            text: type?.__typename,
            style: styles.headerRight,
          }}
        />
        <View style={styles.container}>
          {!!type &&
            Object.keys(type).map((key: string) => {
              if (key === '__typename' || key === 'name') return null
              if (key === 'homeplanet')
                return (
                  <ListItem key={`homeplanet-${type[key].name}`}>
                    <ListItem.Content>
                      <ListItem.Title>homeplanet</ListItem.Title>
                      <ListItem.Subtitle style={styles.subtitle}>
                        {type[key].name}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                )
              const value =
                type[key] instanceof Array ? type[key].join(', ') : type[key]
              if (!value) return null
              return (
                <ListItem key={`${key}-${value}`}>
                  <ListItem.Content>
                    <ListItem.Title>{key}</ListItem.Title>
                    <ListItem.Subtitle style={styles.subtitle}>
                      {value}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              )
            })}

          <Button title="Back to Overview" onPress={hideOverlay} />
        </View>
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  overlay: {
    margin: 0,
    padding: 0,
    width: '90%',
  },
  container: {
    padding: 16,
  },
  headerLeft: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    width: '200%',
  },
  headerRight: {
    color: 'white',
    fontSize: 16,
  },
  subtitle: {
    color: 'grey',
  },
})

export default Details
