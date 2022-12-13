<template>
    <router-view></router-view>
</template>

<script setup lang="ts">
// 防止Storage被手动篡改
// window.addEventListener('storage', (e: any) => {
//     localStorage.setItem(e.key, e.oldValue)
// });

</script>
<style>
#app {
    /* height: 100vh; */
}

.i {
    margin: 0 5px 0 0
}



body {
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
}
</style>