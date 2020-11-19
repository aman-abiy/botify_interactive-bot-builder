<template>
    <div class="content">
        <br>
        <br>
        <div class="row">
            <img class="col-lg-4 offset-lg-4 col-sm-12" src="../assets/images/404.jpg" alt="">
        </div>
        <h2 class="text-center">PAGE NOT FOUND</h2>
        <br>
        <p class="text-center copyright">{{ new Date().getFullYear() }} botapp.com</p>
    </div>
</template>
<script>
export default {
    title: '404 Not Found',
    data: function() {
        return {
        }
    },
    computed: {
       
    },
    methods: {
       
    }
}
</script>

<style scoped>
.content {
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
    background-color:#23a9c4;
}

.content .row img {
    border-color: #23a9c4;
}

h2 {
    font-family: 'Nunito', sans-serif;
    color: #b5d9f1;
}

.copyright {
    font-size: 17px;
    color: white;
}

.row .card input {
    outline: none !important;
    box-shadow: none;
    border-color: rgb(13, 221, 221);
}

.row .card input:focus {
    outline: none !important;
    box-shadow: none;
    border-color: grey;
}

.row .card .forgot-password {
    float: right;
    padding-bottom: 8px;
}

.row .card .login {
    margin-left: 8px;
}

.copyright {
    font-size: 12px;
    color: grey;
}

</style>