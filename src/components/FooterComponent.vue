<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <q-img src="../assets/Logo_1.png" width="140px" fit="contain" class="q-mb-sm" />
        <p class="footer-desc">
          Sistem pemantauan kondisi sampah di destinasi wisata Danau Toba yang berbasis AI.
          Berfungsi untuk membantu masyarakat dan pemerintah untuk menjaga keindahan Danau Toba.
        </p>
        <q-btn
          flat
          dense
          round
          icon="img:https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg"
          size="sm"
        />
      </div>

      <div class="footer-col">
        <div class="footer-col-title">Navigasi</div>
        <a href="#" class="footer-link">Laporkan Kondisi</a>
        <a href="#" class="footer-link">Peta Wisata</a>
        <a href="#" class="footer-link">Tentang Sistem</a>
      </div>

      <div class="footer-col">
        <div class="footer-col-title">Kontak</div>
        <div class="footer-contact-item">
          <q-icon name="email" size="16px" />
          Mahorbasavision@gmail.com
        </div>
        <div class="footer-contact-item">
          <q-icon name="phone" size="16px" />
          +62 895-1234-7890
        </div>
        <div class="footer-contact-item">
          <q-icon name="location_on" size="16px" />
          Kab. Samosir, Sumatera Utara
        </div>
      </div>

      <div class="footer-col footer-love">
        <div class="footer-col-title">
          Dibuat dengan <span class="heart">♥</span> untuk Danau Toba
        </div>
        <q-img src="../assets/Logo.png" width="100px" fit="contain" class="q-mt-sm" />
      </div>
    </div>

    <q-separator color="grey-4" class="q-my-md" />

    <div class="footer-bottom">© 2026 Mahorbasa Vision. All rights reserved.</div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.site-footer {
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  padding: 48px 80px 24px;
}

.footer-inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1fr;
  gap: 40px;
}

.footer-brand {
  display: flex;
  flex-direction: column;
}

.footer-desc {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.6;
  margin: 8px 0 12px;
  max-width: 280px;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-col-title {
  font-weight: 700;
  font-size: 14px;
  color: #111827;
  margin-bottom: 4px;
}

.footer-link {
  text-decoration: none;
  color: #6b7280;
  font-size: 14px;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #197f70;
}

.footer-contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #6b7280;
}

.footer-love {
  align-items: flex-start;
}

.heart {
  color: #e53935;
}

.footer-bottom {
  text-align: center;
  font-size: 12px;
  color: #9ca3af;
  padding-top: 8px;
}

/* Responsive Breakpoints */
@media (max-width: 1200px) {
  .site-footer {
    padding: 48px 40px 24px;
  }
}

@media (max-width: 900px) {
  .footer-inner {
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }

  .site-footer {
    padding: 36px 24px 20px;
  }
}

@media (max-width: 480px) {
  .footer-inner {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .site-footer {
    padding: 28px 16px 16px;
  }
}
</style>
