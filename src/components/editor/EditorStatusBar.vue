<template>
    <div class="bars bottomBar pl-10 pr-64 text-gray-500" :class="$attrs.class">
        <!-- <template v-for="(tab,index) in navigation.tabs" :key="'tab_' + index">
            <div class="tab" :class="active(index)" @click="navigation.tab = index">{{ tab.label }} <div @click="removeTab(index)"><i class="iconify text-xs ml-2" data-icon="mdi:close"/></div>
            </div>
        </template> -->
        <span @click="editor.toggleColumns" title="Toggle columns" class="mr-2 border-r pr-2">
            <Icon icon="bi:layout-three-columns"/>
        </span>
        Template <input type="text" v-model="editor.document.name"/>
        <small v-if="editor.current">Right click to access actions</small>
    </div>
</template>

<script setup lang="ts">
import { useNavigatorStore } from '/@/stores/navigator'
import { useEditorStore } from '/@/stores/editor'
const navigation = useNavigatorStore()
const editor = useEditorStore()
</script>