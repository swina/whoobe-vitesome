<template>
    <div class="bars sidebarRight" v-if="editor.tool"  @mouseover="disableFloating()" @mouseout="disableFloating()">
        <div class="titleBar bg-purple-900 uppercase"> {{ editor.tool }}</div>
        <BlockElements v-if="editor.tool === 'elements'"/>
        <BlockEdit v-if="editor.tool === 'edit' && editor.current && editor.current.type != 'container'"/>
        <BlockCss v-if="editor.tool === 'css'"/>
        <BlockSnippets v-if="editor.tool === 'snippets'"/>
        <BlockFont v-if="editor.tool==='font'"/>
        <BlockColor v-if="editor.tool==='text-color'" context="text"/>
        <BlockColor v-if="editor.tool==='bg-color'" context="bg"/>
        <BlockImage v-if="editor.tool==='image'"/>
        <BlockHeading v-if="editor.tool==='heading'"/>
    </div>
    
</template>

<script setup lang="ts">
import { useEditorStore } from '/@/stores/editor'
import { toggleContext } from '/@/composables/contextMenu'

    const editor = useEditorStore()
    const disableFloating = () => {
        toggleContext()
    }

    !editor.tool & editor.current ?
        editor.current.type === 'p' ? editor._tool ('rich') : 
        editor.tool && editor.current.type === 'container' ? editor._tool ( 'elements' ) : editor._tool ( 'css' ) : null
</script>
