import React, { useState } from 'react'
import { registerRootComponent } from 'expo'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import TypeList from './TypeList'
import { ThemeProvider, SearchBar, Header } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'

const client = new ApolloClient({
  uri: 'https://api-euwest.graphcms.com/v1/ck5wca13qc9ux01fgaidt12m4/master',
  cache: new InMemoryCache(),
})

function App() {
  const [search, setSearch] = useState<string>('')

  const updateSearch = (newSearch: string) => {
    setSearch(newSearch)
  }

  return (
    <ThemeProvider>
      <ApolloProvider client={client}>
        <Header
          centerComponent={{
            text: 'StarWars Types',
            style: styles.header,
          }}
        />
        <SafeAreaView>
          <View style={styles.search}>
            <SearchBar
              label="Search for a Star Wars type..."
              placeholder="x-wing"
              platform="ios"
              onChangeText={updateSearch}
              value={search}
            />
          </View>
          <TypeList search={search} />
        </SafeAreaView>
        <StatusBar style="auto" />
      </ApolloProvider>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  search: {
    margin: '4%',
  },
  header: {
    color: 'white',
  },
})

export default registerRootComponent(App)
