import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Overlay, Button, Text, Header } from 'react-native-elements'

interface Props {
  id: string | undefined
  types: Array<any>
  hideOverlay: () => void
}

const Details: React.FC<Props> = ({ id, types, hideOverlay }) => {
  const type = id ? types.find((type) => type!.id === id) : undefined

  return (
    <Overlay
      isVisible={!!id}
      onBackdropPress={hideOverlay}
      style={styles.overlay}
    >
      <View>
        <Text h2>{type?.__typename}</Text>
        <View style={{ padding: 16 }}>
          {type &&
            Object.keys(type).map((key: string) => {
              if (key === '__typename') return null
              return (
                <View
                  key={type[key]}
                  style={{ display: 'flex', flexDirection: 'row' }}
                >
                  <Text style={{ fontWeight: 'bold' }}>{`${key}: `}</Text>
                  <Text key={type[key]}>{type[key]}</Text>
                </View>
              )
            })}
        </View>

        <Button title="Back to Overview" onPress={hideOverlay} />
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0,
  },
})

export default Details
