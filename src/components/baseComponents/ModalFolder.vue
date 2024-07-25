<template>
    <div :class="['modal-folder__wrapper']">
        <div class="modal-folder" >
            <span class="modal-folder__close" @click="handleCloseWindow"></span>
            <div :class="['modal-folder__folder', folderClass]">

            </div>
            <div class="modal-folder__stubs">
              <div class="modal-folder__stub modal-folder__stub-title"></div>
              <div class="modal-folder__description-modal description-modal">
                  <div class="modal-folder__stub description-modal__stub"></div>
                  <div class="modal-folder__stub description-modal__stub"></div>
                  <div class="modal-folder__stub description-modal__stub"></div>
                  <div class="modal-folder__stub description-modal__stub"></div>
                  <div class="modal-folder__stub description-modal__stub"></div>
              </div>
            </div>
            <div class="modal-folder__button" >
                <BaseButton
                    :buttonName="'Удалить предмет'"
                    @click="handleOpenDeleteWindow"
                />
            </div>

        </div>


    </div>
</template>

<script setup lang="ts">
    import BaseButton from "@/components/baseComponents/BaseButton.vue";
    import { computed, ref } from "vue";
    import ModalDeletingFolders from "@/components/compositionComponents/ModalDeletingFolders.vue";





    const props = defineProps({
        isVisible: {
            type: Boolean,
            default: false
        },
        folderType: {
            type: String,
            default: 'greenFolder'
        },
    })

    const activeClass = computed(() => props.isVisible ? 'modal-folder__wrapper-active' : '')
    //
    const emit = defineEmits<{
        closeWindow: [event: Event],
        openDeleteWindow
    }>()

    const handleCloseWindow = (event: Event) => {
        emit('closeWindow', event)
    }
    const handleOpenDeleteWindow = () => {
        emit('openDeleteWindow')
    }


    const folderClasses = {
        greenFolder: 'folder__green',
        brownFolder: 'folder__brown',
        purpleFolder: 'folder__purple',
    }

    const folderClass = computed(() => folderClasses[props.folderType])


</script>