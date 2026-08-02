<template>
  <q-page class="admin-destinasi-page q-pa-lg">
    <Motion
      :initial="{ opacity: 0, y: -10 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.4, ease: 'easeOut' }"
      class="q-mb-md"
    >
      <div class="row items-center justify-between gap-md">
        <div>
          <h1 class="text-h4 text-weight-bolder text-grey-9 q-my-none">Destinasi Wisata</h1>
          <div class="text-caption text-grey-6 q-mt-xs">
            Kelola daftar area wisata dan destinasi Danau Toba
          </div>
        </div>

        <q-btn
          color="teal-8"
          icon="add"
          label="Tambah Destinasi Baru"
          no-caps
          unelevated
          rounded
          class="text-weight-bold shadow-2"
          to="/admin/destinasi/add"
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
        <div class="row items-center q-gutter-x-md flex-nowrap">
          <div class="col">
            <q-input
              v-model="searchQuery"
              placeholder="Cari nama destinasi wisata..."
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
              v-model="selectedStatus"
              :options="['Semua Status', 'Aman', 'Perlu Perhatian', 'Perlu Penanganan']"
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
      :initial="{ opacity: 0, y: 15 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.4, delay: 0.1, ease: 'easeOut' }"
    >
      <q-card flat bordered class="ref-card overflow-hidden">
        <q-table
          :rows="filteredDestinations"
          :columns="columns"
          row-key="id"
          flat
          class="monitoring-q-table"
          :loading="loading"
          :pagination="{ rowsPerPage: 10 }"
        >
          <template v-slot:body-cell-image="props">
            <q-td :props="props">
              <q-img
                :src="props.row.image_url"
                width="90px"
                height="65px"
                fit="cover"
                class="rounded-borders cursor-pointer shadow-1"
              >
                <template v-slot:error>
                  <div class="absolute-full flex flex-center bg-grey-2 text-grey-6">No Image</div>
                </template>
              </q-img>
            </q-td>
          </template>

          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-chip
                dense
                class="text-weight-medium"
                size="md"
                :class="getStatusClass(props.row.status)"
              >
                {{ props.row.status || 'Aman' }}
              </q-chip>
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="text-right">
              <q-btn flat round color="grey-6" icon="more_vert">
                <q-menu>
                  <q-list style="min-width: 150px">
                    <q-item clickable v-close-popup @click="editSpot(props.row.id)">
                      <q-item-section avatar>
                        <q-icon name="edit" color="blue-8" size="sm" />
                      </q-item-section>
                      <q-item-section>Edit</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup class="text-red" @click="deleteSpot(props.row.id)">
                      <q-item-section avatar>
                        <q-icon name="delete" color="red-8" size="sm" />
                      </q-item-section>
                      <q-item-section>Hapus</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card>
    </Motion>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { Motion } from 'motion-v'
import axios from 'axios'

const $q = useQuasar()
const router = useRouter()
const destinations = ref([])
const loading = ref(false)
const searchQuery = ref('')
const selectedStatus = ref('Semua Status')

const filteredDestinations = computed(() => {
  return destinations.value.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.value.toLowerCase())

    let destStatus = dest.status || 'Aman'
    const matchesStatus = selectedStatus.value === 'Semua Status' || destStatus === selectedStatus.value

    return matchesSearch && matchesStatus
  })
})

const columns = [
  { name: 'image', label: 'Foto', align: 'left', field: 'image_url' },
  { name: 'name', label: 'Nama Destinasi', align: 'left', field: 'name', sortable: true },
  { name: 'status', label: 'Status Laporan', align: 'left', field: 'status', sortable: true },
  { name: 'laporanCount', label: 'Jml Laporan', align: 'center', field: 'laporanCount', sortable: true },
  { name: 'actions', label: '', align: 'right' }
]

function getStatusClass(status) {
  if (status === 'Perlu Penanganan' || status === 'Kritis') return 'bg-red-1 text-red-9'
  if (status === 'Perlu Perhatian') return 'bg-orange-1 text-orange-9'
  return 'bg-green-1 text-green-9'
}

const fetchDestinations = async () => {
  loading.value = true
  try {
    const res = await axios.get('http://127.0.0.1:5000/api/spots/')
    destinations.value = res.data.map(d => ({
      ...d,
      image_url: d.image_url || `https://picsum.photos/seed/toba${d.id}/200/150`
    }))
  } catch (error) {
    console.error('Failed to fetch destinations', error)
  } finally {
    loading.value = false
  }
}

function editSpot(id) {
  router.push(`/admin/destinasi/add?edit=${id}`)
}

function deleteSpot(id) {
  $q.dialog({
    title: 'Konfirmasi',
    message: 'Apakah Anda yakin ingin menghapus destinasi ini?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      const token = localStorage.getItem('admin_token')
      await axios.delete(`http://127.0.0.1:5000/api/spots/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      $q.notify({ type: 'positive', message: 'Destinasi berhasil dihapus' })
      fetchDestinations()
    } catch (err) {
      console.error(err)
      $q.notify({ type: 'negative', message: 'Gagal menghapus destinasi' })
    }
  })
}

onMounted(() => {
  fetchDestinations()
})
</script>

<style scoped>
.admin-destinasi-page {
  max-width: 1600px;
  margin: 0 auto;
}

.ref-card {
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

:deep(.q-table__container) {
  border-radius: 16px;
}

.monitoring-q-table {
  background: transparent !important;
}

.monitoring-q-table :deep(thead tr th) {
  background-color: #ffffff;
  color: #111827;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.5px;
  padding: 16px;
  border-bottom: 2px solid #f3f4f6;
}

.monitoring-q-table :deep(tbody tr td) {
  padding: 16px;
  font-size: 14px;
  border-bottom: 1px solid #f3f4f6;
  background-color: #ffffff;
}

.monitoring-q-table :deep(tbody tr:hover td) {
  background-color: #f8fafc;
}
</style>
