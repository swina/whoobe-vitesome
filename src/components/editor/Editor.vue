<template>
    <div :class="size" class="m-10 p-2" @click="editor.current = editor.document.json.blocks[0]">
      <BlockContainer/>
    </div>
</template>

<script lang="ts">

import { defineComponent, ref, computed , onMounted } from 'vue';
//import { useStore } from 'vuex'
import { useEditorStore } from '/@/stores/editor';
import { useNavigatorStore } from '/@/stores/navigator';
import { hotKeys } from '/@/composables/hotKeys';
import Element from '../../composables/useElementClass';
import Block from '../../composables/useBlockClass';

export default defineComponent({
  name: 'Editor',
  setup() {
    const editor = useEditorStore()//useStore().state.editor;
    const navigation = useNavigatorStore()//useStore().state.navigation;
    const title = ref('Editor');
    const hk = hotKeys();
    const size = computed(()=>{
        return navigation.sidebar ? 'sidebar' : ''
    })
    onMounted(async () => {
      const document: any = await new Block();
      const block: any = await new Element().Flexbox({direction:'col'})
      document.json.blocks.push ( block )
      editor._document ( document )
      editor._current ( block )
    })
    //console.log ( elements )
    return { title , hk , editor , navigation, size  };
  },
});
</script>