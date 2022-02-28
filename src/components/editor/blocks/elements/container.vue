<template>
    <div class="editor-block relative border" :key="$attrs.block.id">
        {{ $attrs.block.id }}
        <template v-for="element in $attrs.block.blocks" :key="element.id" >
            {{ element.id }}
            <container 
                class="element shadow"
                :class="current(element.id)"
                :is="element.element" 
                v-html="element.content"
                contenteditable="true"
                :level="parseInt($attrs.level)+1"
                @click="setCurrent(element,$event)"/>
        </template>
    </div>
    {{ selected ? selected.id : ''}}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
//import { useStore , mapActions } from 'vuex'
import { useEditorStore } from '/@/stores/editor';
import { useNavigatorStore } from '/@/stores/navigator';
import '/@/styles/editor.css'
import { dispatch } from '/@/composables/useActions'

export default defineComponent({
    name: 'container',
    setup(props,context){
        const editor = useEditorStore()//useStore().state.editor
        //const store = useStore()
        const currentTag = ( id: string ) => {
            return editor.current ? editor.current.tag : ''
            
        }
        
        let selected: any = null
        
        const current = ( id: string ) => {
            const level = 'z-' + (parseInt(context.attrs.level) + 1)
            return editor.current && editor.current.id === id
                ? 'border border-red-600 border-dashed ' + level 
                : 'hover:border-green-600 border-dashed border ' + level
        }

        const isSelected = ( id: string ) => {
            return editor.current && editor.current.id === id ? true : false
        }

        const setContainer = ( block: any ) => {
            console.log ( 'container=> ' , block )
            selected = block
            editor._current ( block )
        }
        const setCurrent = ( block: any , event: object ) =>{
            console.log ( 'element=> ' , event )
            selected = block
            editor._current ( block )
        }


        
        return { editor , currentTag , current , setContainer , setCurrent, isSelected , selected }
    },
   

})
</script>