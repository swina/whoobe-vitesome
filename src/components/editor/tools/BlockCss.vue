<template>
    <div v-if="editor.current" class="flex flex-col p-2">
        CSS
        <textarea v-model="editor.current.css.css"/>
        Container
        <textarea v-model="editor.current.css.container"/>
        Style
        <textarea v-model="editor.current.style"/>
        Semantic
        <select v-model="editor.current.semantic">
            <option v-for="option in semantic" :value="option">{{ option }}</option>
        </select>
        
    </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '/@/stores/editor'
import classes from '/@/composables/tw.classes'

const editor = useEditorStore()
const semantic = classes.semantics
</script>