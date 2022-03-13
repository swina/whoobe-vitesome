<template>
    <div class="flex flex-col p-2 text-xs" v-if="slider.type === 'slider'">
        Mode <select v-model="slider.data['mode']">
            <option value="slider">Slider</option>
            <option value="tabs">Tabs</option>
        </select>
        <div class="flex flex-col my-2" v-if="slider.data.mode === 'tabs'">
            Tab name
            <input type="text" v-model="slider.data.slides[sliderIndex.index].name"/>
            
        </div>
        Tab CSS
        <textarea v-model="slider.data.css.default" v-if="slider.data.mode === 'tabs'" class="small my-2 h-20" placeholder="tabs css"/>
        Tab CSS Over
        <textarea v-model="slider.data.css.hover" v-if="slider.data.mode === 'tabs'" class="small my-2 h-20" placeholder="tabs css"/>
        Tab CSS Active
        <textarea v-model="slider.data.css.active" v-if="slider.data.mode === 'tabs'" class="small my-2 h-20" placeholder="tabs css"/>
        <div class="flex flex-col mt-2" v-if="slider.data.mode === 'slider'">
            Autoplay (ms)
            <input type="text" v-model="slider.data.settings.autoplay"/>
            Navigation
            <input type="checkbox" v-model="slider.data.settings.navigation.enabled"/>
            Icons 
            <icon :icon="slider.data.settings.navigation.icons[0]" class="text-4xl"/>
            <input type="text" v-model="slider.data.settings.navigation.icons[0]"/>
            <icon :icon="slider.data.settings.navigation.icons[1]" class="text-4xl"/>
            <input type="text" v-model="slider.data.settings.navigation.icons[1]"/>
            Position 
            <select v-model="slider.data.settings.navigation.position">
                <option value="side">Side</option>
                <option value="bottom">Bottom</option>
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore , sliderObject , sliderIndex, sliderTabs } from '/@/composables/useActions'

const editor = useStore()

const slider = sliderObject.slider

</script>