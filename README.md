# StarWars Types

How to run the application

### Build the app

`yarn && yarn generate # First, build the GraphQL stuff`

### Run on an emulator

`yarn run ios # Next, run the application on a device`

`yarn run android # Android works too, make sure a emulator is up and running first though.`

# Is this application "production ready"?

It is not! A lot more work could go into this to get it ready for the general public. Among other things, I would want the following before going live:

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

    Create an overview with a list of Star Wars types like starship, planets and persons. I created a list with five out of seven types.

The film and asset types seemed to be more meta types so I assumed they were unnecessary. However, from the code, it should be obvious how would expand the app to include these types.

    Everything can be in one list, grouped by type and alphabetic.

There is a single list, initially grouped by types and subsequently sorted alphabetically.

    The list should show the name and type of the object and have a red button with a link to a detail view for that item."

The name and type are visible. There is a 'Details' button. It links to a details view and it is red.

## Search

    Above the list, create a simple text search. Entering text should filter out not matching item from the list.

There is a search function above the list. It uses the **\_search** parameter in the GraphQL query to filter out text.

## Details

    The detail view should show all available information you have for that type of item.

The detail view shows all of the additional data for a given item and handles some edge cases like lists gracefully

    Try to reuse the item component form the overview, but the button should have a link to the overview instead and a different color (e.g. blue).

I did **not** reuse the item component because it seemed a bit pedantic. `react-native-elements` makes it relatively easy to create a list, abstracting the ListItem component _again_ would've served no purpose.

    The content of the detail view should be vertical centered aligned.

The details are vertical and centre-aligned

## Layout & Errors

    Make sure you're using a good layout, simple/modern colors. It's best to stick with current standards.

Unless specified, I simply stuck with the default colours from the component library.

    Your code should handle potential errors gracefully.

I could spend a lot of time on error handling, but in essence, there are four cases that I've handled:

- Loading state
- Generic error state
- Empty state (after a search for example)
- Default list state

## Testing

    We'd love to see some testing automation, that would demonstrate the code works correctly and handles anything that might be thrown at it.

I've added unit tests to the List and Detail views. I tested the components with Jest and `react-native-testing-library`. I set the coverage threshold to be 100% setup husky so that no one can allow the coverage to drop on commit.

Testing is an area where a LOT of expansion can happen:

- Other tests such as end-to-end or integration tests could be added
- A CI pipeline could be added
- Performance testing could be added
