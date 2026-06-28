<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated class="text-primary bg-white q-pa-sm q-px-xl navbar" :style="navbarStyle">
      <q-toolbar>
        <q-img :src="logo" width="120px" fit="contain" />

        <q-space />

        <q-btn
          dense
          class="q-py-sm q-px-md"
          style="border-radius: 12px"
          color="primary"
          label="Login Admin"
          unelevated
          no-caps
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import logo from '../assets/Logo_1.png'

const scrollY = ref(0)

const handleScroll = () => {
  scrollY.value = window.scrollY
}

const navbarStyle = computed(() => {
  const maxScroll = 200

  const progress = Math.min(scrollY.value / maxScroll, 1)

  return {
    opacity: 1 - progress,
    transform: `translateY(-${progress * 100}%)`
  }
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, {
    passive: true
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
<style scoped>
.navbar {
  transition:
    opacity 0.15s linear,
    transform 0.15s linear;

  will-change: opacity, transform;
}

.navbar-hidden {
  transform: translateY(-120%);
  opacity: 0;
}
</style>
