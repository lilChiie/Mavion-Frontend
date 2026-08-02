<template>
  <q-layout view="lHh lpr lFf">
    <q-header elevated class="text-primary bg-white q-pa-sm navbar q-px-md q-px-md-xl" :style="navbarStyle">
      <q-toolbar>
        <q-img
          :src="logo"
          width="120px"
          fit="contain"
          class="cursor-pointer"
          @click="$router.push('/')"
        />
        <q-space />
        <div class="navbar-menu q-mx-lg gt-sm">
          <q-btn flat no-caps label="Beranda" class="menu-btn" to="/" />
          <q-btn flat no-caps label="Laporkan Kondisi" class="menu-btn" to="/laporkan" />
          <q-btn flat no-caps label="Peta Wisata" class="menu-btn" to="/peta" />
          <q-btn flat no-caps label="Tentang Sistem" class="menu-btn" to="/tentang" />
        </div>

        <q-btn
          dense
          class="q-py-sm q-px-md gt-sm"
          style="border-radius: 12px"
          color="primary"
          label="Login Admin"
          to="/login"
          unelevated
          no-caps
        />

        <q-btn
          flat
          round
          dense
          icon="menu"
          class="lt-md text-primary"
          @click="drawerOpen = !drawerOpen"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerOpen" side="right" overlay behavior="mobile" bordered class="bg-white">
      <q-list class="q-pt-md">
        <q-item clickable v-ripple to="/" exact>
          <q-item-section class="text-weight-medium">Beranda</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/laporkan" exact>
          <q-item-section class="text-weight-medium">Laporkan Kondisi</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/peta" exact>
          <q-item-section class="text-weight-medium">Peta Wisata</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/tentang" exact>
          <q-item-section class="text-weight-medium">Tentang Sistem</q-item-section>
        </q-item>
        
        <q-separator class="q-my-md" />
        
        <div class="q-px-md">
          <q-btn
            class="q-py-sm q-px-md full-width"
            style="border-radius: 12px"
            color="primary"
            label="Login Admin"
            to="/login"
            unelevated
            no-caps
          />
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import logo from '../assets/Logo_1.png'

const scrollY = ref(0)
const drawerOpen = ref(false)

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
