<template>
    <div  :class="blockCSS(block)">
        <ul class="flex flex-row w-full">
            <template v-for="(tab,n) in block.blocks.length" :key="tab">
                <li @click="index=n" class="cursor-pointer"  :class="tabCSS(n)" :data-active="n===index?true:false">
                    <span v-if="block.data.mode==='tabs'">{{ block.data.slides[n].name }}</span>
                </li>
            </template>
        </ul>
        <template v-for="(element,i) in block.blocks">
            <BlockPreview
                v-if="element.type === 'container' && index===i"
                :block="element"
                class="fade-in-slide"/>
            <ElementPreview
                :id="element.id"
                :element="element"
                v-if="element.type !='container' && element.type != 'slider' && index===i"
                class="fade-in-slide"
                />
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore , blockCSS } from '/@/composables/useActions'

const editor = useStore()

const index = ref ( 0 )

const props = defineProps ({
    block: Object
})

const slider = props.block

const tabCSS = (n) => {
    return n != index.value ? 
        props.block.data.css.default + ' ' + props.block.data.css.hover :
        props.block.data.css.active 
}

</script>

<style>
.fade-in-slide {
  animation: fadeIn 1.5s;
}
@keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}
</style>