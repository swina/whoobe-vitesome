<template>
    <div class="bars bottomBar pl-10 text-gray-500" :class="$attrs.class">
        <!-- <template v-for="(tab,index) in navigation.tabs" :key="'tab_' + index">
            <div class="tab" :class="active(index)" @click="navigation.tab = index">{{ tab.label }} <div @click="removeTab(index)"><i class="iconify text-xs ml-2" data-icon="mdi:close"/></div>
            </div>
        </template> -->
        <span @click="editor.toggleColumns" title="Toggle columns">
            <Icon icon="bi:layout-three-columns"/>
        </span>
    </div>
</template>

<script setup lang="ts">
import { useNavigatorStore } from '/@/stores/navigator'
import { useEditorStore } from '/@/stores/editor'
const navigation = useNavigatorStore()
const editor = useEditorStore()
</script>