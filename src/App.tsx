import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { registerRootComponent } from 'expo'
import { StyleSheet, Text, View } from 'react-native'

const fruits = ['clemetine', 'satsuma', 'orange', 'mango']

function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      {fruits.map((fruit) => (
        <Text key={fruit}>{fruit}</Text>
      ))}
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default registerRootComponent(App)
