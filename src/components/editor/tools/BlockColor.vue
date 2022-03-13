<template>
    <div v-if="editor.colors" key="colorTool" class="cursor-pointer text-center flex flex-col col-span-2">
        <template v-for="color in Object.keys(editor.colors)" :key="color">
            <div class="flex flex-row flex-wrap justify-around my-1 cursor-pointer">
                <template v-for="bgcolor in editor.colors[color]" :key="bgcolor">
                    <div class="h-4 w-4 border border-gray-800 rounded-full" :class="bgcolor" :title="bgcolor" @click="setColor(bgcolor)">
                    </div>
                </template>
            </div>
        </template>
        <div class="flex flex-row flex-wrap justify-around my-1 cursor-pointer">
            <div class="flex items-center justify-center h-4 w-4 border border-gray-800 rounded-full text-red-600 bg-transparent" title="bg-transparent" @click="setColor('bg-transparent')">
                <Icon icon="mdi:close" class="text-red-600"/>
            </div>
            <div class="h-4 w-4 border border-gray-800 rounded-full bg-white" title="bg-white" @click="setColor('bg-white')"></div>
            <div class="h-4 w-4 border border-gray-800 rounded-full bg-black" title="bg-black" @click="setColor('bg-black')"></div>
        </div>
        <div class="h-4 w-4 border border-gray-800 rounded-full m-auto mt-4" :title="getColor" :class="getColor"></div> 
        Current Color
        <div class="absolute bottom-0 cursor-pointer w-auto" @click="initColors">
            <icon icon="mdi:refresh" class="text-2xl"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useEditorStore } from '/@/stores/editor'
import { updateColorCSS , matchColorCSS , initColors } from '/@/composables/useActions'

const editor = useEditorStore()
const props = defineProps({
  context: String
})

const setColor = ( color:string ) => {
    editor.current.css.css = updateColorCSS ( editor.colors , editor.current.css.css , color , props.context )
}

const getColor = computed( () => {
    return matchColorCSS ( editor.colors , editor.current.css.css , props.context )
})

const loadColors = ()=>{
    initColors()
}

</script>