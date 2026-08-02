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

        <q-btn-dropdown
          unelevated
          rounded
          color="teal-8"
          icon="file_download"
          label="Ekspor Laporan"
          no-caps
          class="text-weight-bold q-px-md"
        >
          <q-list>
            <q-item clickable v-close-popup @click="exportReport('pdf')">
              <q-item-section avatar>
                <q-icon name="picture_as_pdf" color="red-8" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Ekspor sebagai PDF</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="exportReport('csv')">
              <q-item-section avatar>
                <q-icon name="table_view" color="green-8" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Ekspor sebagai CSV</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </Motion>

    <Motion
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5, delay: 0.1, ease: 'easeOut' }"
      class="q-mb-lg"
    >
      <q-card flat bordered class="q-pa-md filter-card rounded-borders-lg">
        <div class="row items-center q-gutter-x-md flex-nowrap">
          <div class="col">
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

          <div class="col-auto row items-center justify-end gap-sm q-gutter-x-md">
            <q-select
              v-model="selectedArea"
              :options="areaOptions"
              :label="selectedArea ? undefined : 'Pilih Area Wisata'"
              dense
              outlined
              rounded
              options-dense
              class="bg-white"
              style="min-width: 190px"
            />

            <q-select
              v-model="selectedStatus"
              :options="['Semua Status', 'Perlu Penanganan', 'Perlu Perhatian', 'Aman']"
              :label="selectedStatus ? undefined : 'Status Laporan'"
              dense
              outlined
              rounded
              options-dense
              class="bg-white"
              style="min-width: 170px"
            />
          </div>
        </div>
      </q-card>
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
          </div>

          <div class="row items-center gap-sm">
            <q-btn
              v-if="selectedReports.length > 0 || selectedArea !== 'Semua Area Wisata'"
              unelevated
              rounded
              color="teal-8"
              :label="selectedReports.length > 0 ? `Update Status (${selectedReports.length})` : 'Update Status'"
              no-caps
              dense
              class="q-px-md text-weight-bold"
              @click="selectedReports.length > 0 ? openBatchActionModal() : openAreaActionModal()"
            />
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
          selection="multiple"
          v-model:selected="selectedReports"
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
                class="text-weight-medium"
                size="md"
                :class="getStatusChipClass(props.row.status)"
              >
                 {{ props.row.status }}
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
                    <q-checkbox
                      v-model="props.selected"
                      color="teal-8"
                      class="absolute-top-left q-ma-sm bg-white rounded-borders"
                      style="z-index: 10; padding: 2px;"
                      dense
                    />
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

        <div class="bg-grey-2 q-pa-md rounded-borders q-mb-md" v-if="activeReport.userNotes && activeReport.userNotes !== 'null'">
          <div class="row items-center gap-xs q-mb-xs">
            <q-icon name="person" color="grey-8" size="20px" />
            <div class="text-subtitle2 text-weight-bold text-grey-9">
              Catatan Pelapor
            </div>
          </div>
          <div class="text-caption text-grey-8 font-italic">
            "{{ activeReport.userNotes }}"
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
            Tingkat Akurasi AI: <b>{{ activeReport.aiConfidence }}</b>
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
import { ref, computed, watch, onMounted } from 'vue'
import { Motion } from 'motion-v'
import StatusModal from '../../components/StatusModal.vue'
import ReportActionModal from '../../components/ReportActionModal.vue'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:5000'

const statusModalOpen = ref(false)
const confirmModalOpen = ref(false)
const autoCloseTime = ref(0)
const modalType = ref('success')
const modalTitle = ref('')
const modalMessage = ref('')

const searchQuery = ref('')
const selectedArea = ref('Semua Area Wisata')
const selectedStatus = ref('Semua Status')
const viewMode = ref('table')

const detailModalOpen = ref(false)
const actionModalOpen = ref(false)
const activeReport = ref(null)
const actionStatus = ref('')
const actionNotes = ref('')
const reports = ref([])
const selectedReports = ref([])
const batchMode = ref(false)
const batchType = ref('')

const areaOptions = computed(() => {
  const areas = new Set(reports.value.map(r => r.location).filter(Boolean))
  return ['Semua Area Wisata', ...Array.from(areas).sort()]
})

onMounted(async () => {
  await fetchReports()
})

const mapBackendStatus = (status, score) => {
  if (status === 'pending') {
    if (score >= 0.7) return 'Perlu Penanganan'
    if (score >= 0.4) return 'Perlu Perhatian'
    return 'Aman'
  }
  if (status === 'cleaned') return 'Selesai'
  if (status === 'Perlu Penanganan') return 'Perlu Penanganan'
  if (status === 'Perlu Perhatian') return 'Perlu Perhatian'
  if (status === 'Selesai') return 'Selesai'
  return status || 'Perlu Penanganan'
}

const getSeverityLabel = (score) => {
  if (score >= 0.7) return 'Tinggi (Tumpukan Besar)'
  if (score >= 0.3) return 'Sedang'
  return 'Rendah'
}

const getTimeAgo = (dateStr) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diffInMinutes = Math.floor((now - date) / 1000 / 60)

  if (diffInMinutes < 60) return `${diffInMinutes} menit lalu`
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours} jam lalu`
  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays} hari lalu`
}

const fetchReports = async () => {
  try {
    const token = localStorage.getItem('admin_token')
    const response = await axios.get(`${API_BASE_URL}/api/reports/`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    reports.value = response.data.map(r => ({
      id: `#RPT-${r.id.toString().padStart(4, '0')}`,
      backendId: r.id,
      location: r.spot_name || 'Lokasi Tidak Diketahui',
      img: `${API_BASE_URL}/uploads/${r.photo_path}`,
      aiConfidence: r.ai_score ? `${Math.round(r.ai_score * 100)}%` : 'N/A',
      severity: getSeverityLabel(r.ai_score || 0.1),
      timeAgo: getTimeAgo(r.created_at),
      date: new Date(r.created_at).toLocaleString('id-ID'),
      status: mapBackendStatus(r.status, r.ai_score || 0),
      userNotes: r.user_notes
    }))
  } catch (error) {
    console.error('Error fetching reports:', error)
  }
}

const filteredReports = computed(() => {
  return reports.value.filter((r) => {
    const matchSearch =
      r.location.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      r.trashType.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchArea =
      selectedArea.value === 'Semua Area Wisata' || r.location === selectedArea.value

    const matchStatus = selectedStatus.value === 'Semua Status' || r.status === selectedStatus.value

    return matchSearch && matchArea && matchStatus
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

watch([searchQuery, selectedArea, selectedStatus], () => {
  pagination.value.page = 1
})

function getStatusChipClass(status) {
  if (status === 'Selesai') return 'bg-teal-1 text-teal-9'
  if (status === 'Perlu Perhatian') return 'bg-orange-1 text-orange-9'
  if (status === 'Aman') return 'bg-green-1 text-green-9'
  return 'bg-red-1 text-red-9'
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

function openBatchActionModal() {
  batchMode.value = true
  batchType.value = 'selected'
  activeReport.value = {
    isBatch: true,
    batchText: `${selectedReports.value.length} laporan yang dipilih`,
    status: 'Perlu Penanganan'
  }
  actionStatus.value = 'Perlu Penanganan'
  actionNotes.value = ''
  actionModalOpen.value = true
}

function openAreaActionModal() {
  batchMode.value = true
  batchType.value = 'area'
  activeReport.value = {
    isBatch: true,
    batchText: `seluruh laporan di area ${selectedArea.value}`,
    status: 'Perlu Penanganan'
  }
  actionStatus.value = 'Perlu Penanganan'
  actionNotes.value = ''
  actionModalOpen.value = true
}

function openActionModal(report) {
  batchMode.value = false
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
    if (activeReport.value.isBatch) {
      modalMessage.value = `Apakah Anda yakin ingin memperbarui status untuk ${activeReport.value.batchText} menjadi "${actionStatus.value}"?`
    } else {
      modalMessage.value = `Apakah Anda yakin ingin memperbarui status laporan ${activeReport.value.id} di kawasan ${activeReport.value.location} menjadi "${actionStatus.value}"?`
    }
    autoCloseTime.value = 0
    confirmModalOpen.value = true
  }
}

async function executeSaveActionUpdate() {
  confirmModalOpen.value = false
  if (activeReport.value) {
    if (activeReport.value.isBatch) {
      await executeBatchUpdate()
      return
    }

    const token = localStorage.getItem('admin_token')

    try {
      await axios.patch(`${API_BASE_URL}/api/reports/${activeReport.value.backendId}/status`, {
        status: actionStatus.value,
        notes: actionNotes.value
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      activeReport.value.status = actionStatus.value
      actionModalOpen.value = false

      setTimeout(() => {
        modalType.value = 'success'
        modalTitle.value = 'Status Berhasil Diperbarui!'
        modalMessage.value = `Status laporan ${activeReport.value.id} di kawasan ${activeReport.value.location} telah diperbarui menjadi "${actionStatus.value}". Pop-up ini akan tertutup otomatis dalam 5 detik.`
        autoCloseTime.value = 5000
        statusModalOpen.value = true
      }, 200)
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Gagal memperbarui status laporan')
    }
  }
}

async function executeBatchUpdate() {
  const token = localStorage.getItem('admin_token')
  let targetReports = []

  if (batchType.value === 'selected') {
    targetReports = selectedReports.value
  } else if (batchType.value === 'area') {
    targetReports = reports.value.filter(r => r.location === selectedArea.value)
  }

  try {
    await Promise.all(
      targetReports.map(report =>
        axios.patch(`${API_BASE_URL}/api/reports/${report.backendId}/status`, {
          status: actionStatus.value,
          notes: actionNotes.value
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })
      )
    )

    targetReports.forEach(report => {
      report.status = actionStatus.value
    })

    selectedReports.value = []
    actionModalOpen.value = false

    setTimeout(() => {
      modalType.value = 'success'
      modalTitle.value = 'Status Berhasil Diperbarui!'
      modalMessage.value = `Status untuk ${activeReport.value.batchText} telah diperbarui menjadi "${actionStatus.value}".`
      autoCloseTime.value = 5000
      statusModalOpen.value = true
    }, 200)
  } catch (error) {
    console.error('Error in batch update:', error)
    alert('Gagal memperbarui status beberapa laporan')
  }
}

function exportReport(format) {
  if (filteredReports.value.length === 0) {
    alert('Tidak ada data laporan untuk diekspor sesuai filter saat ini.')
    return
  }

  if (format === 'csv') {
    const headers = ['ID Laporan', 'Foto Lokasi', 'Analisis AI', 'Waktu', 'Status']
    const csvRows = [headers.join(';')]

    filteredReports.value.forEach(r => {
      const row = [
        `"${r.id}"`,
        `"${r.img}"`,
        `"${r.aiConfidence}"`,
        `"${r.date}"`,
        `"${r.status}"`
      ]
      csvRows.push(row.join(';'))
    })

    // Use \\r\\n for Windows Excel compatibility
    const csvString = csvRows.join('\\r\\n')
    // Add BOM (\\uFEFF) for UTF-8 to fix Excel displaying garbled characters
    const blob = new Blob(["\\uFEFF" + csvString], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `Rekap_Laporan_Sampah_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    showSuccessModal('CSV')
  } else if (format === 'pdf') {
    const doc = new jsPDF('landscape')
    doc.text('Rekapitulasi Laporan Sampah - Mahorbasa', 14, 15)

    const tableData = filteredReports.value.map(r => [
      r.id,
      r.img,
      r.aiConfidence,
      r.date,
      r.status
    ])

    doc.autoTable({
      startY: 20,
      head: [['ID Laporan', 'Foto Lokasi', 'Analisis AI', 'Waktu', 'Status']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [15, 118, 110] }, // teal-8
      styles: { fontSize: 9 }
    })

    doc.save(`Rekap_Laporan_Sampah_${new Date().toISOString().split('T')[0]}.pdf`)
    showSuccessModal('PDF')
  }
}

function showSuccessModal(format) {
  modalType.value = 'success'
  modalTitle.value = 'Ekspor Berhasil'
  modalMessage.value = `Berkas rekapitulasi laporan berformat ${format} telah berhasil diunduh ke perangkat Anda.`
  autoCloseTime.value = 3000
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
