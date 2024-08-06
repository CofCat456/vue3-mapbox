import type { PropType } from 'vue'
import { defineComponent, toRef } from 'vue'
import { useCreateMapboxComponent } from '../composable/useCreateMapboxComponent'
import type { MapboxMarkerOptions } from '../type'

export const Marker = defineComponent(
  (props: { options: MapboxMarkerOptions }, { slots, expose }) => {
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
        type: Object as PropType<MapboxMarkerOptions>,
        required: true,
      },
    },
  },
)
