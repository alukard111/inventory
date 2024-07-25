<template>
  <div :class="['folder-wrapper', isFolderActive ? 'folder-wrapper_active' : '']" @mousedown.stop="handleOnMouseDown($event)"
       @click.stop="handleFocus" :style="{ 'grid-column': props.gridCol, 'grid-row': props.gridRow }">
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
          default: ''
      },
      quantity: {
          type: Number,
          default: 0
      },
      gridCol: {
          type: Number,
          default: 0
      },
      gridRow: {
          type: Number,
          default: 0
      },
      isFolderActive: {
          type: Boolean,
          default: false
      }
  })


  const emit = defineEmits<{
      clickEvent,
      onMouseDown: [event: MouseEvent],
  }>()

  const handleFocus = () => {
      emit('clickEvent')
  }

  const handleOnMouseDown = (event: MouseEvent) => {
      emit('onMouseDown', event)
  }

  const folderClasses = {
      greenFolder: 'folder__green',
      brownFolder: 'folder__brown',
      purpleFolder: 'folder__purple',
  }

  const folderClass = computed(() => folderClasses[props.folderType])
</script>