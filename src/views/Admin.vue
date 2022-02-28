<script lang="ts">

import { defineComponent, ref, computed , onMounted } from 'vue';
//import { useStore } from 'vuex'
//import { useTheme } from '/@/composables';
import { useEditorStore } from '/@/stores/editor';
import { useNavigatorStore } from '/@/stores/navigator';
import { hotKeys } from '/@/composables/hotKeys';
import  Element from '/@/composables/useElementClass'

export default defineComponent({
  name: 'Admin',
  setup() {
    const editor = useEditorStore();
    const navigation = useNavigatorStore();
    //const editor = useStore().state.editor
    //const navigation = useStore().state.navigation

    const title = ref('Dashboard');
    const hk = hotKeys();
    const size = computed ( ()=> {
        return navigation.sidebar ? 'w-4/5' : 'w-full'
    })

    onMounted(async () => {
      const elements = new Element().Groups()
      editor.elements = elements
    })
    
    return { title , hk , editor , navigation , size  };
  },
});
</script>
<template>
  <Dashboard :class="size"/>
  <SidebarLeft/>
  <SidebarRight />
  <Toolbar :class="size"/>
  <!-- <div class="bars bottomBar pl-10 text-xs" :class="size">
      {{ editor.currentBlock ? editor.currentBlock.id : ''}}
  </div>
  <div class="fixed top-0 right-0 m-1 z-10 cursor-pointer" @click="navigation._sidebar()">
    <i class="iconify text-2xl" data-icon="mdi:edit"></i>
  </div> -->
</template>

