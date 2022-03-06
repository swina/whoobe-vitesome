<template>
    <div class="flex flex-col cursor-pointer w-full" v-if="current && mode==='tree'">
        
        <div class="flex flex-row w-full pb-1 items-center capitalize" @click="$store.dispatch('setCurrent',current)">
            <m-icon :icon="current.icon"/> {{ current.semantic || current.element  }}
        </div>    
        <template v-for="block in current.blocks" :key="'tree_' + block.id">
            <div class="pl-2 flex w-full flex-row items-center pb-1 capitalize">
                <span v-if="!block.blocks">
                    <m-icon  :icon="block.icon"/> {{ block.semantic || block.element }} 
                </span>
                <BlockTree v-if="block.blocks" :current="block"/>
            </div>            
        </template>
    </div>
    <div v-if="current && mode!='tree'" class="flex text-xs">
        <template v-for="block in current.blocks" :key="block.id">
            <div class="flex items-center breadcumb bg-black text-white px-4 justify-center ">{{ block.element }}</div>
            <BlockTree v-if="block.blocks" :current="getParent(block.id)" mode="bar"/>
        </template>
    </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '/@/stores/editor'
import jp from 'jsonpath'

const editor = useEditorStore()

const props = defineProps({
    current: Object,
    mode: String
})

const getParent = ( id: String )=> {
    return jp.parent ( editor.document.json , '$..blocks[?(@.id=="' + id + '")]' )
}

</script>
