<script lang="ts" setup>
import '../styles/editor.css'
import { ref , computed , onMounted } from 'vue';
import { useStore } from '/@/composables/useActions'
import  Element from '/@/composables/useElementClass'
import { tabber , status } from '/@/composables/useNavigation'

    const editor = useStore('')
    const navigation = useStore('navigation')
    const size = computed ( ()=> {
        return navigation.tabs.length && navigation.tab > -1 ?
          navigation.tabs[navigation.tab]?.component && navigation.tabs[navigation.tab].component === 'Editor' ?
            'w-4/5' : 'w-full' : 'w-full'
    })
    
    onMounted(async () => {
      const elements = new Element().Groups()
      editor.elements = elements
      navigation._message ( '' )
     
    })
    // const loadTree = async ( context ) => {
    //   tree.value = await fileExplorer ( context )
    //   folders.value = tree.value.children.filter ( a => a.type === 'directory' ).sort()
    //   tree.value.children.forEach ( a => {
    //       if ( a.type === 'file' )
    //           folders.value.push ( a )
    //   })
    // }
</script>

<template>
  <!-- <div class="absolute inset-0 bg-bluegray-100 h-screen w-screen"></div> -->
  <Dashboard :size="size" v-if="!editor.preview"/>
  <!-- <Home v-if="tabber.tab < 0"/> -->
  
  <SidebarLeft/>
  <!-- <Archive v-if="status.archive"/> -->
  <Toolbar class="w-full" />
  <Message/>
  <Loading v-if="status.loading"/>
  <FloatingModal/>
  <Preview v-if="editor.preview"/>
  <div ref="setupColors" id="setupColors" class="h-10 absolute left-0 bottom-0 w-full"></div>
 
</template>

<style>
body { overflow:hidden; }

  
</style>