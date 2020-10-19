<template>
    <div>
        <div v-if="query[0].status" :class="[theme('dark-theme-bckgrnd', 'light-theme-bckgrnd'), 'container-fluid']">
            <div class="row">
                <div class="col-lg-4 d-none d-lg-block">
                    <a class="navbar-brand" href="#">botapp.com</a>
                </div>
                <div :class="[theme('dark-theme-chat-bckgrnd', 'light-theme-chat-bckgrnd') , 'chat-container col-lg-4 col-md-12 col-sm-12']">
                    <template  v-for="(child, index) in children">
                        <component :replyBot="children" :query="botQueries[index]" :component="botQueries[index] ? botQueries[goToTier[index] - 1].components[goToComp[index] - 1] : null " @selectedOption="btnGoToNext($event)" @forInput="forInputValues = $event" @hasConvoEnded="hasConvoEnded = $event" :is="child" :key="child.name"></component>
                        <div v-if="response[index]" class="row reply-user">
                            <div class="card-container">
                                <div :class="[theme('dark-theme-chat-bubble-user', 'light-theme-chat-bubble-user'), 'card']">
                                    <p>{{ response[index].optionValue ? response[index].optionValue : response[index].textValue }}</p>
                                </div>
                            </div>
                            <img src="../assets/images/chat-profile-icon2.png" alt="">
                        </div>
                        <br>
                        <br>
                        <br>
                    </template>  
                    <div v-if="showBotIsTyping" class="row reply-bot">
                        <img src="../assets/images/avatars/untitled5.png" alt="">
                        <div class="card-container" style="">
                            <img src="../assets/images/typing-bubble.gif" style="border-radius: 0px 15px 15px 15px" alt="">
                        </div>
                    </div>  
                </div>
            </div>

            <div v-if="showConvoEndedMsg" class="convo-ended-msg col-lg-4 col-md-12 col-sm-12 offset-lg-4">
                <p class="text-center">Conversation Ended</p>
            </div>
            <div  class="inputs col-lg-4 col-md-12 col-sm-12 offset-lg-4">
                <ValidationObserver v-slot="{ handleSubmit }">
                    <form v-if="!(JSON.stringify(forInputValues) === '{}') && !showConvoEndedMsg" v-on:submit.prevent="handleSubmit(inputGoToNext)" class="row">
                        <div class="col-10" style="padding: 0px">
                            <ValidationProvider :rules="`${forInputValues.option._inputMeta._dataType === 'Number' ? 'integer' : forInputValues.option._inputMeta._dataType === 'Email' ? 'email' : ''}`" mode="lazy" v-slot="{ errors }">
                                <span class="error-msg">{{ errors[0] }}</span>
                                <input v-model="textValue" type="text" :class="[theme('dark-theme-input', 'light-theme-input'), 'form-control col-12 rounded-0']" id="validationDefaultUsername" required>
                            </ValidationProvider>
                        </div>
                        <div class="col-2" style="padding: 0px">
                            <button type="submit" class="btn btn-primary" id="inputGroupPrepend2">Send</button>
                        </div>
                    </form>
                </ValidationObserver>
                
            </div>
        </div>
        <div v-if="!query[0].status" class="status-err">
            <div class="row">
                <div class="chat-container col-lg-4 col-md-12 col-sm-12 offset-lg-4">
                    <br>
                    <p class="status-err-msg">This bot has been either been disabled by owner or has expired and been shut down</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import replyBot from '../components/bot/reply-bot'
import replyUser from '../components/bot/reply-user'
import { ValidationProvider, extend } from 'vee-validate'
import { integer, email } from 'vee-validate/dist/rules';
extend('integer', {
  ...integer,
  message: 'A numeric value is required'
});

extend('email', {
  ...email,
  message: 'Ooops! That not a valid email'
});

export default {
    data: function() {
        return {
            children: [replyBot],
            showBotIsTyping: false,
            // start from second index cuz first item is inserted on 'created()'
            textValue: null,
            optionValue: null,
            index: 1,
            botQueries: [],
            response: [],
            // this is not based on index but on count starting from 1 (i.e, index + 1)
            goToTier: [1],
            goToComp: [1],
            hasConvoEnded: false,
            forInputValues: {},
            showConvoEndedMsg: false
        }
    },
    computed: {
        query() {
            return this.$store.getters.botQuery;
        },
        firstTier() {
            return this.$store.getters.botQuery;
        }
    },
    watch: {
        hasConvoEnded: {
            handler(hasConvoEnded) {
                if(hasConvoEnded) {
                    this.$store.dispatch('addResponse', { queryId: this.$route.params.id, data: this.response })
                    this.showConvoEndedMsg = true;
                }
            }
        }
    },
    methods: {
        inputGoToNext() {
            try {
                let abort = false;
                if(this.response[0]) {
                    this.response.forEach((res) => {
                        if(res._path._curr.tier == this.forInputValues.tierNumber) {
                            console.log(res._path._curr.tier, this.forInputValues.tierNumber)
                            abort = true;
                        }
                    })
                    if(abort){
                        return
                    }
                }
            } catch(TypeError) {
                console.log('ERRRRRRRRROR')
            }
            if(!(JSON.stringify(this.forInputValues) === '{}')) {
                if(this.textValue == '' || this.textValue == null) {
                    this.$toast.info(`Please fill in ${this.forInputValues.selectedValue}`, { duration: 2000, position: 'top-right' });
                    return;
                }
                
                this.response.push({
                    tier: this.forInputValues.tierNumber,
                    _hasTextInput: this.forInputValues.meta._textInput,
                    _hasOptionInput: this.forInputValues.meta._optionInput,
                    selected_opt: this.forInputValues.option.opt,
                    textValue: this.textValue,
                    optionValue: this.forInputValues.meta._optionInput ? this.forInputValues.selectedValue : null,
                    _path: {
                        _curr: { tier: this.forInputValues.tierNumber, comp: 1 },
                        _sentTo: { tier: this.forInputValues.option._goTo.tier, comp: this.forInputValues.option._goTo.comp }
                    }
                })
                this.showBotIsTyping = true;

                setTimeout(() => {
                    this.botQueries.push(this.$store.getters.botQuery[0].query_data[0][0].tiers[this.forInputValues.tierNumber])
                    this.children.push(replyBot)
                    this.goToTier.push(this.forInputValues.option._goTo.tier)
                    this.goToComp.push(this.forInputValues.option._goTo.comp)
                    this.forInputValues = {}
                    this.textValue = null
                    this.showBotIsTyping = false;
                }, 1000)
                
            }
            
        },
        // accepts the whole tier object, the tier levelNum, optionValue, the index of the component, 
        btnGoToNext(values) {            
            try {
                let abort = false;
                if(this.response[0]) {
                    this.response.forEach((res) => {
                        if(res._path._curr.tier == values.tierNumber) {
                            console.log(res._path._curr.tier, values.tierNumber)
                            abort = true;
                        }
                    })
                    if(abort){
                        return
                    }
                }
            } catch(TypeError) {

            }

            this.response.push({
                tier: values.tierNumber,
                _hasTextInput: values.meta._textInput,
                _hasOptionInput: values.meta._optionInput,
                selected_opt: values.option.opt,
                textValue: values.meta._textInput ? values.selectedValue : null,
                optionValue: values.meta._optionInput ? values.selectedValue : null,
                _path: {
                    _curr: { tier: values.tierNumber, comp: 1 },
                    _sentTo: { tier: values.option._goTo.tier, comp: values.option._goTo.comp }
                }
            })
            this.showBotIsTyping = true;

            setTimeout(() => {
                this.botQueries.push(this.$store.getters.botQuery[0].query_data[0][0].tiers[values.tierNumber])
                this.children.push(replyBot)
                this.goToTier.push(values.option._goTo.tier)
                this.goToComp.push(values.option._goTo.comp)
                this.showBotIsTyping = false;
            }, 1000)
        },  
        theme(darkTheme, lightTheme) {
            return this.query[0].theme == 'dark' ? darkTheme : lightTheme
        }
    },
    created() {
        this.$store.dispatch('getBotQuery', this.$route.params.id).then(() => {
            this.botQueries.push(this.$store.getters.botQuery[0].query_data[0][0].tiers[0])
        })
        
    },
}
</script>
<style scoped>
.light-theme-chat-bubble-user {
    background-color: #3f76ae;
    border-color: #3f76ae;
}

.light-theme-chat-bckgrnd {
    background-color: rgb(252, 252, 252);
}

.light-theme-bckgrnd {
    background-color: #ffffff;
}

.light-theme-input {
    border-color: #e8f1fe;
    background-color: #ffffff;
}

.light-theme-input:focus {
    border-color: aqua;
}

.dark-theme-chat-bubble-user {
    background-color: #3f76ae;
    border-color: #3f76ae;
}

.dark-theme-chat-bckgrnd {
    background-color: #1f2732;
}

.dark-theme-bckgrnd {
    background-color: #293341;
}

.dark-theme-input {
    border-color: #4e5d72;
    background-color: #4e5d72;
}

.dark-theme-input:focus {
    color: #3f76ae;
    border-color: #3f76ae;
    background-color: #4e5d72;
}


.container-fluid{
    overflow-x: hidden;
    overflow-y: hidden;
}

.chat-container {
    /*background-color: rgb(252, 252, 252);*/
    padding: 20px 10px 10px 10px;
    height: 93vh;
    overflow-y: auto;
    overflow-x: hidden;
}

.chat-container .card {
    padding: 15px;
    padding-bottom: 15px;
    border-radius: 0px 20px 20px 20px;
    color: #063a72;
    font-family: 'Epilogue', sans-serif;
    font-size: 17px;
    font-weight: 500;
    background-color: rgb(240, 248, 248);
    /*border-color: rgb(240, 248, 248);*/
}

.chat-container .reply-bot .card {
    border-radius: 0px 20px 20px 20px;
}

.chat-container .reply-user .card {
    background-color: #3f76ae;
    color: rgb(239, 241, 241);
    border-radius: 20px 00px 20px 20px;
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
    color: #0a5eb8;
    border-color: #0d80fc;
    background-color: rgb(253, 253, 253);
    font-size: 13px;
    border-radius: 5px;
    padding: 2px 5px 2px 5px;
    margin-top: 5px;
    margin-left: 5px;
    margin-right: 5px;

}

.chat-container .card-container a:hover {
    color: rgb(253, 253, 253);
    background-color: #0d80fc;
}

.chat-container .reply-user {
    float: right;
}

.chat-container .reply-user img {
    transform: scale(1.9);
    margin-right: 5px;
}

.container-fluid input {
    border-radius: 5px 0px 0px 5px;
    outline: none !important;
    /* height: 6.5vh; */
    font-family: 'Nunito', sans-serif;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.container-fluid input:focus {
    border-color: aqua;
    outline: none !important;
    font-family: 'Nunito', sans-serif;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.container-fluid .inputs form .btn {
    border-radius: 0px 5px 5px 0px;
    background-color: #0a67ca;
    font-family: 'Nunito', sans-serif;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.container-fluid .inputs form .error-msg {
    color: black;
    font-size: 12px;
}

.convo-ended-msg {
    background-color: rgb(192, 189, 189);
    font-family: 'Nunito', sans-serif;
}

.status-err {
    overflow-x: hidden;
    overflow-y: hidden;
}

.status-err-msg {
    background-color: rgb(192, 189, 189);
    font-family: 'Nunito', sans-serif;
    padding: 10px;
}
</style>




















<!-- <div class="row reply-bot">
                    <img src="../assets/images/avatars/untitled2.png" alt="">
                    <div class="card-container">
                        <div class="card">
                            <p>{{query[0].query_data[0][0].tiers}}</p>
                        </div>
                    </div>
                </div>
                <br>
                <div class="row reply-user">
                    <div class="card-container">
                        <div class="card">
                            <p>Amanuel</p>
                        </div>
                    </div>
                    <img src="../assets/images/avatars/untitled2.png" alt="">
                </div> -->


                <!-- <br>
                <br>
                <br>
                <div class="row reply-bot">
                    <img src="../assets/images/avatars/untitled2.png" alt="">
                    <div class="card-container">
                        <div class="card">
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique unde corporis fugit consectetur nihil laboriosam veniam molestiae iusto velit? Eum magni quas tempora, vero possimus nihil neque corporis error exercitationem.</p>
                        </div>
                    </div>
                </div>
                <br>
                <div class="row reply-user">
                    <div class="card-container">
                        <div class="card">
                            <p>Amanuel</p>
                        </div>
                    </div>
                    <img src="../assets/images/avatars/untitled2.png" alt="">
                </div>
                <br>
                <br>
                <br>
                <div class="row reply-bot">
                    <img src="../assets/images/avatars/untitled2.png" alt="">
                    <div class="card-container">
                        <div class="card">
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique unde corporis fugit consectetur nihil laboriosam veniam molestiae iusto velit? Eum magni quas tempora, vero possimus nihil neque corporis error exercitationem.</p>
                        </div>
                    </div>
                </div>
                <br>
                <div class="row reply-user">
                    <div class="card-container">
                        <div class="card">
                            <p>Amanuel</p>
                        </div>
                    </div>
                    <img src="../assets/images/avatars/untitled2.png" alt="">
                </div>
                <br>
                <br>
                <br>
                <div class="row reply-bot">
                    <img src="../assets/images/avatars/untitled2.png" alt="">
                    <div class="card-container">
                        <div class="card">
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique unde corporis fugit consectetur nihil laboriosam veniam molestiae iusto velit? Eum magni quas tempora, vero possimus nihil neque corporis error exercitationem.</p>
                        </div>
                    </div>
                </div> -->