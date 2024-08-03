import { resolve } from 'node:path'

function r(p: string) {
  return resolve(__dirname, p)
}

export const alias: Record<string, string> = {
  'vue-easy-mapbox': r('./packages/vue-easy-mapbox/src/'),
}
