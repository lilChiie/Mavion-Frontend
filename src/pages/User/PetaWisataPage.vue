<template>
  <q-page class="peta-wisata-page bg-grey-1 q-pa-md column no-wrap">
    <Motion
      :initial="{ opacity: 0, y: 15 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5, ease: 'easeOut' }"
      class="filter-header bg-white q-py-md q-px-xl border-bottom"
    >
      <div class="row items-center justify-between gap-md">
        <div class="q-my-md">
          <div class="text-subtitle2 text-primary font-weight-bold">Peta Kondisi Wisata</div>
          <div class="text-h5 text-weight-bold text-grey-9">
            Pantau Kondisi Destinasi Wisata Danau Toba
          </div>
        </div>

        <div class="row items-center gap-sm q-gutter-md">
          <q-input
            v-model="searchQuery"
            placeholder="Cari destinasi wisata..."
            dense
            outlined
            rounded
            class="bg-white search-input"
            style="width: 320px; max-width: 100%;"
          >
            <template v-slot:prepend>
              <q-icon name="search" color="grey-6" />
            </template>
          </q-input>

          <q-select
            v-model="selectedCategory"
            :options="categoryOptions"
            dense
            outlined
            rounded
            behavior="menu"
            options-dense
            popup-content-style="border-radius: 12px;"
            class="bg-white select-input"
            style="width: 320px; max-width: 100%;"
          />
        </div>
      </div>
    </Motion>

    <div class="col row no-wrap main-content-wrapper relative-position overflow-hidden">
      <div class="col-12 col-md-4 column left-panel bg-white border-right full-height">
        <div class="q-pa-md border-bottom row items-center justify-between">
          <div class="text-subtitle1 text-weight-bold text-grey-9">Daftar Destinasi Wisata</div>
          <div class="text-caption text-grey-6">{{ filteredDestinations.length }} Destinasi</div>
        </div>

        <div class="col overflow-hidden">
          <q-scroll-area
            style="height: calc(100vh - 280px); min-height: 520px"
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
          >
            <div class="q-pa-md">
              <q-card
                v-for="(item, idx) in filteredDestinations"
                :key="idx"
                flat
                bordered
                class="destination-item-card q-mb-md cursor-pointer"
                :class="{ active: selectedDest?.name === item.name }"
                @click="selectDestination(item)"
              >
                <div class="row no-wrap">
                  <q-img
                    :src="item.img"
                    width="110px"
                    height="100px"
                    fit="cover"
                    style="border-radius: 14px 0 0 14px"
                  />
                  <q-card-section class="col column justify-between q-pa-sm">
                    <div>
                      <div class="text-subtitle2 text-weight-bold text-grey-9 ellipsis">
                        {{ item.name }}
                      </div>
                      <div class="q-mt-xs">
                        <q-chip
                          dense
                          unremovable
                          size="11px"
                          class="text-weight-bold"
                          :class="getStatusChipClass(item.status)"
                        >
                          ● {{ item.status }}
                        </q-chip>
                      </div>
                    </div>

                    <div class="row items-center justify-between q-mt-xs">
                      <div class="text-caption text-grey-6">
                        {{ item.laporanCount }} laporan terbaru
                      </div>
                      <q-btn
                        flat
                        dense
                        no-caps
                        color="primary"
                        label="Detail"
                        icon-right="chevron_right"
                        size="sm"
                        class="text-weight-bold"
                        @click.stop="goToDetail(item)"
                      />
                    </div>
                  </q-card-section>
                </div>
              </q-card>
            </div>
          </q-scroll-area>
        </div>
      </div>

      <div class="col-12 col-md-8 column right-panel relative-position full-height">
        <div ref="mapContainer" class="full-height full-width map-el"></div>

        <!-- Destination Modal -->
        <q-dialog v-model="showDestModal">
          <q-card style="width: 320px; max-width: 90vw; border-radius: 16px;" class="q-pa-sm">
            <q-img 
              :src="selectedDest?.img || 'https://picsum.photos/400/300?random=' + (selectedDest?.id || 1)" 
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
                  style="width: 12px; height: 12px; border-radius: 50%; display: inline-block;"
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
                @click="goToDetail(selectedDest)"
                v-close-popup 
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>

    <FooterComponent />
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Motion } from 'motion-v'
import axios from 'axios'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import FooterComponent from '../../components/FooterComponent.vue'

const router = useRouter()

const thumbStyle = {
  borderRadius: '5px',
  backgroundColor: '#197f70',
  width: '5px',
  opacity: 0.75,
}

const barStyle = {
  borderRadius: '9px',
  backgroundColor: '#197f70',
  width: '9px',
  opacity: 0.2,
}

const searchQuery = ref('')
const selectedCategory = ref('Semua')
const categoryOptions = ['Semua', 'Aman', 'Perlu Perhatian', 'Perlu Penanganan']

const destinations = ref([])

const mapReports = ref([])

async function fetchDestinations() {
  try {
    const res = await axios.get('http://127.0.0.1:5000/api/spots/')
    destinations.value = res.data
  } catch (error) {
    console.error('Error fetching destinations:', error)
  }
  
  try {
    const resRep = await axios.get('http://127.0.0.1:5000/api/public/reports')
    mapReports.value = resRep.data
  } catch (error) {
    console.error('Error fetching map reports:', error)
  }
}

const selectedDest = ref(null)

const filteredDestinations = computed(() => {
  return destinations.value.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchCat = selectedCategory.value === 'Semua' || d.status === selectedCategory.value
    return matchSearch && matchCat
  })
})

function getStatusChipClass(status) {
  if (status === 'Aman') return 'bg-teal-1 text-teal-9'
  if (status === 'Perlu Perhatian') return 'bg-orange-1 text-orange-9'
  return 'bg-red-1 text-red-9'
}

const showDestModal = ref(false)
const selectedDestReports = ref([])

function selectDestination(item) {
  selectedDest.value = item
  selectedDestReports.value = mapReports.value.filter(r => {
    if (r.spot_id !== item.id) return false;
    let stat = r.status || 'pending';
    if (stat === 'Selesai' || stat === 'Aman' || stat === 'Ditolak') return false;
    if (stat === 'pending') {
      return r.ai_score >= 0.4;
    }
    return stat === 'Perlu Penanganan' || stat === 'Kritis' || stat === 'Perlu Perhatian';
  })
  
  if (map.value && item.coords) {
    map.value.flyTo(item.coords, 12, { duration: 1 })
  }
  
  showDestModal.value = true
}

function goToDetail(item) {
  router.push({
    path: '/destinasi-detail',
    query: {
      name: item.name,
      status: item.status,
    },
  })
}

const mapContainer = ref(null)
const map = ref(null)
const markers = ref([])

const lakePolygonCoordinates = [
  [3.05, 98.45],
  [2.95, 98.85],
  [2.75, 99.20],
  [2.45, 99.25],
  [2.25, 99.15],
  [2.25, 98.80],
  [2.40, 98.60],
  [2.75, 98.50],
]

function updateMarkers() {
  if (!map.value) return
  
  // Clear existing markers
  markers.value.forEach(m => map.value.removeLayer(m))
  markers.value = []
  
  // Add new markers
  filteredDestinations.value.forEach((d) => {
    let color = 'green'
    let status = d.status || 'Aman'
    if (status === 'Perlu Penanganan' || status === 'Kritis') {
      color = 'red'
      status = 'Perlu Penanganan'
    } else if (status === 'Perlu Perhatian') {
      color = 'orange'
    }
    
    const hexColor = color === 'red' ? '#e53935' : color === 'orange' ? '#d97706' : '#10b981'
    
    const circle = L.circle(d.coords, {
      color: hexColor,
      fillColor: hexColor,
      fillOpacity: 0.15,
      weight: 1,
      radius: 1200
    }).addTo(map.value)
    markers.value.push(circle)

    const customIcon = L.divIcon({
      className: 'bg-transparent',
      html: `<svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 0C7.16344 0 0 7.16344 0 16C0 27.2 16 48 16 48C16 48 32 27.2 32 16C32 7.16344 24.8366 0 16 0ZM16 24C11.5817 24 8 20.4183 8 16C8 11.5817 11.5817 8 16 8C20.4183 8 24 11.5817 24 16C24 20.4183 20.4183 24 16 24Z" fill="${hexColor}"/></svg>`,
      iconSize: [32, 48],
      iconAnchor: [16, 48],
      tooltipAnchor: [16, -24]
    })

    const marker = L.marker(d.coords, { icon: customIcon }).addTo(map.value)
    
    marker.on('click', () => selectDestination(d))
    markers.value.push(marker)
  })

  mapReports.value.forEach((r) => {
    let stat = r.status || 'pending'
    if (stat === 'Selesai' || stat === 'Aman' || stat === 'Ditolak') return
    if (stat === 'pending' && r.ai_score < 0.4) return

    let dotColor = '#10b981'
    if (r.ai_score >= 0.7 || stat === 'Perlu Penanganan' || stat === 'Kritis') {
      dotColor = '#e53935'
    } else if (stat === 'Perlu Perhatian' || (stat === 'pending' && r.ai_score >= 0.4)) {
      dotColor = '#d97706'
    }
    
    const dot = L.circleMarker([r.latitude, r.longitude], {
      radius: 4,
      fillColor: dotColor,
      color: '#ffffff',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.9
    }).addTo(map.value)
    
    markers.value.push(dot)
  })
}

watch(filteredDestinations, () => {
  updateMarkers()
})

function initMap() {
  if (!mapContainer.value) return

  map.value = L.map(mapContainer.value, {
    zoomControl: true,
    attributionControl: false,
  }).setView([2.6847, 98.8722], 11)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map.value)

  L.polygon(lakePolygonCoordinates, {
    color: '#e53935',
    weight: 2,
    fillColor: '#93c5fd',
    fillOpacity: 0.3,
  }).addTo(map.value)

  updateMarkers()

  setTimeout(() => {
    map.value?.invalidateSize()
  }, 200)
}

onMounted(async () => {
  await fetchDestinations()
  await nextTick()
  initMap()
})

onUnmounted(() => {
  if (map.value) {
    map.value.remove()
    map.value = null
  }
})
</script>

<style scoped>
.peta-wisata-page {
  min-height: 100vh;
}

.border-bottom {
  border-bottom: 1px solid #e5e7eb;
}

.border-right {
  border-right: 1px solid #e5e7eb;
}

.main-content-wrapper {
  height: calc(100vh - 140px);
  min-height: 600px;
}

.left-panel {
  min-height: 600px;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.right-panel {
  min-height: 600px;
  flex: 1;
}

.destination-item-card {
  border-radius: 14px;
  transition: all 0.2s ease;
  border: 1px solid #e5e7eb;
}

.destination-item-card.active,
.destination-item-card:hover {
  border-color: #197f70 !important;
  background-color: #f0fdf9 !important;
}

.map-el {
  width: 100%;
  height: 100%;
  min-height: 600px;
}

.selected-dest-overlay {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 280px;
  border-radius: 16px;
  z-index: 1000;
  background: #ffffff;
}

:deep(.map-tooltip-badge) {
  background: #ffffff;
  color: #111827;
  font-weight: 700;
  font-size: 12px;
  border-radius: 6px;
  padding: 2px 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
