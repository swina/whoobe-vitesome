<script lang="ts" setup>

import { ref, computed , onMounted } from 'vue';
//import { createSharedComposable } from '@vueuse/core'
//import { useEditorStore } from '/@/stores/editor';
//import { useNavigatorStore } from '/@/stores/navigator';
import { useStore } from '/@/composables/useActions'
import  Element from '/@/composables/useElementClass'

    const editor = useStore()//useEditorStore();
    const navigation = useStore('navigation') //useNavigatorStore();
    const size = computed ( ()=> {
        return navigation.tabs.length && navigation.tab > -1 ?
          navigation.tabs[navigation.tab].component === 'Editor' ?
            'w-4/5' : 'w-full' : 'w-full'
    })
    onMounted(async () => {
      const elements = new Element().Groups()
      editor.elements = elements
      navigation._message ( '' )
    })
</script>
<template>
  <Dashboard :class="size"/>
  <SidebarLeft/>
  
  <Toolbar class="w-full"/>
  <Message/>
  <!-- <div ref="setupColors" id="setupColors" class="h-10 absolute left-0 bottom-0 w-full"></div> -->
</template>

<style>
body { overflow:hidden; }
</style>