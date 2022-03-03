<template>
    <div class="bars sidebarRight" v-if="editor.tool"  @mouseover="disableFloating()" @mouseout="disableFloating()">
        <div class="titleBar bg-purple-900 uppercase"> {{ editor.tool }}</div>
        <BlockElements v-if="editor.tool === 'elements'"/>
        <BlockCss v-if="editor.tool === 'css'"/>
        <BlockSnippets v-if="editor.tool === 'snippets'"/>
        <BlockFont v-if="editor.tool==='font'"/>
        <BlockColor v-if="editor.tool==='text-color'" context="text"/>
        <BlockColor v-if="editor.tool==='bg-color'" context="bg"/>
    </div>
    
</template>

<script setup lang="ts">
//import { defineComponent } from 'vue'
import { useEditorStore } from '/@/stores/editor'

//export default defineComponent({
//    setup() {
        const editor = useEditorStore()
        const disableFloating = () => {
            let floating = document.querySelector ( '.editor-floating' )
            floating ? 
                floating.classList.contains('hidden') ?
                    floating.classList.remove ( 'hidden' ) : 
                        floating.classList.add ( 'hidden' ) :
                            null
        }
//        return { editor }        
//    },
//})
</script>
