<template>
    <div :class="$attrs.size">
      <Editor v-if="active('Editor')"/>
      <Preview v-if="editor.preview"/>
      <div class="ml-10 mt-10">
        <UIKits v-if="active('UIKits')"/>
      </div>
    </div>
</template>

<script setup lang="ts">
  import { useEditorStore } from '/@/stores/editor'
  import { useNavigatorStore } from '/@/stores/navigator'

  const editor = useEditorStore()
  const navigation: any = useNavigatorStore() //useStore().state.navigation;
  //const document = ref (null)
  
  const active = ( component: string)  => {
    if ( navigation.tabs.length && navigation.tab > -1 ){
      if ( navigation.tabs[navigation.tab].component === component ){
        if ( component === 'Editor' ){
          let document = navigation.tabs[navigation.tab]?.object ? navigation.tabs[navigation.tab].object : null
          if ( document ){
            editor._document ( document )
            !editor.current ? editor._current ( document ) : null
            return true
          }
          return false
        }
        if ( component != 'Editor' ) return true
      }
    }
  }
  



</script>

