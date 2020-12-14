import React from 'react'
import { Overlay, Button, Card } from 'react-native-elements'
import { Text } from 'react-native'

interface Props {
  id: string | undefined
  types: Array<any>
  hideOverlay: () => void
}

const Details: React.FC<Props> = ({ id, types, hideOverlay }) => {
  const type = id ? types.find((type) => type?.id === id) : undefined

  return (
    <Overlay fullScreen isVisible={!!id} onBackdropPress={hideOverlay}>
      <>
        <Card>
          <Card.Title>{type?.name}</Card.Title>
          <Card.Divider />
          {type &&
            Object.values(type).map((val: any) => {
              return <Text key={val}>{val}</Text>
            })}
        </Card>
        <Button
          title="Overview"
          onPress={hideOverlay}
          buttonStyle={{ backgroundColor: 'blue' }}
        />
      </>
    </Overlay>
  )
}

export default Details
