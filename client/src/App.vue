<template>
  <div id="app">
    <router-view :class="[currentPage.includes('login') || currentPage.includes('signup') ? 'change-bg-color' : '']"></router-view>
  </div>
</template>
<script>
export default {
  computed: {
        currentPage() {
            return this.$route.path;
        }
    },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500&display=swap');
.change-bg-color{
  background-color: rgb(250, 250, 250);
}
</style>
