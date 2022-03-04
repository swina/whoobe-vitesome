<template>
    <component
        :id="element.id"
        :ref="element.id"
        :is="element.element" 
        :type="element.type" 
        :class="classe" 
        :style="stile" 
        v-model="element.content"
        :value="element.value" 
        v-html="element.content"
        :src="element.image && element.image.url?element.image.url:'no-image.png'" 
        :placeholder="element.placeholder" 
        :contenteditable="element.editable"
        @blur="handleInput"
        :data-id="element.id"
        data-type="element"
        :data-element-tag="element.type + ' ' +  element.element"
        :icon="element.tag==='iconify'?element.data.icon:null"
        title="Right click more options ...">
        
    </component>
    <div class="absolute inset-0 m-2" :class="selector" @click="selectBlock(element,$event),toggleContext" @contextmenu.prevent="selectBlock(element,$event),openContextMenu"></div>
</template>

<script setup lang="ts">
import { useEditorStore } from '/@/stores/editor'
import { computed , useAttrs, ref } from 'vue'
import { openContextMenu , toggleContext } from '/@/composables/contextMenu';
const editor = useEditorStore()
const attrs = useAttrs()

const props = defineProps ({
    element: Object,
    level: Number
})

const classe = computed(() => {
    let css = Object.values(props.element.css).join( ' ' ) + ' z-' + props.level
    if ( props.element.id === editor.current.id ){
        css += ' border border-green-600'
    } else {
        css += ' border border-dashed hover:border-green-600'
    }
    return css
})

const stile = computed(() => {
    return props.element.style
})

const component = computed ( () => {
    return props.element
})

const handleInput = (e) => {
    let text = e.target.innerHTML.replaceAll(/style=\".*"/gm,'')
    props.element.content = text 
}
const selector = computed( () => {
        return editor.current.id === props.element.id ?
            ' border border-red-500 ' + ' z-' + props.level :
            ' border hover:border-red-500 border-dashed '  + ' z-' + props.level
})
</script>