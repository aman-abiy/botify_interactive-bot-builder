<template>
    <div>
        <nav class="navbar navbar-expand-lg fixed-top">
            <router-link :to="{ name: 'Dashboard'}" :class="['navbar-brand']">botapp.com</router-link>
        </nav>
        <br>
        <br>
        <br>
        <div class="container-fluid">
            <a v-on:click="goBack()" class="btn back-btn"><i class="fas fa-long-arrow-alt-left"></i>Back</a>
            <div class="row">
                <div class="col-lg-6 col-md-12 col-sm-6">
                    <h4 class="text-center">Select an avatar <span>(optional)</span></h4>
                    <br>
                    <br>
                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-4 ">
                            <img v-on:click="selectedAvatar = 'untitled.png'" :class="[selectedAvatar == 'untitled.png' ? 'color-border' : '', 'avatar-img col-lg-12 col-md-4 col-sm-4'] " src="../assets/images/avatars/untitled.png" alt="">
                            <!--<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>-->

                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-4 ">
                            <img v-on:click="selectedAvatar = 'untitled2.png'" :class="[selectedAvatar == 'untitled2.png' ? 'color-border' : '', 'avatar-img col-lg-12 col-md-4 col-sm-4']" src="../assets/images/avatars/untitled2.png" alt="">
                            <!--<input class="form-check-input " type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>-->
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-4 ">
                            <img v-on:click="selectedAvatar = 'untitled3.png'" :class="[selectedAvatar == 'untitled3.png' ? 'color-border' : '', 'avatar-img col-lg-12 col-md-4 col-sm-4']" src="../assets/images/avatars/untitled3.png" alt="">
                            <!--<input class="form-check-input " type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>-->
                        </div>
                    </div>
                    <br>
                    <br>
                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-4 ">
                            <img v-on:click="selectedAvatar = 'untitled4.png'" :class="[selectedAvatar == 'untitled4.png' ? 'color-border' : '', 'avatar-img col-lg-11 col-md-4 col-sm-4']" src="../assets/images/avatars/untitled4.png" alt="">
                            <!--<input class="form-check-input " type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>-->
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-4 ">
                            <img v-on:click="selectedAvatar = 'untitled5.png'" :class="[selectedAvatar == 'untitled5.png' ? 'color-border' : '', 'avatar-img col-lg-12 col-md-4 col-sm-4']" src="../assets/images/avatars/untitled5.png" alt="">
                            <!--<input class="form-check-input " type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>-->
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-4 ">
                            <img v-on:click="selectedAvatar = 'untitled6.png'" :class="[selectedAvatar == 'untitled6.png' ? 'color-border' : '', 'avatar-img col-lg-12 col-md-4 col-sm-4']" src="../assets/images/avatars/untitled6.png" alt="">
                            <!--<input class="form-check-input " type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>-->
                        </div>
                    </div>
                    <br>
                    <br>
                    <div class="form-check text-center">
                        <!--<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>-->
                        <a v-on:click="selectedAvatar = null" class="btn" for="exampleRadios1">none </a>
                    </div>
                </div>
                <!-- <div class="col-lg-6 col-md-12 col-sm-12">
                    <h5>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti molestiae, consequuntur, eos distinctio unde sequi voluptatem earum omnis eveniet libero, quis maxime. Totam saepe, numquam quo voluptates a corporis aliquid?</h5>
                </div> -->
                <div class="col-lg-6 col-md-12">
                    <h4 class="text-center">Select Theme <span>(optional)</span></h4>
                    <br>
                    <br>
                    <div class="row">
                        <!-- <div class="col-lg-1 offset-lg-1 vertical-line" style="width: ;"></div> -->
                        <div class="col-lg-4 col-md-1 offset-lg-2 offset-3">
                            <img v-on:click="selectedTheme = 'light'" :class="[ selectedTheme == 'light' ? 'color-border' : '',  'theme-img']" src="../assets/images/bot-themes/light-theme.png" alt="">
                        </div>
                        <div class="col-lg-4 col-md-3 offset-lg-1 offset-3">
                            <img v-on:click="selectedTheme = 'dark'" :class="[ selectedTheme == 'dark' ? 'color-border' : '', 'theme-img']" src="../assets/images/bot-themes/dark-theme.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <br class="d-sm-none">
            <a v-on:click="publish()" class="btn btn-primary text-light offset-lg-11 offset-md-10 offset-8">Publish</a>
            <br>
            <br>
        </div>
    </div>
</template>
<script>
export default {
    title: 'Publish',
    data: function() {
        return {
            selectedAvatar: null,
            selectedTheme: null,
        }
    },
    computed: {
        query_data() {
            return this.$store.getters.COMPONENT_LEVEL_DATA;
        },
        botTitle() {
            return this.$store.getters.botTitle
        }
    },
    methods: {
        publish() {
            let bot = {
                title: this.botTitle,
                query_data: this.query_data,
                avatar: this.selectedAvatar || 'none',
                theme: this.selectedTheme || 'light'
            }
            this.$store.dispatch('addQuery', bot).then(() => {this.$router.push({ name: 'MyBots'})});
        },
        goBack() {
            this.$router.go(-1);
        },
    },
    created() {
        console.log(this.botTitle)
    },
}
</script>>
<style scoped>
nav {
    background: linear-gradient(to right bottom, rgb(240, 248, 248), rgb(240, 248, 248));
}

.navbar {
    font-family: 'Poppins', sans-serif;
    color: #161c2d;
    background-color: rgb(255, 255, 255);
    border-bottom: rgb(239, 241, 241) 2px solid;
}

.navbar-brand {
    font-size: 20px;
    font-weight: 700;
    color: #0a67ca;
    margin-left: 10%;
}

.container-fluid .back-btn {
    padding: 8px 10px 8px 10px;
    margin-bottom: 10px;
    margin-left: 35px;
    color: #0a67ca;
    font-weight: 500;
    font-size: 17px;
}

.container-fluid .back-btn:hover {
    color: #0a67ca;
    border-color: rgb(240, 248, 248);
    background-color: rgb(223, 250, 250);
}

.container-fluid .back-btn:focus {
    outline: none !important;
    box-shadow: none;
    color: rgb(240, 248, 248);
    border-color: rgb(240, 248, 248);
    background-color: rgb(240, 248, 248);
}

.container-fluid .fa-long-arrow-alt-left {
    margin-right: 7px;
}

.container-fluid h4 {
    color: rgb(63, 123, 129);
    font-weight: 600;
    font-family: 'Nunito', sans-serif;
}

.container-fluid h4 span {
    font-size: 16px;
}

.vertical-line {
    border-left: 2.5px solid rgb(3, 204, 204);
    /* border-radius: 50%; */
    height: 350px;
}

.avatar-img:hover{
    cursor: pointer;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19);
}

.row .theme-img {
    border-radius: 20px;
}

.row .theme-img:hover {
    cursor: pointer;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19);
}

.container-fluid .row .btn:focus {
    outline: none !important;
    box-shadow: none;
}

.color-border{
    border: 4px solid #268af5;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19);
}
</style>