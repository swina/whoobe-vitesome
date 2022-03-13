<template>
    <div class="bars sidebarRight z-modal overflow-y-auto" v-if="editor.current">
        <!-- @mouseover="disableFloating()" @mouseout="disableFloating()" -->
        <div class="panelTitle uppercase"> {{ editor.tool.replace ( '-' , ' ') }}</div>
        <BlockElements v-if="editor.tool === 'elements'"/>
        <BlockEdit v-if="editor.tool === 'edit' && editor.current && editor.current.type != 'container'"/>
        <BlockCss v-if="editor.tool === 'css'"/>
        <BlockSnippets v-if="editor.tool === 'snippets'"/>
        <BlockLink v-if="editor.tool === 'link'"/>
        <!-- <BlockFont v-if="editor.tool==='font'"/> -->
        <!-- <BlockColor v-if="editor.tool==='text-color'" context="text"/>
        <BlockColor v-if="editor.tool==='bg-color'" context="bg"/> -->
        <!-- <BlockImage v-if="editor.tool==='image'"/> -->
        <BlockHeading v-if="editor.tool==='heading'"/>
        <BlockWindi v-if="editor.tool === 'customize'" :group="editor.toolGroup"/>
        <BlockSlider v-if="editor.tool === 'slider'"/>
    </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '/@/stores/editor'

    const editor = useEditorStore()
    
</script>
<style>
::-webkit-scrollbar{width:2px}::-webkit-scrollbar-track{background:#cccccc;border-radius:5px}::-webkit-scrollbar-thumb{background:#6c6c6d;border-radius:5px}
</style>