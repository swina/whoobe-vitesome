<template>
    <div :class="$attrs.size">
        <Editor v-if="active('Editor')"/>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
//import { useStore } from 'vuex'
import { useNavigatorStore } from '/@/stores/navigator';

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const navigation: any = useNavigatorStore() //useStore().state.navigation;
    const active = ( component: string)  => {
        
        return navigation.tabs.length ?
            navigation.tabs[navigation.tab].component === component ? 
                true : false : false
    }
    return { navigation , active };
  },
});
</script>