<template>
    <div >
        <Jumper class="mx-auto loader"/>
    </div>
</template>
<script>
import {Jumper} from 'vue-loading-spinner'
export default {
    title: 'Verifying...',
    components: {
        Jumper
    },
    computed: {
        verificationErrorMessage() {
            return this.$store.getters.verificationErrorMessage;
        },
    },
    created() {
        this.$store.dispatch('verify', this.$route.params.token)
    },
}
</script>>
<style scoped>
html body {
    background-color: rgb(250, 250, 250);
} 

.loader{
    position: relative;
    top: 37.5vh;
    font-size: 300px;
}
</style>