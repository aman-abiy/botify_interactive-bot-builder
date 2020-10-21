<template>
    <div>
        <!--CHECKING FOR CONNECTION STATUS-->
        <template>
            <!-- @detected-condition fires when the connectivity status of the device changes -->
            <offline @detected-condition="handleConnectivityChange">
            </offline>
        </template>
        <nav v-if="token" class="navbar nav_auth navbar_auth navbar-expand-lg fixed-top">
            <router-link :to="{ name: 'Dashboard'}" :class="['navbar-brand navbar-brand_auth']">botapp.com</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav">
                    <li class="nav-item nav-item_auth">
                        <router-link :to="{ name: 'Dashboard'}" :class="['nav-link', currentPage.endsWith('/dashboard') ? 'router-auth' : '']">Dashboard</router-link>
                    </li>
                    <li class="nav-item nav-item_auth">
                        <router-link :to="{ name: 'MyBots'}" :class="['nav-link', currentPage.includes('/myBots') ? 'router-auth' : '']">My<span style="margin-left: 3px">Bots</span></router-link>
                    </li>
                    <li class="nav-item nav-item_auth">
                        <router-link :to="{ name: 'Create'}" :class="['nav-link']">CREATE</router-link>
                    </li>
                    <li class="profile-link nav-item dropdown">
                        <a class="nav-link btn-primary dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{ email ? email.split('@')[0] : 'Account' }}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <router-link :to="{ name: 'Account'}" :class="['dropdown-item']">Account</router-link>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item logout" v-on:click="logout()">Logout</a>
                        </div>
                    </li>
                    
                </ul>
            </div>
        </nav>

        <nav v-else class="navbar navbar_without_auth navbar-expand-lg fixed-top">
            <div class="container">
                <router-link :to="{ name: 'Index'}" :class="['navbar-brand']">botapp.com</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ">
                        <li class="nav-item">
                            <router-link :to="{ name: 'Services'}" :class="['nav-link', currentPage.endsWith('/services') ? 'router-without-auth' : '']">Services</router-link>
                        </li>
                        <li class="nav-item dropdown">
                            <a :class="[currentPage.endsWith('/usecases') ? 'router-without-auth' : '', 'nav-link dropdown-toggle']" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Use Cases
                            </a>
                            <div class="dropdown-menu"  aria-labelledby="navbarDropdown">
                                <router-link :to="{ name: 'Usecases'}" :class="['dropdown-item']">Delivery Service</router-link>
                                <router-link :to="{ name: 'Usecases'}" :class="['dropdown-item']">Customer Service</router-link>
                                <router-link :to="{ name: 'Usecases'}" :class="['dropdown-item']">Training Manager</router-link>
                                <router-link :to="{ name: 'Usecases'}" :class="['dropdown-item']">more ...</router-link>
                            </div>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'Services'}" :class="['nav-link', currentPage.endsWith('/example') ? 'router-without-auth' : '']" tabindex="-1" aria-disabled="true">Example</router-link>
                        </li>
                        <li class="auth-buttons auth-button1">
                            <router-link :to="{ name: 'Login'}" :class="['btn router-link']" tabindex="-1" aria-disabled="true">Login</router-link>
                        </li>
                        <li class="auth-buttons auth-button2">
                            <router-link :to="{ name: 'Signup'}" :class="['btn router-link btn-primary']" tabindex="-1" aria-disabled="true"><span>Get<span style="margin-left: 3px">Started</span></span></router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import offline from 'v-offline';

export default {
    data: function() {
        return {
        }
    },
    components: {
        offline
    },
    computed: {
        token() {
            return localStorage.getItem('token')
        },
        currentPage() {
            return this.$route.path;
        },
        email() {
            return this.$store.getters.email;
        },
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
        },
        handleConnectivityChange(status) {
            if(status) {
                this.$toast.open('You are back online', { duration: 10000});
            }
            if(!status) {
                this.$toast.error('You are offline', { duration: 60000});
            }
        }
    },
    created() {
    }
}
</script>

<style scoped>
/* nav items */
.navbar{
    font-family: 'Nunito', sans-serif;
}

.navbar_without_auth {
    height: 10vh;
    color: #161c2d;
    background-color: rgb(255, 255, 255);
    border-bottom: rgb(239, 241, 241) 2px solid;
    font-family: 'Nunito', sans-serif;
}

.navbar-brand {
    font-size: 20px;
    font-weight: 700;
    color: #0a67ca;
}

.navbar-nav {
    margin-left: 8%;
}

.nav-item {
    margin-left: 15%;
}

.nav-link {
    font-weight: 550;
    color: #6b6c6e;
}

.nav-link:hover {
    color: black;
}

.auth-buttons {
    font-weight: 600;
}

#navbarDropdown:hover{
    cursor: pointer;
}

.nav-auth-buttons {
    margin-left: 7%;
}

.auth-button1 {
    margin-left: 20%;
}

.auth-button1 .btn {
    font-weight: 600;
    color: #0d80fc;
}

.auth-button1 .btn:hover {
    color: #6b6c6e;
}

.auth-button2 {
    color: aliceblue;
    margin-left: 3%;
}

.auth-button2 .btn {
    color: aliceblue;
}

.auth-button2 .btn:hover {
    background-color: #268af5;
    border-color: rgb(255, 255, 255);
}

.router-link, .router-link:visited, .router-link:hover, .router-link:active, .router-link:focus {
    outline: none !important;
    box-shadow: none;
}

.navbar-nav .nav-item .router-without-auth{
    color: #268af5;
}

/* after auth (logged in) */

.nav_auth {
    background: linear-gradient(to right bottom, rgb(240, 248, 248), rgb(240, 248, 248));
}

.navbar_auth {
    color: #161c2d;
    background-color: rgb(255, 255, 255);
    border-bottom: rgb(239, 241, 241) 2px solid;
}

.navbar-brand_auth {
    font-size: 20px;
    font-weight: 700;
    color: #0a67ca;
    margin-left: 10%;
}

.nav-item_auth {
    margin-left: 30%;
}

.nav-item_auth a {
    font-weight: 550;
    color: #6b6c6e;
}

.navbar-nav .nav-item_auth .router-auth{
    border-bottom: 2px solid rgb(3, 204, 204);
}

.profile-link {
    /* margin-left: 100%; */
    margin-top: 5px;
    margin-left: 50%;
}

.profile-link .nav-link {
    font-weight: 500;
    padding: 3px 6px 3px 6px;
    font: 20px;
    border-radius: 8px;
    color: white
}

.profile-link .dropdown-toggle:hover {
    outline: none !important;
    box-shadow: none;
    color: white;
    background-color: #007bff;
}

#navbarDropdown:focus {
    outline: none !important;
    box-shadow: none;
    border-color: rgb(240, 248, 248);
    background-color: #007bff;
}

.profile-link .dropdown-menu .logout {
    font-weight: 600;
}

.profile-link .dropdown-menu .logout:hover {
    cursor: pointer;
    background-color: #3593f8;
    color: #e8f1fe;
}

.profile-link .account-dropdown {
    position: absolute;
    left: 80%;
}

</style>
