<template>
  <div class="folder-wrapper"   @click.stop="handleFocus">
      <div :class="['folder', folderClass]">

      </div>
      <div class="folder__count-wrapper">
        <span class="folder__count">
          {{ props.quantity }}
        </span>
      </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";

  const props = defineProps({
      folderType: {
          type: String,
          default: 'greenFolder'
      },
      quantity: {
          type: Number,
          default: 0
      }
  })


  const emit = defineEmits<{
      clickEvent
  }>()

  const handleFocus = (event: Event) => {
      emit('clickEvent')
  }


  const folderClasses = {
      greenFolder: 'folder__green',
      brownFolder: 'folder__brown',
      purpleFolder: 'folder__purple',
  }

  const folderClass = computed(() => folderClasses[props.folderType])
</script>