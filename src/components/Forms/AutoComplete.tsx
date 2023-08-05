import React, { useRef } from 'react'
import { LoadScript, Autocomplete, Libraries } from '@react-google-maps/api'
import styles from './AutoComplete.module.scss'

const KEY = 'AIzaSyDGbop50pu2C3SsShMUI5e07C8ZCXQ958g'
const libraries: Libraries = ['places']

interface Props {
  onPlaceChange: (pos: { lat?: number, lng?: number }) => void
}


export const AutoComplete: React.FC<Props> = (props) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete
  }

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const selectedPlace = autocompleteRef.current.getPlace()
      const pos = {
        lat: selectedPlace.geometry?.location?.lat(),
        lng: selectedPlace.geometry?.location?.lng()
      }
      props.onPlaceChange(pos)
    }
  }

  return (
    <LoadScript googleMapsApiKey={KEY} libraries={['places']}>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input className={styles.input} type="text" placeholder="הזן כתובת" />
      </Autocomplete>
    </LoadScript>
  )
}

