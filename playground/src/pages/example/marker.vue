<script setup lang="ts">
import { MapBox, Marker } from 'vue-easy-mapbox'

const { VITE_MAPBOX_TOKEN } = import.meta.env
</script>

<template>
  <MapBox
    :access-token="VITE_MAPBOX_TOKEN"
    :center="[12.550343, 55.665957]"
    :zoom="8"
  >
    <Marker
      :options="{
        lngLat: [12.554729, 55.70651],
      }"
    />
  </MapBox>
</template>
