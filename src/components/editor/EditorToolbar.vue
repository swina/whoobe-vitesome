<template>
    <Icon icon="mdi:chevron-right-box" class="cursor-pointer absolute top-0 right-0 m-1 text-gray-400 text-2xl z-20" @click="sidebar('')" title="Close sidebar"/>
    <div class="editor-toolbar text-2xl border-l border-gray-700">
        <Icon icon="tabler:template" class="icon-button ml-0 mb-1" :class="editor.tool==='snippets'?'text-purple-600':''" @click="sidebar('snippets')"  title="Snippets"/>
        <Icon icon="la:elementor" :class="editor.tool==='elements'?'text-purple-600':''" @click="sidebar('elements')" title="Add element"/>
        <Icon icon="file-icons:windi" :class="editor.tool==='customize'?'text-purple-600':null" @click="sidebar('customize')" title="Tailwind Controls"/>
        <Icon icon="ic:baseline-css" class="icon-button ml-0 mb-1" :class="editor.tool==='css'?'text-purple-600':''" @click="sidebar('css')" title="CSS & Style"/>
        <Icon icon="ic:outline-edit-attributes" class="text-xl icon-button ml-0 mb-1 cursor-pointer" :class="editor.tool==='attributes'?'text-purple-600':null" @click="sidebar('attributes')" title="Attributes" mode="editor"/>
        <Icon icon="mdi:widgets-outline" class="icon-button ml-0 mb-1" :class="editor.tool==='library'?'text-purple-600':null" @click="sidebar('library')" title="Library"/>
        <Icon icon="mdi:settings" :class="editor.tool==='settings'?'text-purple-600':null" @click="sidebar('settings')" title="Template settings"/>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '/@/composables/useActions'
import { useEditorStore } from '/@/stores/editor'

const editor = useEditorStore() //useStore()

const sidebar = ( action: string ) => {
    editor._tool ( action , editor.current )
}


</script>
