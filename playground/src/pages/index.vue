<script setup lang="ts">
import TheInput from '~/components/TheInput.vue'

import { accessToken } from '~/composables'

defineOptions({
  name: 'IndexPage',
})

const { VITE_MAPBOX_TOKEN } = import.meta.env

const inputRef = ref<InstanceType<typeof TheInput>>()

const router = useRouter()
function go() {
  if (accessToken.value)
    router.push('/example/map')
}

onBeforeMount(() => {
  if (VITE_MAPBOX_TOKEN) {
    accessToken.value = VITE_MAPBOX_TOKEN
    router.push('/example/map')
  }
})
onMounted(() => {
  if (inputRef.value)
    inputRef.value.$el.focus()
})
</script>

<template>
  <div>
    <p text="xl" font-bold>
      Please enter your Mapbox token:
    </p>
    <div py-4 />

    <TheInput
      v-model="accessToken"
      placeholder="Mapbox token"
      autocomplete="false"
      @keydown.enter="go"
    />

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!accessToken"
        @click="go"
      >
        Go
      </button>
    </div>
  </div>
</template>
