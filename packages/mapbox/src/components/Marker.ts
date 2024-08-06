import type { PropType } from 'vue'

import { defineComponent, toRef } from 'vue'

import type { MapboxMarkerOptions } from '../type'

import { useCreateMapboxComponent } from '../composable/useCreateMapboxComponent'

export const Marker = defineComponent(
  (props: { options: MapboxMarkerOptions }, { expose, slots }) => {
    const options = toRef(props, 'options')
    const marker = useCreateMapboxComponent('Marker', options)

    expose({ marker })

    return () => {
      return slots.default?.()
    }
  },
  {
    props: {
      options: {
        required: true,
        type: Object as PropType<MapboxMarkerOptions>,
      },
    },
  },
)
