<template>
  <div class="wrapper-inventory">
    <div class="inventory" @click="closeModalWindow">
      <FolderComponent
        v-for="folder in folderStore.folders"
        :key="folder.id"
        :folderType="folder.folderType"
        :quantity="folder.quantity"
        @clickEvent="openModalWindow(folder.id)"
      />
    </div>
    <Transition name="modal">
      <ModalFolder
        v-show="modalActive"
        @closeWindow="closeModalWindow"
        @openDeleteWindow="openDeleteWindow"
        :folderType="folderStore.modalFolder?.folderType"
      />
    </Transition>
    <ModalDeletingFolders
      v-show="modalDeletingFoldersActive"
      @cancelModal="closeDeleteWindow"
    />
  </div>
</template>

<script setup lang="ts">
  import FolderComponent from "@/components/baseComponents/FolderComponent.vue";
  import ModalFolder from "@/components/baseComponents/ModalFolder.vue";
  import { useFolderStore } from "@/stores/FolderStore";
  import {computed, ref} from "vue";
  import ModalDeletingFolders from "@/components/compositionComponents/ModalDeletingFolders.vue";

  const folderStore = useFolderStore()
  const modalActive = ref<Boolean>(false)
  const modalDeletingFoldersActive = ref<Boolean>(false)
  const openModalWindow = (id: number) => {
      folderStore.changeTargetFolder(id)
      modalActive.value = true
  }

  const closeModalWindow = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target.classList.contains('folder-wrapper') ) {
          modalActive.value = false;
      }
      closeDeleteWindow()

  };

  const openDeleteWindow = () => {
      modalDeletingFoldersActive.value = true
  }

  const closeDeleteWindow = () => {
      modalDeletingFoldersActive.value = false
  }

</script>