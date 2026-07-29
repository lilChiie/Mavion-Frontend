<template>
  <q-dialog
    :model-value="modelValue"
    persistent
    transition-show="scale"
    transition-hide="scale"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <q-card style="width: 440px; border-radius: 24px" class="q-pa-lg text-center shadow-10">
      <q-avatar
        size="72px"
        color="teal-1"
        text-color="teal-8"
        icon="check_circle"
        class="q-mb-md shadow-1"
      />
      <div class="text-h5 text-weight-bolder text-grey-9">Laporan Berhasil Terkirim!</div>
      <div class="text-body2 text-grey-7 q-mt-sm">
        Foto dari kamera Anda telah berhasil dianalisis AI dan dikirim ke sistem pemantauan
        wisata.
      </div>
      <div class="q-mt-lg">
        <q-btn
          unelevated
          rounded
          color="teal-8"
          label="Lihat Peta Kondisi"
          to="/peta"
          class="full-width text-weight-bold q-py-xs"
          no-caps
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])
</script>
