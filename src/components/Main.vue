
<template>
    <div class="main">
        <div class="main__content">
            <LeftGhostElement/>
            <Inventory/>
        </div>
        <div class="main__bottom-ghost-element">

        </div>

    </div>
</template>

<script setup lang="ts">
import LeftGhostElement from "@/components/compositionComponents/LeftGhostElement.vue";
import Inventory from "@/components/compositionComponents/Inventory.vue";
</script>