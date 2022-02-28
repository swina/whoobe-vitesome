<template>
    <div v-if="editor.document" class="editor-document z-1" data-document-tag="template">
        <container :block="editor.document.json.blocks[0]" level="1" @selected="isContainer"/>
    </div>
   
</template>

<script lang="ts">

import { defineComponent, ref, computed } from 'vue';
//import { useStore } from 'vuex'
import { useEditorStore } from '/@/stores/editor';
import { useNavigatorStore } from '/@/stores/navigator';

import '/@/styles/editor.css'

export default defineComponent({
  name: 'BlockMainContainer',
  setup() {
    const editor: any = useEditorStore();
    const navigation = useNavigatorStore();
    const title = ref('Editor');
    
    console.log ( editor )
    const template: any = editor.document ? editor.document.json.blocks[0] : null
    //const template = getEditor().document
    const isContainer = ( block:any )=>{
      console.log ( 'Selected container ' , block )
    }
    return { 
        title , 
        editor , 
        navigation, 
        template ,
        isContainer
    };
  },
});
</script>