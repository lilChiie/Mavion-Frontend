<template>
  <q-page class="landing-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>

      <div class="hero-content">
        <Motion
          :initial="{ opacity: 0, y: 30 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8 }"
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
              />

              <q-btn
                color="white"
                text-color="primary"
                icon="map"
                label="Lihat Peta Wisata"
                no-caps
                unelevated
                style="border-radius: 12px"
              />
            </div>
          </div>
        </Motion>
        <Motion
          :initial="{ opacity: 0, x: 40 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{
            duration: 0.8,
            delay: 0.2,
          }"
        >
          <div class="hero-right">
            <q-card flat class="map-card">
              <q-img src="../assets/peta.png" fit="cover"> </q-img>
            </q-card>
          </div>
        </Motion>
      </div>

      <div class="stats-wrapper">
        <q-card flat class="stats-card">
          <div class="stats-grid">
            <div class="total-report">
              <div class="stats-title">Statistik Real Time</div>

              <div class="stats-number">90</div>

              <div class="stats-label">Laporan Masuk</div>
            </div>

            <div class="status-box success">
              <q-icon name="check_circle" size="32px" />
              <div>
                <div class="status-number">30</div>
                <div>Laporan telah ditindaklanjuti</div>
              </div>
            </div>

            <div class="status-box warning">
              <q-icon name="warning" size="32px" />
              <div>
                <div class="status-number">30</div>
                <div>Laporan perlu perhatian</div>
              </div>
            </div>

            <div class="status-box danger">
              <q-icon name="report_problem" size="32px" />
              <div>
                <div class="status-number">30</div>
                <div>Laporan perlu penanganan</div>
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </section>

    <!-- Section: map -->
    <section class="q-mt-xl shadow-2 map-section">
      <div class="row items-stretch">
        <div class="col-12 col-md-4 q-pa-sm left-panel">
          <div class="text-subtitle2 text-grey-8">Peta Kondisi Wisata</div>

          <div class="text-h4 text-weight-bold q-mt-sm kondisi-title">
            Pantau Kondisi
            <br />
            Destinasi Secara
            <br />
            <span class="text-primary"> Real-Time </span>
          </div>

          <div class="text-body2 q-mt-md">
            Peta ini menampilkan kondisi terkini destinasi wisata berdasarkan laporan masyarakat dan
            wisatawan secara real-time.
          </div>

          <q-btn
            class="q-mt-sm"
            color="primary"
            no-caps
            rounded
            label="Lihat Peta Selengkapnya"
            icon-right="arrow_forward"
          />

          <div class="row q-col-gutter-sm q-mt-md q-pa-sm legend-wrapper">
            <div class="col-auto">
              <div class="legend-item">
                <span class="dot green"></span>
                Aman
              </div>
            </div>

            <div class="col-auto">
              <div class="legend-item">
                <span class="dot orange"></span>
                Perlu Perhatian
              </div>
            </div>

            <div class="col-auto">
              <div class="legend-item">
                <span class="dot red"></span>
                Perlu Penanganan
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-8">
          <div class="map-wrapper">
            <div ref="mapContainer" class="map"></div>
            <q-card class="destination-card">
              <q-img src="https://picsum.photos/400/200" height="100px" />

              <q-card-section>
                <div class="text-subtitle1 text-weight-bold">Pantai Batu Hoda</div>
                <div class="text-caption text-orange">● Perlu Perhatian</div>
                <div class="text-caption text-grey">3 laporan terbaru</div>
                <div class="row q-col-gutter-sm q-mt-sm">
                  <div class="col">
                    <q-img src="https://picsum.photos/100/100" ratio="1" height="80px" />
                  </div>
                  <div class="col">
                    <q-img src="https://picsum.photos/101/100" ratio="1" height="80px" />
                  </div>
                </div>

                <q-btn
                  class="full-width q-mt-sm"
                  outline
                  rounded
                  color="primary"
                  label="Lihat Detail"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- Section: cara kerja sistem -->
    <section class="q-px-xl q-py-lg section-cara-kerja">
      <q-card flat bordered class="q-pa-lg" style="border-radius: 24px">
        <div class="text-h6 text-weight-bold q-mb-lg">Cara Kerja Sistem</div>
        <div class="row justify-between items-start">
          <div class="col text-center">
            <q-badge rounded color="primary" label="1" class="q-mb-sm" />
            <q-avatar size="90px" color="blue-1" text-color="blue-8" icon="photo_camera" />
            <div class="text-subtitle1 text-weight-bold q-mt-md">Ambil & Unggah Foto</div>
            <div class="text-caption q-mt-sm">
              Ambil foto kondisi sampah di tempat wisata yang ingin dilaporkan.
            </div>
          </div>

          <div class="col-auto self-center">
            <q-icon name="more_horiz" size="40px" color="grey-5" />
          </div>

          <div class="col text-center">
            <q-badge rounded color="primary" label="2" class="q-mb-sm" />
            <q-avatar size="90px" color="green-1" text-color="green-8" icon="memory" />
            <div class="text-subtitle1 text-weight-bold q-mt-md">AI Analisis Kondisi</div>
            <div class="text-caption q-mt-sm">
              AI menganalisis foto untuk menentukan tingkat keparahan sampah.
            </div>
          </div>
          <div class="col-auto self-center">
            <q-icon name="more_horiz" size="40px" color="grey-5" />
          </div>

          <div class="col text-center">
            <q-badge rounded color="primary" label="3" class="q-mb-sm" />

            <q-avatar size="90px" color="orange-1" text-color="orange-8" icon="place" />

            <div class="text-subtitle1 text-weight-bold q-mt-md">Lokasi Otomatis</div>

            <div class="text-caption q-mt-sm">
              GPS mendeteksi lokasi secara otomatis saat laporan dibuat.
            </div>
          </div>

          <div class="col-auto self-center">
            <q-icon name="more_horiz" size="40px" color="grey-5" />
          </div>

          <div class="col text-center">
            <q-badge rounded color="primary" label="4" class="q-mb-sm" />

            <q-avatar size="90px" color="purple-1" text-color="purple-8" icon="account_balance" />

            <div class="text-subtitle1 text-weight-bold q-mt-md">Diteruskan ke Pengelola</div>

            <div class="text-caption q-mt-sm">
              Laporan dikirim ke pengelola untuk segera ditindaklanjuti.
            </div>
          </div>
        </div>
      </q-card>
    </section>

    <!-- Section: Laporan Terbaru & Tips -->
    <section class="q-px-xl q-py-lg section-laporan">
      <div class="row q-col-gutter-xl">
        <div class="col-12 col-md-7">
          <div class="row items-center justify-between q-mb-md">
            <div class="text-h6 text-weight-bold">Laporan Terbaru</div>
            <q-btn flat no-caps color="primary" label="Lihat Semua" icon-right="chevron_right" />
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
    </section>

    <!-- Section: CTA Banner -->
    <section class="cta-section q-mx-xl q-mb-xl">
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
          />
        </div>
        <div class="cta-illustration">
          <q-img src="../assets/Logo.png" width="160px" fit="contain" />
        </div>
      </div>
    </section>

    <!-- Footer -->
    <FooterComponent />
  </q-page>
</template>

<script setup>
import FooterComponent from '../components/FooterComponent.vue'
import { Motion } from 'motion-v'
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const laporanTerbaru = [
  {
    img: 'https://picsum.photos/seed/toba1/400/200',
    lokasi: 'Pantai Batu Hoda',
    kategori: 'Sampah Menumpuk',
    waktu: '2 jam lalu',
  },
  {
    img: 'https://picsum.photos/seed/toba2/400/200',
    lokasi: 'Pantai Batu Hoda',
    kategori: 'Sampah Menumpuk',
    waktu: '2 jam lalu',
  },
  {
    img: 'https://picsum.photos/seed/toba3/400/200',
    lokasi: 'Pantai Batu Hoda',
    kategori: 'Sampah Menumpuk',
    waktu: '2 jam lalu',
  },
  {
    img: 'https://picsum.photos/seed/toba4/400/200',
    lokasi: 'Pantai Simanindo',
    kategori: 'Limbah Cair',
    waktu: '5 jam lalu',
  },
]

const tipsMelaporkan = [
  { icon: 'photo_camera', color: 'teal-7', text: 'Ambil foto yang jelas.' },
  { icon: 'location_on', color: 'teal-7', text: 'Sertakan lokasi yang akurat.' },
  { icon: 'edit', color: 'teal-7', text: 'Berikan deskripsi masalah yang detail.' },
  { icon: 'verified_user', color: 'teal-7', text: 'Laporkan dengan jujur.' },
]

const mapContainer = ref(null)
const map = ref(null)

onMounted(async () => {
  await nextTick()

  if (!mapContainer.value) return

  map.value = L.map(mapContainer.value, {
    zoomControl: false,
    attributionControl: false,
    preferCanvas: true,
  }).setView([2.6847, 98.8722], 11)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map.value)

  setTimeout(() => {
    map.value.invalidateSize()
  }, 200)

  window.addEventListener('resize', resizeMap)
})

function resizeMap() {
  map.value?.invalidateSize()
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeMap)

  if (map.value) {
    map.value.remove()
    map.value = null
  }
})
</script>

<style scoped>
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
  background-image: url('../assets/landing_page.png');
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

  /* stats card: 2 columns (total-report spans both) → 2 rows of status → ~270px */
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

  .site-footer {
    padding: 48px 40px 24px;
  }
}

@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .hero-left h1,
  .hero-subtitle {
    font-size: 44px;
  }
}

@media (max-width: 900px) {
  .footer-inner {
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }

  .cta-inner {
    padding: 36px 32px;
  }

  .cta-illustration {
    display: none;
  }

  .site-footer {
    padding: 36px 24px 20px;
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
    padding: 24px 20px 510px;
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
    bottom: -460px;
    padding-left: 16px;
    padding-right: 16px;
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
    margin: 480px 12px 10px;
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
    padding: 20px 16px 560px;
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
    bottom: -510px;
    padding-left: 12px;
    padding-right: 12px;
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
    margin: 530px 8px 10px;
    padding: 14px 8px;
  }

  .map-wrapper {
    height: 240px;
  }

  .footer-inner {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .site-footer {
    padding: 28px 16px 16px;
  }

  .cta-inner {
    padding: 28px 20px;
  }

  .cta-title {
    font-size: 22px;
  }
}
</style>
