<template>
    <div>
        <br>
        <br>
        <br>
        <div class="row">
            <div class="col-lg-4 col-md-10 col-sm-12 offset-lg-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="text-center">botapp.com</h5>
                        <p class="text-center text-primary login-text">Login</p>
                        <p class="text-center text-danger">{{ authErrorMessage }}</p>
                        <br>
                        <ValidationObserver v-slot="{ handleSubmit }">
                            <form v-on:submit.prevent="handleSubmit(login)">
                                <div class="form-group">
                                    <ValidationProvider rules="email|required" mode="lazy" v-slot="{ errors }">
                                        <label for="exampleInputEmail1">Email</label>
                                        <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp">
                                        <small id="emailHelp" class="form-text text-muted">{{ errors[0] }}</small>
                                    </ValidationProvider>
                                </div>
                                <div class="form-group">
                                    <ValidationProvider rules="required" mode="lazy" v-slot="{ errors }">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input v-model="password" type="password" class="form-control" id="password">
                                        <small id="emailHelp" class="form-text text-muted">{{ errors[0] }}</small>
                                    </ValidationProvider> 
                                </div>
                                <router-link :to="{ name: 'ForgotPassword'}" :class="['forgot-password']">Forgot Password?</router-link>
                                <button type="submit" class="btn btn-primary col-12">Log In</button>
                            </form>
                        </ValidationObserver>
                        <br>
                        <br>
                        <p class="text-center">Don't have an account?<router-link :to="{ name: 'Signup'}" :class="['signup']">Sign Up</router-link></p>
                        <br>
                        <p class="text-center copyright">2020  botapp.com</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ValidationProvider, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

export default {
    data: function() {
        return {
            email: null,
            password: null
        }
    },
    computed: {
        authErrorMessage() {
            return this.$store.getters.authErrorMessage
        },
        token() {
            return localStorage.getItem('token')
        }
    },
    watch: {
        token(value) {
            if(value) {
                if (this.$store.getters.token) {
                    this.$router.push({name: 'Dashboard'});
                } 
            }
        }
    },
    methods: {
        login() {
            const formData = {
                email: this.email,
                password: this.password
            };
            this.$store.dispatch('login', formData);
        }
    }
}

// vee-validator validation

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('email', email);
</script>>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500&display=swap');
html body {
    background-color: rgb(250, 250, 250);
} 

.row .card {
    border-color: transparent;
    background-color: rgb(250, 250, 250);
    font-size: 15px;
}

.card h5 {
    font-size: 20px;
    font-weight: 700;
    color: #0a67ca;
}

.card .login-text {
    font-size: 18px;
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

.row .card .signup {
    margin-left: 8px;
}

.copyright {
    font-size: 12px;
    color: grey;
}
</style>