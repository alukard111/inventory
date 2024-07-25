<template>
  <div class="modal-deleting-folders__wrapper">
      <div class="modal-deleting-folders">
          <div class="modal-deleting-folders__input">
              <input type="text" placeholder="Введите количество">
          </div>
          <div class="modal-deleting-folders__buttons">
            <BaseButton
              :buttonName="cancelModal"
              :buttonWhite="true"
              @click="handleCancel"
            />
            <BaseButton
              :buttonName="modalActive"
            />
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
  import BaseButton from "@/components/baseComponents/BaseButton.vue";
  import {ref} from "vue";

  const modalActive = ref<String>('Подтвердить')
  const cancelModal = ref<String>('Отмена')

  const emit = defineEmits<{
      cancelModal
  }>()

  const handleCancel = () => {
      emit('cancelModal')
  }

</script>