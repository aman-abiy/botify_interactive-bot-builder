<template>
    <div>
        <div v-if="response[response.length - 1]" class="row reply-user">
            <div class="card-container">
                <div class="card">
                    <p>{{ response[response.length - 1].optionValue ? response[response.length - 1].optionValue : null }}</p>
                </div>
            </div>
            <img src="../../assets/images/avatars/untitled2.png" alt="">
        </div>
        <br>
        <br>
        <br>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>

</style>