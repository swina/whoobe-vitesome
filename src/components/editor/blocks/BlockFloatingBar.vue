<template>
    <div :class="editor.current.type === 'container' ? '-mt-10 w-1/3' : ''" class="flex flex-row border items-center px-2  justify-around h-10 bg-white shadow z-modal cursor-pointer">
        <Chip class="mr-2" :text="editor.current.semantic||editor.current.element"/>
        <template v-for="item in toolbar" :key="item.icon">
            <span class="z-modal mt-2" :title="item.label" v-if="filter(item)" @click="$emit('action',item,$event)">
                <icon :icon="item.icon" class="iconify ml-1 text-2xl text-gray-700 hover:text-blue-700" />
            </span>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent , ref } from 'vue'
import { useEditorStore } from '/@/stores/editor'

export default defineComponent({
    setup() {
        const editor = useEditorStore()
        const toolbar = ref ( [
            { icon: 'icomoon-free:move-up' , label: 'Move Up' , action: 'moveUp' },
            { icon: 'la:elementor' , label: 'Add element' , action: 'elements' },
            { icon: 'fluent:text-direction-horizontal-right-24-regular' , label: 'Direction row' , action: 'flexRow' , filter: ['flex'] },
            { icon: 'fluent:text-direction-rotate-90-ltr-20-regular' , label: 'Direction row' , action: 'flexColumn' , filter: ['flex'] },
            { icon: 'clarity:form-line' , label: 'Form settings' , action: 'formSettings' , filter: ['form'] },
            { icon: 'carbon:text-font' , label: 'Font settings' , action: 'font' },
            { icon: 'fluent:text-color-24-regular' , label: 'Text Color' , action: 'text-color' , options: { context: 'textcolor' } },
            { icon: 'fluent:color-fill-24-regular' , label: 'Fill Color' , action: 'bg-color' , options: { context: 'bgcolor' } },
            { icon: 'akar-icons:image' , label: 'Image' , action: 'BlockImageUrl' },
            { icon: 'akar-icons:link-chain' , label: 'Link' , action: 'BlockLink' },
            { icon: 'ant-design:download-outlined' , label: 'Import block' , action: 'BlockImport' , filter: ['grid','flex'] },
            { icon: 'ant-design:upload-outlined' , label: 'Export block' , action: 'BlockExport' , filter: ['grid','flex'] }
        ])
        const filter = ( item: object ) => {
            if ( item?.filter ){
                return item.filter.includes ( editor.current.tag ) ? true : false
            }
            return true
        }
        
        return { editor , toolbar , filter  }        
    },
})
</script>
