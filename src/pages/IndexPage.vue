<template>
  <q-page class="landing-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>

      <div class="hero-content">
        <!-- Left -->
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
                outline
                color="primary"
                icon="map"
                label="Lihat Peta Wisata"
                size="md"
                no-caps
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
          <!-- Right -->
          <div class="hero-right">
            <q-card flat class="map-card">
              <q-img src="../assets/peta.png" fit="cover"> </q-img>
            </q-card>
          </div>
        </Motion>
      </div>

      <!-- Stats -->
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
  </q-page>
</template>

<script setup>
import { Motion } from 'motion-v'
</script>

<style scoped>
.landing-page {
  background: #f6f8f7;
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
  margin-bottom: 0px;
}

.hero-subtitle {
  font-size: 64px;
  color: #197f70;
  margin-bottom: 0px;
}

.hero-left p {
  max-width: 520px;
  line-height: 1.1;
}

.hero-action {
  margin-top: 30px;
  display: flex;
  gap: 16px;
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

.map-placeholder {
  background: rgba(255, 255, 255, 0.95);
  padding: 12px 20px;
  border-radius: 12px;
  color: #197f70;
  font-weight: 600;
}

.stats-wrapper {
  position: absolute;
  left: 50%;
  padding-left: 80px;
  padding-right: 80px;
  transform: translateX(-50%);
  bottom: -130px;

  width: 100%;
  max-width: 1280px;
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

@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .hero-left h1,
  .hero-subtitle {
    font-size: 42px;
  }
}

@media (max-width: 1200px) {
  .hero-section {
    padding: 40px 40px 180px;
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
}

@media (max-width: 768px) {
  .hero-section {
    padding: 24px 20px 420px;
  }

  .hero-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .hero-left {
    text-align: center;
  }

  .hero-left h1 {
    font-size: 42px;
  }

  .hero-subtitle {
    font-size: 42px;
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
    height: 220px;
  }

  .stats-wrapper {
    padding-left: 20px;
    padding-right: 20px;
    bottom: -360px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .total-report {
    text-align: center;
  }

  .stats-number {
    font-size: 42px;
  }

  .stats-label {
    font-size: 20px;
  }

  .status-box {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .hero-left h1 {
    font-size: 34px;
  }

  .hero-subtitle {
    font-size: 34px;
  }

  .hero-left p {
    font-size: 14px;
  }

  .stats-wrapper {
    bottom: -400px;
  }

  .stats-card {
    padding: 14px;
  }

  .status-number {
    font-size: 28px;
  }
}
</style>
