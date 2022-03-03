<template>
    <div :class="size" class="editor-dashboard relative m-10 p-2" @click="editor.current=editor.document">
      <div class="grid grid-cols-12 z-0 absolute inset-0 m-2 border mt-10" v-if="editor.showColumns">
        <template v-for="(n) in 12" :key="n">
          <div :class="n===1?'border-l':''" class="border-r h-4 h-screen"></div>
        </template>
      </div>
      <div class="mt-2 h-screen overflow-y-scroll pb-40" @click="editor.current = editor.document.json.blocks[0]">
        <BlockContainer/>
      </div>
    </div>
    <EditorToolbar/>
    
    <SidebarRight v-if="editor.tool"/>
    <transition name="fade">
      <EditorPanel/>
    </transition>
    <EditorStatusBar/>
</template>

<script setup lang="ts">

import {  ref, computed , onMounted } from 'vue';
//import { useStore } from 'vuex'
import { useEditorStore } from '/@/stores/editor';
import { useNavigatorStore } from '/@/stores/navigator';

import Element from '../../composables/useElementClass';
import Block from '../../composables/useBlockClass';

//export default defineComponent({
  //name: 'Editor',
  //setup() {
    const editor = useEditorStore()//useStore().state.editor;
    const navigation = useNavigatorStore()//useStore().state.navigation;
    // const title = ref('Editor');
    // const hk = hotKeys();
    const size = computed(()=>{
        return navigation.sidebar ? 'sidebar' : ''
    })
    onMounted(async () => {
      const document: any = await new Block();
      const block: any = await new Element().Flexbox({direction:'col'})
      block.semantic = 'main'
      document.json.blocks.push ( block )
      editor._document ( document )
      editor._current ( block )
    })

    
    //console.log ( elements )
    //return { title , hk , editor , navigation, size  };
  //},
//})0;
</script>

<style>::-webkit-scrollbar{width:8px}::-webkit-scrollbar-track{background:#cccccc;border-radius:5px}::-webkit-scrollbar-thumb{background:#4d4747;border-radius:5px}</style>