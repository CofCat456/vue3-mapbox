import type { Map } from 'mapbox-gl'
import type { InjectionKey, ShallowRef } from 'vue'

export const mapSymbol: InjectionKey<ShallowRef<Map | null>> = Symbol('map')
