<template>
    <div class="bars bottomBar pl-10 pr-64 text-gray-500 z-2xtop" :class="$attrs.class">
        <!-- <template v-for="(tab,index) in navigation.tabs" :key="'tab_' + index">
            <div class="tab" :class="active(index)" @click="navigation.tab = index">{{ tab.label }} <div @click="removeTab(index)"><i class="iconify text-xs ml-2" data-icon="mdi:close"/></div>
            </div>
        </template> -->
        Template <input type="text" v-model="editor.document.name"/>
        <span @click="editor.toggleColumns" title="Toggle columns" class="mx-2 pr-2">
            <Icon icon="bi:layout-three-columns"/>
        </span>
        <span @click="preview" class="mx-2"><Icon icon="icon-park-outline:preview-open" class="text-xl"/></span>
        <input v-if="editor.current && editor.current?.css" v-model="editor.current.css.css" class="mx-2"/>
        <div class="w-1/4"></div>
    </div>
</template>

<script setup lang="ts">
import { useNavigatorStore } from '/@/stores/navigator'
import { useEditorStore } from '/@/stores/editor'
import { PREVIEW , setLocalStorage } from '/@/composables/useActions'

const navigation = useNavigatorStore()
const editor = useEditorStore()

const preview = () => {
    setLocalStorage ( PREVIEW , editor.document )
    editor._preview()
}
</script>