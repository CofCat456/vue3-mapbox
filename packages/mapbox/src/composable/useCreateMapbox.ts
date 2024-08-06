import type { MaybeRef, ShallowRef } from 'vue'

import { clearUndefined } from '@antfu/utils'
import { unrefElement } from '@vueuse/core'
import { tryOnMounted, tryOnUnmounted } from '@vueuse/shared'
import mapboxgl, { type MapOptions } from 'mapbox-gl'
import { markRaw, shallowRef } from 'vue'

export interface UseCreateMapboxReturn {
  mapInstance: ShallowRef<mapboxgl.Map | null>
}

export function useCreateMapbox(target: MaybeRef<HTMLElement | null>, options?: MapOptions): UseCreateMapboxReturn {
  const mapInstance = shallowRef<mapboxgl.Map | null>(null)

  function init(target: HTMLElement) {
    const map = new mapboxgl.Map({
      ...(options ? clearUndefined({ ...options }) : {}),
      accessToken: options?.accessToken,
      container: target,
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
