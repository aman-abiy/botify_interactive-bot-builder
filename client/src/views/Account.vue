<template>
    <div>
        <navbar/>
        <br>
        <br>
        <br>
        <br>
        <br>
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3">
                     <img class="" class="col-6 offset-3" src="../assets/images/profile.png" alt="">
                    <br>
                    <br>
                    <p class="text-center">{{ email }}</p>
                    <p v-if="linkSentMsg" class="text-center text-success">{{ linkSentMsg }}</p>
                    <a v-on:click="changePassword()" class="btn text-center offset-4">Change Password</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import navbarDelete from '@/components/navbar-delete';
import navbar from '@/components/navbar';
import footer from '@/components/footer';
export default {
    title: 'Account',
    data: function(){
        return {
            linkSentMsg: null
        }
    },
    components: {
        navbar, navbarDelete, footer
    },
    computed: {
        email() {
            return this.$store.getters.email;
        },
        changePasswordMsg() {
            return this.$store.getters.forgotPasswordMessage;
        }
    },
    methods: {
        changePassword() {
            this.$store.dispatch('requestPasswordResetLink', this.email);
            this.linkSentMsg = 'A password reset link has been sent to your email'
        }
    },
    created() {
       
    },
}
</script>
<style scoped>
.container img {
    border-radius: 50%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.container img:hover {
    border-radius: 50%;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19);
}

.container p {
    color: #0a5eb8;
    font-weight: 600;
}

.container .btn {
    color: #0a5eb8;
    border-color: #0d80fc;
    background-color: rgb(253, 253, 253);
}

.container .btn:hover {
    color: rgb(253, 253, 253);
    border-color: #0d80fc;
    background-color: #0a5eb8;
}
</style>