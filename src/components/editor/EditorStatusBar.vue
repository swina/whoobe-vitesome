<template>
    <div class="bars bottomBar pl-10 pr-64 text-gray-500 z-2xtop" :class="$attrs.class">
        <!-- <template v-for="(tab,index) in navigation.tabs" :key="'tab_' + index">
            <div class="tab" :class="active(index)" @click="navigation.tab = index">{{ tab.label }} <div @click="removeTab(index)"><i class="iconify text-xs ml-2" data-icon="mdi:close"/></div>
            </div>
        </template> -->

        <span class="mx-2">
            Project <span v-if="project" class="bg-bluegray-500 px-1 rounded">{{ project.data.name }}</span>
        </span>
        
        Template <input type="text" v-model="editor.document.name"/>
        
        <span @click="saveTemplate($event)" class="mx-2" title="Save template">
            <Icon icon="ic:baseline-save" class="text-xl"/>
        </span>

        <span @click="blockToProject($event)" class="mx-2" title="Add to project">
            <Icon icon="mdi:web" class="text-xl"/>
        </span>
        
        <span @click="preview" class="mx-2" title="Preview">
            <Icon icon="icon-park-outline:preview-open" class="text-xl"/>
        </span>

        <span @click="editor._tool('css')" class="mx-2" title="CSS">
            <Icon icon="ic:baseline-css" class="text-xl"/>
        </span>
        <input 
        v-if="editor.current && editor.current?.css" v-model="editor.current.css.css" class="mx-2 w-1/2"/>
        <!-- <div class="w-1/4"></div> -->
    </div>
    <div class="file-explorer fixed left-0 top-0 z-modal w-1/3 h-screen" v-if="selectFolder" @click="selectFolder=!selectFolder">
        <FileExplorer context="templates" :open="selectFolder" :onlyFolder="true"/>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PREVIEW , setLocalStorage , useStore } from '/@/composables/useActions'
import { openContextDialog } from '/@/composables/contextMenu';
import { status } from '/@/composables/useNavigation'
import { project } from '/@/composables/useProject'
import { saveFile } from '/@/composables/useLocalApi';
import { message } from '/@/composables/useUtils'

const editor = useStore()

const selectFolder = ref(false)

const preview = () => {
    setLocalStorage ( PREVIEW , editor.document )
    editor._preview()
}

const blockToProject = (e) => {
    status.dialog = 'BlockToProject'
    status.dialogTitle = 'Add to project'
    openContextDialog( e )
}




const saveTemplate = async () => {
    if ( editor.document?.path ){
        await saveFile ( editor.document )
        message.data = 'File saved'
    } else {
        selectFolder.value = true 
    }
    // await fetch ( 'http://localhost:9000/template/' + editor.document.name.replaceAll(' ','-').toLowerCase() ,{
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(editor.document) 
    // })
    console.log ( 'File saved' )
}
</script>