<template>
  <div class="base-button__wrapper">
      <button :class="['base-button', buttonWhite ? 'base-button__white' : '']" @click="handleClick" >
        {{ props.buttonName }}
      </button>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    buttonName: {
      type: String,
      default: 'Base button'
    },
    buttonWhite: {
        type: Boolean,
        default: false
    }
  })

  const emit = defineEmits<{
      click
  }>()

  const handleClick = () => {
      emit('click')
  }


</script>