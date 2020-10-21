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
                        <p class="text-center text-primary login-text">Signup</p>
                        <p class="text-center text-danger">{{ authErrorMessage }}</p>
                        <br>
                        <ValidationObserver v-slot="{ handleSubmit }">
                            <form v-on:submit.prevent="handleSubmit(signup)">
                                <div class="form-group">
                                    <ValidationProvider rules="email|required" mode="lazy" v-slot="{ errors }">
                                        <label for="exampleInputEmail1">Email</label>
                                        <input v-model="email" type="email" class="form-control" id="Email" aria-describedby="emailHelp">
                                        <small id="emailHelp" class="form-text text-muted">{{ errors[0] }}</small>
                                    </ValidationProvider>
                                </div>
                                <div class="form-group">
                                    <ValidationProvider name="password" rules="required|min:8" v-slot="{ errors }">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input v-model="password" type="password" class="form-control" id="Password">
                                        <small id="emailHelp" class="form-text text-muted">{{ errors[0] }}</small>
                                    </ValidationProvider>
                                </div>
                                <div class="form-group">
                                    <ValidationProvider rules="required|password:@password" v-slot="{ errors }">                                
                                        <label for="Password-Confirmation">Confirm Password</label>
                                        <input v-model="confirmation" type="password" class="form-control" id="Password-Confirmation">
                                        <small id="emailHelp" class="form-text text-muted">{{ errors[0] }}</small>
                                    </ValidationProvider>
                                </div>
                                <button type="submit" class="btn btn-primary col-12">Register</button>
                            </form>
                        </ValidationObserver>
                        <br>
                        <br>
                        <p class="text-center">Already have an account?<router-link :to="{ name: 'Login'}" :class="['login']">Log In</router-link></p>
                        <br>
                        <p class="text-center copyright">2020 botapp.com</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ValidationProvider, extend, configure  } from 'vee-validate';
import { required, email, min } from 'vee-validate/dist/rules';
import * as rules from 'vee-validate/dist/rules';

export default {
    data: function() {
        return {
            email: null,
            password: null,
            confirmation: null
        }
    },
    computed: {
        authErrorMessage() {
            return this.$store.getters.authErrorMessage
        }
    },
    methods: {
        signup() {
            const formData = {
                email: this.email,
                password: this.password
            };
            this.$store.dispatch('signup', formData);
        },
        trial() {
            this.$router.push({ name: 'Dashboard'})
        }
    }
}
// vee-validator validation
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

extend('min', {
    validate(value, args) {
        return value.length >= args.length
    },
    message: `Password must be 8 or more characters`,
    params: ['length']
})

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Passwords do not match'
});
</script>

<style scoped>
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

.row .card .login {
    margin-left: 8px;
}

.copyright {
    font-size: 12px;
    color: grey;
}

</style>