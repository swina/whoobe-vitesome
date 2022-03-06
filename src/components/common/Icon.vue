<template>
    <div class="bg-transparent border-0 w-auto" @click="$emit('click',$event)" :title="$attrs.title">
        <i class="iconify" :class="$attrs.class" :data-icon="$attrs.icon"/>
    </div>
</template>