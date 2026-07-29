<template>
  <q-page class="laporkan-page bg-grey-1 q-py-xl q-px-md">
    <div class="form-container max-width-container">
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
      >
        <div class="text-center q-mb-lg">
          <q-chip class="bg-teal-1 text-teal-9 text-weight-bold q-px-md q-mb-sm">
            Form Laporan Cepat
          </q-chip>
          <h1 class="text-h3 text-weight-bolder text-grey-9 q-my-none">Laporkan Kondisi Wisata</h1>
          <p class="text-body1 text-grey-7 q-mt-sm max-width-sub">
            Ambil foto kondisi lokasi wisata menggunakan kamera perangkat Anda. AI akan menganalisis
            kondisi kebersihan secara otomatis.
          </p>
        </div>
      </Motion>

      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.15, ease: 'easeOut' }"
      >
        <q-card flat bordered class="q-pa-lg form-card shadow-1">
          <div class="column gap-lg">
            <div class="form-section">
              <div class="text-subtitle1 text-weight-bold text-grey-9 q-mb-xs">
                1. Ambil Foto dari Kamera
              </div>
              <div class="text-caption text-grey-6 q-mb-md">
                Posisikan kamera ke arah lokasi sampah atau kondisi yang ingin dilaporkan.
              </div>

              <div class="camera-wrapper relative-position overflow-hidden flex flex-center">
                <video
                  v-show="isCameraActive && !capturedImage"
                  ref="videoRef"
                  autoplay
                  playsinline
                  class="camera-stream"
                ></video>

                <q-img
                  v-if="capturedImage"
                  :src="capturedImage"
                  height="340px"
                  fit="contain"
                  class="captured-preview"
                />

                <canvas ref="canvasRef" class="hidden"></canvas>

                <div
                  v-if="!isCameraActive && !capturedImage"
                  class="camera-placeholder column items-center text-center q-pa-lg"
                >
                  <q-avatar
                    size="72px"
                    color="teal-1"
                    text-color="teal-8"
                    icon="photo_camera"
                    class="q-mb-md"
                  />
                  <div class="text-subtitle1 text-weight-bold text-grey-8">Kamera Belum Aktif</div>
                  <div class="text-caption text-grey-6 q-mb-md">
                    Tekan tombol di bawah untuk mengaktifkan kamera perangkat Anda
                  </div>
                  <q-btn
                    unelevated
                    rounded
                    color="teal-8"
                    icon="videocam"
                    label="Aktifkan Kamera"
                    class="text-weight-bold q-px-lg"
                    no-caps
                    @click="startCamera"
                  />
                </div>

                <div
                  v-if="capturedImage"
                  class="ai-badge absolute-top-left q-ma-md bg-teal-9 text-white q-px-sm q-py-xs rounded-borders text-caption flex items-center gap-xs shadow-2"
                >
                  <q-icon name="memory" color="teal-2" size="18px" />
                  AI Verified: Kondisi Terdeteksi
                </div>
              </div>

              <div class="row justify-center gap-md q-mt-md">
                <q-btn
                  v-if="isCameraActive && !capturedImage"
                  unelevated
                  rounded
                  size="lg"
                  color="teal-8"
                  icon="photo_camera"
                  label="Ambil Foto"
                  class="q-px-xl text-weight-bold"
                  no-caps
                  @click="capturePhoto"
                />

                <q-btn
                  v-if="capturedImage"
                  outline
                  rounded
                  color="grey-8"
                  icon="refresh"
                  label="Ambil Ulang Foto"
                  class="q-px-lg text-weight-bold"
                  no-caps
                  @click="retakePhoto"
                />
              </div>
            </div>

            <q-separator color="grey-3" class="q-my-md" />

            <div class="form-section">
              <div class="text-subtitle1 text-weight-bold text-grey-9 q-mb-xs">
                2. Catatan Tambahan (Opsional)
              </div>
              <div class="text-caption text-grey-6 q-mb-sm">
                Tambahkan keterangan lokasi atau catatan singkat jika diperlukan.
              </div>

              <q-input
                v-model="catatan"
                type="textarea"
                rows="3"
                placeholder="Tuliskan catatan tambahan (misal: dekat gazebo pantai)..."
                outlined
                dense
                class="bg-white"
              />
            </div>

            <q-separator color="grey-3" class="q-my-md" />

            <div class="form-section column items-center">
              <q-btn
                unelevated
                rounded
                size="lg"
                color="teal-8"
                icon="send"
                label="Kirim Laporan Kondisi"
                class="full-width max-width-btn text-weight-bold"
                no-caps
                :disabled="!capturedImage"
                :loading="submitting"
                @click="submitReport"
              />
            </div>
          </div>
        </q-card>
      </Motion>
    </div>

    <ReportSuccessModal v-model="successModal" />

    <FooterComponent class="q-mt-xl" />
  </q-page>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { Motion } from 'motion-v'
import FooterComponent from '../../components/FooterComponent.vue'
import ReportSuccessModal from '../../components/ReportSuccessModal.vue'

const videoRef = ref(null)
const canvasRef = ref(null)
const isCameraActive = ref(false)
const capturedImage = ref(null)
const catatan = ref('')
const submitting = ref(false)
const successModal = ref(false)

let mediaStream = null

async function startCamera() {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false,
    })
    if (videoRef.value) {
      videoRef.value.srcObject = mediaStream
      isCameraActive.value = true
    }
  } catch (err) {
    console.error('Kamera tidak dapat diakses:', err)
    alert('Tidak dapat mengaktifkan kamera. Pastikan izin kamera telah diberikan di peramban Anda.')
  }
}

function capturePhoto() {
  if (!videoRef.value || !canvasRef.value) return
  const video = videoRef.value
  const canvas = canvasRef.value

  canvas.width = video.videoWidth || 640
  canvas.height = video.videoHeight || 480

  const ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

  capturedImage.value = canvas.toDataURL('image/jpeg')
  stopCamera()
}

function retakePhoto() {
  capturedImage.value = null
  startCamera()
}

function stopCamera() {
  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => track.stop())
    mediaStream = null
  }
  isCameraActive.value = false
}

function submitReport() {
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    successModal.value = true
  }, 1000)
}

onUnmounted(() => {
  stopCamera()
})
</script>

<style scoped>
.laporkan-page {
  min-height: 100vh;
}

.max-width-container {
  max-width: 760px;
  margin: 0 auto;
}

.max-width-sub {
  max-width: 580px;
  margin-left: auto;
  margin-right: auto;
}

.form-card {
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
}

.camera-wrapper {
  width: 100%;
  min-height: 340px;
  background: #0f172a;
  border-radius: 20px;
  border: 2px dashed #197f70;
}

.camera-stream {
  width: 100%;
  height: 340px;
  object-fit: cover;
  border-radius: 18px;
}

.captured-preview {
  width: 100%;
  border-radius: 18px;
}

.camera-placeholder {
  color: #ffffff;
}

.max-width-btn {
  max-width: 340px;
}
</style>
