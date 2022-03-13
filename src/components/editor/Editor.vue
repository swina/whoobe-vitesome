<template>
    <div :class="size" class="editor-dashboard relative m-10 p-2">
      <div class="grid grid-cols-12 z-0 absolute inset-0 m-2 border mt-5" v-if="editor.showColumns">
        <template v-for="(n) in 12" :key="n">
          <div :class="n===1?'border-l':''" class="border-r h-4 h-screen"></div>
        </template>
      </div>
      <div class="mt-4 h-screen border-2 border-purple-600 overflow-y-scroll pb-40" 
        @click="editor.current = editor.document.json.blocks[0]" @contextmenu.prevent="openMenu($event)">
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
    <div class="fixed top-0 left-0 m-10 text-xs z-10" v-if="editor.current && editor.current?.tag">
      <div class="flex items-center breadcumb h-5 bg-black text-white px-4 justify-center ">{{ editor.current.semantic || editor.current.element }}</div>
    </div>
</template>

<script setup lang="ts">
import {  computed  } from 'vue';
import { useEditorStore } from '/@/stores/editor';
import { useNavigatorStore } from '/@/stores/navigator';
import { moveBlock , useStore , updateCSS } from '/@/composables/useActions'
import twGroups from '/@/composables/tw.groups'
import { hotKeys } from '/@/composables/hotKeys';

    const hk = hotKeys()

    const editor = useStore()
    const navigation = useStore('navigation')

    editor._wiTools ( twGroups )
    const size = computed(()=>{
        return navigation.sidebar ? 'sidebar' : ''
    })

    const openMenu = (e) => {
      console.log ( 'open context menu' )
      let ctx:any = document.querySelector('#contextMenu')
      ctx.style.left = `${e.pageX}px`
      ctx.style.top =`${e.pageY}px`
      ctx.classList.remove ( 'hidden' )
    }

    const toggleContext = () => {
      let ctx:any = document.querySelector('#contextMenu')
      ctx.classList.add ( 'hidden' )
    }

    const floatingAction = ( item , event ) => {
        event.stopPropagation()
        toggleContext()
        console.log ( item.action )
        item.action != 'move' ?
          item.action === 'flex-row' || item.action === 'flex-col' ?
            editor.current.css.css = updateCSS ( ['flex-row' , 'flex-col' ] , editor.current.css.css , item.action ) :
                  editor._tool ( item.action , editor.current ) : moveBlock()

        item?.group ?
          editor._toolGroup ( item.group ) : null
        // item.action != 'move' ?
        //     editor._tool ( item.action ) : moveBlock()
        //   editor._toolGroup ( item.group ) : null
    }
</script>

<style>
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#cccccc;border-radius:5px}::-webkit-scrollbar-thumb{background:#6c6c6d;border-radius:5px}
.breadcumb {
    clip-path: polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%);
}
</style>