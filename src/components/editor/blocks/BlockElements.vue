<template>
    <div class="titleBar bg-purple-900 uppercase">Elements</div>
    <div v-for="group in editor.elements" :key="group.label" class="flex flex-col w-full  cursor-pointer">
        <div class="titleBar"  :class="tab===group.label?'bg-blue-400':''" @click="tab=group.label">{{ group.label }}</div>
        <div v-if="tab===group.label" class="flex flex-row flex-wrap p-1 w-full bg-gray-800">
            <template v-for="element in group.elements" :key="element.label">
                <div class="bg-black m-1 hover:bg-purple-600 flex flex-col items-center h-16 w-16 ml-01 text-xs justify-center text-center  text-gray-300 rounded hover:text-white shadow" @click="newElement(element.name)">
                    <i class="iconify text-2xl" :data-icon="'ic:' + element.icon"/>
                    <span class="text-xs">{{ element.name }}</span>
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent , ref } from 'vue';
//import { useStore } from 'vuex'
import { useEditorStore } from '/@/stores/editor';
import Element from '../../../composables/useElementClass';
//import { getCurrent , getEditor } from '/@/composables/useActions'

export default defineComponent({
  name: 'BlockElements',
  setup() {
    const editor:any = useEditorStore()//useStore().state.editor;
    const tab = ref('')
    const newElement = async ( name: string )=>{
        if ( editor.current ){
            const el = await new Element().createElement(name)
            const current: any = editor.current    
            current.blocks.push ( el )
            editor.current = el 
            window.localStorage.setItem('w-current',JSON.stringify(current) )
        }
    }
    return { editor , tab, newElement };
  },
});
</script>