<template>
    <div class="p-2 w-full bg-gray-200">
        <select v-model="uikit" class="focus:outline-transparent" v-if="kits" @change="fetchUIKIT">
            <option v-for="kit in kits" :key="kit" :value="kit">
                {{ kit.name }}
            </option>
        </select>
    </div>
    <div class="relative flex flex-wrap justify-around px-20 h-screen pb-20 overflow-y-auto">
        <template v-for="kit in navigation.uikits[uikit.name].templates" :key="kit.name" v-if="uikit">
            <div class="flex flex-col text-xs truncate m-2" @click="loadTemplate(kit)">
                <img :src="kit.image" class="w-60 h-60 object-contain border rounded shadow-lg "/>
                {{ kit.name }}
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Template from '/@/composables/useSnippets'
import { useNavigatorStore } from '/@/stores/navigator'
import { useEditorStore } from '/@/stores/editor'
import { action } from '/@/composables/useActions'

const navigation = useNavigatorStore()
const editor = useEditorStore()

const uikit = ref ('')

const kits = computed ( ()=> {
    return new Template().kits()
})

const fetchUIKIT = async () => {
    try {
        fetch ( uikit.value.url ).then ( res => res.json() ).then ( data => {
            navigation._uikits ( { name: uikit.value.name , data: data })
        })
    } catch ( err ){
        console.log ( err )
    } 
}

const loadTemplate = ( template:Object ) =>{
    editor._document ( template )
    editor._current ( template.json.blocks[0] )
    editor._tool ( 'css' , template.json.blocks[0] )
    action ( 'addTab' , {
        component: 'Editor',
        label: template.name,
        object: template
    })
}
</script>