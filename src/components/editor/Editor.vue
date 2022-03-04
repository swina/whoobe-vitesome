<template>
    <div :class="size" class="editor-dashboard relative m-10 p-2" @click="editor.current=editor.document,toggleContext()">
      <div class="grid grid-cols-12 z-0 absolute inset-0 m-2 border mt-5" v-if="editor.showColumns">
        <template v-for="(n) in 12" :key="n">
          <div :class="n===1?'border-l':''" class="border-r h-4 h-screen"></div>
        </template>
      </div>
      <div class="mt-2 h-screen overflow-y-scroll pb-40" @click="editor.current = editor.document.json.blocks[0]" @contextmenu.prevent="openMenu($event)">
        <BlockContainer/>
      </div>
    </div>
    <EditorToolbar/>
    
    <SidebarRight v-if="editor.tool"/>
    <transition name="fade">
      <EditorPanel/>
    </transition>
    <EditorStatusBar/>
    <div id="contextMenu" class="absolute z-modal bg-white" v-if="editor.current">
      <BlockFloatingBar @action="floatingAction"/>
    </div>
</template>

<script setup lang="ts">

import {  ref, computed , onMounted } from 'vue';
//import { useStore } from 'vuex'
import { useEditorStore } from '/@/stores/editor';
import { useNavigatorStore } from '/@/stores/navigator';
import Element from '/@/composables/useElementClass';
import Block from '/@/composables/useBlockClass';
import { openContextMenu } from '/@/composables/contextMenu';

    const editor = useEditorStore()//useStore().state.editor;
    const navigation = useNavigatorStore()//useStore().state.navigation;
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
      editor._tool ( 'snippets' )
    })

    const openMenu = (e) => {
      console.log ( 'open context menu' )
      let ctx:any = document.querySelector('#contextMenu')
      ctx.style.left = `${e.pageX}px`
      ctx.style.top =`${e.pageY}px`
      ctx.classList.remove ( 'hidden' )
    }

    const toggleContext = () => {
      console.log ( 'close context')      
      let ctx:any = document.querySelector('#contextMenu')
      ctx.classList.add ( 'hidden' )
    }

    const floatingAction = ( item , event ) => {
        event.stopPropagation()
        editor._tool ( item.action )
    }
</script>

<style>::-webkit-scrollbar{width:8px}::-webkit-scrollbar-track{background:#cccccc;border-radius:5px}::-webkit-scrollbar-thumb{background:#4d4747;border-radius:5px}</style>