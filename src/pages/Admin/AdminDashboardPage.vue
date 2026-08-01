<template>
  <q-page class="admin-dashboard-page q-pa-lg">
    <Motion
      :initial="{ opacity: 0, y: -10 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.4, ease: 'easeOut' }"
      class="q-mb-md"
    >
      <div class="row items-center justify-between gap-md">
        <div>
          <h1 class="text-h4 text-weight-bolder text-grey-9 q-my-none">Selamat datang Admin</h1>
          <div class="text-caption text-grey-6 q-mt-xs">
            Pusat Pemantauan Real-Time & Laporan Kebersihan Danau Toba
          </div>
        </div>

        <q-card
          flat
          class="total-report-card bg-teal-2 text-teal-10 q-py-lg q-px-md row items-center gap-md"
        >
          <div class="q-mx-md">
            <div class="text-subtitle2 text-weight-bold">Laporan Masuk</div>
            <div class="text-h4 text-weight-bolder" style="line-height: 1">{{ totalReports }}</div>
          </div>
          <q-avatar size="40px" color="teal-8" text-color="white" icon="insights" />
        </q-card>
      </div>
    </Motion>

    <Motion
      :initial="{ opacity: 0, scale: 0.99 }"
      :animate="{ opacity: 1, scale: 1 }"
      :transition="{ duration: 0.4, delay: 0.1, ease: 'easeOut' }"
      class="q-mb-lg"
    >
      <q-card flat bordered class="ref-card q-pa-md">
        <div class="row items-center justify-between q-mb-sm">
          <div class="text-h6 text-weight-bold text-grey-9">Real-time Map</div>
          <q-chip dense class="bg-teal-1 text-teal-9 text-weight-bold" style="font-size: 11px">
            📍 6 Wilayah Aktif Danau Toba
          </q-chip>
        </div>
        <div class="ref-map-wrapper relative-position overflow-hidden rounded-borders-lg">
          <div ref="adminMapContainer" class="admin-map"></div>
        </div>
      </q-card>
    </Motion>

    <div class="row items-stretch justify-between q-col-gutter-lg">
      <div class="col-12 col-md-7">
        <Motion
          class="full-height"
          :initial="{ opacity: 0, x: -15 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.4, delay: 0.15, ease: 'easeOut' }"
        >
          <q-card flat bordered class="ref-card q-pa-md full-height column justify-between">
            <div>
              <div class="row items-center justify-between q-mb-xs">
                <div>
                  <div class="flex q-gutter-x-md">
                    <div class="text-subtitle1 text-weight-bold text-grey-9">
                      Tren Laporan Masuk
                    </div>
                    <div class="text-caption text-blue-8 text-weight-bold">
                      <q-icon name="trending_up" color="blue-8" /> +14% Tren Meningkat
                    </div>
                  </div>
                  <div class="text-caption text-grey-6">Fluktuasi volume laporan kebersihan</div>
                </div>

                <div class="row items-center gap-xs">
                  <q-btn-toggle
                    v-model="trendFilter"
                    flat
                    rounded
                    toggle-color="teal-8"
                    color="grey-7"
                    :options="[
                      { label: 'Harian', value: 'harian' },
                      { label: 'Mingguan', value: 'mingguan' },
                      { label: 'Bulanan', value: 'bulanan' },
                    ]"
                    no-caps
                    dense
                    size="12px"
                    class="bg-grey-2 q-pa-2xs"
                  />
                </div>
              </div>

              <div class="q-mt-sm">
                <VueApexCharts
                  type="area"
                  height="210"
                  :options="chartOptions"
                  :series="chartSeries"
                />
              </div>
            </div>

            <div class="row items-center justify-between border-top q-pt-xs q-mt-xs">
              <div class="row items-center gap-xs">
                <q-chip
                  dense
                  class="bg-teal-1 text-teal-9 text-weight-bold"
                  style="font-size: 12px"
                >
                  ● Dermaga Tomok (42)
                </q-chip>
                <q-chip
                  dense
                  class="bg-teal-1 text-teal-9 text-weight-bold"
                  style="font-size: 12px"
                >
                  ● Pantai Batu Hoda (24)
                </q-chip>
                <q-chip
                  dense
                  class="bg-teal-1 text-teal-9 text-weight-bold"
                  style="font-size: 12px"
                >
                  ● Ajibata (18)
                </q-chip>
              </div>
            </div>
          </q-card>
        </Motion>
      </div>

      <div class="col-12 col-md-5">
        <Motion
          class="full-height"
          :initial="{ opacity: 0, x: 15 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.4, delay: 0.2, ease: 'easeOut' }"
        >
          <q-card flat bordered class="ref-card q-pa-md full-height column justify-between">
            <div>
              <div class="row items-center justify-between q-mb-sm">
                <div class="text-subtitle1 text-weight-bold text-grey-9">Laporan Masuk Terbaru</div>
                <q-btn
                  flat
                  dense
                  no-caps
                  size="md"
                  color="teal-8"
                  label="Lihat Semua"
                  icon-right="chevron_right"
                  to="/admin/monitoring"
                  class="text-weight-bold"
                />
              </div>

              <div class="column gap-xs">
                  <div
                  v-for="(report, idx) in recentReports.slice(0, 4)"
                  :key="idx"
                  class="ref-report-item row items-center justify-between q-pa-xs rounded-borders"
                >
                  <div class="row items-center gap-md q-gutter-x-md">
                    <q-img
                      :src="report.img"
                      width="100px"
                      height="64px"
                      fit="cover"
                      style="border-radius: 12px"
                    />
                    <div>
                      <div class="row items-center gap-xs q-mb-none">
                        <q-badge
                          dense
                          class="bg-red-1 text-red-9 text-weight-bold"
                          style="font-size: 9px; padding: 1px 4px"
                        >
                          Skor AI: {{ report.ai_score }}
                        </q-badge>
                      </div>
                      <div
                        class="text-subtitle2 text-weight-bold text-grey-9"
                        style="line-height: 1.2"
                      >
                        {{ report.spot_name }}
                      </div>
                      <div class="text-caption text-grey-6" style="font-size: 11px">
                        {{ new Date(report.created_at).toLocaleString() }}
                      </div>
                    </div>
                  </div>

                  <div class="row items-center gap-xs q-pr-xs q-gutter-x-xs">
                    <span class="ref-status-dot" :class="report.dotClass"></span>
                    <span
                      class="text-caption text-weight-bold text-grey-8 gt-xs"
                      style="font-size: 11px"
                    >
                      {{ report.statusText }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </q-card>
        </Motion>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { Motion } from 'motion-v'
import VueApexCharts from 'vue3-apexcharts'
import axios from 'axios'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const trendFilter = ref('harian')
const totalReports = ref(0)
const recentReports = ref([])
const mapDestinations = ref([])

const rawDataSets = {
  harian: {
    labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
    values: [85, 62, 18, 48, 42, 54, 92],
  },
  mingguan: {
    labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
    values: [40, 65, 85, 30],
  },
  bulanan: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
    values: [50, 75, 30, 90, 60, 85],
  },
}

const currentLabels = computed(() => rawDataSets[trendFilter.value].labels)

const chartOptions = computed(() => ({
  chart: {
    type: 'area',
    height: 210,
    toolbar: { show: false },
    fontFamily: 'Inter, sans-serif',
    zoom: { enabled: false },
  },
  colors: ['#0f766e'],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.45,
      opacityTo: 0.05,
      stops: [0, 95, 100],
    },
  },
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  markers: {
    size: 5,
    colors: ['#ffffff'],
    strokeColors: '#0f766e',
    strokeWidth: 2.5,
    hover: {
      size: 7,
    },
  },
  grid: {
    borderColor: '#f1f5f9',
    strokeDashArray: 3,
    padding: {
      left: 10,
      right: 10,
    },
  },
  xaxis: {
    categories: currentLabels.value,
    labels: {
      style: {
        colors: '#64748b',
        fontSize: '11px',
        fontWeight: 600,
      },
    },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    min: 0,
    max: 100,
    tickAmount: 4,
    labels: {
      style: {
        colors: '#64748b',
        fontSize: '11px',
        fontWeight: 600,
      },
    },
  },
  tooltip: {
    theme: 'dark',
    x: { show: true },
    y: {
      formatter: (val) => `${val} Laporan`,
    },
  },
}))

const chartSeries = computed(() => [
  {
    name: 'Jumlah Laporan',
    data: rawDataSets[trendFilter.value].values,
  },
])

const adminMapContainer = ref(null)
const adminMap = ref(null)

function initAdminMap() {
  if (!adminMapContainer.value) return

  adminMap.value = L.map(adminMapContainer.value, {
    zoomControl: true,
    attributionControl: false,
  }).setView([2.6847, 98.8722], 10)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(adminMap.value)

  const destinationsList = mapDestinations.value

  destinationsList.forEach((d) => {
    const marker = L.marker([d.latitude, d.longitude]).addTo(adminMap.value)
    
    // AI Score mapping to colors
    let color = 'green'
    let status = 'Aman'
    if (d.ai_score > 0.7) {
      color = 'red'
      status = 'Kritis'
    } else if (d.ai_score > 0.4) {
      color = 'orange'
      status = 'Perlu Perhatian'
    }
    
    const badgeClass =
      color === 'red' ? 'badge-red' : color === 'orange' ? 'badge-orange' : 'badge-green'
    marker.bindTooltip(`<div class="${badgeClass}">${status} - ${d.spot_name}</div>`, {
      permanent: true,
      direction: 'right',
      className: 'ref-map-badge-tooltip',
    })
  })

  setTimeout(() => {
    adminMap.value?.invalidateSize()
  }, 200)
}

const fetchDashboardData = async () => {
  const token = localStorage.getItem('admin_token')
  const config = { headers: { Authorization: `Bearer ${token}` } }
  try {
    const statsRes = await axios.get('http://127.0.0.1:5000/api/dashboard/stats', config)
    totalReports.value = statsRes.data.total_reports
    
    const priorityRes = await axios.get('http://127.0.0.1:5000/api/dashboard/priority', config)
    recentReports.value = priorityRes.data.map(r => ({
      ...r,
      img: 'https://picsum.photos/seed/' + r.report_id + '/200/150', // Mock image, normally from backend
      dotClass: r.ai_score > 0.7 ? 'bg-red-6' : 'bg-orange-6',
      statusText: r.ai_score > 0.7 ? 'Kritis' : 'Perlu Perhatian'
    }))
    
    const mapRes = await axios.get('http://127.0.0.1:5000/api/dashboard/map', config)
    mapDestinations.value = mapRes.data
    
  } catch(e) {
    console.error("Gagal memuat dashboard", e)
  }
}

onMounted(async () => {
  await fetchDashboardData()
  await nextTick()
  initAdminMap()
})

onBeforeUnmount(() => {
  if (adminMap.value) {
    adminMap.value.remove()
    adminMap.value = null
  }
})
</script>

<style scoped>
.admin-dashboard-page {
  max-width: 1600px;
  margin: 0 auto;
}

.total-report-card {
  border-radius: 16px;
}

.ref-card {
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.ref-map-wrapper {
  height: 280px;
  width: 100%;
  border-radius: 18px;
}

.admin-map {
  width: 100%;
  height: 100%;
}

:deep(.ref-map-badge-tooltip) {
  background: transparent;
  border: none;
  box-shadow: none;
}

:deep(.badge-red) {
  background: #ffffff;
  color: #e53935;
  border: 1px solid #ffcdd2;
  font-weight: 700;
  font-size: 11px;
  border-radius: 8px;
  padding: 3px 10px;
  box-shadow: 0 2px 8px rgba(229, 57, 53, 0.18);
}

:deep(.badge-orange) {
  background: #ffffff;
  color: #d97706;
  border: 1px solid #fef3c7;
  font-weight: 700;
  font-size: 11px;
  border-radius: 8px;
  padding: 3px 10px;
  box-shadow: 0 2px 8px rgba(217, 119, 6, 0.18);
}

:deep(.badge-green) {
  background: #ffffff;
  color: #10b981;
  border: 1px solid #d1fae5;
  font-weight: 700;
  font-size: 11px;
  border-radius: 8px;
  padding: 3px 10px;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.18);
}

.ref-report-item {
  transition: background-color 0.2s;
  border-bottom: 1px solid #f9fafb;
}

.ref-report-item:hover {
  background-color: #f0fdf4;
}

.ref-status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.border-top {
  border-top: 1px solid #f1f5f9;
}
</style>
