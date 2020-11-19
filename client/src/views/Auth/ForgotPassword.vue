<template>
    <div class="content">
        <br>
        <br>
        <br>
        <br>
        <div class="row">
            <div class="col-lg-4 col-md-10 col-sm-12 offset-lg-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="text-center">botapp.com</h5>
                        <p class="text-center text-primary login-text">Forgot Password</p>
                        <p class="text-center text-danger">{{ forgotPasswordMessage }}</p>
                        <br>
                        <ValidationObserver v-slot="{ handleSubmit }">
                            <form v-on:submit.prevent="handleSubmit(sendEmail)">
                                <div class="form-group">
                                    <ValidationProvider rules="email|required" mode="lazy" v-slot="{ errors }">
                                        <label for="exampleInputEmail1">Email</label>
                                        <input v-model="email" type="email" class="form-control" id="Email" aria-describedby="emailHelp">
                                        <small id="emailHelp" class="form-text text-muted">{{ errors[0] }}</small>
                                    </ValidationProvider>
                                </div>
                                <button type="submit" class="btn btn-primary col-12">Send Email</button>
                            </form>
                        </ValidationObserver>
                        <br>
                        <br>
                        <br>
                        <p class="text-center copyright">{{ new Date().getFullYear() }} botapp.com</p>
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
    title: 'Forgot Password',
    data: function() {
        return {
            email: null,
        }
    },
    computed: {
        forgotPasswordMessage() {
            return this.$store.getters.forgotPasswordMessage
        }
    },
    methods: {
        sendEmail() {
            this.$store.dispatch('requestPasswordResetLink', this.email);
        },
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
.content {
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
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