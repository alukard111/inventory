import { defineStore } from "pinia";
import { computed, ref } from "vue";

interface Folder {
    folderType: string,
    quantity: number,
    id: number,
    row: number,
    col: number,
}


export const useFolderStore = defineStore('FolderStore', () => {

    const savedFolders = localStorage.getItem('folders')
    let targetFolder = ref<number | null>(null)

    const modalFolderColor = ref<string>('')

    const folders = ref<Folder[]>(savedFolders ? JSON.parse(savedFolders) : [
        {
            folderType: 'greenFolder',
            quantity: 5,
            id: 0,
            row: 1,
            col: 1
        },
        {
            folderType: 'purpleFolder',
            quantity: 2,
            id: 1,
            row: 1,
            col: 2
        },
        {
            folderType: 'brownFolder',
            quantity: 5,
            id: 2,
            row: 1,
            col: 3
        }
    ])

    const modalFolder = computed<Folder | null>(() => {
        const foundFolder = folders.value.find((folder) => {
            if (targetFolder.value !== null) {
                return folder.id === targetFolder.value
            }
            return false;
        });

        if (foundFolder) {
            modalFolderColor.value = foundFolder.folderType
            return foundFolder
        } else {
            return null
        }
    })

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

    const updateQuantity = (id: number , quantityDelete: number ) => {
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

    const updateRowAndCol = (id: number, col: number, row: number) => {
        const folderElem = folders.value.find((folder) => {
            return folder.id === id
        })

        const swapFolder = folders.value.find((folder) => {
            return (folder.row === row && folder.col === col)
        })

        if (swapFolder && folderElem) {
            swapFolder.col = folderElem.col
            swapFolder.row = folderElem.row
        }

        if (folderElem) {
            folderElem.col = col
            folderElem.row = row
        }
        saveFolders()
    }

    return { folders, targetFolder, modalFolder, modalFolderColor, updateQuantity, changeTargetFolder, updateRowAndCol }
})