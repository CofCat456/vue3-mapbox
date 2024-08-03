import { unrefElement } from '@vueuse/core'
import { tryOnMounted, tryOnUnmounted } from '@vueuse/shared'
import type { MaybeRef, ShallowRef } from 'vue'
import { markRaw, shallowRef } from 'vue'
import { clearUndefined } from '@antfu/utils'
import mapboxgl, { type MapOptions } from 'mapbox-gl'

export interface UseCreateMapboxReturn {
  mapInstance: ShallowRef<mapboxgl.Map | null>
}

export function useCreateMapbox(target: MaybeRef<HTMLElement | null>, options?: MapOptions): UseCreateMapboxReturn {
  const mapInstance = shallowRef<mapboxgl.Map | null>(null)

  function init(target: HTMLElement) {
    const map = new mapboxgl.Map({
      ...(options ? clearUndefined({ ...options }) : {}),
      container: target,
      accessToken: options?.accessToken,
    })

    mapInstance.value = markRaw(map)
  }

  tryOnMounted(() => {
    const _element = unrefElement(target)
    if (!_element)
      return

    if (options?.accessToken == null || options.accessToken.length === 0)
      throw new Error('accessToken is required')

    init(_element)
  })

  tryOnUnmounted(() => {
    mapInstance.value?.remove()
    mapInstance.value = null
  })

  return {
    mapInstance,
  }
}
