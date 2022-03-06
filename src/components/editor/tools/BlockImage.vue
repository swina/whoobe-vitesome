<template>
    <div v-if="editor.current && canHaveImage" class="flex flex-col p-2">
        Image URL
        <textarea v-model="editor.current.image.url" class="my-2 font-mono text-xs"/>
        <img :src="editor.current.image.url" v-if="editor.current.image.url"/>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useEditorStore } from '/@/stores/editor'
const editor = useEditorStore()
const canHaveImage = computed ( () => {
    return editor.current && ( editor.current.type === 'container' || editor.current.element === 'img' ) ?
        true :
        editor._tool ( '' )
})
</script>