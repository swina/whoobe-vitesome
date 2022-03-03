<template>
    <span @click="$emit('click',$event)" :title="$attrs.title">
        <i class="iconify" :class="$attrs.class" :data-icon="$attrs.icon"/>
    </span>
</template>