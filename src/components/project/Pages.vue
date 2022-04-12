<template>
    <div class="md:ml-1/4 lg:ml-1/5 md:w-3/4 lg:w-4/5 pl-10 mb-20 top-0 left-0 absolute z-modal h-screen w-screen bg-gray-100 overflow-y-auto">
        <div class="pl-2 bg-bluegray-800 text-gray-500 text-xs"> {{file}} </div>
        <iframe class="w-full h-screen" v-if="slug" :src="slug"></iframe>
        <!-- <textarea v-model="rawdata" v-if="rawdata" class="w-full p-2 font-mono text-xs h-full"/> -->
    </div>
    <TreeContainer context="pages" :open="open" @close="open=!open" @file="setRawData"/>
</template>

<script setup lang="ts">
import { ref , computed } from 'vue'
import { PAGESURL , paths  } from '/@/composables/useLocalApi'
import { status } from '/@/composables/useNavigation'

let open = ref ( true )
let rawdata = ref ( '' )
let file = ref ( '' )
let path = ref ( '' )
status.context = 'pages'
status.current = null
let slug = ref ('')

// computed (()=>{
//     return file && file.value.split('.')[0] != 'index' ?
//                 PAGESURL + '/' + file.value.split('.')[0] : PAGESURL
// })
const setRawData = ( data:String , path:String ) => {
    console.log ( 'data', data , 'path',path )
    slug.value = PAGESURL + '/' + path.replace('/app/pages/','')
    // file.value = path.split('/')[path.split('/').length-1]
    // console.log ( 'file=>', data.data , path )
    // rawdata.value = data.data
}
</script>