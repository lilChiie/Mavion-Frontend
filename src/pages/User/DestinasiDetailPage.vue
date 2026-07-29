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
                class="status-chip bg-orange-1 text-orange-9 text-weight-bold q-px-sm"
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
              to="/laporkan"
            />
          </div>
        </Motion>

        <div class="col-12 col-md-7 hero-right relative-position column justify-end">
          <div class="carousel-overlay full-width row items-center justify-end q-pa-md gap-sm">
            <q-btn
              round
              dense
              flat
              icon="chevron_left"
              color="white"
              class="carousel-nav-btn bg-black-30"
            />

            <div class="row no-wrap gap-sm overflow-hidden q-gutter-x-sm">
              <q-img
                v-for="(img, i) in galleryImages"
                :key="i"
                :src="img"
                width="120px"
                height="80px"
                fit="cover"
                class="gallery-thumb cursor-pointer"
                :class="{ active: i === activeImageIndex }"
                @click="activeImageIndex = i"
              />
            </div>

            <q-btn
              round
              dense
              flat
              icon="chevron_right"
              color="white"
              class="carousel-nav-btn bg-black-30"
            />
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
                    :value="82"
                    size="110px"
                    :thickness="0.15"
                    color="teal-8"
                    track-color="teal-1"
                    class="text-weight-bolder text-grey-9"
                  >
                    <div class="column items-center">
                      <div class="text-h5 text-weight-bolder text-grey-9 line-height-tight">
                        82%
                      </div>
                      <div class="text-caption text-grey-7 text-weight-medium">Baik</div>
                    </div>
                  </q-circular-progress>
                </div>

                <div class="col overflow-hidden">
                  <div class="text-subtitle2 text-teal-8 text-weight-bold">Insight AI:</div>
                  <div class="text-subtitle1 text-weight-bold text-teal-10 q-my-xs">
                    Destinasi ini dalam kondisi bersih dan terawat.
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
                        :value="0.85"
                        color="teal-8"
                        track-color="teal-1"
                        rounded
                        size="8px"
                        class="dual-ikd-bar"
                      />
                      <span class="text-caption text-weight-bolder text-teal-9">85%</span>
                    </div>
                    <div class="dual-ikd-row">
                      <span class="dual-ikd-label text-caption text-weight-bold text-grey-7"
                        >Sentimen</span
                      >
                      <q-linear-progress
                        :value="0.72"
                        color="blue-6"
                        track-color="blue-1"
                        rounded
                        size="8px"
                        class="dual-ikd-bar"
                      />
                      <span class="text-caption text-weight-bolder text-blue-8">72%</span>
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
                      <div class="text-h4 text-weight-bolder text-grey-9">12</div>
                      <div class="text-subtitle2 text-weight-bold text-grey-9">Total Laporan</div>
                      <div class="text-caption text-grey-6">7 hari terakhir</div>
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
                      <div class="text-h4 text-weight-bolder text-grey-9">3</div>
                      <div class="text-subtitle2 text-weight-bold text-grey-9">Perlu Perhatian</div>
                      <div class="text-caption text-grey-6">Sampah menumpuk</div>
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
                      <div class="text-h4 text-weight-bolder text-grey-9">9</div>
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
                      <div class="text-h4 text-weight-bolder text-grey-9">72%</div>
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
                v-for="(report, index) in reportsList"
                :key="index"
                class="q-py-md q-px-lg items-center gap-md cursor-pointer q-gutter-x-md report-item"
              >
                <q-img
                  :src="report.img"
                  width="150px"
                  height="90px"
                  fit="cover"
                  class="report-img"
                />
                <q-item-section>
                  <q-item-label class="text-subtitle1 text-weight-bold text-grey-9">
                    {{ report.title }}
                  </q-item-label>
                  <q-item-label caption class="text-body2 text-grey-7 q-mt-xs">
                    {{ report.description }}
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
              <div class="row items-center justify-center gap-md q-mt-sm">
                <div class="row items-center gap-xs">
                  <span class="sentiment-dot bg-teal-6"></span>
                  <span class="text-caption text-weight-bold text-grey-7">Positif (65%)</span>
                </div>
                <div class="row items-center gap-xs">
                  <span class="sentiment-dot bg-amber-6"></span>
                  <span class="text-caption text-weight-bold text-grey-7">Netral (25%)</span>
                </div>
                <div class="row items-center gap-xs">
                  <span class="sentiment-dot bg-red-5"></span>
                  <span class="text-caption text-weight-bold text-grey-7">Negatif (10%)</span>
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
                <q-btn
                  flat
                  dense
                  no-caps
                  color="teal-8"
                  label="Lihat Semua"
                  icon-right="chevron_right"
                  class="text-weight-bold"
                  size="sm"
                />
              </div>

              <div class="column gap-sm">
                <div
                  v-for="(review, idx) in sentimentReviews"
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
                        <q-icon
                          v-for="star in 5"
                          :key="star"
                          :name="star <= review.rating ? 'star' : 'star_border'"
                          :color="star <= review.rating ? 'amber-7' : 'grey-4'"
                          size="16px"
                        />
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
                <div class="row q-col-gutter-md q-mb-md">
                  <div class="col-12 col-sm-6">
                    <q-input
                      v-model="reviewForm.name"
                      outlined
                      dense
                      placeholder="Nama / Panggilan Anda"
                      class="bg-white"
                      :rules="[(val) => !!val || 'Masukkan nama Anda']"
                    >
                      <template v-slot:prepend>
                        <q-icon name="person" color="grey-6" />
                      </template>
                    </q-input>
                  </div>

                  <div class="col-12 col-sm-6">
                    <div class="text-caption text-weight-bold text-grey-7 q-mb-xs">Rating Anda</div>
                    <div class="row items-center gap-xs">
                      <q-icon
                        v-for="star in 5"
                        :key="star"
                        :name="star <= (hoveredStar || reviewForm.rating) ? 'star' : 'star_border'"
                        :color="star <= (hoveredStar || reviewForm.rating) ? 'amber-7' : 'grey-4'"
                        size="32px"
                        class="cursor-pointer star-interactive"
                        @click="reviewForm.rating = star"
                        @mouseenter="hoveredStar = star"
                        @mouseleave="hoveredStar = 0"
                      />
                      <span
                        v-if="reviewForm.rating"
                        class="text-caption text-weight-bold text-grey-6 q-ml-sm"
                      >
                        {{ reviewForm.rating }}/5
                      </span>
                    </div>
                  </div>
                </div>

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
                    :disabled="!reviewForm.name || !reviewForm.rating || !reviewForm.text"
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

    <ReviewSuccessModal
      v-model="reviewSuccessModal"
      :sentiment="lastSubmittedSentiment"
      :rating="lastSubmittedRating"
      :text="lastSubmittedText"
    />

    <FooterComponent />
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Motion } from 'motion-v'
import VueApexCharts from 'vue3-apexcharts'
import FooterComponent from '../../components/FooterComponent.vue'
import ReviewSuccessModal from '../../components/ReviewSuccessModal.vue'

const route = useRoute()
const router = useRouter()

const destName = computed(() => route.query.name || 'Pantai Batu Hoda')
const destStatus = computed(() => route.query.status || 'Perlu Perhatian')
const destDescription = ref(
  'Pantai Hoda merupakan objek wisata alam yang berada di Pulau Samosir, Sumatera Utara. Destinasi ini dikenal dengan pantainya yang bersih, panorama Danau Toba yang indah, serta lingkungan yang masih alami. Pantai Hoda menjadi lokasi yang populer untuk rekreasi, fotografi, dan menikmati keindahan alam Danau Toba.',
)
const heroImage = ref('https://picsum.photos/seed/toba1/1200/600')
const activeImageIndex = ref(0)
const galleryImages = ref([
  'https://picsum.photos/seed/toba1/300/200',
  'https://picsum.photos/seed/toba2/300/200',
  'https://picsum.photos/seed/toba3/300/200',
])

const reportsList = ref([
  {
    title: 'Sampah di Pinggir Pantai',
    description: 'Sampah di Pinggir Pantai',
    img: 'https://picsum.photos/seed/toba1/300/200',
  },
  {
    title: 'Sampah di Pinggir Pantai',
    description: 'Sampah plastik menumpuk dekat area gazebo warga.',
    img: 'https://picsum.photos/seed/toba2/300/200',
  },
  {
    title: 'Sampah di Pinggir Pantai',
    description: 'Tumpukan sisa kemasan makanan disekitar dermaga wisata.',
    img: 'https://picsum.photos/seed/toba3/300/200',
  },
])

function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

const aspectSentiments = ref([
  { name: 'Kebersihan', icon: 'cleaning_services', score: 68, color: 'orange-8', trackColor: 'orange-1', theme: 'orange' },
  { name: 'Fasilitas', icon: 'chair', score: 78, color: 'teal-8', trackColor: 'teal-1', theme: 'teal' },
  { name: 'Pengelolaan', icon: 'manage_accounts', score: 62, color: 'orange-8', trackColor: 'orange-1', theme: 'orange' },
  { name: 'Keamanan', icon: 'shield', score: 85, color: 'teal-8', trackColor: 'teal-1', theme: 'teal' },
])

const sentimentReviews = ref([
  { name: 'Andi Siregar', initials: 'AS', avatarColor: 'teal-7', rating: 4, text: 'Pantainya cukup bersih dan pemandangan indah. Hanya saja ada beberapa sampah plastik di pinggir pantai yang perlu dibersihkan.', date: '2 hari lalu', sentimentLabel: '● Positif', sentimentClass: 'bg-teal-1 text-teal-9' },
  { name: 'Maria Hutapea', initials: 'MH', avatarColor: 'red-5', rating: 2, text: 'Sangat kecewa. Sampah berserakan di mana-mana, terutama di area parkir dan sekitar dermaga. Bau tidak sedap juga tercium.', date: '3 hari lalu', sentimentLabel: '● Negatif', sentimentClass: 'bg-red-1 text-red-9' },
  { name: 'Budi Panjaitan', initials: 'BP', avatarColor: 'blue-7', rating: 5, text: 'Destinasi yang sangat terawat! Petugas kebersihan rajin membersihkan area pantai. Fasilitas toilet juga bersih. Sangat recommended!', date: '5 hari lalu', sentimentLabel: '● Positif', sentimentClass: 'bg-teal-1 text-teal-9' },
  { name: 'Sari Manurung', initials: 'SM', avatarColor: 'amber-8', rating: 3, text: 'Pemandangan bagus tapi biasa saja dari segi kebersihan. Ada beberapa tempat sampah yang sudah penuh dan belum diangkut.', date: '1 minggu lalu', sentimentLabel: '● Netral', sentimentClass: 'bg-amber-1 text-amber-9' },
])

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

const sentimentBarSeries = ref([
  { name: 'Positif', data: [26] },
  { name: 'Netral', data: [10] },
  { name: 'Negatif', data: [4] },
])

const trendChartOptions = computed(() => ({
  chart: { type: 'area', height: 220, toolbar: { show: false }, fontFamily: 'Inter, sans-serif', zoom: { enabled: false } },
  colors: ['#0f766e', '#3b82f6'],
  fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.05, stops: [0, 95, 100] } },
  stroke: { curve: 'smooth', width: 3 },
  markers: { size: 4, colors: ['#ffffff'], strokeColors: ['#0f766e', '#3b82f6'], strokeWidth: 2.5, hover: { size: 6 } },
  grid: { borderColor: '#f1f5f9', strokeDashArray: 3, padding: { left: 10, right: 10 } },
  xaxis: { categories: ['Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'], labels: { style: { colors: '#64748b', fontSize: '11px', fontWeight: 600 } }, axisBorder: { show: false }, axisTicks: { show: false } },
  yaxis: { min: 0, max: 100, tickAmount: 4, labels: { style: { colors: '#64748b', fontSize: '11px', fontWeight: 600 }, formatter: (val) => `${val}%` } },
  legend: { position: 'top', horizontalAlign: 'right', fontSize: '12px', fontWeight: 600, markers: { size: 5, offsetX: -3 }, itemMargin: { horizontal: 12 } },
  tooltip: { theme: 'dark', y: { formatter: (val) => `${val}%` } },
}))

const trendChartSeries = ref([
  { name: 'IKD Visual', data: [78, 82, 75, 88, 84, 85] },
  { name: 'IKD Sentimen', data: [65, 60, 68, 72, 70, 72] },
])

const reviewForm = ref({ name: '', rating: 0, text: '' })
const hoveredStar = ref(0)
const submittingReview = ref(false)
const reviewSuccessModal = ref(false)
const lastSubmittedSentiment = ref(null)
const lastSubmittedRating = ref(0)
const lastSubmittedText = ref('')

function detectSentiment(text, rating) {
  const lower = text.toLowerCase()
  const positiveWords = ['bersih', 'bagus', 'indah', 'terawat', 'nyaman', 'rapi', 'segar', 'recommended', 'mantap', 'keren', 'puas', 'senang', 'suka']
  const negativeWords = ['kotor', 'sampah', 'jorok', 'bau', 'kumuh', 'kecewa', 'jelek', 'buruk', 'rusak', 'berantakan', 'menumpuk', 'berserakan', 'parah']

  let posCount = positiveWords.filter((w) => lower.includes(w)).length
  let negCount = negativeWords.filter((w) => lower.includes(w)).length

  const negations = ['tidak', 'kurang', 'belum', 'bukan']
  for (const neg of negations) {
    for (const pos of positiveWords) {
      if (lower.includes(`${neg} ${pos}`)) { posCount--; negCount++ }
    }
    for (const negW of negativeWords) {
      if (lower.includes(`${neg} ${negW}`)) { negCount--; posCount++ }
    }
  }

  const textScore = posCount - negCount
  const ratingBias = rating >= 4 ? 1 : rating <= 2 ? -1 : 0
  const finalScore = textScore + ratingBias

  if (finalScore > 0) return { label: '● Positif', chipClass: 'bg-teal-1 text-teal-9', color: 'teal-7' }
  else if (finalScore < 0) return { label: '● Negatif', chipClass: 'bg-red-1 text-red-9', color: 'red-5' }
  else return { label: '● Netral', chipClass: 'bg-amber-1 text-amber-9', color: 'amber-8' }
}

function submitReview() {
  if (!reviewForm.value.name || !reviewForm.value.rating || !reviewForm.value.text) return
  submittingReview.value = true

  setTimeout(() => {
    const sentiment = detectSentiment(reviewForm.value.text, reviewForm.value.rating)
    lastSubmittedRating.value = reviewForm.value.rating
    lastSubmittedText.value = reviewForm.value.text
    lastSubmittedSentiment.value = sentiment

    const initials = reviewForm.value.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)

    sentimentReviews.value.unshift({
      name: reviewForm.value.name,
      initials: initials,
      avatarColor: sentiment.color,
      rating: reviewForm.value.rating,
      text: reviewForm.value.text,
      date: 'Baru saja',
      sentimentLabel: sentiment.label,
      sentimentClass: sentiment.chipClass,
    })

    reviewSuccessModal.value = true
    submittingReview.value = false
    reviewForm.value = { name: '', rating: 0, text: '' }
  }, 600)
}
</script>

<style scoped>
.destinasi-detail-page { min-height: 100vh; }
.hero-container { position: relative; width: 100%; min-height: 520px; border-bottom: 1px solid #e5e7eb; overflow: hidden; }
.hero-bg-img { width: 100%; height: 100%; }
.hero-content { min-height: 520px; z-index: 2; }
.hero-left { background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); box-shadow: 4px 0 24px rgba(0, 0, 0, 0.05); z-index: 2; }
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
</style>
