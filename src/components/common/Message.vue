<template>
    <div class="z-modal w-full fixed left-0 bottom-0 p-5 text-center h-32  shadow-lg" v-if="navigation.message" @click="setTimer">
        <div class="m-auto w-1/3 bg-opacity-50 border shadow-lg p-5 bg-gray-800 text-white text-lg border-0 border-l-6  border-l-purple-700">
            {{ navigation.message }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useNavigatorStore } from '/@/stores/navigator'
const navigation = useNavigatorStore()

onMounted( () => {
    setTimer()
})

navigation.$subscribe ( (mutation,state) => {
    console.log ( state , ' changed!')
    setTimer()
})

const setTimer = ()=>{
    setTimeout ( () => {
        navigation._message ( '' )
    },4000)
}
</script>