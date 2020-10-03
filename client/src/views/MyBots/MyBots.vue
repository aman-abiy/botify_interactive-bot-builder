<template>
    <div>
        <navbarDelete v-if="Object.values(this.checkboxArray).includes(true)"/>
        <navbar v-else/>
        <br>
        <br>
        <br>
        <br>
        <div class="container">
            <div v-for="(bot) in allBots.data" v-bind:key="allBots.data._id">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="card text-center">
                            <div class="row">
                                <div class="col-lg-1">
                                    <div class="form-check form-check-inline">
                                        <input :id="bot._id" v-model="checkboxArray[bot._id]" class="form-check-input" type="checkbox" id="inlineCheckbox1">
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    {{ bot.title }}
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
            </div>
        </div>
    </div>
</template>
<script>
import navbarDelete from '@/components/navbar-delete';
import navbar from '@/components/navbar';
import footer from '@/components/footer';
export default {
    data: function(){
        return {
            checkboxArray: this.fillCheckboxArray()
        }
    },
    components: {
        navbar, navbarDelete, footer
    },
    computed: {
        allBots() {
            return this.$store.getters.allQueries
        }
    },
    methods: {
        fillCheckboxArray() {
            let object = this.$store.getters.allQueries.data;
            let checkbox = {}
            for(let index in object) {
                checkbox[object[index]._id] = false;
            }
            return checkbox;
        }
    },
    created() {
        this.$store.dispatch('getAllQueries')
        this.fillCheckboxArray()
                console.log('res', Object.values(this.checkboxArray).includes(true))
    },
}
</script>
<style scoped>
.card {
    margin-bottom: 20px;
    font-family: 'Nunito', sans-serif;
    padding: 15px 10px 15px 10px;
}

.card:hover {
    background-color: rgb(249, 253, 253);
}

.card-body {
    padding: 0px;
    margin: 0px;
}
</style>