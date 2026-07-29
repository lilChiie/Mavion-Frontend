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
              v-for="(item, idx) in destinationList"
              :key="idx"
              flat
              bordered
              class="report-dialog-item q-mb-sm cursor-pointer"
              :class="{ 'active-item': selectedDest.name === item.name }"
              @click="selectedDest = item"
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

            <q-card flat class="dialog-destination-card shadow-4">
              <q-card-section class="q-pa-sm">
                <div class="text-subtitle1 text-weight-bold">{{ selectedDest.name }}</div>
                <div class="text-caption text-orange text-weight-medium">
                  ● {{ selectedDest.status }}
                </div>
                <div class="text-caption text-grey-6 q-mb-xs">3 laporan terbaru</div>

                <q-btn
                  outline
                  rounded
                  color="primary"
                  label="Lihat Detail"
                  class="full-width text-weight-bold"
                  no-caps
                  @click="goToDetail"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, nextTick, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
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

const destinationList = ref([
  {
    name: 'Pantai Batu Hoda',
    status: 'Perlu Perhatian',
    waktu: '2 jam lalu',
    img: 'https://picsum.photos/seed/toba1/400/200',
    coords: [2.6847, 98.8722],
  },
  {
    name: 'Pantai Simanindo',
    status: 'Perlu Perhatian',
    waktu: '2 jam lalu',
    img: 'https://picsum.photos/seed/toba2/400/200',
    coords: [2.7481, 98.7456],
  },
  {
    name: 'Pelabuhan Tomok',
    status: 'Perlu Perhatian',
    waktu: '2 jam lalu',
    img: 'https://picsum.photos/seed/toba3/400/200',
    coords: [2.6653, 98.8541],
  },
  {
    name: 'Bukit Holbung',
    status: 'Perlu Perhatian',
    waktu: '2 jam lalu',
    img: 'https://picsum.photos/seed/toba4/400/200',
    coords: [2.5531, 98.7123],
  },
  {
    name: 'Menara Pandang Tele',
    status: 'Perlu Perhatian',
    waktu: '2 jam lalu',
    img: 'https://picsum.photos/seed/toba5/400/200',
    coords: [2.5489, 98.6312],
  },
])

const selectedDest = ref(destinationList.value[0])
const dialogMapContainer = ref(null)
const dialogMap = ref(null)

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
        [2.85, 98.65],
        [2.92, 98.85],
        [2.75, 99.05],
        [2.45, 99.0],
        [2.35, 98.9],
        [2.45, 98.65],
        [2.7, 98.58],
      ]
      L.polygon(lakePolygon, {
        color: '#e53935',
        weight: 2,
        fillColor: '#93c5fd',
        fillOpacity: 0.35,
      }).addTo(dialogMap.value)

      destinationList.value.forEach((item) => {
        if (item.coords) {
          const marker = L.marker(item.coords).addTo(dialogMap.value)
          marker.bindTooltip(item.name, {
            permanent: true,
            direction: 'top',
            className: 'map-tooltip-badge',
          })
          marker.on('click', () => {
            selectedDest.value = item
          })
        }
      })
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
