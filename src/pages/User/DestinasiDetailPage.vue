<template>
  <q-page class="destinasi-detail-page bg-grey-1">
    <div class="hero-container relative-position full-width">
      <q-img :src="heroImage" class="absolute-full hero-bg-img" fit="cover" />

      <div class="row no-wrap full-height relative-position hero-content">
        <Motion
          class="col-12 col-md-5 hero-left column justify-between q-pa-xl"
          :initial="{ opacity: 0, x: -20 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.6, ease: 'easeOut' }"
        >
          <div>
            <q-btn
              flat
              no-caps
              dense
              color="grey-8"
              icon="chevron_left"
              label="Kembali"
              class="q-mb-md cursor-pointer text-weight-medium"
              @click="goBack"
            />
            <div class="text-h3 text-weight-bolder text-grey-9 q-mb-xs title-text">
              {{ destName }}
            </div>
            <div class="q-mb-md">
              <q-chip
                dense
                unremovable
                class="status-chip text-weight-bold q-px-sm"
                :class="destStatusColor"
              >
                ● {{ destStatus }}
              </q-chip>
            </div>
            <div class="text-body1 text-grey-8 description-text">
              {{ destDescription }}
            </div>
          </div>

          <div class="q-mt-xl">
            <q-btn
              unelevated
              rounded
              color="teal-8"
              icon="photo_camera"
              label="Laporkan Kondisi"
              class="btn-report text-weight-bold q-px-lg q-py-sm"
              no-caps
              :to="{ path: '/laporkan', query: { spot_id: spotId } }"
            />
          </div>
        </Motion>

        <div class="col-12 col-md-7 hero-right relative-position column justify-end">
          <div v-if="galleryList.length > 0" class="carousel-overlay full-width row items-center justify-end q-pa-md gap-sm">
            <div class="marquee-container overflow-hidden full-width">
              <div class="marquee-track">
                <div class="marquee-content" v-for="n in 12" :key="n">
                  <q-img
                    v-for="item in galleryList"
                    :key="item.id"
                    :src="item.src"
                    width="120px"
                    height="80px"
                    fit="cover"
                    class="gallery-thumb"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="main-content q-py-xl q-px-lg">
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.15, ease: 'easeOut' }"
        class="q-mb-xl"
      >
        <div>
          <div class="text-h6 text-weight-bold text-grey-9 q-mb-md">Indeks Kebersihan</div>
          <q-card flat bordered class="kebersihan-card q-pa-lg shadow-1">
            <div class="row items-center q-col-gutter-lg">
              <div class="col-12 col-md-6 row items-center gap-md q-gutter-x-md">
                <div class="circular-progress-wrapper relative-position flex flex-center">
                  <q-circular-progress
                    show-value
                    font-size="18px"
                    :value="avgIndeksKebersihan"
                    size="110px"
                    :thickness="0.15"
                    color="teal-8"
                    track-color="teal-1"
                    class="text-weight-bolder text-grey-9"
                  >
                    <div class="column items-center">
                      <div class="text-h5 text-weight-bolder text-grey-9 line-height-tight">
                        {{ avgIndeksKebersihan }}%
                      </div>
                      <div class="text-caption text-grey-7 text-weight-medium">{{ avgIndeksLabel }}</div>
                    </div>
                  </q-circular-progress>
                </div>

                <div class="col overflow-hidden">
                  <div class="text-subtitle2 text-teal-8 text-weight-bold">Insight AI:</div>
                  <div class="text-subtitle1 text-weight-bold text-teal-10 q-my-xs">
                    Destinasi ini dalam kondisi {{ avgIndeksLabel.toLowerCase() }}.
                  </div>
                  <div class="text-caption text-grey-6 q-mb-sm">
                    Indeks gabungan dari analisis visual (YOLO) & sentimen pengunjung.
                  </div>
                  <div class="dual-ikd-wrapper">
                    <div class="dual-ikd-row">
                      <span class="dual-ikd-label text-caption text-weight-bold text-grey-7"
                        >Visual AI</span
                      >
                      <q-linear-progress
                        :value="visualAiScore / 100"
                        color="teal-8"
                        track-color="teal-1"
                        rounded
                        size="8px"
                        class="dual-ikd-bar"
                      />
                      <span class="text-caption text-weight-bolder text-teal-9">{{ visualAiScore }}%</span>
                    </div>
                    <div class="dual-ikd-row">
                      <span class="dual-ikd-label text-caption text-weight-bold text-grey-7"
                        >Sentimen</span
                      >
                      <q-linear-progress
                        :value="sentimentScore / 100"
                        color="blue-6"
                        track-color="blue-1"
                        rounded
                        size="8px"
                        class="dual-ikd-bar"
                      />
                      <span class="text-caption text-weight-bolder text-blue-8">{{ sentimentScore }}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6 row q-col-gutter-md">
                <div class="col-6">
                  <div class="metric-box metric-blue q-pa-md column justify-between">
                    <div class="row items-center justify-between q-mb-sm">
                      <q-icon
                        name="description"
                        color="primary"
                        size="24px"
                        class="metric-icon bg-blue-1"
                      />
                    </div>
                    <div>
                      <div class="text-h4 text-weight-bolder text-grey-9">{{ totalLaporan }}</div>
                      <div class="text-subtitle2 text-weight-bold text-grey-9">Total Laporan</div>
                      <div class="text-caption text-grey-6">Di destinasi ini</div>
                    </div>
                  </div>
                </div>

                <div class="col-6">
                  <div class="metric-box metric-orange q-pa-md column justify-between">
                    <div class="row items-center justify-between q-mb-sm">
                      <q-icon
                        name="warning"
                        color="orange-9"
                        size="24px"
                        class="metric-icon bg-orange-1"
                      />
                    </div>
                    <div>
                      <div class="text-h4 text-weight-bolder text-grey-9">{{ perluPerhatianCount }}</div>
                      <div class="text-subtitle2 text-weight-bold text-grey-9">Perlu Perhatian</div>
                      <div class="text-caption text-grey-6">Menunggu penanganan</div>
                    </div>
                  </div>
                </div>

                <div class="col-6">
                  <div class="metric-box metric-green q-pa-md column justify-between">
                    <div class="row items-center justify-between q-mb-sm">
                      <q-icon
                        name="check_circle"
                        color="teal-8"
                        size="24px"
                        class="metric-icon bg-teal-1"
                      />
                    </div>
                    <div>
                      <div class="text-h4 text-weight-bolder text-grey-9">{{ selesaiCount }}</div>
                      <div class="text-subtitle2 text-weight-bold text-grey-9">Selesai</div>
                      <div class="text-caption text-grey-6">Telah dibersihkan</div>
                    </div>
                  </div>
                </div>

                <div class="col-6">
                  <div class="metric-box metric-purple q-pa-md column justify-between">
                    <div class="row items-center justify-between q-mb-sm">
                      <q-icon
                        name="sentiment_satisfied"
                        color="deep-purple-8"
                        size="24px"
                        class="metric-icon bg-deep-purple-1"
                      />
                    </div>
                    <div>
                      <div class="text-h4 text-weight-bolder text-grey-9">{{ sentimentScore }}%</div>
                      <div class="text-subtitle2 text-weight-bold text-grey-9">Sentimen</div>
                      <div class="text-caption text-grey-6">Positif pengunjung</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </Motion>

      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.25, ease: 'easeOut' }"
      >
        <div class="q-mb-xl">
          <div class="text-h6 text-weight-bold text-grey-9 q-mb-md">
            Laporan Terbaru di Destinasi Ini
          </div>
          <q-card flat bordered class="laporan-card shadow-1 overflow-hidden">
            <q-list separator>
              <q-item
                v-for="(report, index) in reportsList.slice(0, 5)"
                :key="index"
                class="q-py-md q-px-lg items-center gap-md cursor-pointer q-gutter-x-md report-item"
                clickable
                @click="openReportDetailModal(report)"
              >
                <q-img
                  :src="report.img"
                  width="150px"
                  height="90px"
                  fit="cover"
                  class="report-img"
                />
                <q-item-section>
                  <q-item-label class="text-subtitle1 text-weight-bold text-grey-9 q-mb-xs">
                    {{ report.time }}
                  </q-item-label>
                  <q-item-label caption>
                    <q-chip
                      dense
                      size="sm"
                      class="text-weight-bold q-px-sm"
                      :class="getStatusChipClass(report.status)"
                    >
                      ● {{ report.status }}
                    </q-chip>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </Motion>

      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.25, ease: 'easeOut' }"
        class="q-mb-xl"
      >
        <div>
          <div class="text-h6 text-weight-bold text-grey-9 q-mb-md">
            <q-icon name="trending_up" color="teal-8" size="24px" class="q-mr-xs" />
            Tren Sentimen & Kebersihan
          </div>
          <q-card flat bordered class="kebersihan-card q-pa-lg shadow-1">
            <div class="row items-center justify-between q-mb-sm">
              <div class="text-caption text-grey-6">
                Perbandingan skor Visual AI dan Sentimen pengunjung dalam 6 bulan terakhir
              </div>
              <q-chip dense class="bg-teal-1 text-teal-9 text-weight-bold" style="font-size: 11px">
                <q-icon name="auto_awesome" size="14px" class="q-mr-xs" /> AI Tracked
              </q-chip>
            </div>
            <VueApexCharts
              type="area"
              height="220"
              :options="trendChartOptions"
              :series="trendChartSeries"
            />
          </q-card>
        </div>
      </Motion>

      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.2, ease: 'easeOut' }"
        class="q-mb-xl"
      >
        <div>
          <div class="row items-center justify-between q-mb-md">
            <div class="text-h6 text-weight-bold text-grey-9">
              <q-icon name="analytics" color="teal-8" size="24px" class="q-mr-xs" />
              Analisis Sentimen Pengunjung
            </div>
            <q-chip dense class="bg-blue-1 text-blue-9 text-weight-bold q-px-sm">
              {{ sentimentReviews.length }} Review Dianalisis
            </q-chip>
          </div>

          <q-card flat bordered class="kebersihan-card q-pa-lg shadow-1">
            <div class="q-mb-lg">
              <div class="text-subtitle2 text-weight-bold text-grey-8 q-mb-sm">
                Distribusi Sentimen
              </div>
              <VueApexCharts
                type="bar"
                height="80"
                :options="sentimentBarOptions"
                :series="sentimentBarSeries"
              />
              <div class="row items-center justify-center q-gutter-x-md q-mt-sm">
                <div class="row items-center q-gutter-x-sm">
                  <span class="sentiment-dot bg-teal-6"></span>
                  <span class="text-caption text-weight-bold text-grey-7">Positif ({{ positivePercent }}%)</span>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <span class="sentiment-dot bg-amber-6"></span>
                  <span class="text-caption text-weight-bold text-grey-7">Netral ({{ neutralPercent }}%)</span>
                </div>
                <div class="row items-center q-gutter-x-sm">
                  <span class="sentiment-dot bg-red-5"></span>
                  <span class="text-caption text-weight-bold text-grey-7">Negatif ({{ negativePercent }}%)</span>
                </div>
              </div>
            </div>

            <q-separator color="grey-3" class="q-mb-lg" />

            <div class="q-mb-lg">
              <div class="text-subtitle2 text-weight-bold text-grey-8 q-mb-md">
                Sentimen per Aspek
              </div>
              <div class="row q-col-gutter-md">
                <div v-for="(aspect, idx) in aspectSentiments" :key="idx" class="col-6 col-sm-3">
                  <div class="aspect-card q-pa-md" :class="'aspect-' + aspect.theme">
                    <div class="row items-center gap-sm q-mb-sm q-gutter-x-sm">
                      <q-icon :name="aspect.icon" :color="aspect.color" size="20px" />
                      <span class="text-caption text-weight-bold text-grey-8">{{
                        aspect.name
                      }}</span>
                    </div>
                    <div class="text-h5 text-weight-bolder text-grey-9 q-mb-xs">
                      {{ aspect.score }}%
                    </div>
                    <q-linear-progress
                      :value="aspect.score / 100"
                      :color="aspect.color"
                      :track-color="aspect.trackColor"
                      rounded
                      size="6px"
                    />
                  </div>
                </div>
              </div>
            </div>

            <q-separator color="grey-3" class="q-mb-lg" />

            <div>
              <div class="row items-center justify-between q-mb-md">
                <div class="text-subtitle2 text-weight-bold text-grey-8">
                  Review Terbaru Pengunjung
                </div>
              </div>

              <div class="column gap-sm">
                <div
                  v-for="(review, idx) in sentimentReviews.slice(0, 10)"
                  :key="idx"
                  class="review-item q-pa-md"
                >
                  <div class="row items-start gap-md">
                    <div class="col">
                      <div class="row items-center justify-between q-mb-xs">
                        <div>
                          <span class="text-subtitle2 text-weight-bold text-grey-9">{{
                            review.name
                          }}</span>
                          <span class="text-caption text-grey-5 q-ml-sm">{{ review.date }}</span>
                        </div>
                        <q-chip
                          dense
                          :class="review.sentimentClass"
                          class="text-weight-bold q-px-sm"
                          style="font-size: 11px"
                        >
                          {{ review.sentimentLabel }}
                        </q-chip>
                      </div>
                      <div class="row items-center gap-xs q-mb-xs">
                        <!-- Rating removed -->
                      </div>
                      <div class="text-body2 text-grey-7" style="line-height: 1.6">
                        {{ review.text }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <q-separator color="grey-3" class="q-my-lg" />

            <div>
              <div class="text-subtitle2 text-weight-bold text-grey-8 q-mb-md">
                <q-icon name="rate_review" color="teal-8" size="20px" class="q-mr-xs" />
                Tulis Review Anda
              </div>
              <div class="review-form-card q-pa-lg">
                <q-input
                  v-model="reviewForm.name"
                  outlined
                  dense
                  placeholder="Nama / Panggilan Anda"
                  class="bg-white q-mb-md"
                  :rules="[(val) => !!val || 'Masukkan nama Anda']"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" color="grey-6" />
                  </template>
                </q-input>

                <q-input
                  v-model="reviewForm.text"
                  type="textarea"
                  rows="3"
                  outlined
                  dense
                  placeholder="Ceritakan pengalaman Anda tentang kebersihan, fasilitas, atau kondisi destinasi ini..."
                  class="bg-white q-mb-md"
                  :rules="[(val) => !!val || 'Tulis review Anda']"
                />

                <div class="row items-center justify-between">
                  <div class="text-caption text-grey-5">
                    <q-icon name="lock_open" size="14px" class="q-mr-xs" />
                    Tidak perlu login — review Anda anonim
                  </div>
                  <q-btn
                    unelevated
                    rounded
                    color="teal-8"
                    icon="send"
                    label="Kirim Review"
                    no-caps
                    class="text-weight-bold q-px-lg"
                    :disabled="!reviewForm.name || !reviewForm.text"
                    :loading="submittingReview"
                    @click="submitReview"
                  />
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </Motion>
    </div>

    <q-dialog v-model="reportModalOpen">
      <q-card v-if="selectedReport" style="width: 520px; border-radius: 20px" class="q-pa-lg">
        <div class="row items-center justify-between q-mb-md">
          <div>
            <div class="text-subtitle2 text-teal-8 text-weight-bold">ID Laporan: {{ selectedReport.id || 'N/A' }}</div>
            <div class="text-h6 text-weight-bold text-grey-9">{{ destName }}</div>
          </div>
          <q-btn icon="close" flat round dense v-close-popup />
        </div>

        <q-img
          :src="selectedReport.img"
          height="220px"
          fit="cover"
          class="rounded-borders q-mb-md shadow-1"
        />
        
        <div class="q-mb-md">
          <div class="text-subtitle2 text-weight-bold text-grey-8 q-mb-xs">Status Penanganan</div>
          <q-chip
            dense
            class="text-weight-bold q-px-sm"
            :class="getStatusChipClass(selectedReport.status)"
          >
            ● {{ selectedReport.status }}
          </q-chip>
          <div class="text-caption text-grey-6 q-mt-xs">
            Dilaporkan pada: {{ selectedReport.time }}
          </div>
        </div>

        <div class="bg-teal-1 q-pa-md rounded-borders q-mb-md">
          <div class="row items-center gap-xs q-mb-xs">
            <q-icon name="memory" color="teal-9" size="20px" />
            <div class="text-subtitle2 text-weight-bold text-teal-10">
              Hasil Analisis Computer Vision
            </div>
          </div>
          <div class="text-caption text-teal-9">
            Tingkat Akurasi AI: <b>{{ selectedReport.aiConfidence }}</b>
          </div>
          <div class="text-caption text-teal-9 q-mt-xs">
            Estimasi Keparahan: <b>{{ selectedReport.severity }}</b>
          </div>
        </div>

        <div v-if="selectedReport.adminNotes" class="bg-amber-1 q-pa-md rounded-borders q-mb-md">
          <div class="row items-center gap-xs q-mb-xs">
            <q-icon name="notes" color="amber-9" size="20px" />
            <div class="text-subtitle2 text-weight-bold text-amber-10">
              Catatan Petugas
            </div>
          </div>
          <div class="text-caption text-amber-9" style="white-space: pre-line;">
            {{ selectedReport.adminNotes }}
          </div>
        </div>
      </q-card>
    </q-dialog>

    <ReviewSuccessModal
      v-model="reviewSuccessModal"
      :sentiment="lastSubmittedSentiment"
      :text="lastSubmittedText"
    />

    <FooterComponent />
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Motion } from 'motion-v'
import VueApexCharts from 'vue3-apexcharts'
import axios from 'axios'
import FooterComponent from '../../components/FooterComponent.vue'
import ReviewSuccessModal from '../../components/ReviewSuccessModal.vue'

const route = useRoute()
const router = useRouter()

const spotId = ref(null)


const destName = computed(() => route.query.name || 'Pantai Batu Hoda')
const destStatus = ref('Perlu Perhatian')
const destStatusColor = computed(() => {
  const status = destStatus.value.toLowerCase()
  if (status.includes('aman')) return 'bg-green-1 text-green-9'
  if (status.includes('perlu penanganan')) return 'bg-red-1 text-red-9'
  if (status.includes('perlu perhatian')) return 'bg-orange-1 text-orange-9'
  return 'bg-grey-1 text-grey-9'
})
const destDescription = ref('Deskripsi destinasi akan muncul di sini.')
const heroImage = ref('https://picsum.photos/seed/toba1/1200/600')
let slideInterval = null
const galleryList = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://127.0.0.1:5000/api/spots/')
    const spots = res.data
    const spot = spots.find(s => s.name === destName.value)
    if (spot) {
      spotId.value = spot.id
      if (spot.status) {
        destStatus.value = spot.status
      }
      if (spot.description) {
        destDescription.value = spot.description
      }
      if (spot.img) {
        heroImage.value = spot.img
      }
      fetchSpotDetails(spot.id)
      fetchReviews()
    }
  } catch (err) {
    console.error('Gagal mengambil data destinasi:', err)
  }
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
})

const aspectSentimentsData = ref({
  kebersihan: 0,
  fasilitas: 0,
  pengelolaan: 0,
  keamanan: 0
})

const aspectSentiments = computed(() => [
  { name: 'Kebersihan', icon: 'cleaning_services', score: aspectSentimentsData.value.kebersihan, color: 'orange-8', trackColor: 'orange-1', theme: 'orange' },
  { name: 'Fasilitas', icon: 'chair', score: aspectSentimentsData.value.fasilitas, color: 'teal-8', trackColor: 'teal-1', theme: 'teal' },
  { name: 'Pengelolaan', icon: 'manage_accounts', score: aspectSentimentsData.value.pengelolaan, color: 'orange-8', trackColor: 'orange-1', theme: 'orange' },
  { name: 'Keamanan', icon: 'shield', score: aspectSentimentsData.value.keamanan, color: 'teal-8', trackColor: 'teal-1', theme: 'teal' },
])

async function fetchReviews() {
  if (!spotId.value) return
  try {
    const res = await axios.get('http://127.0.0.1:5000/api/reviews/' + spotId.value)
    
    if (res.data.aspect_sentiments) {
      aspectSentimentsData.value = res.data.aspect_sentiments
    }
    
    sentimentReviews.value = res.data.reviews.map(r => {
      let color = 'amber-8'
      let chipClass = 'bg-amber-1 text-amber-9'
      let label = '● Netral'
      
      if (r.sentiment_label === 'Positif') {
        color = 'teal-7'
        chipClass = 'bg-teal-1 text-teal-9'
        label = '● Positif'
      } else if (r.sentiment_label === 'Negatif') {
        color = 'red-5'
        chipClass = 'bg-red-1 text-red-9'
        label = '● Negatif'
      }

      const initials = (r.reviewer_name || 'Anonim').split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
      
      const date = new Date(r.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
      
      return {
        name: r.reviewer_name,
        initials: initials,
        avatarColor: color,
        text: r.text,
        date: date,
        sentimentLabel: label,
        sentimentClass: chipClass,
      }
    })
  } catch (err) {
    console.error('Gagal mengambil reviews:', err)
  }
}

const reportsList = ref([])

const reportModalOpen = ref(false)
const selectedReport = ref(null)

const mapBackendStatus = (status) => {
  if (status === 'pending') return 'Perlu Penanganan'
  if (status === 'cleaned') return 'Selesai'
  if (status === 'Perlu Penanganan') return 'Perlu Penanganan'
  if (status === 'Perlu Perhatian') return 'Perlu Perhatian'
  if (status === 'Selesai') return 'Selesai'
  return status || 'Perlu Penanganan'
}

function openReportDetailModal(report) {
  selectedReport.value = report
  reportModalOpen.value = true
}

function getStatusChipClass(status) {
  if (!status) return 'bg-red-1 text-red-9'
  const s = status.toLowerCase()
  if (s.includes('selesai') || s.includes('cleaned')) return 'bg-teal-1 text-teal-9'
  if (s.includes('perhatian')) return 'bg-orange-1 text-orange-9'
  return 'bg-red-1 text-red-9'
}

async function fetchSpotDetails(id) {
  try {
    const res = await axios.get('http://127.0.0.1:5000/api/spots/' + id)
    if (res.data.reports) {
      reportsList.value = res.data.reports.map(r => {
        const date = r.created_at ? new Date(r.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Baru saja'
        return {
          id: r.id ? `#RPT-${r.id.toString().padStart(4, '0')}` : 'N/A',
          time: date,
          img: r.photo_path || 'https://picsum.photos/seed/report1/300/200',
          ai_score: r.ai_score,
          status: mapBackendStatus(r.status),
          adminNotes: r.admin_notes,
          aiConfidence: r.ai_score ? `${(r.ai_score * 100).toFixed(0)}%` : '85%',
          severity: r.severity || 'Sedang'
        }
      })
      
      const gl = res.data.reports.filter(r => r.photo_path).map(r => ({
        id: r.id.toString(),
        src: r.photo_path
      }))
      if (gl.length > 0) galleryList.value = gl
    }
  } catch (err) {
    console.error('Gagal mengambil detail spot dan reports:', err)
  }
}

function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

const sentimentReviews = ref([])

const totalLaporan = computed(() => reportsList.value.length)
const perluPerhatianCount = computed(() => reportsList.value.filter(r => r.status === 'Perlu Penanganan' || r.status === 'Perlu Perhatian' || r.status === 'pending').length)
const selesaiCount = computed(() => reportsList.value.filter(r => r.status === 'Selesai' || r.status === 'cleaned').length)

const visualAiScore = computed(() => {
  const activeReports = reportsList.value.filter(r => r.status !== 'Selesai' && r.status !== 'cleaned')
  if (activeReports.length === 0) return 100 // Default if no reports or all are cleaned

  const totalPenalty = activeReports.reduce((acc, r) => acc + ((r.ai_score || 0.5) * 100), 0)
  return Math.max(0, Math.round(100 - totalPenalty))
})

const sentimentScore = computed(() => {
  if (sentimentReviews.value.length === 0) return 100 // Default if no reviews
  const negCount = sentimentReviews.value.filter(r => r.sentimentLabel === '● Negatif').length
  return Math.max(0, 100 - (negCount * 10))
})

const avgIndeksKebersihan = computed(() => {
  return Math.round((visualAiScore.value + sentimentScore.value) / 2)
})

const avgIndeksLabel = computed(() => {
  if (reportsList.value.length === 0 && sentimentReviews.value.length === 0) return 'Aman'
  if (avgIndeksKebersihan.value >= 80) return 'Aman'
  if (avgIndeksKebersihan.value >= 60) return 'Baik'
  if (avgIndeksKebersihan.value >= 40) return 'Sedang'
  return 'Buruk'
})

const sentimentBarOptions = computed(() => ({
  chart: { type: 'bar', height: 80, stacked: true, stackType: '100%', toolbar: { show: false } },
  plotOptions: { bar: { horizontal: true, barHeight: '55%', borderRadius: 6, borderRadiusApplication: 'around' } },
  colors: ['#0d9488', '#f59e0b', '#ef4444'],
  xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
  yaxis: { labels: { show: false } },
  grid: { show: false, padding: { top: -20, bottom: -15, left: 0, right: 0 } },
  legend: { show: false },
  tooltip: { theme: 'dark', y: { formatter: (val) => `${val} review` } },
  dataLabels: { enabled: false },
}))

const sentimentBarSeries = computed(() => {
  const pos = sentimentReviews.value.filter(r => r.sentimentLabel === '● Positif').length
  const net = sentimentReviews.value.filter(r => r.sentimentLabel === '● Netral').length
  const neg = sentimentReviews.value.filter(r => r.sentimentLabel === '● Negatif').length
  
  return [
    { name: 'Positif', data: [pos] },
    { name: 'Netral', data: [net] },
    { name: 'Negatif', data: [neg] },
  ]
})

const positivePercent = computed(() => {
  if (sentimentReviews.value.length === 0) return 0
  const total = sentimentReviews.value.length || 1
  const pos = sentimentReviews.value.filter(r => r.sentimentLabel === '● Positif').length
  return Math.round((pos / total) * 100)
})

const neutralPercent = computed(() => {
  if (sentimentReviews.value.length === 0) return 0
  const total = sentimentReviews.value.length || 1
  const net = sentimentReviews.value.filter(r => r.sentimentLabel === '● Netral').length
  return Math.round((net / total) * 100)
})

const negativePercent = computed(() => {
  if (sentimentReviews.value.length === 0) return 0
  const total = sentimentReviews.value.length || 1
  const neg = sentimentReviews.value.filter(r => r.sentimentLabel === '● Negatif').length
  return Math.round((neg / total) * 100)
})

const trendChartOptions = computed(() => ({
  chart: { type: 'area', height: 220, toolbar: { show: false }, fontFamily: 'Inter, sans-serif', zoom: { enabled: false } },
  colors: ['#0f766e', '#3b82f6'],
  fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.05, stops: [0, 95, 100] } },
  stroke: { curve: 'smooth', width: 3 },
  markers: { size: 4, colors: ['#ffffff'], strokeColors: ['#0f766e', '#3b82f6'], strokeWidth: 2.5, hover: { size: 6 } },
  grid: { borderColor: '#f1f5f9', strokeDashArray: 3, padding: { left: 10, right: 10 } },
  xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Bulan Ini'], labels: { style: { colors: '#64748b', fontSize: '11px', fontWeight: 600 } }, axisBorder: { show: false }, axisTicks: { show: false } },
  yaxis: { min: 0, max: 100, tickAmount: 4, labels: { style: { colors: '#64748b', fontSize: '11px', fontWeight: 600 }, formatter: (val) => `${val}%` } },
  legend: { position: 'top', horizontalAlign: 'right', fontSize: '12px', fontWeight: 600, markers: { size: 5, offsetX: -3 }, itemMargin: { horizontal: 12 } },
  tooltip: { theme: 'dark', y: { formatter: (val) => `${val}%` } },
}))

const trendChartSeries = computed(() => {
  if (reportsList.value.length === 0 && sentimentReviews.value.length === 0) {
    return [
      { name: 'IKD Visual', data: [0, 0, 0, 0, 0, 0] },
      { name: 'IKD Sentimen', data: [0, 0, 0, 0, 0, 0] },
    ]
  }

  // Mock historical data that leads up to the current real data
  const currentVisual = visualAiScore.value
  const currentSentiment = sentimentScore.value
  
  return [
    { name: 'IKD Visual', data: [75, 78, 80, 82, 80, currentVisual] },
    { name: 'IKD Sentimen', data: [60, 65, 68, 70, 72, currentSentiment] },
  ]
})

const reviewForm = ref({ name: '', text: '' })
const submittingReview = ref(false)
const reviewSuccessModal = ref(false)
const lastSubmittedSentiment = ref(null)
const lastSubmittedText = ref('')

function submitReview() {
  if (!reviewForm.value.name || !reviewForm.value.text || !spotId.value) return
  submittingReview.value = true

  const payload = {
    spot_id: spotId.value,
    reviewer_name: reviewForm.value.name,
    text: reviewForm.value.text
  }

  axios.post('http://127.0.0.1:5000/api/reviews/', payload)
    .then((res) => {
      const backendLabel = res.data.sentiment_label
      let sentimentObj = { label: '● Netral', chipClass: 'bg-amber-1 text-amber-9', color: 'amber-8' }
      if (backendLabel === 'Positif') sentimentObj = { label: '● Positif', chipClass: 'bg-teal-1 text-teal-9', color: 'teal-7' }
      else if (backendLabel === 'Negatif') sentimentObj = { label: '● Negatif', chipClass: 'bg-red-1 text-red-9', color: 'red-5' }

      lastSubmittedText.value = reviewForm.value.text
      lastSubmittedSentiment.value = sentimentObj

      reviewSuccessModal.value = true
      submittingReview.value = false
      reviewForm.value = { name: '', text: '' }
      fetchReviews()
    })
    .catch((err) => {
      console.error('Gagal mengirim review:', err)
      submittingReview.value = false
    })
}
</script>

<style scoped>
.destinasi-detail-page { min-height: 100vh; }
.hero-container { position: relative; width: 100%; min-height: 520px; border-bottom: 1px solid #e5e7eb; overflow: hidden; }
.hero-bg-img { width: 100%; height: 100%; }
.hero-content { min-height: 520px; z-index: 2; }
.hero-left { background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); box-shadow: 4px 0 24px rgba(0, 0, 0, 0.05); z-index: 2; }
.title-text { letter-spacing: -0.5px; }
.status-chip { border: 1px solid #fed7aa; border-radius: 8px; }
.description-text { line-height: 1.7; }
.btn-report { background: #197f70 !important; border-radius: 12px; }
.hero-right { min-height: 520px; z-index: 2; }
.carousel-overlay { background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%); }
.bg-black-30 { background: rgba(0, 0, 0, 0.4); }
.gallery-thumb { border-radius: 12px; border: 2px solid transparent; transition: all 0.2s ease; }
.gallery-thumb.active, .gallery-thumb:hover { border-color: #ffffff; transform: scale(1.03); }
.main-content { max-width: 1280px; margin: 0 auto; }
.kebersihan-card, .laporan-card { border-radius: 20px !important; background: #ffffff; border: 1px solid #e5e7eb; }
.line-height-tight { line-height: 1.1; }
.metric-box { border-radius: 16px; min-height: 140px; transition: transform 0.2s ease; }
.metric-box:hover { transform: translateY(-2px); }
.metric-blue { border: 1px solid #93c5fd; background: #f0f9ff; }
.metric-orange { border: 1px solid #fdba74; background: #fff7ed; }
.metric-green { border: 1px solid #86efac; background: #f0fdf4; }
.metric-purple { border: 1px solid #d8b4fe; background: #faf5ff; }
.metric-icon { border-radius: 10px; padding: 6px; }
.report-img { border-radius: 12px; }
.report-item { transition: background-color 0.2s; }
.report-item:hover { background-color: #f8fafc; }
.dual-ikd-wrapper { display: flex; flex-direction: column; gap: 6px; }
.dual-ikd-row { display: flex; align-items: center; gap: 10px; }
.dual-ikd-label { min-width: 56px; font-size: 11px !important; }
.dual-ikd-bar { flex: 1; }
.sentiment-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
.aspect-card { border-radius: 16px; transition: transform 0.2s ease; }
.aspect-card:hover { transform: translateY(-2px); }
.aspect-teal { border: 1px solid #99f6e4; background: #f0fdfa; }
.aspect-orange { border: 1px solid #fed7aa; background: #fff7ed; }
.review-item { border: 1px solid #f1f5f9; border-radius: 16px; transition: all 0.2s ease; }
.review-item:hover { background-color: #f8fffe; border-color: #ccfbf1; box-shadow: 0 2px 12px rgba(13, 148, 136, 0.06); }
.review-form-card { border: 2px dashed #d1d5db; border-radius: 18px; background: #fafbfc; transition: border-color 0.3s ease; }
.review-form-card:focus-within { border-color: #0d9488; background: #f8fffe; }
.star-interactive { transition: transform 0.15s ease; }
.star-interactive:hover { transform: scale(1.25); }

.marquee-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}
.marquee-track {
  display: flex;
  width: max-content;
  gap: 8px;
}
.marquee-content {
  display: flex;
  gap: 8px;
  animation: scroll-left 15s linear infinite;
}
.marquee-track:hover .marquee-content {
  animation-play-state: paused;
}
@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-100% - 8px)); }
}
</style>
