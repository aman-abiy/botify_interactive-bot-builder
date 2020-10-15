<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-4 d-none d-lg-block">
                <a class="navbar-brand" href="#">botapp.com</a>
            </div>
            <div class="chat-container col-lg-4 col-md-12 col-sm-12 ">
                <template  v-for="(child, index) in children">
                    <component :replyBot="children" :query="botQueries[index]" :component="botQueries[index] ? botQueries[goToTier[index] - 1].components[goToComp[index] - 1] : null " @selectedOption="btnGoToNext($event)" @forInput="forInputValues = $event" :is="child" :key="child.name"></component>
                    <div v-if="response[index]" class="row reply-user">
                        <div class="card-container">
                            <div class="card">
                                <p>{{ response[index].optionValue ? response[index].optionValue : response[index].textValue }}</p>
                            </div>
                        </div>
                        <img src="../assets/images/avatars/untitled2.png" alt="">
                    </div>
                    <br>
                    <br>
                    <br>
                </template>    
            </div>
        </div>
        <div v-if="!(JSON.stringify(forInputValues) === '{}')"  class="input-group col-lg-4 col-md-12 col-sm-12 offset-lg-4">
            <input v-model="textValue" type="text" class="form-control rounded-0" id="validationDefaultUsername" placeholder="Username" aria-describedby="inputGroupPrepend2" required>
            <div class="input-group-prepend">
                <input v-on:click="inputGoToNext();" type="submit" value="Submit" class="btn btn-primary btn-sm" id="inputGroupPrepend2">
            </div>
        </div>
        <!-- <input class="form-control col-lg-4 col-md-12 col-sm-12 offset-lg-4" type="text" placeholder="Default input"> -->

    </div>
</template>
<script>
import replyBot from '../components/bot/reply-bot'
import replyUser from '../components/bot/reply-user'
export default {
    data: function() {
        return {
            children: [replyBot],
            children2: [replyUser],
            // start from second index cuz first item is inserted on 'created()'
            textValue: null,
            optionValue: null,
            index: 1,
            botQueries: [],
            response: [],
            // this is not based on index but on count starting from 1 (i.e, index + 1)
            goToTier: [1],
            goToComp: [1],
            forInputValues: {}
        }
    },
    computed: {
        query() {
            return this.$store.getters.botQuery;
        }
    },
    methods: {
        inputGoToNext() {
            if(!(JSON.stringify(this.forInputValues) === '{}')) {
                if(this.textValue == '' || this.textValue == null) {
                    this.$toast.info(`Please fill in ${this.forInputValues.selectedValue}`, { duration: 2000, position: 'top-right' });
                    return;
                }
                console.log(this.textValue)
                this.response.push({
                    tier: this.forInputValues.tierNumber,
                    _hasTextInput: this.forInputValues.meta._textInput,
                    _hasOptionInput: this.forInputValues.meta._optionInput,
                    selected_opt: this.forInputValues.option.opt,
                    textValue: this.textValue,
                    optionValue: this.forInputValues.meta._optionInput ? this.forInputValues.selectedValue : null,
                    _path: {
                        _curr: { tier: this.forInputValues.tierNumber, comp: 1 },
                        _sentTo: { tier: this.forInputValues.option._goto.tier, comp: this.forInputValues.option._goto.comp }
                    }
                })
                this.botQueries.push(this.$store.getters.botQuery[0].query_data[0][0].tiers[this.forInputValues.tierNumber])
                this.children.push(replyBot)
                this.goToTier.push(this.forInputValues.option._goto.tier)
                this.goToComp.push(this.forInputValues.option._goto.comp)
            }
            
        },
        // accepts the whole tier object, the tier levelNum, optionValue, the index of the component, 
        btnGoToNext(values) {
            console.log(values)
            this.response.push({
                tier: values.tierNumber,
                _hasTextInput: values.meta._textInput,
                _hasOptionInput: values.meta._optionInput,
                selected_opt: values.option.opt,
                textValue: values.meta._textInput ? values.selectedValue : null,
                optionValue: values.meta._optionInput ? values.selectedValue : null,
                _path: {
                    _curr: { tier: values.tierNumber, comp: 1 },
                    _sentTo: { tier: values.option._goto.tier, comp: values.option._goto.comp }
                }
            })
            this.botQueries.push(this.$store.getters.botQuery[0].query_data[0][0].tiers[values.tierNumber])
            this.children.push(replyBot)
            this.goToTier.push(values.option._goto.tier)
            this.goToComp.push(values.option._goto.comp)
            // tier, tierLevel, optionValue, index, goTo
            // let addResponse = true;
            // if(!this.botQueries[this.botQueries.length - 1].components[0].options[0]._inputMeta) {
            //     this.response.forEach((val) => { if(val.tier == tierLevel) { addResponse = false } })
            //     if((this.$store.getters.botQuery[0].query_data[0][0].tiers.length > this.response.length) && addResponse){
            //         this.response.push({
            //             tier: tierLevel,
            //             _hasTextInput: false,
            //             _hasOptionInput: true,
            //             selected_opt: index + 1,
            //             textValue: this.textValue,
            //             optionValue: optionValue,
            //             // _path: {
            //             //     _curr: { tier: 1, comp: 1 },
            //             //     _sentTo: { tier: 2, comp: 2 }
            //             // }
            //         })
            //     };
            //     if((this.$store.getters.botQuery[0].query_data[0][0].tiers.length - 1) >= this.index) {
            //         this.index = this.index + 1;
            //         console.log(goTo) 
            //         this.botQueries.push(tier)
            //         // this.goToComp = goTo.comp;
            //     }
            // }
        }
    },
    created() {
        this.$store.dispatch('getBotQuery', this.$route.params.id)
        this.botQueries.push(this.$store.getters.botQuery[0].query_data[0][0].tiers[0])
    },
}
</script>
<style scoped>
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
    color: #063a72;
    font-family: 'Epilogue', sans-serif;
    font-size: 17px;
    font-weight: 500;
    background-color: rgb(240, 248, 248);
    border-color: rgb(240, 248, 248);
}

.chat-container .reply-bot .card {
    border-radius: 0px 20px 20px 20px;
}

.chat-container .reply-user .card {
    background-color: #2b62fa;
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

.container-fluid input {
    border-color: #e8f1fe;
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

.container-fluid .input-group .input-group-prepend input {
    border-radius: 5px;
    background-color: #0a67ca;
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