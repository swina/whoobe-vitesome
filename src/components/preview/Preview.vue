<template>
    <div class="fixed top-0 left-0 bg-white h-screen w-screen z-modal preview ">
        <BlockPreview :block="editor.document.json.blocks" :level="2"/>
    </div>
    <div class="fixed top-0 right-0 cursor-pointer text-gray-200 hover:text-gray-400 z-modal" @click="editor._preview()"><Icon icon="mdi:close" class="text-5xl"/></div>
</template>

<script setup lang="ts">
import { useStore } from '/@/composables/useActions'
const editor = useStore()
</script>