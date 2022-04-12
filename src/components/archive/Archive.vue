<template>
    
    <div  class="p-4 md:ml-1/4 lg:ml-1/5 md:w-3/4 lg:w-4/5 pl-12 pr-10 top-0 left-0 absolute z-modal h-screen w-screen bg-gray-100 overflow-y-auto">
        <div class="w-full h-10 bg-bluegray-800 z-modal absolute top-0 left-0">Test</div>
        <TreeContainer context="templates" :open="open" @close="open=!open" @file="loadFile"/>
        <!-- <FileExplorer context="templates" :open="open" @close="open=!open" @file="loadFile"/> -->
        <div v-if="fileInfo" class="relative flex flex-col">
            <ul class="border-b mb-4 sticky">
                <li>Path : {{ fileInfo.path }}</li>
                <li>Template name : {{fileInfo.name }}</li>
                <li>Description : {{ fileInfo.description }}</li>
                <li>Folder: {{ currentFolder.data }}</li>
                <!-- <li>Path: {{ fileInfo.path }}</li> -->
            </ul>
            <div class="absolute right-0 flex mt-10">
                <!-- <button @click="saveToCurrentFolder">Move to folder</button> -->
                <!-- <button v-if="fileInfo && status.current?.path && status.current.type==='directory'" @click="moveToFolder">Move to folder</button> -->
                <!-- <button class="bg-red-700" @click="deleteFile">Delete</button> -->
                <button @click="copyFile">Make a copy</button>
                <button @click="editFile">Edit</button>
            </div>
            <div class="bg-transparent mx-auto w-full">
                <BlockPreview v-if="fileInfo?.json" :block="fileInfo.json.blocks" :level="2"/>
            </div>

        </div>
        <!-- <div class="titleBar relative">
            Templates
            <div class="absolute right-0 top-0 m-2 text-gray-300" title="Create folder"><span><Icon icon="bi:folder-plus" class="text-lg"></Icon></span></div>
        </div>
        <FileTree :tree="localData.folders.children" @openTemplate="loadFile"/> -->
        <span  class="text-3xl absolute right-0 top-0 cursor-pointer" @click="switchToEditor"><icon icon="mdi:close"></icon></span>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { tabberAddTab , tabber, status, switchToEditor } from '/@/composables/useNavigation'
import { localData , openFolder , openPath, openSubFolder , openFile , saveFile, moveFile,  template , currentFolder } from '/@/composables/useLocalApi'
import EditorPanelVue from '../editor/EditorPanel.vue';
import { useStore } from '/@/composables/useActions';
import { message, dragDrop } from '/@/composables/useUtils'

const editor = useStore()

const emits = defineEmits ( {
    disable:String
})

status.context = 'templates'
status.current = null
let dragAndDrop = ref(dragDrop)

let open = ref ( true )
let fileInfo = ref ({})

const loadFile = async ( file:Object , filePath:String ) => {
    
    fileInfo.value = file 
    fileInfo.value.path = filePath
    editor._document ( file )
    
}

const editFile = () => {
     tabberAddTab ( {
        component: 'Editor',
        label: fileInfo.value.name,
        object: fileInfo.value
    })
}

const copyFile = async () =>{
    let newFile = fileInfo.value
    let fileName = prompt ( 'Template name?')
    newFile.name = fileName
    newFile.path = currentFolder.path + '/' + fileName + '.json'
    await saveFile ( newFile )
    message.data = 'New file created'
}
const deleteFile = async ( ) => {
    console.log ( 'Delete file' , fileInfo.value.path )
}


const saveToCurrentFolder = async () => {
    let path = currentFolder.path 
    let fileName = fileInfo.value.path.split('/')[fileInfo.value.path.split('/').length-1]
    console.log ( fileName )
    console.log ( path )
}

const moveToFolder = async () => {
    let sourcePath = fileInfo.value.path
    let targetPath = status.current.path + '/' + sourcePath.split('/')[sourcePath.split('/').length-1]
    const res = await moveFile ( sourcePath , targetPath )
    message.data = await res.message
    console.log ( res )
    console.log ( "move => " , sourcePath )
    console.log ( "to => ", targetPath )

}

</script>