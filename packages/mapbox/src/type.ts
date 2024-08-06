import type { LngLatLike, MapOptions, MarkerOptions } from 'mapbox-gl'

export interface MapboxOption extends MapOptions {}
export interface MapboxMarkerOptions extends MarkerOptions {
  lngLat: LngLatLike
}
