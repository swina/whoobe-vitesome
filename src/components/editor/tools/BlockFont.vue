<template>
    <div class="flex flex-col p-2">
        Font Family
        <select v-model="selectedFont" @change="setFont">
            <option v-for="(font,index) in options" :value="font" :key="font"> {{ font }}</option>
        </select>
        Size
        <select v-model="selectedSize"  @change="setSize">
            <option v-for="size in sizes" :value="size" :key="size"> {{ size.split('-')[1] }}</option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { ref , computed } from 'vue'
import { useEditorStore } from '/@/stores/editor'
import classes from '/@/composables/tw.classes'
import { updateCSS , matchCSS } from '/@/composables/useActions'

const sizes = classes.textSize
const editor = useEditorStore()
const fonts = editor.fonts
const options = fonts.replaceAll('+',' ').split('|')

let selectedFont = ref(
    editor.current.font ? editor.current.font : ''
)
let selectedSize = ref('')
// sizes.forEach ( size => {
//     editor.current.css.css.includes ( size ) ?
//         selectedSize.value = size : null
// })

selectedSize.value = matchCSS ( sizes , editor.current.css.css )

const setFont = computed( () => {
    editor.current.style = `font-family:"${selectedFont.value}"` 
    editor.current.font = selectedFont.value
})
const setSize = computed( () => {
    editor.current.css.css = updateCSS ( sizes , editor.current.css.css , selectedSize.value )
    
})


</script>