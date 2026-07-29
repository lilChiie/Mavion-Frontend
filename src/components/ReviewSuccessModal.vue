<template>
  <q-dialog
    :model-value="modelValue"
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
        class="q-mb-sm shadow-1"
      />
      <div class="text-h5 text-weight-bolder text-grey-9">Review Berhasil Terkirim!</div>
      <div class="text-body2 text-grey-7 q-mt-xs">
        Terima kasih atas ulasan Anda. Sistem AI telah menganalisis sentimen review secara
        real-time.
      </div>

      <div
        v-if="sentiment"
        class="bg-grey-2 q-pa-md q-mt-md rounded-borders text-left"
        style="border-radius: 16px"
      >
        <div class="row items-center justify-between q-mb-xs">
          <span class="text-caption text-grey-6 text-weight-bold">Hasil Analisis AI:</span>
          <q-chip
            dense
            :class="sentiment.chipClass"
            class="text-weight-bold q-px-sm"
            style="font-size: 11px"
          >
            {{ sentiment.label }}
          </q-chip>
        </div>
        <div class="row items-center gap-xs q-mb-xs">
          <q-icon
            v-for="star in 5"
            :key="star"
            :name="star <= rating ? 'star' : 'star_border'"
            :color="star <= rating ? 'amber-7' : 'grey-4'"
            size="16px"
          />
          <span class="text-caption text-weight-bold text-grey-7 q-ml-xs">{{ rating }}/5</span>
        </div>
        <div class="text-caption text-grey-8 ellipsis-2-lines italic">
          "{{ text }}"
        </div>
      </div>

      <div class="q-mt-lg">
        <q-btn
          unelevated
          rounded
          color="teal-8"
          label="Selesai & Lihat Review"
          class="full-width text-weight-bold q-py-xs"
          no-caps
          v-close-popup
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
  sentiment: {
    type: Object,
    default: null,
  },
  rating: {
    type: Number,
    default: 5,
  },
  text: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue'])
</script>
