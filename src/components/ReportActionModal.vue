<template>
  <q-dialog
    :model-value="modelValue"
    backdrop-filter="blur(4px)"
    transition-show="scale"
    transition-hide="scale"
    @update:model-value="(val) => $emit('update:modelValue', val)"
  >
    <q-card v-if="report" style="width: 440px; border-radius: 20px" class="q-pa-lg">
      <div class="text-h6 text-weight-bold text-grey-9 q-mb-xs">Tindak Lanjuti Laporan</div>
      <div class="text-caption text-grey-6 q-mb-md">
        Ubah status penanganan untuk laporan di <b>{{ report.location }}</b>
      </div>

      <div class="q-my-sm text-weight-bold text-grey-8">Status Penanganan</div>
      <q-select
        v-model="actionStatus"
        :options="['Perlu Penanganan', 'Perlu Perhatian', 'Selesai']"
        outlined
        dense
        color="teal-8"
        class="q-mb-md"
      />

      <q-input
        v-model="actionNotes"
        type="textarea"
        rows="3"
        placeholder="Tambahkan catatan petugas / instruksi pembersihan..."
        outlined
        dense
        color="teal-8"
        class="q-mb-lg"
      />

      <div class="row gap-md justify-end">
        <q-btn flat rounded label="Batal" color="grey-7" no-caps v-close-popup />
        <q-btn
          unelevated
          rounded
          color="teal-8"
          label="Simpan Update"
          no-caps
          class="text-weight-bold q-px-lg"
          @click="onSubmit"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  report: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'submit'])

const actionStatus = ref('')
const actionNotes = ref('')

watch(
  () => props.report,
  (newReport) => {
    if (newReport) {
      actionStatus.value = newReport.status || 'Perlu Penanganan'
      actionNotes.value = ''
    }
  },
  { immediate: true },
)

function onSubmit() {
  emit('submit', {
    status: actionStatus.value,
    notes: actionNotes.value,
  })
}
</script>
