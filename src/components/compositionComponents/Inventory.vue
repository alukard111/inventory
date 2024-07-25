<template>
    <div class="wrapper-inventory">
        <div class="inventory" @click="closeModalWindow" ref="inventory">
            <FolderComponent
                    v-for="folder in folderStore.folders"
                    :key="folder.id"
                    :folderType="folder.folderType"
                    :quantity="folder.quantity"
                    :gridCol="folder.col"
                    :gridRow="folder.row"
                    :isFolderActive="folderStore.modalFolder?.id === folder.id"
                    @onMouseDown="ondrag($event, folder)"
                    @clickEvent="openModalWindow(folder.id)"
            />
        </div>
        <Transition name="modal">
            <ModalFolder
                    v-show="modalActive && folderStore.modalFolder"
                    @closeWindow="closeModalWindow"
                    @openDeleteWindow="openDeleteWindow"
                    :folderType="folderStore.modalFolderColor"
            />
        </Transition>
        <ModalDeletingFolders
                v-show="modalDeletingFoldersActive"
                :folderCount="folderStore.modalFolder?.quantity"
                :folderId="folderStore.modalFolder?.id"
                @cancelModal="closeDeleteWindow"
        />
    </div>
</template>

<script setup lang="ts">
import FolderComponent from "@/components/baseComponents/FolderComponent.vue";
import ModalFolder from "@/components/baseComponents/ModalFolder.vue";
import {useFolderStore} from "@/stores/FolderStore";
import {computed, ref} from "vue";
import ModalDeletingFolders from "@/components/compositionComponents/ModalDeletingFolders.vue";


const folderStore = useFolderStore()
const modalActive = ref<Boolean>(false)
const modalDeletingFoldersActive = ref<Boolean>(false)
const inventory = ref()

const openModalWindow = (id: number) => {
    folderStore.changeTargetFolder(id)
    modalActive.value = true
}

const closeModalWindow = (event: Event) => {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('folder-wrapper')) {
        modalActive.value = false;
        folderStore.changeTargetFolder(null)
    }
    closeDeleteWindow()

};

const openDeleteWindow = () => {
    modalDeletingFoldersActive.value = true
}

const closeDeleteWindow = () => {
    modalDeletingFoldersActive.value = false
}


// Наверняка можно и проще
// Лёгкий путь не стал искать
const ondrag = (event: MouseEvent, item: object) => {
    const draggingItem = item

    const clone = (event.target as HTMLElement).cloneNode(true)
    let isDragNotMove = true

    if (clone instanceof HTMLElement) {

        const shiftX = event.clientX - clone.getBoundingClientRect().left
        const shiftY = event.clientY - clone.getBoundingClientRect().top

        clone.style.left = `${event.clientX - shiftX}px`
        clone.style.top = `${event.clientY - shiftY}px`
        document.body.appendChild(clone);

        const moveAt = (clientX: number, clientY: number) => {
            clone.style.left = `${clientX - event.offsetX}px`
            clone.style.top = `${clientY - event.offsetY}px`
        };

        moveAt(event.clientX, event.clientY);

        const onMouseMove = (event: MouseEvent) => {
            moveAt(event.clientX, event.clientY)

            if (isDragNotMove) {
                clone.classList.add('clone-folder')
                isDragNotMove = false
            }
        };

        const onMouseUp = (event: MouseEvent) => {
            const containerRect = inventory.value.getBoundingClientRect();
            const offsetX = event.clientX - containerRect.left
            const offsetY = event.clientY - containerRect.top

            updateRowAndCol(offsetX, offsetY);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            clone.remove();
        };

        const updateRowAndCol = (offsetX: number, offsetY: number) => {
            const cellHeight = Math.round(inventory.value.offsetHeight / 5)
            const cellWidth = Math.round(inventory.value.offsetWidth / 5)

            let colCell = Math.ceil(offsetX / cellWidth)
            let rowCell = Math.ceil(offsetY / cellHeight)

            if (colCell > 5) {
                colCell = 5
            } else if (colCell < 1) {
                colCell = 1
            }

            if (rowCell > 5) {
                rowCell = 5
            } else if (rowCell < 1) {
                rowCell = 1
            }

            folderStore.updateRowAndCol(draggingItem.id, colCell, rowCell)
        };

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }
}


</script>