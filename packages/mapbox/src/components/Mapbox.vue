<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import type { MapOptions } from 'mapbox-gl'
import { watchThrottled } from '@vueuse/shared'
import { useCreateMapbox } from '../composable/useCreateMapbox'
import type { MapboxOption } from '../type'

const props = withDefaults(defineProps<Partial<MapboxOption>>(), {
  center: () => [-71.224518, 42.213995],
  style: 'mapbox://styles/mapbox/streets-v12',
  zoom: 9,
})

const mapBoxEl = shallowRef<HTMLDivElement | null>(null)

const { mapInstance } = useCreateMapbox(mapBoxEl, props as MapOptions)

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
