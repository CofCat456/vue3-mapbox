<script setup lang="ts">
import { useGeolocation } from '@vueuse/core'
import { computed } from 'vue'
import { MapBox } from 'vue-easy-mapbox'

const { VITE_MAPBOX_TOKEN } = import.meta.env

const { coords } = useGeolocation()

const center = computed<[number, number]>(() => ([
  coords.value.longitude === Infinity ? -71.224518 : coords.value.longitude,
  coords.value.latitude === Infinity ? 42.213995 : coords.value.latitude,
]))
</script>

<template>
  <MapBox :access-token="VITE_MAPBOX_TOKEN" :center />
</template>
