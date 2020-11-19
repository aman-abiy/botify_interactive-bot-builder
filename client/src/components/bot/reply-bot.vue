<template>
    <div v-if="component">
        <div class="row reply-bot">
            <img :src="[queryData[0].avatar === 'none' ? getAvatarImg('untitled2.png') : getAvatarImg(queryData[0].avatar)]" alt="">
            <div class="card-container">
                <div :class="[theme('dark-theme-chat-bubble-bot', 'light-theme-chat-bubble-bot'), 'card']">
                    <p>{{ component.query }}</p>
                    <!-- <p v-if="query.components.length == 1">{{query.components[goToComp - 1].query}}</p>
                    <p v-if="query.components.length > 1">{{query.components[goToComp].query}}</p> -->
                </div>
                <template v-for="(option, compIndex) in component.options" >
                    <a v-on:click="emitOptionSelected(query.tier, component._meta, option, option.text);" v-if="!option._inputMeta" :class="[queryData[0].theme === 'dark' ? 'dark-theme-chat-btns' : 'light-theme-chat-btns', 'btn']">{{ option.text }}</a>
                    <!--<a v-on:click="btnGoToNext(query[0].query_data[0][0].tiers[index], tier.tier, option.text, compIndex, option._goTo)" v-if="!option._inputMeta" class="btn">{{ option.text }}</a>-->
                </template>
            </div>
        </div>
        <br>
    </div>
</template>
<script>
export default {
    props: {
        replyBot: Array,
        query: Object,
        component: Object
    },
    data: function() {
        return {
            // start from second index cuz first item is inserted on 'created()'
            // hasInput: this.component.options[0]._inputMeta,
            optionValue: null,
            index: 1,
            botQueries: [],
            response: [],
            // this is not based on index but on count starting from 1 (i.e, index + 1)
            goToComp: 1,
            queryData: null

        }
    },
    computed: {
        queryDatas() {
            return this.$store.getters.botQuery;
        }
        // hasInput() {
        //     if(this.component.options[0]._inputMeta != null){
        //         return this.component.options[0]._inputMeta._dataType
        //     }
        //     return null;
        //     // return emitForInput(query.tier, component._meta, option, option.text)
        // }
    },
    watch: {
        component: {
            immediate: true,
            deep: true,
            handler(component) {
                try {
                    if(!component.options[0]) {
                        this.$emit('hasConvoEnded', true)
                    }
                    if(component.options[0]._inputMeta != null){
                        let toSend = { tierNumber: this.query.tier, meta: this.component._meta, option: this.component.options[0], selectedValue: this.component.options[0].text }
                        this.$emit('forInput', toSend)
                        toSend = {}
                    }
                    
                } catch(TypeError) {
                    console.log('Der is som error')
                }

            }
        },
        queryDatas: {
            handler(queryDatas) {
                if(queryDatas) {
                   this.queryData = queryDatas; 
                }
            }
        }
    },
    methods: {
        emitForInput(tierNumber, meta, option, selectedValue) {
            this.$emit('forInput', { tierNumber, meta, option, selectedValue })
        },
        emitOptionSelected(tierNumber, meta, option, selectedValue) {
            this.$emit('selectedOption', { tierNumber, meta, option, selectedValue })
        },
        getAvatarImg(pic) {
            return require('../../assets/images/avatars/'+pic)
        },
        theme(darkTheme, lightTheme) {
            return this.queryData[0].theme == 'dark' ? darkTheme : lightTheme
        }
    },
    async created() {
        await this.$store.dispatch('getBotQuery', this.$route.params.id)
        // this.botQueries.push(this.$store.getters.botQuery[0].query_data[0][0].tiers[0])
    }
}
</script>
<style scoped>
.light-theme-chat-bubble-bot {
    background-color: rgb(240, 248, 248);
    border-color: rgb(240, 248, 248);
}

.dark-theme-chat-bubble-bot {
    color: #c0c4cd;
    border-color: #2b3d54;
    background-color: #2b3d54
}

.light-theme-chat-btns {
    color: #0a5eb8;
    border-color: #3f76ae;
    background-color: rgb(253, 253, 253);
}

.dark-theme-chat-btns {
    color: #c0c4cd;
    border-color: #3f76ae;
    background-color: #2b3d54
}

.chat-container {
    background-color: rgb(253, 253, 253);
    padding: 20px 10px 10px 10px;
    height: 93vh;
    overflow-y: auto;
    overflow-x: hidden;
}

.chat-container .card {
    padding: 15px;
    padding-bottom: 15px;
    border-radius: 0px 20px 20px 20px;
    font-family: 'Epilogue', sans-serif;
    font-size: 17px;
    font-weight: 500;
    /*color: #063a72;
    background-color: rgb(240, 248, 248);
    border-color: rgb(240, 248, 248);*/
}

.chat-container .reply-bot .card {
    border-radius: 0px 20px 20px 20px;
}

.chat-container img {
    height: 50px;
    width: 50px;
    object-fit: cover;
}

.chat-container p {
    margin: 0px;
    font-size: 16px;
    font-weight: 400;
    font-family: 'Nunito', sans-serif;
}

.chat-container .card-container {
    max-width: 83%;
}

.chat-container .card-container a {
    font-size: 13px;
    border-radius: 5px;
    padding: 2px 5px 2px 5px;
    margin-top: 15px;
    margin-left: 8px;
    margin-right: 5px;

}

.chat-container .card-container a:hover {
    color: rgb(253, 253, 253);
    background-color: #0d80fc;
}

</style>