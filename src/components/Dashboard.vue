<template>
    <div :class="$attrs.size">
        <Editor v-if="active('Editor')"/>
    </div>
</template>

<script setup lang="ts">
  
  import { computed , ref } from 'vue'
  import { useEditorStore } from '/@/stores/editor'
  import { useNavigatorStore } from '/@/stores/navigator'

  const editor = useEditorStore()
  const navigation: any = useNavigatorStore() //useStore().state.navigation;
  //const document = ref (null)
  
  const active = ( component: string)  => {
    if ( navigation.tabs.length && navigation.tab > -1 ){
      if ( navigation.tabs[navigation.tab].component === component ){
        console.log ( 'TAB => ' , navigation.tab , navigation.tab.object?.id ? navigation.tab.object.id : 'no id')
        let document = navigation.tabs[navigation.tab]?.object ? navigation.tabs[navigation.tab].object : null
        editor._document ( document )
        editor._current ( document )
        return true
      }
    }
      // return navigation.tabs.length ?
      //     navigation.tabs[navigation.tab].component === component ? 
      //         true : false : false
  }

  



</script>