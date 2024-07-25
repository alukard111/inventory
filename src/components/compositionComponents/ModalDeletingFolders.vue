<template>
    <div class="modal-deleting-folders__wrapper">
        <div class="modal-deleting-folders">
            <div class="modal-deleting-folders__input">
                <input type="text"
                       v-model="inputValue"
                       @input="filterInput"
                       placeholder="Введите количество">
            </div>
            <div class="modal-deleting-folders__buttons">
                <BaseButton
                        :buttonName="cancelModal"
                        :buttonWhite="true"
                        @click="handleCancel"
                />
                <BaseButton
                        :buttonName="modalActive"
                        @click="deleteFolder"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/baseComponents/BaseButton.vue";
import {ref} from "vue";
import {useFolderStore} from "@/stores/FolderStore";

const modalActive = ref<string>('Подтвердить')
const cancelModal = ref<string>('Отмена')
const inputValue = ref<number>()
const folderStore = useFolderStore()


const props = defineProps({
    folderId: {
        type: Number,
        default: 0
    },
    folderCount: {
        type: Number,
        default: 0
    }
})

const emit = defineEmits<{
    cancelModal
}>()

const handleCancel = () => {
    emit('cancelModal')
}

const filterInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    target.value = target.value.replace(/\D/g, '');
    if (props.folderCount < target.value) {
        inputValue.value = props.folderCount
    } else {
        inputValue.value = Number(target.value);
    }
};

const deleteFolder = () => {
    if (inputValue.value > 0) {
        if (typeof props.folderId === "number" && typeof inputValue.value === "number") {
            folderStore.updateQuantity(props.folderId, inputValue.value)
            inputValue.value = 0
        }
        emit('cancelModal')
    } else {
        emit('cancelModal')
    }
}


</script>