<template>
  <q-dialog
    v-model="isOpen"
    transition-show="scale"
    transition-hide="scale"
    @show="onDialogMapShow"
    @hide="onDialogHide"
  >
    <q-card class="map-dialog-card column no-wrap q-pa-lg q-px-xl">
      <div class="row items-center justify-between q-pb-sm dialog-header">
        <div class="col-12 col-md-4">
          <div class="text-subtitle2 text-primary font-weight-bold">Peta Kondisi Wisata</div>
          <div class="text-h5 text-weight-bold text-teal-9">
            Pantau Kondisi Destinasi Secara Real-Time
          </div>
          <div class="text-caption text-grey-7 q-mt-xs">
            Peta ini menampilkan kondisi terkini destinasi wisata sekitaran Danau Toba berdasarkan
            laporan masyarakat dan wisatawan sekitar, serta analisis AI.
          </div>
        </div>

        <div class="col-12 col-md-8 row items-center gap-sm q-mt-sm-none q-mt-md justify-between">
          <div class="flex flex-center q-col-gutter-sm">
            <q-input
              v-model="dialogSearch"
              placeholder="Cari destinasi wisata"
              dense
              outlined
              rounded
              class="dialog-search bg-white"
              style="min-width: 400px"
            >
              <template v-slot:prepend>
                <q-icon name="search" color="grey-6" />
              </template>
            </q-input>

            <q-select
              v-model="dialogCategory"
              :options="['Semua', 'Aman', 'Perlu Perhatian', 'Perlu Penanganan']"
              dense
              outlined
              rounded
              class="dialog-select bg-white"
              style="min-width: 150px"
            />
          </div>
          <div class="flex justify-end">
            <q-btn
              flat
              round
              dense
              icon="cancel"
              color="teal-7"
              size="lg"
              v-close-popup
              class="q-ml-sm"
            />
          </div>
        </div>
      </div>

      <div
        class="row col no-wrap items-stretch q-col-gutter-md dialog-content"
        style="min-height: 0"
      >
        <div class="col-12 col-md-4 column left-dialog-panel full-height" style="min-height: 0">
          <div class="text-subtitle1 text-weight-bold q-mb-sm">Laporan Terbaru</div>
          <div class="col overflow-auto report-dialog-list q-pr-xs">
            <q-card
              v-for="(item, idx) in filteredDestinations"
              :key="idx"
              flat
              bordered
              class="report-dialog-item q-mb-sm cursor-pointer"
              :class="{ 'active-item': selectedDest?.name === item.name }"
              @click="selectedDest = item; showDestModal = true; selectedDestReports = mapReports.filter(r => r.spot_id === item.id && (r.status === 'Perlu Penanganan' || r.status === 'Kritis' || r.status === 'Perlu Perhatian' || (r.status === 'pending' && r.ai_score >= 0.4)))"
            >
              <q-card-section class="row no-wrap items-center q-pa-sm gap-sm">
                <q-img
                  :src="item.img"
                  width="70px"
                  height="60px"
                  fit="cover"
                  class="q-mr-md"
                  style="border-radius: 10px; flex-shrink: 0"
                />
                <div class="col overflow-hidden">
                  <div class="text-subtitle2 text-weight-bold ellipsis">{{ item.name }}</div>
                  <div class="text-caption text-orange text-weight-medium">● {{ item.status }}</div>
                  <div class="text-caption text-grey-6">{{ item.waktu }}</div>
                </div>
                <q-icon name="chevron_right" color="grey-6" size="22px" />
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div class="col-12 col-md-8 column right-dialog-panel full-height" style="min-height: 0">
          <div
            class="col dialog-map-wrapper full-width relative-position"
            style="border-radius: 20px; overflow: hidden; min-height: 0"
          >
            <div ref="dialogMapContainer" class="dialog-map full-height full-width"></div>

            <!-- Destination Nested Modal -->
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
                    @click="goToDetail"
                    v-close-popup 
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, nextTick, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const router = useRouter()

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const dialogSearch = ref('')
const dialogCategory = ref('Semua')

const destinationList = ref([])

const mapReports = ref([])

async function fetchDestinations() {
  try {
    const res = await axios.get('http://127.0.0.1:5000/api/spots/')
    destinationList.value = res.data
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

const filteredDestinations = computed(() => {
  return destinationList.value.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(dialogSearch.value.toLowerCase())
    const matchCat = dialogCategory.value === 'Semua' || d.status === dialogCategory.value
    return matchSearch && matchCat
  })
})

const selectedDest = ref(null)
const showDestModal = ref(false)
const selectedDestReports = ref([])
const dialogMapContainer = ref(null)
const dialogMap = ref(null)
const dialogMarkers = ref([])

function updateDialogMarkers() {
  if (!dialogMap.value) return
  
  // Clear existing markers
  dialogMarkers.value.forEach(m => dialogMap.value.removeLayer(m))
  dialogMarkers.value = []
  
  // Add new markers
  filteredDestinations.value.forEach((item) => {
    if (item.coords) {
      let color = 'green'
      let status = item.status || 'Aman'
      if (status === 'Perlu Penanganan' || status === 'Kritis') {
        color = 'red'
        status = 'Perlu Penanganan'
      } else if (status === 'Perlu Perhatian') {
        color = 'orange'
      }
      
      const hexColor = color === 'red' ? '#e53935' : color === 'orange' ? '#d97706' : '#10b981'
      
      const circle = L.circle(item.coords, {
        color: hexColor,
        fillColor: hexColor,
        fillOpacity: 0.15,
        weight: 1,
        radius: 1200
      }).addTo(dialogMap.value)
      dialogMarkers.value.push(circle)

      const customIcon = L.divIcon({
        className: 'bg-transparent',
        html: `<svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 0C7.16344 0 0 7.16344 0 16C0 27.2 16 48 16 48C16 48 32 27.2 32 16C32 7.16344 24.8366 0 16 0ZM16 24C11.5817 24 8 20.4183 8 16C8 11.5817 11.5817 8 16 8C20.4183 8 24 11.5817 24 16C24 20.4183 20.4183 24 16 24Z" fill="${hexColor}"/></svg>`,
        iconSize: [32, 48],
        iconAnchor: [16, 48],
        tooltipAnchor: [16, -24]
      })

      const marker = L.marker(item.coords, { icon: customIcon }).addTo(dialogMap.value)
      marker.on('click', () => {
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
        showDestModal.value = true
      })
      dialogMarkers.value.push(marker)
    }
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
    }).addTo(dialogMap.value)
    
    dialogMarkers.value.push(dot)
  })
}

watch(filteredDestinations, () => {
  updateDialogMarkers()
})

function goToDetail() {
  isOpen.value = false
  router.push({
    path: '/destinasi-detail',
    query: {
      name: selectedDest.value.name,
      status: selectedDest.value.status,
    },
  })
}

function onDialogHide() {
  if (dialogMap.value) {
    dialogMap.value.remove()
    dialogMap.value = null
  }
}

async function onDialogMapShow() {
  await fetchDestinations()
  await nextTick()
  setTimeout(() => {
    if (!dialogMapContainer.value) return
    if (!dialogMap.value) {
      dialogMap.value = L.map(dialogMapContainer.value, {
        zoomControl: false,
        attributionControl: false,
        preferCanvas: true,
      }).setView([2.6847, 98.8722], 11)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(dialogMap.value)

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
      }).addTo(dialogMap.value)

      updateDialogMarkers()
    }
    dialogMap.value.invalidateSize()
    setTimeout(() => {
      dialogMap.value?.invalidateSize()
    }, 300)
  }, 150)
}

onUnmounted(() => {
  onDialogHide()
})
</script>

<style scoped>
.map-dialog-card {
  width: 95vw;
  max-width: 1350px;
  height: 92vh;
  max-height: 900px !important;
  border-radius: 24px !important;
  overflow: hidden;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

.right-dialog-panel {
  height: 100%;
  flex: 1;
  min-height: 550px;
}

.dialog-map-wrapper {
  height: 100%;
  width: 100%;
  min-height: 550px;
}

.dialog-map {
  width: 100%;
  height: 100%;
  min-height: 550px;
}

.report-dialog-item {
  border-radius: 14px;
  transition: all 0.2s ease;
  border: 1px solid #e5e7eb;
}

.report-dialog-item.active-item {
  border: 2px solid #197f70 !important;
  background-color: #f0fdf9 !important;
}

.dialog-destination-card {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 250px;
  border-radius: 16px;
  z-index: 1000;
  background: #ffffff;
}

:deep(.map-tooltip-badge) {
  background: #ffffff;
  color: #ea580c;
  font-weight: 700;
  font-size: 12px;
  border-radius: 6px;
  padding: 2px 8px;
  border: 1px solid #fed7aa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
