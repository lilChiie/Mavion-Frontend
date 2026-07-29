<template>
  <q-page class="admin-monitoring q-pa-lg">
    <Motion
      :initial="{ opacity: 0, y: 15 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5, ease: 'easeOut' }"
      class="q-mb-lg"
    >
      <div class="row items-center justify-between gap-md">
        <div>
          <h1 class="text-h4 text-weight-bolder text-grey-9 q-my-none">
            Monitoring Laporan Kebersihan
          </h1>
          <div class="text-subtitle2 text-grey-7 q-mt-xs">
            Pemantauan terpadu laporan sampah masyarakat per wilayah dan verifikasi AI real-time.
          </div>
        </div>

        <q-btn
          unelevated
          rounded
          color="teal-8"
          icon="file_download"
          label="Ekspor Laporan"
          no-caps
          class="text-weight-bold q-px-md"
          @click="exportReport"
        />
      </div>
    </Motion>

    <Motion
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5, delay: 0.1, ease: 'easeOut' }"
      class="q-mb-lg"
    >
      <q-card flat bordered class="q-pa-md filter-card rounded-borders-lg">
        <div class="row items-center justify-between gap-md">
          <div class="col-12 col-md-5">
            <q-input
              v-model="searchQuery"
              placeholder="Cari lokasi, ID laporan, atau jenis sampah..."
              dense
              outlined
              rounded
              class="bg-white"
            >
              <template v-slot:prepend>
                <q-icon name="search" color="teal-8" />
              </template>
            </q-input>
          </div>

          <div class="col-12 col-md-7 row items-center justify-end gap-sm q-gutter-x-md">
            <q-select
              v-model="selectedWilayah"
              :options="wilayahOptions"
              :label="selectedWilayah ? undefined : 'Wilayah Kabupaten'"
              dense
              outlined
              rounded
              options-dense
              class="bg-white"
              style="min-width: 190px"
            />

            <q-select
              v-model="selectedStatus"
              :options="['Semua Status', 'Perlu Penanganan', 'Perlu Perhatian', 'Selesai']"
              :label="selectedStatus ? undefined : 'Status Laporan'"
              dense
              outlined
              rounded
              options-dense
              class="bg-white"
              style="min-width: 170px"
            />

            <q-btn flat round color="grey-7" icon="refresh" @click="resetFilters">
              <q-tooltip>Reset Filter</q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card>
    </Motion>

    <Motion
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5, delay: 0.15, ease: 'easeOut' }"
      class="q-mb-lg"
    >
      <div class="row items-stretch q-col-gutter-sm">
        <div v-for="(w, idx) in wilayahStats" :key="idx" class="col-12 col-sm-6 col-md-3">
          <q-card
            flat
            bordered
            class="wilayah-stat-card q-pa-md cursor-pointer full-height"
            :class="{ active: selectedWilayah === w.name }"
            @click="selectedWilayah = w.name"
          >
            <div class="row items-center justify-between">
              <div>
                <div class="text-subtitle2 text-weight-bold text-grey-9">{{ w.name }}</div>
                <div class="text-caption text-grey-6">{{ w.total }} Laporan</div>
              </div>

              <q-chip
                dense
                size="11px"
                class="text-weight-bold"
                :class="w.urgentCount > 0 ? 'bg-red-1 text-red-9' : 'bg-teal-1 text-teal-9'"
              >
                {{ w.urgentCount }} Perlu Penanganan
              </q-chip>
            </div>
          </q-card>
        </div>
      </div>
    </Motion>

    <Motion
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5, delay: 0.2, ease: 'easeOut' }"
    >
      <q-card flat bordered class="q-pa-lg monitoring-card">
        <div class="row items-center justify-between q-mb-md">
          <div class="text-h6 text-weight-bold text-grey-9">
            Daftar Laporan
            <q-badge color="teal-8" class="q-ml-xs">{{ filteredReports.length }} Laporan</q-badge>
          </div>

          <div class="row items-center gap-xs">
            <q-btn-toggle
              v-model="viewMode"
              flat
              dense
              rounded
              toggle-color="teal-8"
              color="grey-6"
              :options="[
                { icon: 'list', value: 'table' },
                { icon: 'grid_view', value: 'grid' },
              ]"
            />
          </div>
        </div>

        <q-table
          flat
          :rows="filteredReports"
          :columns="columns"
          row-key="id"
          :grid="viewMode === 'grid'"
          v-model:pagination="pagination"
          :rows-per-page-options="[5, 10, 20]"
          class="monitoring-q-table"
        >
          <template #body-cell-id="props">
            <q-td :props="props">
              <div class="text-weight-bold text-teal-10">{{ props.row.id }}</div>
              <div class="text-subtitle2 text-weight-bold text-grey-9">
                {{ props.row.location }}
              </div>
              <div class="text-caption text-grey-6">{{ props.row.wilayah }}</div>
            </q-td>
          </template>

          <template #body-cell-img="props">
            <q-td :props="props">
              <q-img
                :src="props.row.img"
                width="90px"
                height="65px"
                fit="cover"
                class="rounded-borders cursor-pointer shadow-1"
                @click="previewImage(props.row)"
              >
                <q-tooltip>Klik untuk perbesar</q-tooltip>
              </q-img>
            </q-td>
          </template>

          <template #body-cell-ai="props">
            <q-td :props="props">
              <div class="row items-center gap-xs">
                <q-icon name="memory" color="teal-8" size="18px" />
                <span class="text-caption text-weight-bold text-teal-9">
                  {{ props.row.aiConfidence }} AI Match
                </span>
              </div>
              <div class="text-caption text-grey-8 text-weight-medium q-mt-xs">
                {{ props.row.trashType }}
              </div>
              <div class="text-caption text-grey-6">Keparahan: {{ props.row.severity }}</div>
            </q-td>
          </template>

          <template #body-cell-status="props">
            <q-td :props="props">
              <q-chip
                dense
                class="text-weight-bold"
                size="sm"
                :class="getStatusChipClass(props.row.status)"
              >
                ● {{ props.row.status }}
              </q-chip>
            </q-td>
          </template>

          <template #body-cell-actions="props">
            <q-td :props="props" class="text-center">
              <div class="row items-center justify-center gap-xs">
                <q-btn
                  unelevated
                  dense
                  rounded
                  flat
                  color="teal-8"
                  icon="edit"
                  no-caps
                  size="md"
                  class="q-px-sm text-weight-bold"
                  @click="openActionModal(props.row)"
                />
                <q-btn
                  flat
                  dense
                  round
                  color="grey-7"
                  icon="visibility"
                  size="md"
                  @click="openDetailModal(props.row)"
                >
                  <q-tooltip>Detail AI & Foto</q-tooltip>
                </q-btn>
              </div>
            </q-td>
          </template>

          <template #item="props">
            <div class="col-12 col-sm-6 col-md-4 q-pa-xs">
              <q-card
                flat
                bordered
                class="report-grid-card overflow-hidden full-height column justify-between"
              >
                <div>
                  <div class="relative-position">
                    <q-img :src="props.row.img" height="160px" fit="cover" />
                    <q-chip
                      dense
                      class="absolute-top-right q-ma-sm text-weight-bold"
                      :class="getStatusChipClass(props.row.status)"
                    >
                      ● {{ props.row.status }}
                    </q-chip>
                  </div>

                  <q-card-section class="q-pa-md">
                    <div class="row items-center justify-between q-mb-xs">
                      <span class="text-caption text-weight-bold text-teal-9">{{
                        props.row.id
                      }}</span>
                      <span class="text-caption text-grey-6">{{ props.row.timeAgo }}</span>
                    </div>
                    <div class="text-subtitle1 text-weight-bold text-grey-9">
                      {{ props.row.location }}
                    </div>
                    <div class="text-caption text-grey-6 q-mb-sm">{{ props.row.wilayah }}</div>

                    <div class="bg-grey-2 q-pa-xs rounded-borders q-mb-sm">
                      <div class="text-caption text-weight-bold text-grey-8">
                        <q-icon name="memory" color="teal-8" /> {{ props.row.aiConfidence }} AI
                        Verification
                      </div>
                      <div class="text-caption text-grey-7">{{ props.row.trashType }}</div>
                    </div>
                  </q-card-section>
                </div>

                <q-card-section
                  class="q-pa-md border-top bg-grey-1 row justify-between items-center"
                >
                  <q-btn
                    flat
                    no-caps
                    dense
                    color="teal-8"
                    label="Detail AI"
                    icon="info"
                    @click="openDetailModal(props.row)"
                  />
                  <q-btn
                    unelevated
                    rounded
                    color="teal-8"
                    label="Tindak Lanjuti"
                    no-caps
                    size="sm"
                    class="text-weight-bold q-px-md"
                    @click="openActionModal(props.row)"
                  />
                </q-card-section>
              </q-card>
            </div>
          </template>
        </q-table>
      </q-card>
    </Motion>

    <q-dialog v-model="detailModalOpen">
      <q-card v-if="activeReport" style="width: 520px; border-radius: 20px" class="q-pa-lg">
        <div class="row items-center justify-between q-mb-md">
          <div>
            <div class="text-subtitle2 text-teal-8 text-weight-bold">{{ activeReport.id }}</div>
            <div class="text-h6 text-weight-bold text-grey-9">{{ activeReport.location }}</div>
          </div>
          <q-btn icon="close" flat round dense v-close-popup />
        </div>

        <q-img
          :src="activeReport.img"
          height="220px"
          fit="cover"
          class="rounded-borders q-mb-md shadow-1"
        />

        <div class="bg-teal-1 q-pa-md rounded-borders q-mb-md">
          <div class="row items-center gap-xs q-mb-xs">
            <q-icon name="memory" color="teal-9" size="20px" />
            <div class="text-subtitle2 text-weight-bold text-teal-10">
              Hasil Analisis Computer Vision
            </div>
          </div>
          <div class="text-caption text-teal-9">
            Tingkat Akurasi AI: <b>{{ activeReport.aiConfidence }}</b> | Kategori:
            <b>{{ activeReport.trashType }}</b>
          </div>
          <div class="text-caption text-teal-9 q-mt-xs">
            Estimasi Keparahan: <b>{{ activeReport.severity }}</b>
          </div>
        </div>

        <div class="row gap-md">
          <q-btn
            unelevated
            rounded
            color="teal-8"
            label="Proses & Update Status"
            class="full-width text-weight-bold"
            no-caps
            @click="handleProcessFromDetail(activeReport)"
          />
        </div>
      </q-card>
    </q-dialog>

    <ReportActionModal
      v-model="actionModalOpen"
      :report="activeReport"
      @submit="handleActionSubmit"
    />

    <StatusModal
      v-model="confirmModalOpen"
      type="confirm"
      :title="modalTitle"
      :message="modalMessage"
      confirm-label="Ya, Update Status"
      cancel-label="Batal"
      @confirm="executeSaveActionUpdate"
    />

    <StatusModal
      v-model="statusModalOpen"
      :type="modalType"
      :title="modalTitle"
      :message="modalMessage"
      :auto-close="autoCloseTime"
    />
  </q-page>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Motion } from 'motion-v'
import StatusModal from '../../components/StatusModal.vue'
import ReportActionModal from '../../components/ReportActionModal.vue'

const statusModalOpen = ref(false)
const confirmModalOpen = ref(false)
const autoCloseTime = ref(0)
const modalType = ref('success')
const modalTitle = ref('')
const modalMessage = ref('')

const searchQuery = ref('')
const selectedWilayah = ref('Semua Wilayah')
const selectedStatus = ref('Semua Status')
const viewMode = ref('table')

const detailModalOpen = ref(false)
const actionModalOpen = ref(false)
const activeReport = ref(null)
const actionStatus = ref('')
const actionNotes = ref('')

const wilayahOptions = [
  'Semua Wilayah',
  'Samosir',
  'Toba',
  'Simalungun',
  'Karo',
  'Dairi',
  'Humbang Hasundutan',
  'Tapanuli Utara',
]

const wilayahStats = ref([
  { name: 'Samosir', total: 42, urgentCount: 12 },
  { name: 'Toba', total: 24, urgentCount: 5 },
  { name: 'Simalungun', total: 18, urgentCount: 3 },
  { name: 'Karo', total: 10, urgentCount: 0 },
])

const reports = ref([
  {
    id: '#RPT-2026-089',
    location: 'Pantai Batu Hoda',
    wilayah: 'Samosir',
    img: 'https://picsum.photos/seed/toba1/300/200',
    aiConfidence: '96.8%',
    trashType: 'Tumpukan Botol Plastik & Anorganik',
    severity: 'Tinggi (Tumpukan > 2m²)',
    timeAgo: '15 menit lalu',
    status: 'Perlu Penanganan',
  },
  {
    id: '#RPT-2026-088',
    location: 'Area Dermaga Tomok',
    wilayah: 'Samosir',
    img: 'https://picsum.photos/seed/toba2/300/200',
    aiConfidence: '94.2%',
    trashType: 'Sampah Kemasan Makanan',
    severity: 'Sedang',
    timeAgo: '45 menit lalu',
    status: 'Perlu Perhatian',
  },
  {
    id: '#RPT-2026-087',
    location: 'Pelabuhan Ajibata',
    wilayah: 'Toba',
    img: 'https://picsum.photos/seed/toba3/300/200',
    aiConfidence: '98.1%',
    trashType: 'Limbah Plastik Ringan',
    severity: 'Rendah (Telah dibersihkan)',
    timeAgo: '2 jam lalu',
    status: 'Selesai',
  },
  {
    id: '#RPT-2026-086',
    location: 'Bukit Holbung',
    wilayah: 'Samosir',
    img: 'https://picsum.photos/seed/toba4/300/200',
    aiConfidence: '91.5%',
    trashType: 'Sisa Pembungkus',
    severity: 'Rendah',
    timeAgo: '4 jam lalu',
    status: 'Selesai',
  },
  {
    id: '#RPT-2026-085',
    location: 'Pantai Simanindo',
    wilayah: 'Samosir',
    img: 'https://picsum.photos/seed/toba5/300/200',
    aiConfidence: '95.0%',
    trashType: 'Sampah Organik & Plastik',
    severity: 'Sedang',
    timeAgo: '5 jam lalu',
    status: 'Perlu Perhatian',
  },
])

const filteredReports = computed(() => {
  return reports.value.filter((r) => {
    const matchSearch =
      r.location.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      r.trashType.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchWilayah =
      selectedWilayah.value === 'Semua Wilayah' || r.wilayah === selectedWilayah.value

    const matchStatus = selectedStatus.value === 'Semua Status' || r.status === selectedStatus.value

    return matchSearch && matchWilayah && matchStatus
  })
})

const columns = [
  { name: 'id', label: 'ID & LOKASI', align: 'left', field: 'id', sortable: true },
  { name: 'img', label: 'FOTO LOKASI', align: 'left', field: 'img' },
  { name: 'ai', label: 'ANALISIS AI', align: 'left', field: 'aiConfidence' },
  { name: 'timeAgo', label: 'WAKTU', align: 'left', field: 'timeAgo', sortable: true },
  { name: 'status', label: 'STATUS', align: 'left', field: 'status', sortable: true },
  { name: 'actions', label: 'AKSI PENGELOLA', align: 'center' },
]

const pagination = ref({
  sortBy: 'id',
  descending: false,
  page: 1,
  rowsPerPage: 5,
})

watch([searchQuery, selectedWilayah, selectedStatus], () => {
  pagination.value.page = 1
})

function getStatusChipClass(status) {
  if (status === 'Selesai') return 'bg-teal-1 text-teal-9'
  if (status === 'Perlu Perhatian') return 'bg-orange-1 text-orange-9'
  return 'bg-red-1 text-red-9'
}

function resetFilters() {
  searchQuery.value = ''
  selectedWilayah.value = 'Semua Wilayah'
  selectedStatus.value = 'Semua Status'
}

function previewImage(report) {
  openDetailModal(report)
}

function openDetailModal(report) {
  activeReport.value = report
  detailModalOpen.value = true
}

function handleProcessFromDetail(report) {
  detailModalOpen.value = false
  openActionModal(report)
}

function openActionModal(report) {
  activeReport.value = report
  actionStatus.value = report.status
  actionNotes.value = ''
  actionModalOpen.value = true
}

function handleActionSubmit({ status, notes }) {
  actionStatus.value = status
  actionNotes.value = notes
  requestSaveActionUpdate()
}

function requestSaveActionUpdate() {
  if (activeReport.value) {
    modalType.value = 'confirm'
    modalTitle.value = 'Apakah Anda Yakin?'
    modalMessage.value = `Apakah Anda yakin ingin memperbarui status laporan ${activeReport.value.id} di kawasan ${activeReport.value.location} menjadi "${actionStatus.value}"?`
    autoCloseTime.value = 0
    confirmModalOpen.value = true
  }
}

function executeSaveActionUpdate() {
  confirmModalOpen.value = false
  if (activeReport.value) {
    activeReport.value.status = actionStatus.value
    actionModalOpen.value = false

    setTimeout(() => {
      modalType.value = 'success'
      modalTitle.value = 'Status Berhasil Diperbarui!'
      modalMessage.value = `Status laporan ${activeReport.value.id} di kawasan ${activeReport.value.location} telah diperbarui menjadi "${actionStatus.value}". Pop-up ini akan tertutup otomatis dalam 5 detik.`
      autoCloseTime.value = 5000
      statusModalOpen.value = true
    }, 200)
  }
}

function exportReport() {
  modalType.value = 'info'
  modalTitle.value = 'Mengunduh Laporan Rekap'
  modalMessage.value =
    'Berkas rekapitulasi laporan PDF/CSV sedang diproses dan diunduh ke perangkat Anda.'
  autoCloseTime.value = 5000
  statusModalOpen.value = true
}
</script>

<style scoped>
.admin-monitoring {
  max-width: 1400px;
  margin: 0 auto;
}

.filter-card,
.monitoring-card,
.report-grid-card {
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
}

.wilayah-stat-card {
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}

.wilayah-stat-card:hover,
.wilayah-stat-card.active {
  border-color: #0f766e;
  background: #f0fdf4;
}

.border-top {
  border-top: 1px solid #e5e7eb;
}
</style>
