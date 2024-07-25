import { defineStore } from "pinia";
import { computed, ref } from "vue";

interface Folder {
    folderType: string,
    quantity: number,
    id: number
}

export const useFolderStore = defineStore('FolderStore', () => {

    // клик по папке
    // передается id папки
    // выводится цвет папки для modalFolder
    const savedFolders = localStorage.getItem('folders')
    let targetFolder = ref<Number | null>(null)
    const folders = ref<Folder[]>(savedFolders ? JSON.parse(savedFolders) : [
        {
            folderType: 'greenFolder',
            quantity: 5,
            id: 0
        },
        {
            folderType: 'purpleFolder',
            quantity: 2,
            id: 1
        },
        {
            folderType: 'brownFolder',
            quantity: 5,
            id: 2
        }
    ])

    const modalFolder = computed<Folder | null>(() => {
        const foundFolder = folders.value.find((folder) => {
            if (targetFolder.value !== null) {
                return folder.id === targetFolder.value;
            }
            return false;
        });
        return foundFolder || null;
    });

    const changeTargetFolder = (id: number | null) => {
        targetFolder.value = id

    }

    const deleteFolder = (id: number) => {
        const folderIndex = folders.value.findIndex((folder) => {
            return folder.id === id
        })
        folders.value.splice(folderIndex, 1)
        saveFolders()
    }

    const updateQuantity = (id: number, quantityDelete: number) => {
        const folder = folders.value.find((folder) => {
            return folder.id === id
        })

        if (folder) {
            folder.quantity -= quantityDelete
            if ( folder.quantity <= 0) {
                deleteFolder(id)
            } else {
                saveFolders()
            }
        }

    }

    const saveFolders = () => {
        localStorage.setItem('folders', JSON.stringify(folders.value))
    }

    return { folders, targetFolder, modalFolder, updateQuantity, changeTargetFolder }
})