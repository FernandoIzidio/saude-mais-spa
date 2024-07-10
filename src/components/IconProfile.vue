<template>
  <div>
    <img v-if="isMale" src="/images/profile-man.png" class="icon profileIcon" id="profileMan" alt="man profile icon" />
    <img v-else src="/images/profile-woman.png" class="icon profileIcon" id="profileWoman" alt="woman profile icon" />
  </div>
</template>

<script setup>
const isMale = localStorage.getItem('user').gender === 'MASCULINO' || localStorage.getItem('gender') === 'INTERSEXO';
</script>

<style scoped>

</style>
