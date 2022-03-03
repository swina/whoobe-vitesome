<template>
    <Icon icon="mdi:chevron-right-box" class="cursor-pointer absolute top-0 right-0 m-1 text-gray-400 text-2xl z-20" @click="sidebar('')" title="Close sidebar"/>
    <div class="editor-toolbar text-2xl border-l border-gray-700">
        <Icon icon="tabler:template" class="icon-button ml-0 mb-1" :class="iconTab==='snippets'?'text-purple-600':null" @click="sidebar('snippets')"  title="Snippets"/>
        <Icon icon="la:elementor" :class="iconTab==='elements'?'text-purple-600':null" @click="sidebar('elements'),iconTab='elements'" title="Add element"/>
        <Icon icon="file-icons:windi" :class="iconTab==='customize'?'text-purple-600':null" @click="sidebar('customize'),iconTTab='customize'" title="Tailwind Controls"/>
        <Icon icon="ic:baseline-css" class="icon-button ml-0 mb-1" :class="iconTab==='css'?'text-purple-600':null" @click="sidebar('css'),iconTab='css'" title="CSS & Style"/>
        <Icon icon="ic:outline-edit-attributes" class="text-xl icon-button ml-0 mb-1 cursor-pointer" @click="sidebar('attributes')" title="Attributes" mode="editor"/>
        <Icon icon="mdi:widgets-outline" class="icon-button ml-0 mb-1" :class="iconTab==='library'?'text-purple-600':null" @click="sidebar('library')" title="Library"/>
        <Icon icon="mdi:settings" :class="iconTab==='settings'?'text-purple-600':null" @click="sidebar('settings'),iconTab='settings'" title="Template settings"/>
    </div>
</template>

<script lang="ts">
import { defineComponent , ref } from 'vue'
import { dispatchEditorTool } from '/@/composables/useActions'
import { useNavigatorStore } from '/@/stores/navigator'

export default defineComponent({
    name: 'EditorToolbar',
    setup() {
        let iconTab = ref('')
        
        const navigation = useNavigatorStore()
        
        const sidebar = ( action: string ) => {
            dispatchEditorTool ( action )
        }

        const toggleSidebar = ()=>{
            console.log ( 'toggle' )
            navigation._sidebar()
        }

        return { sidebar , iconTab , toggleSidebar}
    },
})
</script>
