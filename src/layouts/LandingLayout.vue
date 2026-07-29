<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated class="text-primary bg-white q-pa-sm q-px-xl navbar" :style="navbarStyle">
      <q-toolbar>
        <q-img
          :src="logo"
          width="120px"
          fit="contain"
          class="cursor-pointer"
          @click="$router.push('/')"
        />
        <q-space />
        <div class="navbar-menu q-mx-lg">
          <q-btn flat no-caps label="Beranda" class="menu-btn" to="/" />
          <q-btn flat no-caps label="Laporkan Kondisi" class="menu-btn" to="/laporkan" />
          <q-btn flat no-caps label="Peta Wisata" class="menu-btn" to="/peta" />
          <q-btn flat no-caps label="Tentang Sistem" class="menu-btn" to="/tentang" />
        </div>

        <q-btn
          dense
          class="q-py-sm q-px-md"
          style="border-radius: 12px"
          color="primary"
          label="Login Admin"
          to="/login"
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

function handleScroll() {
  scrollY.value = window.scrollY
}

const navbarStyle = computed(() => {
  const maxScroll = 200
  const progress = Math.min(scrollY.value / maxScroll, 1)

  return {
    opacity: 1 - progress,
    transform: `translateY(-${progress * 100}%)`,
  }
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
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
</style>
