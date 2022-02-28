<template>
    <div class="bars sidebarLeft">

        <template v-for="item in items" :key="item.label">
            <span @click="addTab(item)" :title="item.label"><i class="iconify text-2xl" :data-icon="item.icon" :title="item.label"/></span>
        </template>

    </div>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import { action } from '/@/composables/useActions';

export default defineComponent({
  name: 'SidebarLeft',
  setup() {
    
    const title = ref('SidebarLeft');

    const items = ref ([
            { label: 'New Template' , icon: 'emojione-monotone:new-button' , component: 'Editor' },
            { label: 'UI Kits' , icon: 'mdi:widgets' , component: 'UIKits' },
            { label: 'Project' , icon: 'mdi:web' },
            { label: 'Settings' , icon: 'carbon:settings-adjust'}])
    
    const addTab = (component: object) => {
        action ( 'addTab' , component )
    }

    return { title, items, addTab };
  },
});
</script>