<template>
  <div class="login-container font-instrument">
    <div class="row no-wrap full-height full-width items-stretch">
      <div class="col-12 col-md-7 left-panel q-pa-xl relative-position gt-xs">
        <div class="absolute-full panel-bg" :style="{ backgroundImage: `url(${loginBg})` }"></div>
        <div class="absolute-full panel-overlay"></div>
        <div
          class="relative-position full-height flex flex-column justify-between items-start text-white"
        >
          <Motion
            :initial="{ opacity: 0, x: -30 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.8, ease: 'easeOut' }"
          >
            <div class="logo-wrapper q-mb-xl">
              <q-img :src="logo" width="110px" fit="contain" style="border-radius: 20px" />
            </div>
          </Motion>

          <div class="q-my-auto">
            <Motion
              :initial="{ opacity: 0, y: 30 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.8, delay: 0.2, ease: 'easeOut' }"
            >
              <div class="text-subtitle1 text-teal-3 satisfy-regular q-mb-sm">
                Selamat Datang di Portal Admin
              </div>
              <h1
                class="text-h3 text-weight-bold font-instrument line-height-tight q-mt-none q-mb-md"
              >
                Jaga & Kelola <br />
                Kondisi Danau Toba
              </h1>
              <p class="text-body1 text-teal-1 max-width-desc">
                Masuk untuk menganalisis laporan masyarakat menggunakan sistem AI terpadu, memantau
                destinasi wisata secara real-time, dan mengambil tindakan pelestarian yang cepat.
              </p>
            </Motion>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-5 flex flex-center right-panel q-pa-lg relative-position bg-grey-1">
        <div class="bg-shape shape-1 lt-sm"></div>
        <div class="bg-shape shape-2 lt-sm"></div>

        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.1 }"
          class="width-100 max-width-form"
        >
          <q-card flat class="login-card q-pa-lg q-pa-sm-xl bg-white-glass">
            <div class="text-center lt-sm q-mb-lg">
              <q-img :src="logo" width="100px" fit="contain" />
            </div>

            <div class="q-mb-lg">
              <h2
                class="text-h4 text-weight-bold text-grey-9 q-mt-none q-mb-xs font-instrument-bold"
              >
                Masuk Admin
              </h2>
              <p class="text-body2 text-grey-6 q-mb-none">
                Masukkan email dan kata sandi Anda untuk mengakses dashboard admin.
              </p>
            </div>

            <q-form @submit.prevent="handleLogin" class="q-gutter-y-sm">
              <q-label>Email</q-label>
              <q-input
                v-model="form.email"
                type="email"
                label="Alamat Email"
                outlined
                dense
                color="primary"
                bg-color="white"
                :rules="[
                  (val) => !!val || 'Email wajib diisi',
                  (val) => isValidEmail(val) || 'Format email tidak valid',
                ]"
                hide-bottom-space
                class="custom-input q-mb-lg"
              >
                <template v-slot:prepend>
                  <q-icon name="mail" color="primary" />
                </template>
              </q-input>

              <q-label>Kata Sandi</q-label>
              <q-input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                label="Kata Sandi"
                outlined
                dense
                color="primary"
                bg-color="white"
                :rules="[
                  (val) => !!val || 'Kata sandi wajib diisi',
                  (val) => val.length >= 6 || 'Kata sandi minimal 6 karakter',
                ]"
                hide-bottom-space
                class="custom-input q-mb-md"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" color="primary" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    color="grey-6"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>

              <div class="row items-center justify-between q-mt-sm">
                <q-checkbox
                  v-model="form.rememberMe"
                  label="Ingat Saya"
                  color="primary"
                  dense
                  class="text-grey-7 text-caption"
                />
              </div>

              <div class="q-mt-xl">
                <q-btn
                  type="submit"
                  color="primary"
                  class="full-width login-btn"
                  unelevated
                  no-caps
                  :loading="loading"
                >
                  <span class="text-subtitle1 text-weight-bold">Masuk Sekarang</span>
                  <template v-slot:loading>
                    <q-spinner-oval class="on-left" />
                    Menghubungkan...
                  </template>
                </q-btn>
              </div>
            </q-form>

            <div class="text-center q-mt-lg">
              <q-btn
                flat
                color="primary"
                icon="arrow_back"
                label="Kembali ke Beranda"
                no-caps
                class="back-btn"
                to="/"
              />
            </div>
          </q-card>
        </Motion>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { Motion } from 'motion-v'
import axios from 'axios'
import loginBg from '../../assets/login_bg.png'
import logo from '../../assets/Logo.png'

const router = useRouter()
const $q = useQuasar()

const loading = ref(false)
const showPassword = ref(false)

const form = reactive({
  email: '',
  password: '',
  rememberMe: false,
})

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

async function handleLogin() {
  loading.value = true

  try {
    const response = await axios.post('http://127.0.0.1:5000/api/auth/login', {
      email: form.email,
      password: form.password
    })
    
    // Save token
    localStorage.setItem('admin_token', response.data.access_token)
    
    loading.value = false
    
    $q.notify({
      type: 'positive',
      message: 'Login Berhasil!',
      caption: 'Selamat datang di Panel Admin Mahorbasa Vision.',
      position: 'top',
      timeout: 2000,
      actions: [{ icon: 'close', color: 'white' }],
    })
    router.push('/admin/dashboard')
    
  } catch (error) {
    loading.value = false
    console.error(error)
    
    $q.notify({
      type: 'negative',
      message: 'Login Gagal!',
      caption: error.response?.data?.message || 'Email atau kata sandi salah. Silakan coba lagi.',
      position: 'top',
      timeout: 3000,
      actions: [{ icon: 'close', color: 'white' }],
    })
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
}

.left-panel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.panel-bg {
  background-size: cover;
  background-position: center;
  transition: transform 10s ease-out;
}

.left-panel:hover .panel-bg {
  transform: scale(1.05);
}

.panel-overlay {
  background: linear-gradient(135deg, rgba(25, 127, 112, 0.9) 0%, rgba(13, 64, 56, 0.85) 100%);
  mix-blend-mode: multiply;
}

.max-width-desc {
  max-width: 480px;
  line-height: 1.6;
  opacity: 0.9;
}

.right-panel {
  overflow-y: auto;
}

.login-card {
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.max-width-form {
  max-width: 440px;
}

.width-100 {
  width: 100%;
}

.custom-input :deep(.q-field__control) {
  border-radius: 12px !important;
  transition: border-color 0.25s ease;
}

.custom-input :deep(.q-field__control:before),
.custom-input :deep(.q-field__control:after) {
  border-radius: 12px !important;
}

.login-btn {
  border-radius: 12px !important;
  padding: 8px 24px;
  background: linear-gradient(135deg, #197f70 0%, #125e53 100%) !important;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 4px 15px rgba(25, 127, 112, 0.3);
}

.login-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(25, 127, 112, 0.4);
}

.login-btn:active {
  transform: translateY(1px);
}

.back-btn {
  border-radius: 10px;
}

.bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.15;
}

.shape-1 {
  width: 300px;
  height: 300px;
  background-color: #197f70;
  top: -100px;
  right: -100px;
}

.shape-2 {
  width: 250px;
  height: 250px;
  background-color: #26a69a;
  bottom: -50px;
  left: -50px;
}

@media (max-width: 599px) {
  .login-card {
    background: transparent !important;
    border: none;
    box-shadow: none;
    padding: 0 !important;
  }
}
</style>
