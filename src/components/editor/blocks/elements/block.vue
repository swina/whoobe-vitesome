<template>
    <div 
        v-if="block" 
        :ref="block.id" 
        :key="block.id" 
        class="editor-block relative p-2" 
        :class="current(block,false)" 
        :data-block-tag="block.semantic || block.element + ' ' + level"
        :id="block.id"
        :style="block.style"       
    >
        <template v-for="element in block.blocks" :key="element.id">
            <block
                v-if="element.type === 'container'"
                :block="element"
                :level="level+1"/>
            <Element
                :id="element.id"
                :element="element"
                v-if="element.type !='container'"
                :level="parseInt(level)+1"
                @click="selectBlock(element,$event)"
                @contextmenu.prevent="selectBlock(element,$event)"/>
        </template>
    </div>
    <div class="absolute inset-0 m-2" :class="selector" @click="selectBlock(block,$event),toggleContext" @contextmenu.prevent="selectBlock(block,$event),openContextMenu"></div>
</template>

<script setup lang="ts">
import { computed , ref } from 'vue'
import { useEditorStore } from '/@/stores/editor';
import { useNavigatorStore } from '/@/stores/navigator';
import '/@/styles/editor.css'
import { dispatch , selectBlock , blockCoords , floatingCoords } from '/@/composables/useActions'
import { openContextMenu , toggleContext } from '/@/composables/contextMenu';

    const editor = useEditorStore()
    const navigation = useNavigatorStore()

    const props = defineProps ({
        block: Object,
        level: Number
    })

    const current = ( block:object , flag: boolean = false ) => {
        return Object.values ( props.block.css ).join ( ' ' )
    }

    const selector = computed( () => {
        return editor.current.id === props.block.id ?
            ' border border-red-500 ' + ' z-' + props.level :
            ' border hover:border-red-500 border-dashed '  + ' z-' + props.level
    })
    
</script>