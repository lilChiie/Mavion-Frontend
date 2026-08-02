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
                    <div class="text-caption text-weight-bold" :class="trendPercentage >= 0 ? 'text-blue-8' : 'text-red-8'">
                      <q-icon :name="trendPercentage >= 0 ? 'trending_up' : 'trending_down'" :color="trendPercentage >= 0 ? 'blue-8' : 'red-8'" />
                      {{ trendPercentage >= 0 ? '+' : '' }}{{ trendPercentage }}% Tren {{ trendPercentage >= 0 ? 'Meningkat' : 'Menurun' }}
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

    <!-- Destination Modal -->
    <q-dialog v-model="showDestModal">
      <q-card style="width: 320px; max-width: 90vw; border-radius: 16px;" class="q-pa-sm">
        <q-img
          :src="selectedDest?.img"
          height="160px"
          fit="cover"
          style="border-radius: 12px;"
          class="q-mb-sm"
        />

        <q-card-section class="q-pa-sm q-pt-none">
          <div class="text-h6 text-weight-bolder text-grey-10 q-mb-xs" style="line-height: 1.2;">
            {{ selectedDest?.name }}
          </div>
          <div class="row items-center q-gutter-x-sm q-mb-sm">
            <span
              class="ref-status-dot"
              :class="(selectedDest?.status === 'Perlu Penanganan' || selectedDest?.status === 'Kritis') ? 'bg-red' : (selectedDest?.status === 'Perlu Perhatian' ? 'bg-orange' : 'bg-green')"
            ></span>
            <span class="text-weight-bold text-grey-10 text-subtitle2" style="font-size: 13px;">
              {{ selectedDest?.status === 'Perlu Penanganan' || selectedDest?.status === 'Kritis' ? 'Perlu Penanganan' : (selectedDest?.status === 'Perlu Perhatian' ? 'Perlu Perhatian' : 'Aman') }}
            </span>
          </div>

          <div class="text-grey-6 text-caption q-mb-sm" style="font-size: 12px;">
            {{ selectedDestReports.length }} laporan terbaru
          </div>

          <q-scroll-area
            horizontal
            style="height: 100px; width: 100%;"
            class="q-mb-sm"
            v-if="selectedDestReports.length > 0"
          >
            <div class="row no-wrap q-gutter-x-sm">
              <q-img
                v-for="(report, idx) in selectedDestReports"
                :key="idx"
                :src="'http://127.0.0.1:5000/uploads/' + report.photo_path"
                style="width: 96px; height: 96px; border-radius: 8px; flex: 0 0 auto;"
              />
            </div>
          </q-scroll-area>
        </q-card-section>

        <q-card-actions align="center" class="q-px-sm q-pb-sm q-pt-none">
          <q-btn
            outline
            rounded
            color="teal-8"
            class="text-weight-bold full-width"
            label="Lihat Detail"
            to="/admin/monitoring"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

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
const mapReports = ref([])

const showDestModal = ref(false)
const selectedDest = ref(null)
const selectedDestReports = ref([])
const carouselSlide = ref(0)

const dynamicTrendData = computed(() => {
  const reports = mapReports.value || []
  const now = new Date()

  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())

  const harianLabels = []
  const harianValues = [0, 0, 0, 0, 0, 0, 0]
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    harianLabels.push(days[d.getDay()])
  }

  const mingguanLabels = ['3 Mgg Lalu', '2 Mgg Lalu', '1 Mgg Lalu', 'Minggu Ini']
  const mingguanValues = [0, 0, 0, 0]

  const bulananLabels = []
  const bulananValues = [0, 0, 0, 0, 0, 0]
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des']
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    bulananLabels.push(months[d.getMonth()])
  }

  reports.forEach(r => {
    if (!r.created_at) return
    // Ensure we handle the timezone properly if needed, but local browser time is fine
    const d = new Date(r.created_at)

    // Harian diff
    const diffDays = Math.floor((startOfDay(now) - startOfDay(d)) / (1000 * 60 * 60 * 24))
    if (diffDays >= 0 && diffDays < 7) {
      harianValues[6 - diffDays]++
    }

    // Mingguan diff
    const diffWeeks = Math.floor(diffDays / 7)
    if (diffWeeks >= 0 && diffWeeks < 4) {
      mingguanValues[3 - diffWeeks]++
    }

    // Bulanan diff
    const diffMonths = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth())
    if (diffMonths >= 0 && diffMonths < 6) {
      bulananValues[5 - diffMonths]++
    }
  })

  return {
    harian: { labels: harianLabels, values: harianValues },
    mingguan: { labels: mingguanLabels, values: mingguanValues },
    bulanan: { labels: bulananLabels, values: bulananValues }
  }
})

const trendPercentage = computed(() => {
  const data = dynamicTrendData.value[trendFilter.value].values
  if (data.length < 2) return 0
  const current = data[data.length - 1]
  const previous = data[data.length - 2]
  if (previous === 0) return current > 0 ? 100 : 0
  return Math.round(((current - previous) / previous) * 100)
})

const currentLabels = computed(() => dynamicTrendData.value[trendFilter.value].labels)

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
    data: dynamicTrendData.value[trendFilter.value].values,
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

  const lakePolygon = [
    [3.05, 98.45],
    [2.95, 98.85],
    [2.75, 99.20],
    [2.45, 99.25],
    [2.25, 99.15],
    [2.25, 98.80],
    [2.40, 98.60],
    [2.75, 98.50],
  ]
  L.polygon(lakePolygon, {
    color: '#e53935',
    weight: 2,
    fillColor: '#93c5fd',
    fillOpacity: 0.35,
  }).addTo(adminMap.value)

  const destinationsList = mapDestinations.value

  destinationsList.forEach((d) => {
    // Map status to colors
    let color = 'green'
    let status = d.status || 'Aman'
    if (status === 'Perlu Penanganan' || status === 'Kritis') {
      color = 'red'
      status = 'Perlu Penanganan' // normalize status for display
    } else if (status === 'Perlu Perhatian') {
      color = 'orange'
    }

    const hexColor = color === 'red' ? '#e53935' : color === 'orange' ? '#d97706' : '#10b981'

    // Add heatmap-like circle
    L.circle([d.latitude, d.longitude], {
      color: hexColor,
      fillColor: hexColor,
      fillOpacity: 0.15,
      weight: 1,
      radius: 1200 // 1.2km radius for visual heatmap effect
    }).addTo(adminMap.value)

    const customIcon = L.divIcon({
      className: 'bg-transparent',
      html: `<svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 0C7.16344 0 0 7.16344 0 16C0 27.2 16 48 16 48C16 48 32 27.2 32 16C32 7.16344 24.8366 0 16 0ZM16 24C11.5817 24 8 20.4183 8 16C8 11.5817 11.5817 8 16 8C20.4183 8 24 11.5817 24 16C24 20.4183 20.4183 24 16 24Z" fill="${hexColor}"/></svg>`,
      iconSize: [32, 48],
      iconAnchor: [16, 48],
      tooltipAnchor: [16, -24]
    })

    const marker = L.marker([d.latitude, d.longitude], { icon: customIcon }).addTo(adminMap.value)

    marker.on('click', () => {
      selectedDest.value = d
      selectedDestReports.value = mapReports.value.filter(r => {
        if (r.spot_id !== d.id) return false;

        let stat = r.status || 'pending';
        // Hide resolved or safe reports
        if (stat === 'Selesai' || stat === 'Aman' || stat === 'Ditolak') return false;

        // If pending, only show if it looks dirty
        if (stat === 'pending') {
          return r.ai_score >= 0.4;
        }

        // Otherwise show only explicit attention statuses
        return stat === 'Perlu Penanganan' || stat === 'Kritis' || stat === 'Perlu Perhatian';
      })
      carouselSlide.value = 0
      showDestModal.value = true
    })

    const badgeClass =
      color === 'red' ? 'badge-red' : color === 'orange' ? 'badge-orange' : 'badge-green'
    marker.bindTooltip(`<div class="${badgeClass}">${status} - ${d.name}</div>`, {
      permanent: true,
      direction: 'right',
      className: 'ref-map-badge-tooltip',
    })
  })

  // Add small dots for individual reports
  mapReports.value.forEach((report) => {
    if (report.latitude && report.longitude) {
      let isAman = report.ai_score < 0.4 && (!report.status || report.status === 'Aman')
      if (isAman) return // skip drawing dots for safe reports

      let reportColor = '#d97706' // Perlu Perhatian (default if not aman)
      if (report.ai_score >= 0.7 || report.status === 'Perlu Penanganan' || report.status === 'Kritis') {
        reportColor = '#e53935' // Kritis/Perlu Penanganan
      }

      L.circleMarker([report.latitude, report.longitude], {
        radius: 4,
        fillColor: reportColor,
        color: '#ffffff',
        weight: 1.5,
        opacity: 1,
        fillOpacity: 0.9
      }).addTo(adminMap.value)
    }
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
    recentReports.value = priorityRes.data
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .map(r => ({
        ...r,
        img: r.photo_path ? `http://127.0.0.1:5000/uploads/${r.photo_path}` : `https://picsum.photos/seed/${r.report_id}/200/150`,
        dotClass: r.ai_score >= 0.7 ? 'bg-red-6' : (r.ai_score >= 0.4 ? 'bg-orange-6' : 'bg-green-6'),
        statusText: r.ai_score >= 0.7 ? 'Perlu Penanganan' : (r.ai_score >= 0.4 ? 'Perlu Perhatian' : 'Aman')
      }))

    const mapRes = await axios.get('http://127.0.0.1:5000/api/spots/')
    mapDestinations.value = mapRes.data

    const reportsRes = await axios.get('http://127.0.0.1:5000/api/reports/', config)
    mapReports.value = reportsRes.data

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
