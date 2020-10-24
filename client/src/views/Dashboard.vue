<template>
    <div>
        <navbar/>
        <br>
        <br>
        <br>
        <br>
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="row justify-content-between">
                            <h4>Chats <span class="chats-total-text">(total)</span></h4>
                        </div>
                        <br>
                        <div class="row justify-content-between">
                            <h5>Visits: 234</h5>
                            <h5>Submitted: {{ allBots.submitted_total }}</h5>
                        </div>
                        <hr class="horizontal-separator ">
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card">
                        <h4>Status</h4>
                        <br>
                        <div class="row justify-content-between">
                            <h5>Active <span class="active"></span></h5>
                            <h5>Date Created: 19 Dec, 2019</h5>
                        </div>
                        <hr class="horizontal-separator ">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="card bots-container-card">
                        <h5 class="text-center text-primary">Active Bots</h5>
                        <template v-if="activeBots" v-for="(bot) in activeBots">
                            <div class="row">
                                <div class="col-lg-12 col-md-12 col-sm-12">
                                    <div class="card text-center">
                                        <div class="row">
                                            <div class="col-lg-1">
                                            </div>
                                            <div class="col-lg-4">
                                                {{ bot.title.charAt(0).toUpperCase() + bot.title.slice(1) }}
                                            </div>
                                            <div class="col-lg-2">
                                                Status
                                            </div>
                                            <div class="col-lg-2">
                                                {{ bot.combined.length }} Chats
                                            </div>
                                            <div class="col-lg-2">
                                                <router-link :to="{ name: 'BotDetail', params: { 'botId': bot._id } }">more</router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import navbar from '../components/navbar';
import footer from '../components/footer';
export default {
    title: 'Dashboard',
    data: function() {
        return {
            c: this.allBots,
        }
    },
    components: {
        navbar, footer
    },
    computed: {
        allBots() {
            return this.$store.getters.allQueries;
        },
        activeBots() {
            return this.$store.getters.activeQueries;
        }
    },
    created() {
        this.$store.dispatch('getAllQueries')
        this.$store.dispatch('getActiveQueries')
    },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500&display=swap');
.bot-id {
    float: right;
}

.card {
    margin-bottom: 20px;
    padding: 15px 15px 15px 20px;
}

.card h4 {
    font-weight: 600;
    margin-left: 10px;
    font-family: 'Nunito', sans-serif;
}

.card h5 {
    font-family: 'Nunito', sans-serif;
}

.horizontal-separator {
    margin-top: 0px;
    padding-top: 0px;
    border-bottom: rgb(5, 211, 211) 2px solid;
}

.card .row {
    margin-right: 15px;
    margin-left: 15px;
}

.card .btn {
    margin: 0px 0px 0px 0px;
    padding: 0px 3px 0px 3px;
    color: #1081fa;
    font-weight: 600;
    font-size: 18px;
    height: 30px;
    background-color: rgb(167, 248, 248);
    border: white 0px transparent;
}

.card .btn:focus {
    outline: none !important;
    box-shadow: none;
}

.active {
    height: 10px;
    width: 10px;
    background-color: rgb(6, 168, 6);
    border-radius: 50%;
    position: relative;
    bottom: 2px;
    left: 5px;
    display: inline-block;
}

.closed {
    height: 10px;
    width: 10px;
    background-color: rgb(209, 9, 9);
    border-radius: 50%;
    position: relative;
    bottom: 2px;
    left: 5px;
    display: inline-block;
}

.chats-total-text {
    font-size: 15px;
}

.bots-container-card {
    padding: 15px 0px 0px 0px;
}

.bots-container-card .card {
    font-size: 15px;
    background-color: rgb(239, 241, 241);
}</style>