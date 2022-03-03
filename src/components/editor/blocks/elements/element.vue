<template>
    <component
        :id="element.id"
        :ref="element.id"
        :is="element.element" 
        :type="element.type" 
        :class="classe" 
        :style="stile" 
        v-html="element.content" 
        v-model="element.content"
        :value="element.value" 
        :src="element.image && element.image.url?element.image.url:'no-image.png'" 
        :placeholder="element.placeholder" 
        :contenteditable="element.editable"
        
        @blur="handleInput"
        :data-id="element.id"
        data-type="element"
        :data-element-tag="element.type + ' ' +  element.element"
        :icon="element.tag==='iconify'?element.data.icon:null">
    </component>
</template>

<script setup lang="ts">
import { computed , useAttrs, ref } from 'vue'
const attrs = useAttrs()

const element = ref ( 
    attrs.block ? attrs.block : null
)

const classe = computed(() => {
    return Object.values(attrs.block.css).join( ' ' ) + ' z-' + attrs.level
})

const stile = computed(() => {
    return element.style
})

const component = computed ( () => {
    return attrs.block
})

const handleInput = (e) => {
    if ( !element ) return
        let text = e.target.innerHTML.replaceAll(/style=\".*"/gm,'')
        element.content = text 
}
</script>