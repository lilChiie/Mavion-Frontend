<template>
  <q-page class="tentang-page bg-grey-1">
    <div
      class="tentang-hero bg-teal-10 text-white q-py-xl q-px-xl relative-position overflow-hidden"
    >
      <div class="hero-overlay-bg"></div>
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
      >
        <div class="max-width-container relative-position z-top text-center q-py-lg">
          <q-chip class="bg-teal-8 text-white text-weight-bold q-px-md q-mb-md">
            Platform AI Pemantauan Wisata
          </q-chip>
          <h1 class="text-h3 text-weight-bolder q-my-none">Tentang Mahorbasa Vision</h1>
          <p class="text-subtitle1 text-grey-4 q-mt-md max-width-sub">
            Inovasi teknologi Computer Vision dan AI yang dirancang khusus untuk memantau,
            menganalisis, dan menjaga kelestarian kebersihan destinasi wisata seputar Danau Toba.
          </p>
        </div>
      </Motion>
    </div>

    <div class="max-width-container q-py-xl q-px-md">
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.15, ease: 'easeOut' }"
        class="q-mb-2xl"
      >
        <div>
          <div class="text-center q-mb-xl">
            <div class="text-h4 text-weight-bolder text-grey-9">
              Solusi Berbasis Teknologi untuk Danau Toba
            </div>
          </div>

          <div class="row q-col-gutter-lg">
            <div
              v-for="(item, idx) in systemFeatures"
              :key="idx"
              class="col-12 col-md-4"
            >
              <q-card flat bordered class="feature-card q-pa-lg full-height">
                <q-avatar
                  size="60px"
                  :color="item.badgeBg"
                  :text-color="item.badgeColor"
                  :icon="item.icon"
                  class="q-mb-md"
                />
                <div class="text-h6 text-weight-bold text-grey-9 q-mb-sm">
                  {{ item.title }}
                </div>
                <div class="text-body2 text-grey-7">
                  {{ item.description }}
                </div>
              </q-card>
            </div>
          </div>
        </div>
      </Motion>

      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.25, ease: 'easeOut' }"
        class="q-mb-2xl q-mt-xl"
      >
        <div>
          <q-card flat bordered class="ai-flow-card q-pa-xl shadow-1">
            <div class="row items-center justify-between q-mb-xl">
              <div>
                <div class="text-h5 text-weight-bolder text-grey-9">
                  Bagaimana AI Menganalisis Laporan Anda
                </div>
              </div>
              <q-chip class="bg-teal-1 text-teal-9 text-weight-bold">Sistem Real-Time</q-chip>
            </div>

            <div class="row q-col-gutter-lg">
              <div
                v-for="(step, idx) in aiWorkflowSteps"
                :key="idx"
                class="col-12 col-sm-6 col-md-3"
              >
                <div class="flow-step column items-center text-center">
                  <div class="step-num text-weight-bold text-teal-8 q-mb-xs">
                    {{ step.number }}
                  </div>
                  <div class="text-subtitle1 text-weight-bold text-grey-9">
                    {{ step.title }}
                  </div>
                  <div class="text-caption text-grey-6 q-mt-xs">
                    {{ step.description }}
                  </div>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </Motion>
    </div>

    <FooterComponent />
  </q-page>
</template>

<script setup>
import { Motion } from 'motion-v'
import FooterComponent from '../../components/FooterComponent.vue'

const systemFeatures = [
  {
    icon: 'groups',
    badgeBg: 'teal-1',
    badgeColor: 'teal-8',
    title: 'Partisipasi Masyarakat',
    description:
      'Memudahkan wisatawan dan warga sekitar untuk langsung melaporkan foto kondisi sampah di lokasi wisata secara instan dan transparan.',
  },
  {
    icon: 'memory',
    badgeBg: 'blue-1',
    badgeColor: 'blue-8',
    title: 'Analisis AI Presisi',
    description:
      'Model pembelajaran mesin (Computer Vision) mendeteksi jenis dan volume sampah serta menentukan tingkat keparahan secara otomatis.',
  },
  {
    icon: 'speed',
    badgeBg: 'orange-1',
    badgeColor: 'orange-8',
    title: 'Respon Cepat Pengelola',
    description:
      'Meneruskan laporan berprioritas tinggi langsung ke dasbor pengelola dan dinas terkait agar penanganan dilakukan tepat waktu.',
  },
]

const aiWorkflowSteps = [
  {
    number: '01',
    title: 'Pengambilan Foto',
    description: 'Foto diunggah pengguna bersama koordinat lokasi GPS otomatis.',
  },
  {
    number: '02',
    title: 'Segmentasi Objek',
    description: 'Model AI mengidentifikasi batas objek sampah dan area sekitarnya.',
  },
  {
    number: '03',
    title: 'Skor Indeks Kebersihan',
    description:
      'Sistem mengkalkulasi skor kebersihan destinasi (Aman / Perlu Perhatian / Perlu Penanganan).',
  },
  {
    number: '04',
    title: 'Distribusi Task',
    description: 'Laporan dipublikasikan ke peta publik dan dasbor petugas kebersihan.',
  },
]
</script>

<style scoped>
.tentang-page {
  min-height: 100vh;
}

.tentang-hero {
  background: linear-gradient(135deg, #0d4f3c 0%, #197f70 100%);
  min-height: 280px;
}

.hero-overlay-bg {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    circle at 80% 20%,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 60%
  );
}

.max-width-container {
  max-width: 1140px;
  margin: 0 auto;
}

.max-width-sub {
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.feature-card {
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}

.ai-flow-card {
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
}

.step-num {
  font-size: 28px;
  line-height: 1;
}

.flow-step {
  padding: 16px;
  border-radius: 16px;
  background: #f8fafc;
  height: 100%;
}
</style>
