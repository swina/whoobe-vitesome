<template>
    <div v-if="editor.document" class="editor-document z-1 relative" data-document-tag="template">
        <container class="editor-block relative" :id="editor.document.json.blocks[0].id" :block="editor.document.json.blocks[0]" level="2" data-block-tag="template"/>
        <!-- <BlockFloatingBar class="z-modal absolute top-0 left-0 document-floating w-auto" v-if="editor.current.id === editor.document.json.blocks[0].id" @click="blockAction"/> -->
    </div>
</template>

<script lang="ts">

import { defineComponent, computed } from 'vue';
import { useEditorStore } from '/@/stores/editor';
import { useNavigatorStore } from '/@/stores/navigator';
import { selectBlock , blockPosition } from '/@/composables/useActions';

import '/@/styles/editor.css'

export default defineComponent({
  name: 'BlockMainContainer',
  setup() {
    const editor: any = useEditorStore();
    const navigation = useNavigatorStore();
    const template: any = editor.document ? editor.document.json.blocks[0] : null
    let position = computed(()=>{
      return blockPosition()
    })
    const blockAction = ( action: string , event:any ) => {
        console.log ( action , event )
    }
  return { 
        editor , 
        navigation, 
        template ,
        selectBlock,
        position,
        blockAction
    };
  },
});
</script>