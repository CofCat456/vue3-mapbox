import type { Ref } from 'vue'
import { inject, ref } from 'vue'
import { watchImmediate } from '@vueuse/shared'
import { Marker } from 'mapbox-gl'
import { mapSymbol } from '../shared'
import type { MapboxMarkerOptions } from '../type'

type MapBoxComKey = 'Marker'

type MapBoxComponent<T> = T extends 'Marker'
  ? Marker
  : never

type MapboxComponentOptions<T> = T extends 'Marker'
  ? MapboxMarkerOptions
  : never

const isMarkerKey = (key: MapBoxComKey): key is 'Marker' => key === 'Marker'

export function useCreateMapboxComponent<T extends MapBoxComKey>(
  key: T,
  options: Ref<MapboxComponentOptions<T>>,
) {
  const map = inject(mapSymbol, ref())

  const component = ref<MapBoxComponent<T>>()

  watchImmediate([map, options], () => {
    if (map.value == null || options == null)
      return

    if (component.value) {
      component.value.setLngLat(options.value.lngLat)
    }
    else {
      if (isMarkerKey(key)) {
        component.value = new Marker(options.value as MapboxComponentOptions<typeof key>)
          .setLngLat(options.value.lngLat)
          .addTo(map.value) as MapBoxComponent<T>
      }
    }
  })

  return component
}
