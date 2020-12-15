# StarWars Types

How to run the application

    yarn && yarn generate # First, build the graphql stuff
    yarn run ios # Next, run the application on a device
    yarn run android # Android works too, make sure a emulator is up and running first though.

# Is this application "production ready"?

It is not! A lot more work could go into this in order to get it ready for the general public. Amoung other thigs, I would want the following before going live:

- A CI pipeline
- Internationalisation
- End-to-end tests
- Performance tests
- Tracking and monitoring
- Error reporting

... The list goes on

# Did I build the application to specification?

Almost, let's go through the list.

## Overview

_"Create an overview with a list of Star Wars types like starship, planets and persons. I created list with five out of seven types."_

The film and asset types seemed to be more _meta_ types so I assumed they were unnecessary. However, from the code it shuold be obvious how would expand the app to include these types

_"Everything can be in **one list**, **grouped by type** and **alphabetic**."_

There is a single list, initally grouped by types and subsequently sorted alphabetically

_"The list should show the \_name_ and _type_ of the object and have a _red button_ with a _link to a detail view_ for that item."\_

The name and type are visible. There is a 'Details' button. It links to a details view and it is red.

## Search

_"Above the list, create a simple text search. Entering text should filter out not matching item from the
list."_

There is a search function above the list. It uses the **\_search** paramater in the graphql query to filter out text

## Details

_"The detail view should show all available information you have for that type of item."_

The detail view shows all of the additional data for a given item and handles some edge cases like lists gracefully

_"Try to reuse the item component form the overview, but the button should have a link to the overview instead and a different color (e.g. blue)."_

I did _not_ reuse the item component because it seemed a bit pedantic. `react-native-elements` makes it realtively easy to create a list, abstracting the ListItem component _again_ would've served no purpose

_"The content of the detail view should be vertical centered aligned."_

The details are vertical and center aligned

## Layout & Errors

_"Make sure you're using a good layout, simple/modern colors. It's best to stick with current standards."_

Unless specified, I simply stuck with the default colors from the component library.

_"Your code should handle potential errors gracefully."_

I could spend a lot of time on error handling, but in essence there's four cases that I've handled:

- Loading state
- Generic error state
- Empty state (after a search for example)
- Default list state

## Testing

_"We'd love to see some testing automation, that would demonstrate the code works correctly and handles anything that might be thrown at it."_

I've added unit tests to the List and Detail views. I tested the components with Jest and react-native-testing-libraray. I set the coverage threshold to be 100% setup husky so that no one can allow the coverage to drop on commit.

Testing is an area where a LOT of expansion can happen:

- Other tests such as end-to-end or integration tests could be added
- A CI pipeline could be added
- Performance testing could be added
