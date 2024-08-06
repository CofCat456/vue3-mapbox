<script setup lang="ts">
import type { MapOptions } from 'mapbox-gl'

import { watchThrottled } from '@vueuse/shared'
import { provide, shallowRef, watch } from 'vue'

import type { MapboxOption } from '../type'

import { useCreateMapbox } from '../composable/useCreateMapbox'
import { mapSymbol } from '../shared'

const props = withDefaults(defineProps<Partial<MapboxOption>>(), {
  antialias: false,
  attributionControl: true,
  bearing: 0,
  bearingSnap: 7,
  boxZoom: true,
  center: () => [0, 0],
  clickTolerance: 3,
  collectResourceTiming: false,
  crossSourceCollisions: true,
  doubleClickZoom: true,
  dragPan: true,
  dragRotate: true,
  fadeDuration: 300,
  failIfMajorPerformanceCaveat: false,
  hash: false,
  interactive: true,
  keyboard: true,
  logoPosition: 'bottom-left',
  maxPitch: 85,
  maxZoom: 22,
  minPitch: 0,
  minZoom: 0,
  performanceMetricsCollection: true,
  pitch: 0,
  pitchWithRotate: true,
  preserveDrawingBuffer: false,
  projection: 'mercator',
  refreshExpiredTiles: true,
  renderWorldCopies: true,
  respectPrefersReducedMotion: true,
  scrollZoom: true,
  style: 'mapbox://styles/mapbox/streets-v12',
  testMode: false,
  touchPitch: true,
  touchZoomRotate: true,
  trackResize: true,
  zoom: 9,
})

const mapBoxEl = shallowRef<HTMLDivElement | null>(null)

const { mapInstance } = useCreateMapbox(mapBoxEl, props as MapOptions)
provide(mapSymbol, mapInstance)

watch([
  () => props.zoom,
  () => props.pitch,
  () => props.bearing,
], (
  [zoom, pitch, bearing],
  [prevZoom, prevPitch, prevBearing],
) => {
  if (zoom != null && zoom !== prevZoom)
    mapInstance.value?.setZoom(zoom)

  if (pitch != null && pitch !== prevPitch)
    mapInstance.value?.setPitch(pitch)

  if (bearing != null && bearing !== prevBearing)
    mapInstance.value?.setBearing(bearing)
})

watchThrottled(() => props.center, (center) => {
  if (center == null)
    return

  mapInstance.value?.setCenter(center)
})
</script>

<template>
  <div style="width: 100%; height: 100%;">
    <div id="mapbox" ref="mapBoxEl" style="width: 100%; height: 100%;" />
    <slot />
  </div>
</template>
