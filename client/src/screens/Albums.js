import React from 'react'

import { withFetchJSON } from '../hocs/withFetchJSON'
import { withAuth } from '../hocs/withAuth'
import { BackButton, RouterButton } from '../components/Button'
import { Screen } from '../components/Screen'
import { isDefaultAlbumName } from '../drivers/preferences'

import './Albums.css'

const AlbumButton = ({ id, title, thumbnail, ...props }) => (
  <RouterButton
    style={{ gridColumn: 'span 2', gridRow: 'span 2', fontSize: '70%' }}
    image={thumbnail}
    label={title}
    route={`/photos/${id}`}
    helpText={`View photos in the album '${title}'`}
    {...props}
  />
)

const AlbumsScreen = ({ data, ...props }) => {
  //  const { complexity } = preferences

  return (
    <Screen
      screen="albums"
      title="Choose Photo Album"
      loadingText="Loading your albums..."
      errorText="Unable to get albums"
      screenHelpText="Press an album button to view the photos."
      {...props}
    >
      {helpFn => (
        // closure so can access data prop
        <React.Fragment>
          <BackButton
            style={{ gridColumn: 'span 2', gridArea: 'back' }}
            className="button-router"
            label="Activities"
            helpFn={helpFn}
            helpText="Choose another Activity"
          />

          {data
            .filter(item => !isDefaultAlbumName(item.title))
            .map(item => (
              <AlbumButton
                className="button-router"
                id={item.id}
                thumbnail={item.thumbnail}
                title={item.title}
                key={item.id}
                helpFn={helpFn}
              />
            ))}
        </React.Fragment>
      )}
    </Screen>
  )
}

const wrappedScreen = withAuth(withFetchJSON(AlbumsScreen, '/api/albums'))
export { wrappedScreen as AlbumsScreen }
