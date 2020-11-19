<template>
    <div class="content">
        <br>
        <div class="container">
            <h3 class="text-center">Verification</h3>
            <div class="row">
                <img class="col-4 offset-4" src="../../assets/images/verify-email.png" alt="">
            </div>
            <p class="text-center">Please verify your email to continue</p>
            <p class="text-center">A verification link has been sent to your email <span class="email">{{email}}</span></p>
            <br>
            <div class="col text-center">
                <a v-show="showResendBtn" v-on:click="resend()" class="btn">Resend Link</a>
                <p v-show="!showResendBtn" class="text-center">A new verification link has been sent</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    title: 'Verify Account',
    data: function() {
        return {
            showResendBtn: true 
        }
    },
    computed: {
        email() {
            return this.$store.getters.email
        },
    },
    methods: {
        resend() {
            this.$store.dispatch('resendVerification', this.email)
            this.showResendBtn = false;
        }
    },
}
</script>>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500&display=swap');

.content {
    height: 100vh;
    background-color: #f5f5f5;
    overflow-x: hidden;
    overflow-y: hidden;
}

h3{
    color: #004496;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
}

p {
    font-size: 18px;
}

p .email {
    color: rgb(3, 204, 204);
}

.btn {
    font-weight: 550;
    color: rgb(3, 204, 204);
    border-color: rgb(3, 204, 204);
    background-color:#f3f4f6;
}

.btn:hover {
    font-weight: 550;
    color: #f3f4f6;
    border-color: #f3f4f6;
    background-color:rgb(3, 204, 204);
}
</style>