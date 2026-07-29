<template>
  <q-layout view="lHh Lpr lFf" class="admin-layout bg-grey-2">
    <q-drawer
      v-model="drawerOpen"
      :width="260"
      class="admin-sidebar bg-white column justify-between"
      bordered
    >
      <div>
        <div class="q-pa-lg row items-center gap-md border-bottom q-gutter-x-sm">
          <q-img src="../assets/Logo.png" width="40px" height="40px" fit="contain" />
          <div>
            <div class="text-subtitle1 text-weight-bolder text-teal-10 font-instrument">
              MAHORBASA
            </div>
            <div class="text-caption text-grey-6" style="margin-top: -4px">VISION</div>
          </div>
        </div>

        <div class="q-pa-md q-gutter-y-xs">
          <q-item
            v-for="item in navItems"
            :key="item.to"
            clickable
            v-ripple
            :to="item.to"
            active-class="nav-item-active text-teal-9 text-weight-bold"
            class="nav-item rounded-borders q-py-sm q-px-md"
          >
            <q-item-section avatar style="min-width: 40px">
              <q-icon :name="item.icon" size="22px" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-subtitle2">{{ item.label }}</q-item-label>
            </q-item-section>
            <q-item-section v-if="item.badge" side>
              <q-badge rounded color="deep-orange" :label="item.badge" />
            </q-item-section>
          </q-item>
        </div>
      </div>

      <div class="q-pa-md column items-center">
        <div class="sidebar-illustration text-center q-mb-md q-pa-sm">
          <q-avatar size="64px" color="teal-1" text-color="teal-8" icon="eco" class="q-mb-xs" />
          <div class="text-caption text-weight-bold text-grey-8">Dibuat dengan ❤️</div>
          <div class="text-caption text-grey-6">untuk Kelestarian Danau Toba</div>
        </div>

        <q-btn
          outline
          color="teal-8"
          icon="logout"
          label="Keluar"
          no-caps
          rounded
          class="full-width text-weight-bold logout-btn"
          @click="confirmLogout"
        />
      </div>
    </q-drawer>

    <q-header class="bg-white text-grey-9 border-bottom" height-hint="58">
      <div class="admin-topbar q-py-sm q-px-lg row items-center justify-between">
        <div class="row items-center q-gutter-x-sm">
          <q-btn flat dense round icon="menu" color="grey-8" @click="drawerOpen = !drawerOpen" />
        </div>

        <div class="row items-center q-gutter-x-md">
          <div
            class="date-pill row items-center gap-xs text-caption text-grey-7 text-weight-medium bg-grey-2 q-py-xs q-px-md rounded-borders gt-xs"
          >
            <q-icon name="today" color="teal-8" size="18px" />
            <span class="q-mx-sm">{{ currentDate }}</span>
          </div>

          <q-separator vertical inset class="gt-xs" />

          <div
            class="profile-pill row items-center gap-sm q-py-xs q-px-sm rounded-borders q-gutter-x-md"
          >
            <q-avatar size="34px" color="teal-8" text-color="white" icon="admin_panel_settings" />
            <div class="gt-xs column justify-center" style="line-height: 1.2">
              <div class="text-caption text-weight-bold text-grey-9">Administrator</div>
              <div class="text-caption text-grey-6" style="font-size: 11px">admin@mavion.id</div>
            </div>
          </div>
        </div>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <StatusModal
      v-model="logoutModal"
      type="confirm"
      title="Apakah Anda Yakin?"
      message="Apakah Anda yakin ingin keluar dari sesi panel admin Mahorbasa Vision?"
      confirm-label="Ya, Keluar"
      cancel-label="Batal"
      icon="logout"
      @confirm="handleLogout"
    />
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import StatusModal from '../components/StatusModal.vue'

const router = useRouter()
const drawerOpen = ref(true)
const logoutModal = ref(false)

const navItems = [
  {
    label: 'Dashboard',
    icon: 'grid_view',
    to: '/admin/dashboard',
  },
  {
    label: 'Monitoring',
    icon: 'analytics',
    to: '/admin/monitoring',
    badge: '12 Baru',
  },
  {
    label: 'Input Area Wisata',
    icon: 'add_location_alt',
    to: '/admin/input-area',
  },
]

const currentDate = computed(() => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return new Date().toLocaleDateString('id-ID', options)
})

function confirmLogout() {
  logoutModal.value = true
}

function handleLogout() {
  logoutModal.value = false
  router.push('/login')
}
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
}

.admin-sidebar {
  border-right: 1px solid #e5e7eb;
}

.nav-item {
  color: #4b5563;
  transition: all 0.2s ease;
  border-radius: 12px !important;
}

.nav-item:hover {
  background: #f0fdf4;
  color: #0f766e;
}

.nav-item-active {
  background: #ccfbf1 !important;
  color: #0f766e !important;
}

.sidebar-illustration {
  background: #f0fdf4;
  border-radius: 16px;
  width: 100%;
  border: 1px dashed #99f6e4;
}

.profile-pill,
.date-pill {
  border: 1px solid #e5e7eb;
  background: #f8fafc;
  border-radius: 12px;
}

.logout-btn:hover {
  background: #ffe4e6;
  color: #e11d48;
}
</style>
