<template>
  <nav grid="~ place-content-center flow-col" h-full w-full justify-center gap-x-4 text-2xl>
    <RouterLink icon-btn to="/example/map" title="Mapbox">
      <div i-carbon-map />
    </RouterLink>

    <RouterLink icon-btn to="/example/marker" title="Marker">
      <div i="carbon-location-heart" />
    </RouterLink>
  </nav>
</template>
