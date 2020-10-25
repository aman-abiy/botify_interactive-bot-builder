<template>
    <div>
        <navbar/>
        <br>
        <br>
        <br>
        <br>
        <div class="container">
            <div class="row link-row">
                <span v-clipboard="() => `http://desolate-reaches-31306.herokuapp.com/bot/${this.$route.params.botId}`" v-on:click="copyLink()" class="offset-lg-7 offset-md-3"><i class="far fa-clone"></i></span>
                <router-link :to="{name: 'Bot', params: {'id': this.$route.params.botId }}" target="_blank" class="link "> https://localhost:8080/bot/{{ this.$route.params.botId }}</router-link>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="row justify-content-between">
                            <h4>Chats</h4>
                            <router-link :to="{name: 'Chats', params: {'botId': this.$route.params.botId }}" class="btn">view</router-link>
                        </div>
                        <br>
                        <div class="row justify-content-between">
                            <h5>Visits: 23</h5>
                            <h5>Submitted: 18</h5>
                        </div>
                        <hr class="horizontal-separator ">
                    </div>
                </div>
                <div class="col-lg-6">
                    <div :class="['card', bot.data[0].status ? 'card-status-active' : 'card-status-closed']">
                        <div class="row justify-content-between">
                            <h4>Status</h4>
                            <a v-if="bot.data[0].status" v-on:click="changeStatus()" class="btn btn-close text-danger">Close</a>
                            <a v-else v-on:click="changeStatus()" class="btn btn-activate text-success">Activate</a>
                        </div>
                        <br>
                        <div class="row justify-content-between">
                            <h5 v-if="bot.data[0].status">Active <span class="active"></span></h5>
                            <h5 v-else>Closed <span class="closed"></span></h5>
                            <h5>Date Created: 19 Dec, 2019</h5>
                        </div>
                        <hr class="horizontal-separator ">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <graph-line 
                                :height="320"
                                :shape="'normal'"
                                :axis-min="0"
                                :axis-max="Math.max(...last30Days.data[1])"
                                :axisStep="Math.ceil(Math.max(...last30Days.data[1]) / 10)"
                                :axis-full-mode="true"
                                :labels="[ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30' ]"
                                :values="last30Days.data[1]" class="col-lg-12">
                            <note :text="'Last 30 days performance'">Last 30 days performance</note>
                            <tooltip :names="['Chats']" :position="'right'"></tooltip>
                            <legends :names="['Chats']"></legends>
                            <guideline :tooltip-y="true"></guideline>
                        </graph-line>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import navbar from '@/components/navbar';
import footer from '@/components/footer';
export default {
    title: 'Bot Details',
    data: function() {
        return {
            link: '555'   
        }
    },
    components: {
        navbar, footer
    },
    computed: {
        bot() {
            return this.$store.getters.query
        },
        last30Days() {
            return this.$store.getters.last30Days
        }
    },
    methods: {
        changeStatus() {
            this.$store.dispatch('changeQueryStatus', this.$route.params.botId)
        },
        copyLink(){
            this.$toast.info('coppied to clipboard');
        }
    },
    created() {
        this.$store.dispatch('getQuery', this.$route.params.botId)
        this.$store.dispatch('getLast30Days', this.$route.params.botId)
    },
    updated() {
        this.$store.dispatch('getQuery', this.$route.params.botId)
    }
}
</script>
<style scoped>


.bot-id {
    float: right;
}

.container .link-row {
    margin-left: 45px;
}

.container .link-row span {
    cursor: pointer;
}

.container .link {
    font-size: 15px;
    font-family: 'Nunito', sans-serif;
    margin-left: 15px;
    margin-bottom: 15px;
}

.card {
    margin-bottom: 20px;
    padding: 15px 15px 15px 20px;
}

.card h4 {
    font-weight: 600;
    margin-left: 0px;
    font-family: 'Nunito', sans-serif;
}

.card h5 {
    font-family: 'Nunito', sans-serif;
}

.card-status-active{
    border-color:  rgb(118, 247, 150);
}

.card-status-closed{
    border-color: rgb(248, 167, 167);
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

.card .btn-close{
      background-color: rgb(248, 167, 167);
}

.card .btn-activate{
    background-color:  rgb(167, 248, 187);
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
</style>