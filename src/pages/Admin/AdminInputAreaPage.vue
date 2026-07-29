<template>
  <q-page class="admin-input-area q-pa-lg">
    <Motion
      :initial="{ opacity: 0, y: 15 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5, ease: 'easeOut' }"
      class="q-mb-lg"
    >
      <div class="row items-center justify-between gap-md">
        <div>
          <h1 class="text-h4 text-weight-bolder text-grey-9 q-my-none">
            Input & Pemetaan Area Wisata
          </h1>
          <div class="text-subtitle2 text-grey-7 q-mt-xs">
            Klik lokasi pada peta interaktif untuk secara otomatis menghitung titik koordinat
            (Latitude & Longitude).
          </div>
        </div>

        <q-chip class="bg-teal-1 text-teal-9 text-weight-bold q-px-md">
          <q-icon name="pin_drop" color="teal-8" class="q-mr-xs" />
          Geo-Mapping Mode Aktif
        </q-chip>
      </div>
    </Motion>

    <div class="row q-col-gutter-lg">
      <Motion
        class="col-12 col-lg-7"
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: 0.1, ease: 'easeOut' }"
      >
        <q-card flat bordered class="input-card overflow-hidden full-height column justify-between">
          <div>
            <div class="q-pa-md row items-center justify-between border-bottom">
              <div class="row items-center gap-xs">
                <q-icon name="map" color="teal-8" size="22px" />
                <div class="text-subtitle1 text-weight-bold text-grey-9">
                  Peta Pemetaan Lokasi (Klik Pada Peta)
                </div>
              </div>

              <q-btn
                flat
                dense
                no-caps
                color="teal-8"
                icon="my_location"
                label="GPS Saya"
                class="text-weight-bold"
                @click="getCurrentLocation"
              />
            </div>

            <div class="picker-map-wrapper relative-position">
              <div ref="pickerMapContainer" class="picker-map"></div>

              <div
                v-if="form.latitude && form.longitude"
                class="location-badge absolute-top-left q-ma-md bg-teal-10 text-white q-px-md q-py-sm rounded-borders shadow-3 flex items-center gap-xs"
              >
                <q-icon name="location_on" color="teal-3" size="20px" />
                <div>
                  <div class="text-caption text-weight-bold text-teal-1">Koordinat Terpilih:</div>
                  <div class="text-caption font-mono text-weight-bolder">
                    {{ form.latitude }}, {{ form.longitude }}
                  </div>
                </div>
              </div>

              <div
                class="map-hint-overlay absolute-bottom-left q-ma-md bg-white-80 q-px-sm q-py-xs rounded-borders text-caption text-grey-8 shadow-1"
              >
                💡 <b>Petunjuk:</b> Klik pada titik destinasi di peta untuk mengisi koordinat
                otomatis.
              </div>
            </div>
          </div>

          <div class="q-pa-md border-top bg-grey-1 row items-center justify-between">
            <div class="text-caption text-grey-7">
              Presisi Koordinat: <b>± 5 Meter (Geocoding Auto-Fill)</b>
            </div>
            <q-badge color="teal-8" label="Auto-Calculation On" />
          </div>
        </q-card>
      </Motion>

      <Motion
        class="col-12 col-lg-5"
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: 0.2, ease: 'easeOut' }"
      >
        <q-card flat bordered class="input-card q-pa-lg">
          <div class="text-h6 text-weight-bold text-grey-9 q-mb-md row items-center">
            <q-icon name="edit_location_alt" color="teal-8" />
            Formulir Data Area Wisata
          </div>

          <q-form @submit.prevent="saveDestination" class="q-gutter-y-md">
            <div class="q-my-md">
              <q-label class="text-weight-bold text-grey-8">Nama Destinasi Wisata</q-label>
              <q-input
                v-model="form.name"
                placeholder="Misal: Pantai batu Hoda, Bukit Holbung..."
                outlined
                dense
                color="teal-8"
                class="q-mt-xs bg-white"
                :rules="[(val) => !!val || 'Nama destinasi wajib diisi']"
                hide-bottom-space
              />
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-label class="text-weight-bold text-grey-8">Kabupaten / Wilayah</q-label>
                <q-select
                  v-model="form.wilayah"
                  :options="[
                    'Samosir',
                    'Toba',
                    'Simalungun',
                    'Karo',
                    'Dairi',
                    'Humbang Hasundutan',
                    'Tapanuli Utara',
                  ]"
                  outlined
                  dense
                  color="teal-8"
                  class="q-mt-xs bg-white"
                  hide-bottom-space
                />
              </div>

              <div class="col-12 col-sm-6">
                <q-label class="text-weight-bold text-grey-8">Kategori Wisata</q-label>
                <q-select
                  v-model="form.kategori"
                  :options="[
                    'Danau & Pantai',
                    'Perbukitan & Gunung',
                    'Air Terjun',
                    'Wisata Budaya',
                    'Pelabuhan & Dermaga',
                  ]"
                  outlined
                  dense
                  color="teal-8"
                  class="q-mt-xs bg-white"
                  hide-bottom-space
                />
              </div>
            </div>

            <div class="bg-teal-1 q-pa-md rounded-borders">
              <div
                class="text-subtitle2 text-weight-bold text-teal-10 q-mb-xs row items-center gap-xs"
              >
                <q-icon name="calculate" color="teal-8" />
                Hasil Perhitungan Otomatis Sistem
              </div>
              <div class="row q-col-gutter-sm">
                <div class="col-6">
                  <q-label class="text-caption text-weight-bold text-teal-9"
                    >Latitude (Garis Lintang)</q-label
                  >
                  <q-input
                    v-model="form.latitude"
                    readonly
                    outlined
                    dense
                    bg-color="white"
                    class="q-mt-xs font-mono"
                  />
                </div>
                <div class="col-6">
                  <q-label class="text-caption text-weight-bold text-teal-9"
                    >Longitude (Garis Bujur)</q-label
                  >
                  <q-input
                    v-model="form.longitude"
                    readonly
                    outlined
                    dense
                    bg-color="white"
                    class="q-mt-xs font-mono"
                  />
                </div>
              </div>
            </div>

            <div>
              <q-label class="text-weight-bold text-grey-8">Status Kebersihan Awal</q-label>
              <q-select
                v-model="form.status"
                :options="['Aman', 'Perlu Perhatian', 'Perlu Penanganan']"
                outlined
                dense
                color="teal-8"
                class="q-mt-xs bg-white"
                hide-bottom-space
              />
            </div>

            <div class="row gap-md q-mt-lg">
              <q-btn
                type="submit"
                unelevated
                dense
                rounded
                color="teal-8"
                icon="save"
                label="Simpan Area Wisata Baru"
                class="full-width text-weight-bold"
                no-caps
                size="md"
                :loading="submitting"
              />
            </div>
          </q-form>
        </q-card>
      </Motion>
    </div>

    <StatusModal
      v-model="statusModalOpen"
      :type="modalType"
      :title="modalTitle"
      :message="modalMessage"
    />
  </q-page>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { useQuasar } from 'quasar'
import { Motion } from 'motion-v'
import StatusModal from '../../components/StatusModal.vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const $q = useQuasar()
const submitting = ref(false)
const statusModalOpen = ref(false)
const modalType = ref('success')
const modalTitle = ref('')
const modalMessage = ref('')

const form = reactive({
  name: '',
  wilayah: 'Samosir',
  kategori: 'Danau & Pantai',
  status: 'Aman',
  description: '',
  latitude: '2.68472',
  longitude: '98.87221',
  imageUrl: 'https://picsum.photos/seed/toba7/600/400',
})

const pickerMapContainer = ref(null)
const pickerMap = ref(null)
const selectedMarker = ref(null)

function initPickerMap() {
  if (!pickerMapContainer.value) return

  pickerMap.value = L.map(pickerMapContainer.value, {
    zoomControl: true,
    attributionControl: false,
  }).setView([2.68472, 98.87221], 11)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(pickerMap.value)

  selectedMarker.value = L.marker([2.68472, 98.87221], { draggable: true })
    .addTo(pickerMap.value)
    .bindPopup('<b>Titik Destinasi Wisata</b><br/>Drag atau klik peta untuk pindah.')
    .openPopup()

  selectedMarker.value.on('dragend', (e) => {
    const latlng = e.target.getLatLng()
    updateCoordinates(latlng.lat, latlng.lng)
  })

  pickerMap.value.on('click', (e) => {
    const lat = e.latlng.lat
    const lng = e.latlng.lng
    selectedMarker.value.setLatLng([lat, lng])
    updateCoordinates(lat, lng)
  })

  setTimeout(() => {
    pickerMap.value?.invalidateSize()
  }, 200)
}

function updateCoordinates(lat, lng) {
  form.latitude = lat.toFixed(5)
  form.longitude = lng.toFixed(5)

  $q.notify({
    type: 'positive',
    message: 'Koordinat Berhasil Dihitung!',
    caption: `Lat: ${form.latitude}, Lng: ${form.longitude}`,
    position: 'top-right',
    timeout: 1500,
  })
}

function getCurrentLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        pickerMap.value.setView([lat, lng], 14)
        selectedMarker.value.setLatLng([lat, lng])
        updateCoordinates(lat, lng)
      },
      () => {
        $q.notify({
          type: 'warning',
          message: 'GPS Tidak Dapat Diterima',
          caption: 'Silakan klik lokasi langsung pada peta.',
          position: 'top',
        })
      },
    )
  }
}

function saveDestination() {
  submitting.value = true

  setTimeout(() => {
    submitting.value = false
    modalType.value = 'success'
    modalTitle.value = 'Destinasi Berhasil Ditambahkan!'
    modalMessage.value = `Destinasi "${form.name}" (${form.wilayah}) tersimpan dengan koordinat ${form.latitude}, ${form.longitude}.`
    statusModalOpen.value = true

    form.name = ''
    form.description = ''
  }, 1000)
}

onMounted(async () => {
  await nextTick()
  initPickerMap()
})

onBeforeUnmount(() => {
  if (pickerMap.value) {
    pickerMap.value.remove()
    pickerMap.value = null
  }
})
</script>

<style scoped>
.admin-input-area {
  max-width: 1400px;
  margin: 0 auto;
}

.input-card {
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
}

.picker-map-wrapper {
  height: 480px;
  width: 100%;
}

.picker-map {
  width: 100%;
  height: 100%;
}

.font-mono {
  font-family: 'Courier New', Courier, monospace;
}

.border-bottom {
  border-bottom: 1px solid #e5e7eb;
}

.border-top {
  border-top: 1px solid #e5e7eb;
}

.bg-white-80 {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
}

:deep(.q-field--outlined .q-field__control) {
  border-radius: 12px !important;
}
</style>
