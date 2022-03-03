<template>
<div class="p-2">
    <div 
        v-if="$attrs.block" 
        :ref="$attrs.block.id" 
        :key="$attrs.block.id" 
        class="editor-block border relative p-2" 
        :class="current($attrs.block,false)" 
        :data-block-tag="currentTag ( $attrs.block )"
        :id="$attrs.block.id"
        :style="$attrs.block.style"
        @click="selectBlock($attrs.block,$event),currentId=$attrs.block.id,getPos($event,$attrs.block)"
    >   
        <template v-for="(element,index) in $attrs.block.blocks" :key="element.id" >
            <container 
                v-if="element.type === 'container'"
                class="relative"
                :id="element.id"
                :block="element"
                :class="current(element,false)"
                :level="parseInt($attrs.level)+1"
                @click="selectBlock(element,$event),currentId=element.id,getPos($event,element)"/>
            <Element
                :id="element.id"
                :block="element"
                v-if="element.type !='container'"
                :level="parseInt($attrs.level)+1"
                @click="selectBlock(element,$event),currentId=element.id,getPos($event,element)"/>
            <!-- <component 
                class="relative shadow"
                :id="element.id"
                :class="current(element,true)"
                :is="element.element"
                :data-icon="element.tag==='icon'?element.data.icon:''"
                :src="element.element === 'img' ? element.image.url:''" 
                v-if="element.type != 'container'"
                :style="element.style"
                :contenteditable="editor.current.id === element.id ? true : false"
                @click="selectBlock(element,$event),currentId=element.id,getPos($event,element)"
                :data-element-tag="element.element"
                v-html="element.content">
            </component> -->
        </template>
    </div>
    </div>
    <BlockFloatingBar class="z-modal editor-floating" v-if="editor.current.id === currentId" :style="position?position:''" @action="floatingAction"/>
</template>

<script lang="ts">
import { defineComponent, ref , onMounted , computed } from 'vue'
//import { useStore , mapActions } from 'vuex'
import { useEditorStore } from '/@/stores/editor';
import { useNavigatorStore } from '/@/stores/navigator';
import '/@/styles/editor.css'
import { dispatch , selectBlock , blockCoords , floatingCoords } from '/@/composables/useActions'

export default defineComponent({
    name: 'container',
    setup(props,context){
        const editor = useEditorStore()//useStore().state.editor
        //const store = useStore()
        const currentId = ref(null)

        
        const current = ( block: object , element: boolean ) => {
            if ( !editor.current ) return ''
            let level = 'z-' + (parseInt(context.attrs.level) + 1)
            if ( element ) {
                level = 'z-' + (parseInt(context.attrs.level) + 2) 
            }
            let css = Object.values ( block.css ).join ( ' ' )
            if ( context.attrs.level === "1" ){
                css += ' border border-black '
            } else {
                css += ' border '
            }
            return editor.current && editor.current?.id && editor.current.id === block.id
                ? css + 'border-red-600 ' + level 
                : block.type != 'container' ? css + 'border-dashed ' : css + 'border-dashed ' + level
        }

        const currentTag = ( block: object ) => {
            if ( !editor.current ) return ''
            return editor.current && editor.current?.id && editor.current.id === block.id ?
                    context.attrs.level === '2' ? block.semantic || 'template' : block.semantic || block.element : null 
        }
        let floatPosition = ref('')
        let position = computed(()=>{
            return floatPosition.value
        })

        const getPos = async ( event:object , element: object ) => {
            event.stopPropagation()
            let offsetY = 0
            let offsetX = 0
            if ( editor.current.type != 'container' ){
                offsetY = 40
            }
            let coords = await blockCoords(event)
            let floating = await floatingCoords()

            let left = coords.left
            if ( ( left + floating.width ) > floating.limit ){
                left = coords.right - floating.width
            }
            floatPosition.value = `position:fixed;top:${coords.top - offsetY}px;left:${left}px;` 
        }
        
        const floatingAction = ( item , event ) => {
            event.stopPropagation()
            editor._tool ( item.action )
        }
        
        return { editor , currentTag , current , selectBlock , currentId  , getPos , position , floatingAction }
    },
   

})
</script>

<style v-if="$attrs.block.font">
    @import url( 'https://fonts.googleapis.com/css?family=' + $attrs.block.font );
</style>