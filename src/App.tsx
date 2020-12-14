import React, { useState } from 'react'
import { registerRootComponent } from 'expo'
import { SafeAreaView } from 'react-native'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import StarshipList from './StarshipList'
import { ThemeProvider, SearchBar } from 'react-native-elements'

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
        <SafeAreaView>
          <SearchBar
            label="Search for a Star Wars type..."
            placeholder="x-Fighter"
            onChangeText={updateSearch}
            value={search}
          />
          <StarshipList search={search} />
        </SafeAreaView>
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default registerRootComponent(App)
