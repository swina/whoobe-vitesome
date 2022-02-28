<template>
    <div class="bars toolbar" :class="$attrs.class">
        <template v-for="(tab,index) in navigation.tabs" :key="'tab_' + index">
            <div class="tab" :class="active(index)" @click="navigation.tab = index">{{ tab.label }} <div @click="removeTab(index)"><i class="iconify text-xs ml-2" data-icon="mdi:close"/></div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
//import { useStore } from 'vuex'
import { useNavigatorStore } from '/@/stores/navigator';
import { useEditorStore } from '/@/stores/editor';

export default defineComponent({
  name: 'Toolbar',
  setup() {
    const navigation = useNavigatorStore()
    const editor = useEditorStore()

    const active = ( index: number ) => {
        console.log ( navigation.tab , index )
        return navigation.tab === index ? 'bg-purple-600' : ''
    }
    const removeTab = ( index: number ) => {
        navigation.tabs.splice ( index ,1 )
        editor.current = null
        editor.document = null
        editor.page = null
    }
    return { navigation , active , removeTab };
  },
});
</script>