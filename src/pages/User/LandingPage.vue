<template>
  <q-page class="landing-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>

      <div class="hero-content">
        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, ease: 'easeOut' }"
        >
          <div class="hero-left">
            <h1 class="font-instrument">
              Jaga Keindahan
              <br />
              Danau Toba
            </h1>

            <div class="hero-subtitle satisfy-regular">Bersama</div>

            <p>
              Setiap laporan berarti untuk Danau Toba. Unggah foto sampah, biarkan AI menganalisis
              dan memprioritaskan penanganannya, lalu bersama-sama kita jaga kebersihan dan
              keindahan destinasi wisata kebanggaan Indonesia.
            </p>

            <div class="hero-action">
              <q-btn
                color="primary"
                icon="photo_camera"
                label="Laporkan Kondisi"
                no-caps
                style="border-radius: 12px"
                unelevated
                size="md"
                to="/laporkan"
              />

              <q-btn
                color="white"
                text-color="primary"
                icon="map"
                label="Lihat Peta Wisata"
                no-caps
                unelevated
                style="border-radius: 12px"
                to="/peta"
              />
            </div>
          </div>
        </Motion>

        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{
            duration: 0.6,
            delay: 0.15,
            ease: 'easeOut',
          }"
        >
          <div class="hero-right">
            <q-card flat class="map-card">
              <q-img src="../../assets/peta.png" fit="cover"> </q-img>
            </q-card>
          </div>
        </Motion>
      </div>

      <div class="stats-wrapper">
        <Motion
          :initial="{ opacity: 0, y: 25 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.25, ease: 'easeOut' }"
        >
          <q-card flat class="stats-card">
            <div class="stats-grid">
              <div class="total-report">
                <div class="stats-title">Statistik Real Time</div>
                <div class="stats-number">{{ stats.total_reports }}</div>
                <div class="stats-label">Laporan Masuk</div>
              </div>

              <div class="status-box success">
                <q-icon name="check_circle" size="32px" />
                <div>
                  <div class="status-number">{{ stats.cleaned_reports }}</div>
                  <div>Laporan ditindaklanjuti</div>
                </div>
              </div>

              <div class="status-box warning">
                <q-icon name="warning" size="32px" />
                <div>
                  <div class="status-number">{{ stats.attention_spots }}</div>
                  <div>Titik perlu perhatian</div>
                </div>
              </div>

              <div class="status-box danger">
                <q-icon name="report_problem" size="32px" />
                <div>
                  <div class="status-number">{{ stats.critical_spots }}</div>
                  <div>Titik perlu penanganan</div>
                </div>
              </div>
            </div>
          </q-card>
        </Motion>
      </div>
    </section>

    <!-- Section: map -->
    <section class="q-mt-xl shadow-2 map-section">
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
      >
        <div class="row items-stretch">
          <div class="col-12 col-md-4 q-pa-xl left-panel column justify-center">
            <div class="text-subtitle2 text-grey-8">Peta Kondisi Wisata</div>

            <div class="text-h4 text-weight-bold q-mt-sm kondisi-title">
              Pantau Kondisi
              <br />
              Destinasi Secara
              <br />
              <span class="text-primary"> Real-Time </span>
            </div>

            <div class="text-body2 q-mt-md">
              Peta ini menampilkan kondisi terkini destinasi wisata berdasarkan laporan masyarakat
              dan wisatawan secara real-time.
            </div>

            <q-btn
              class="q-mt-sm"
              color="primary"
              no-caps
              rounded
              label="Lihat Peta Selengkapnya"
              icon-right="arrow_forward"
              to="/peta"
            />

        </div>

          <div class="col-12 col-md-8">
            <div class="map-wrapper">
              <div ref="mapContainer" class="map"></div>
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
                      :to="{ path: '/destinasi-detail', query: { name: selectedDest?.name, status: selectedDest?.status } }"
                      v-close-popup
                    />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
          </div>
        </div>
      </Motion>
    </section>

    <!-- Section: cara kerja sistem -->
    <section class="q-px-xl q-py-lg section-cara-kerja">
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
      >
        <q-card flat bordered class="q-pa-lg" style="border-radius: 24px">
          <div class="text-h6 text-weight-bold q-mb-lg">Cara Kerja Sistem</div>
          <div class="row justify-between items-start">
            <template v-for="(step, idx) in caraKerjaSteps" :key="step.number">
              <div class="col-12 col-md text-center q-mb-md">
                <div class="relative-position inline-block">
                  <q-avatar
                    size="90px"
                    :color="step.bgColor"
                    :text-color="step.textColor"
                    :icon="step.icon"
                  />
                  <q-avatar
                    size="32px"
                    color="teal-8"
                    text-color="white"
                    class="text-weight-bold shadow-2"
                    style="font-size: 16px; position: absolute; top: -4px; left: -16px"
                  >
                    {{ step.number }}
                  </q-avatar>
                </div>
                <div class="text-subtitle1 text-weight-bold q-mt-md">{{ step.title }}</div>
                <div class="text-caption q-mt-sm">
                  {{ step.desc }}
                </div>
              </div>

              <div
                v-if="idx < caraKerjaSteps.length - 1"
                :key="'arrow-' + idx"
                class="col-auto self-center gt-sm"
              >
                <q-icon name="more_horiz" size="40px" color="grey-5" />
              </div>
            </template>
          </div>
        </q-card>
      </Motion>
    </section>

    <!-- Section: Laporan Terbaru & Tips -->
    <section class="q-px-xl q-py-lg section-laporan">
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
      >
        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-7">
            <div class="row items-center justify-between q-mb-md">
              <div class="text-h6 text-weight-bold">Laporan Terbaru</div>
              <q-btn
                flat
                no-caps
                color="primary"
                label="Lihat Semua"
                icon-right="chevron_right"
                to="/peta"
              />
            </div>

            <div class="report-scroll-wrapper">
              <div class="report-cards-row">
                <q-card
                  v-for="(report, i) in laporanTerbaru"
                  :key="i"
                  flat
                  bordered
                  class="report-card"
                >
                  <q-img :src="report.img" height="120px" />
                  <q-card-section class="q-pt-sm q-pb-md">
                    <div class="text-subtitle2 text-weight-bold ellipsis">{{ report.lokasi }}</div>
                    <div class="text-caption text-grey-7 q-mt-xs">{{ report.kategori }}</div>
                    <div class="text-caption text-grey-5 q-mt-xs">
                      <q-icon name="schedule" size="12px" /> {{ report.waktu }}
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-5">
            <div class="text-h6 text-weight-bold q-mb-md">Tips Melaporkan</div>
            <div class="tips-list">
              <div v-for="(tip, i) in tipsMelaporkan" :key="i" class="tip-item">
                <q-avatar :color="tip.color" text-color="white" size="36px" :icon="tip.icon" />
                <div class="tip-text">{{ tip.text }}</div>
              </div>
            </div>
          </div>
        </div>
      </Motion>
    </section>

    <!-- Section: CTA Banner -->
    <section class="cta-section q-mb-xl">
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
      >
        <div class="cta-inner">
          <div class="cta-text">
            <div class="text-h4 text-weight-bold cta-title">
              Bersama Kita Bisa Menjaga
              <br />
              Keindahan Danau Toba
            </div>
            <div class="text-body2 cta-subtitle q-mt-sm">
              Setiap laporan dari Anda sangat berarti untuk masa depan Danau Toba yang lebih baik.
            </div>
          </div>
          <div class="cta-action">
            <q-btn
              color="white"
              text-color="primary"
              icon="photo_camera"
              label="Laporkan Kondisi"
              no-caps
              unelevated
              style="border-radius: 14px; font-weight: 700"
              to="/laporkan"
            />
          </div>
          <div class="cta-illustration">
            <q-img src="../../assets/Logo.png" width="160px" fit="contain" />
          </div>
        </div>
      </Motion>
    </section>

    <!-- Footer -->
    <FooterComponent />

    <!-- Component Modal Peta Kondisi Wisata -->
    <MapDialogModal v-model="mapDialogOpen" />
  </q-page>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { Motion } from 'motion-v'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import FooterComponent from '../../components/FooterComponent.vue'
import MapDialogModal from '../../components/MapDialogModal.vue'
import axios from 'axios'

const mapDialogOpen = ref(false)
const mapContainer = ref(null)
const map = ref(null)

const caraKerjaSteps = [
  {
    number: '1',
    bgColor: 'blue-1',
    textColor: 'blue-8',
    icon: 'photo_camera',
    title: 'Ambil & Unggah Foto',
    desc: 'Ambil foto kondisi sampah di tempat wisata yang ingin dilaporkan.',
  },
  {
    number: '2',
    bgColor: 'green-1',
    textColor: 'green-8',
    icon: 'memory',
    title: 'AI Analisis Kondisi',
    desc: 'AI menganalisis foto untuk menentukan tingkat keparahan sampah.',
  },
  {
    number: '3',
    bgColor: 'orange-1',
    textColor: 'orange-8',
    icon: 'place',
    title: 'Lokasi Otomatis',
    desc: 'GPS mendeteksi lokasi secara otomatis saat laporan dibuat.',
  },
  {
    number: '4',
    bgColor: 'purple-1',
    textColor: 'purple-8',
    icon: 'account_balance',
    title: 'Diteruskan ke Pengelola',
    desc: 'Laporan dikirim ke pengelola untuk segera ditindaklanjuti.',
  },
]



const tipsMelaporkan = [
  { icon: 'photo_camera', color: 'teal-7', text: 'Ambil foto yang jelas.' },
  { icon: 'location_on', color: 'teal-7', text: 'Sertakan lokasi yang akurat.' },
  { icon: 'edit', color: 'teal-7', text: 'Berikan deskripsi masalah yang detail.' },
  { icon: 'verified_user', color: 'teal-7', text: 'Laporkan dengan jujur.' },
]

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

const destinationMarkers = ref([])

function resizeMap() {
  map.value?.invalidateSize()
}

function initMap() {
  if (!mapContainer.value) return

  map.value = L.map(mapContainer.value, {
    zoomControl: false,
    attributionControl: false,
    preferCanvas: true,
  }).setView([2.6847, 98.8722], 11)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map.value)

  L.polygon(lakePolygonCoordinates, {
    color: '#e53935',
    weight: 2,
    fillColor: '#93c5fd',
    fillOpacity: 0.35,
  }).addTo(map.value)

  destinationMarkers.value.forEach((d) => {
    let color = 'green'
    let status = d.status || 'Aman'
    if (status === 'Perlu Penanganan' || status === 'Kritis') {
      color = 'red'
      status = 'Perlu Penanganan'
    } else if (status === 'Perlu Perhatian') {
      color = 'orange'
    }

    const hexColor = color === 'red' ? '#e53935' : color === 'orange' ? '#d97706' : '#10b981'

    L.circle([d.latitude, d.longitude], {
      color: hexColor,
      fillColor: hexColor,
      fillOpacity: 0.15,
      weight: 1,
      radius: 1200
    }).addTo(map.value)

    const customIcon = L.divIcon({
      className: 'bg-transparent',
      html: `<svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 0C7.16344 0 0 7.16344 0 16C0 27.2 16 48 16 48C16 48 32 27.2 32 16C32 7.16344 24.8366 0 16 0ZM16 24C11.5817 24 8 20.4183 8 16C8 11.5817 11.5817 8 16 8C20.4183 8 24 11.5817 24 16C24 20.4183 20.4183 24 16 24Z" fill="${hexColor}"/></svg>`,
      iconSize: [32, 48],
      iconAnchor: [16, 48],
      tooltipAnchor: [16, -24]
    })

    const marker = L.marker([d.latitude, d.longitude], { icon: customIcon }).addTo(map.value)

    const badgeClass = color === 'red' ? 'badge-red' : color === 'orange' ? 'badge-orange' : 'badge-green'
    marker.bindTooltip(`<div class="${badgeClass}">${status} - ${d.name}</div>`, {
      permanent: true,
      direction: 'right',
      className: 'ref-map-badge-tooltip'
    })

    marker.on('click', () => {
      selectedDest.value = d
      selectedDestReports.value = mapReports.value.filter(r => {
        if (r.spot_id !== d.id) return false;
        let stat = r.status || 'pending';
        if (stat === 'Selesai' || stat === 'Aman' || stat === 'Ditolak') return false;
        if (stat === 'pending') {
          return r.ai_score >= 0.4;
        }
        return stat === 'Perlu Penanganan' || stat === 'Kritis' || stat === 'Perlu Perhatian';
      })
      showDestModal.value = true
    })
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

    L.circleMarker([r.latitude, r.longitude], {
      radius: 4,
      fillColor: dotColor,
      color: '#ffffff',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.9
    }).addTo(map.value)
  })

  setTimeout(() => {
    map.value?.invalidateSize()
  }, 200)

  window.addEventListener('resize', resizeMap)
}

const stats = ref({
  total_reports: 0,
  cleaned_reports: 0,
  attention_spots: 0,
  critical_spots: 0
})

const laporanTerbaru = ref([])
const destinasiPopuler = ref([])
const showDestModal = ref(false)
const selectedDest = ref(null)
const selectedDestReports = ref([])
const mapReports = ref([])


onMounted(async () => {
  try {
    const res = await axios.get('http://127.0.0.1:5000/api/public/landing')
    stats.value = res.data.stats
    laporanTerbaru.value = res.data.recent_reports
    destinasiPopuler.value = res.data.popular_destinations
  } catch (error) {
    console.error('Failed fetching landing data:', error)
  }

  try {
    const resSpots = await axios.get('http://127.0.0.1:5000/api/spots/')
    destinationMarkers.value = resSpots.data
  } catch (error) {
    console.error('Failed fetching map spots:', error)
  }

  try {
    const resRep = await axios.get('http://127.0.0.1:5000/api/public/reports')
    mapReports.value = resRep.data
  } catch (error) {
    console.error('Failed fetching map reports:', error)
  }

  await nextTick()
  initMap()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeMap)
  if (map.value) {
    map.value.remove()
    map.value = null
  }
})
</script>

<style scoped>
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

.map-section {
  background: white;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  margin: 150px 80px 10px;
  padding: 40px 20px 40px 20px;
}

.section-cara-kerja {
  margin: 10px 35px 10px;
}

.left-panel {
  background: #fff;
}

.legend-wrapper {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}

.map-wrapper {
  position: relative;
  height: 400px;
  overflow: hidden;
  border-radius: 20px;
}

.map {
  width: 100%;
  height: 100%;
  z-index: 1;
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

.destination-card {
  pointer-events: auto;
  position: absolute;
  top: 25px;
  right: 16px;
  width: 260px;
  border-radius: 16px;
  z-index: 1000;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.green {
  background: #3dbe5b;
}
.orange {
  background: #f7a500;
}
.red {
  background: #e53935;
}

.landing-page {
  background: #ffffff;
}

.hero-section {
  position: relative;
  min-height: 560px;
  background-image: url('../../assets/landing_page.png');
  background-size: cover;
  background-position: center;
  padding: 25px 80px 105px;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.88) 0%,
    rgba(255, 255, 255, 0.55) 35%,
    rgba(255, 255, 255, 0) 70%
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.hero-left h1 {
  font-size: 64px;
  line-height: 1.1;
  font-weight: 800;
  color: #08305e;
  margin-bottom: 0;
}

.hero-subtitle {
  font-size: 64px;
  color: #197f70;
  margin-bottom: 0;
}

.hero-left p {
  max-width: 520px;
  line-height: 1.1;
}

.hero-action {
  margin-top: 30px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.map-card {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease;
}

.hero-action .q-btn {
  transition: all 0.25s ease;
}

.hero-action .q-btn:hover {
  transform: translateY(-2px);
}

.map-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.16);
}

.map-card .q-img {
  height: 290px;
}

.stats-wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -130px;
  width: 100%;
  max-width: 1280px;
  padding-left: 80px;
  padding-right: 80px;
  z-index: 3;
}

.stats-card {
  border-radius: 24px;
  padding: 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.stats-grid {
  display: grid;
  grid-template-columns: 260px repeat(3, 1fr);
  gap: 20px;
}

.total-report {
  padding: 12px;
}

.stats-title {
  font-weight: 600;
  margin-bottom: 6px;
}

.stats-number {
  font-size: 54px;
  font-weight: 800;
}

.stats-label {
  font-size: 24px;
  font-weight: 700;
}

.status-box {
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 18px;
  padding: 12px;
}

.success {
  background: #dff8e5;
  color: #18a558;
}
.warning {
  background: #fff0d8;
  color: #f39c12;
}
.danger {
  background: #ffe1e1;
  color: #e53935;
}

.status-number {
  font-size: 32px;
  font-weight: 700;
}

.section-laporan {
  margin: 10px 35px 10px;
}

.report-scroll-wrapper {
  overflow-x: auto;
  padding-bottom: 8px;
}

.report-cards-row {
  display: flex;
  gap: 16px;
  min-width: max-content;
}

.report-card {
  width: 200px;
  flex-shrink: 0;
  border-radius: 16px;
  overflow: hidden;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.report-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.tips-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #f0faf7;
  border-radius: 14px;
  padding: 12px 16px;
}

.tip-text {
  font-size: 14px;
  color: #374151;
}

.cta-section {
  border-radius: 24px;
  overflow: hidden;
  background: linear-gradient(135deg, #0d4f3c 0%, #197f70 60%, #1da88c 100%);
  position: relative;
  margin: 0 0 32px;
}

.cta-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 48px 60px;
  flex-wrap: wrap;
}

.cta-title {
  color: #ffffff;
  line-height: 1.2;
}

.cta-subtitle {
  color: rgba(255, 255, 255, 0.8);
}

.cta-text {
  flex: 1;
  min-width: 260px;
}

.cta-action {
  flex-shrink: 0;
}

.cta-illustration {
  position: absolute;
  bottom: 0;
  right: 200px;
  opacity: 0.18;
  pointer-events: none;
}

@media (max-width: 1200px) {
  .hero-section {
    padding: 40px 40px 210px;
  }

  .hero-left h1,
  .hero-subtitle {
    font-size: 52px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .total-report {
    grid-column: span 2;
  }

  .stats-wrapper {
    bottom: -260px;
    padding-left: 40px;
    padding-right: 40px;
  }

  .map-section {
    margin: 290px 40px 10px;
  }

  .section-cara-kerja {
    margin: 10px 20px;
  }

  .section-laporan {
    margin: 10px 20px;
  }

  .cta-section {
    margin: 0 20px 32px;
  }
}

@media (max-width: 1024px) {
  .hero-section {
    padding: 25px 20px 60px;
    min-height: auto;
  }
  .hero-right {
    display: none;
  }
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 30px;
  }
  .hero-left h1,
  .hero-subtitle {
    font-size: 42px;
  }
  .hero-left p {
    margin: 16px auto;
  }
  .hero-action {
    justify-content: center;
  }
  .stats-wrapper {
    position: relative;
    bottom: auto;
    left: auto;
    transform: none;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 40px;
  }
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .map-section {
    margin: 40px 20px 10px;
    padding: 20px 10px;
  }
  .section-cara-kerja, .section-laporan {
    margin: 10px 20px 10px;
    padding-left: 0;
    padding-right: 0;
  }
  .cta-section {
    margin: 0 20px 32px;
  }
  .map-wrapper {
    height: 350px;
  }
  .destination-card {
    position: relative;
    top: auto;
    right: auto;
    width: 100%;
    margin-top: 10px;
  }
}

@media (max-width: 900px) {
  .cta-inner {
    padding: 36px 32px;
  }

  .cta-illustration {
    display: none;
  }

  .section-cara-kerja .row > .col {
    flex: 0 0 50%;
    max-width: 50%;
    margin-bottom: 24px;
  }

  .section-cara-kerja .row > .col-auto {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 24px 20px 40px;
  }

  .hero-overlay {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.92) 0%,
      rgba(255, 255, 255, 0.8) 60%,
      rgba(255, 255, 255, 0.1) 100%
    );
  }

  .hero-left {
    text-align: center;
  }

  .hero-left h1 {
    font-size: 38px;
  }

  .hero-subtitle {
    font-size: 38px;
  }

  .hero-left p {
    max-width: 100%;
    line-height: 1.6;
  }

  .hero-action {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-action .q-btn {
    width: 100%;
  }

  .map-card .q-img {
    height: 200px;
  }

  .stats-wrapper {
    padding-left: 16px;
    padding-right: 16px;
    margin-top: 20px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .total-report {
    grid-column: auto;
    text-align: center;
  }

  .stats-number {
    font-size: 42px;
  }

  .stats-label {
    font-size: 20px;
  }

  .status-box {
    flex-direction: row;
    text-align: left;
    gap: 14px;
  }

  .map-section {
    margin: 40px 12px 10px;
    padding: 20px 12px;
    border-radius: 16px;
  }

  .map-wrapper {
    height: 280px;
  }

  .destination-card {
    display: none;
  }

  .section-cara-kerja .row > .col {
    flex: 0 0 100%;
    max-width: 100%;
    margin-bottom: 20px;
  }

  .section-cara-kerja .row > .col-auto {
    display: none;
  }

  .section-cara-kerja {
    margin: 10px 12px;
  }

  .section-laporan {
    margin: 10px 12px;
  }

  .cta-section {
    margin: 0 12px 24px;
    border-radius: 18px;
  }

  .cta-inner {
    padding: 32px 24px;
    gap: 24px;
  }

  .cta-text {
    min-width: unset;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 20px 16px 40px;
  }

  .hero-left h1 {
    font-size: 32px;
  }

  .hero-subtitle {
    font-size: 32px;
  }

  .hero-left p {
    font-size: 14px;
  }

  .stats-wrapper {
    padding-left: 12px;
    padding-right: 12px;
    margin-top: 20px;
  }

  .stats-card {
    padding: 14px;
  }

  .status-number {
    font-size: 28px;
  }

  .stats-number {
    font-size: 36px;
  }

  .stats-label {
    font-size: 18px;
  }

  .map-section {
    margin: 40px 8px 10px;
    padding: 14px 8px;
  }

  .map-wrapper {
    height: 240px;
  }

  .cta-inner {
    padding: 28px 20px;
  }

  .cta-title {
    font-size: 22px;
  }
}
</style>
