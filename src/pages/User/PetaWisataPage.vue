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
            style="min-width: 320px"
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
            popup-content-style="width: 200px; border-radius: 12px;"
            class="bg-white select-input"
            style="width: 180px"
          />

          <div class="row items-center gap-xs q-ml-sm">
            <q-chip dense class="bg-teal-1 text-teal-9 text-weight-bold">
              ● Aman: {{ countAman }}
            </q-chip>
            <q-chip dense class="bg-orange-1 text-orange-9 text-weight-bold">
              ● Perlu Perhatian: {{ countPerhatian }}
            </q-chip>
            <q-chip dense class="bg-red-1 text-red-9 text-weight-bold">
              ● Perlu Penanganan: {{ countPenanganan }}
            </q-chip>
          </div>
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

        <q-card flat class="selected-dest-overlay shadow-4" v-if="selectedDest">
          <q-card-section class="q-pa-md">
            <div class="text-subtitle1 text-weight-bold text-grey-9">{{ selectedDest.name }}</div>
            <div class="q-my-xs">
              <q-chip
                dense
                unremovable
                size="11px"
                class="text-weight-bold"
                :class="getStatusChipClass(selectedDest.status)"
              >
                ● {{ selectedDest.status }}
              </q-chip>
            </div>
            <div class="text-caption text-grey-6 q-mb-sm">
              {{ selectedDest.laporanCount }} laporan kebersihan terbaru
            </div>

            <q-btn
              unelevated
              rounded
              color="teal-8"
              label="Lihat Detail Destinasi"
              class="full-width text-weight-bold"
              no-caps
              @click="goToDetail(selectedDest)"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <FooterComponent />
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Motion } from 'motion-v'
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

const destinations = ref([
  {
    name: 'Pantai Batu Hoda',
    status: 'Perlu Perhatian',
    laporanCount: 3,
    img: 'https://picsum.photos/seed/toba1/400/200',
    coords: [2.6847, 98.8722],
  },
  {
    name: 'Pantai Simanindo',
    status: 'Perlu Perhatian',
    laporanCount: 5,
    img: 'https://picsum.photos/seed/toba2/400/200',
    coords: [2.7481, 98.7456],
  },
  {
    name: 'Pelabuhan Tomok',
    status: 'Perlu Penanganan',
    laporanCount: 8,
    img: 'https://picsum.photos/seed/toba3/400/200',
    coords: [2.6653, 98.8541],
  },
  {
    name: 'Bukit Holbung',
    status: 'Aman',
    laporanCount: 1,
    img: 'https://picsum.photos/seed/toba4/400/200',
    coords: [2.5531, 98.7123],
  },
  {
    name: 'Menara Pandang Tele',
    status: 'Perlu Perhatian',
    laporanCount: 4,
    img: 'https://picsum.photos/seed/toba5/400/200',
    coords: [2.5489, 98.6312],
  },
  {
    name: 'Desa Wisata Tomok',
    status: 'Aman',
    laporanCount: 2,
    img: 'https://picsum.photos/seed/toba6/400/200',
    coords: [2.658, 98.8612],
  },
])

const selectedDest = ref(destinations.value[0])

const filteredDestinations = computed(() => {
  return destinations.value.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchCat = selectedCategory.value === 'Semua' || d.status === selectedCategory.value
    return matchSearch && matchCat
  })
})

const countAman = computed(() => destinations.value.filter((d) => d.status === 'Aman').length)
const countPerhatian = computed(
  () => destinations.value.filter((d) => d.status === 'Perlu Perhatian').length,
)
const countPenanganan = computed(
  () => destinations.value.filter((d) => d.status === 'Perlu Penanganan').length,
)

function getStatusChipClass(status) {
  if (status === 'Aman') return 'bg-teal-1 text-teal-9'
  if (status === 'Perlu Perhatian') return 'bg-orange-1 text-orange-9'
  return 'bg-red-1 text-red-9'
}

function selectDestination(item) {
  selectedDest.value = item
  if (map.value && item.coords) {
    map.value.flyTo(item.coords, 12, { duration: 1 })
  }
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
  [2.85, 98.65],
  [2.92, 98.85],
  [2.75, 99.05],
  [2.45, 99.0],
  [2.35, 98.9],
  [2.45, 98.65],
  [2.7, 98.58],
]

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

  destinations.value.forEach((d) => {
    const marker = L.marker(d.coords).addTo(map.value)
    marker.bindTooltip(d.name, {
      permanent: true,
      direction: 'top',
      className: 'map-tooltip-badge',
    })
    marker.on('click', () => selectDestination(d))
    markers.value.push(marker)
  })

  setTimeout(() => {
    map.value?.invalidateSize()
  }, 200)
}

onMounted(async () => {
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
