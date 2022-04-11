<template>
    <div v-if="status.dialog" class="z-modal fixed inset-0 h-screen w-screen bg-black bg-opacity-30 items-center justify-center flex flex-col" id="contextDialog">
        <div class="flex flex-col m-auto bg-white z-modal relative" :class="status.dialogCss"> 
            <div class="bg-purple-700 text-white flex items-center p-2">{{ status.dialogTitle || 'Dialog' }}</div>
            <span class="absolute right-0 top-0 m-1 text-white cursor-pointer" @click="openContextDialog"><icon icon="mdi:close"/></span>
            <BlockToProject v-if="status.dialog==='BlockToProject'"/>
            <CreateFolder v-if="status.dialog === 'CreateFolder'"/>
            <CreateFile v-if="status.dialog === 'CreateFile'"/>
            <DeleteFile v-if="status.dialog === 'Delete'"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { status } from '/@/composables/useNavigation';
import { openContextDialog } from '/@/composables/contextMenu';

</script>