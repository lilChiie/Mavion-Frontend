<template>
  <q-dialog
    :model-value="modelValue"
    backdrop-filter="blur(6px)"
    transition-show="scale"
    transition-hide="scale"
    @update:model-value="(val) => $emit('update:modelValue', val)"
  >
    <q-card flat class="status-modal-card q-pa-lg text-center overflow-hidden">
      <Motion
        :initial="{ scale: 0.5, opacity: 0 }"
        :animate="{ scale: 1, opacity: 1 }"
        :transition="{ type: 'spring', stiffness: 300, damping: 20 }"
        class="q-mb-md flex flex-center"
      >
        <q-avatar
          :size="iconSize"
          :class="config.avatarBgClass"
          :text-color="config.iconColor"
          class="status-avatar shadow-2"
        >
          <q-icon :name="icon || config.iconName" size="36px" />
        </q-avatar>
      </Motion>

      <div class="q-px-sm">
        <h3 class="text-h6 text-weight-bolder text-grey-9 q-my-none">
          {{ title || config.defaultTitle }}
        </h3>
        <p
          class="text-body2 text-grey-7 q-mt-sm line-height-relaxed"
          :class="type === 'success' ? 'q-mb-xs' : 'q-mb-lg'"
        >
          {{ message }}
        </p>
      </div>

      <div v-if="type !== 'success'" class="row items-center gap-md justify-center">
        <q-btn
          v-if="showCancel || type === 'confirm'"
          flat
          rounded
          color="grey-7"
          :label="cancelLabel"
          no-caps
          class="text-weight-bold q-px-lg col"
          @click="onCancel"
        />

        <q-btn
          unelevated
          rounded
          :color="config.btnColor"
          :label="confirmLabel || config.defaultConfirmLabel"
          no-caps
          class="text-weight-bold q-px-lg col shadow-1"
          @click="onConfirm"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, watch, onBeforeUnmount } from 'vue'
import { Motion } from 'motion-v'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'success',
  },
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
  confirmLabel: {
    type: String,
    default: '',
  },
  cancelLabel: {
    type: String,
    default: 'Batal',
  },
  showCancel: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
  iconSize: {
    type: String,
    default: '72px',
  },
  autoClose: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

let autoCloseTimer = null

watch(
  () => props.modelValue,
  (newVal) => {
    if (autoCloseTimer) clearTimeout(autoCloseTimer)
    if (newVal && props.autoClose > 0) {
      autoCloseTimer = setTimeout(() => {
        emit('update:modelValue', false)
      }, props.autoClose)
    }
  },
)

onBeforeUnmount(() => {
  if (autoCloseTimer) clearTimeout(autoCloseTimer)
})

const configMap = {
  success: {
    iconName: 'check_circle',
    iconColor: 'teal-8',
    avatarBgClass: 'bg-teal-1',
    btnColor: 'teal-8',
    defaultTitle: 'Berhasil!',
    defaultConfirmLabel: 'Selesai',
  },
  warning: {
    iconName: 'warning',
    iconColor: 'amber-9',
    avatarBgClass: 'bg-amber-1',
    btnColor: 'amber-9',
    defaultTitle: 'Peringatan',
    defaultConfirmLabel: 'Mengerti',
  },
  error: {
    iconName: 'error',
    iconColor: 'red-8',
    avatarBgClass: 'bg-red-1',
    btnColor: 'red-8',
    defaultTitle: 'Terjadi Kesalahan',
    defaultConfirmLabel: 'Coba Lagi',
  },
  info: {
    iconName: 'info',
    iconColor: 'blue-8',
    avatarBgClass: 'bg-blue-1',
    btnColor: 'blue-8',
    defaultTitle: 'Informasi',
    defaultConfirmLabel: 'Oke',
  },
  confirm: {
    iconName: 'help_outline',
    iconColor: 'teal-8',
    avatarBgClass: 'bg-teal-1',
    btnColor: 'teal-8',
    defaultTitle: 'Konfirmasi Aksi',
    defaultConfirmLabel: 'Ya, Lanjutkan',
  },
}

const config = computed(() => configMap[props.type] || configMap.success)

function onConfirm() {
  emit('confirm')
  emit('update:modelValue', false)
}

function onCancel() {
  emit('cancel')
  emit('update:modelValue', false)
}
</script>

<style scoped>
.status-modal-card {
  width: 100%;
  max-width: 400px;
  border-radius: 24px !important;
  background: #ffffff;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.status-avatar {
  border: 4px solid #ffffff;
}

.line-height-relaxed {
  line-height: 1.5;
}
</style>
