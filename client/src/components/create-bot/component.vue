<template>
    <div class="col-lg-3 col-md-3 col-sm-4">
        <div class="components col-lg-3 col-md-3 col-sm-4 ">
            <div class="card" style="width: 15.5rem; background-color: rgb(253, 253, 253); ">
                <div class="card-body">
                    <div class="row content_input_section">
                        <span v-on:click="removeComponent(componentCount[0])"><i class="fas fa-times close-icon"></i></span>
                        <div class="col-lg-8 col-md-8 col-sm-6">
                        <!-- <span>{{componentCount[0]}}</span> -->
                            <textarea v-on:input="getQuery(componentCount[0], $event)" name=" " id=" " cols="21" rows="5" placeholder="Enter text here..." style="font-size: 13px; margin-top: 5px"></textarea>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-6 add-buttons ">
                            <a v-on:click="modals.addBtnModal = !modals.addBtnModal" type="button" class="btn card-buttons"><i class="fas fa-plus "></i>Button</a>
                            <a v-on:click="modals.addInputModal = !modals.addInputModal" type="button" class="btn card-buttons"><i class="fas fa-plus "></i>Input</a>
                        </div>
                    </div>
                    <span v-show="false">{{pushComponentCount}}</span>
                    <!-- <span>{{componentCount[0]}}
                    {{componentArray}}</span> -->
                    <p class="goto_text ">Go to:</p>
                    <div class="row user-added-components ">
                        <div class="col-lg-12 col-md-12 col-sm-12 ">
                            <template v-for="option in componentObjects[0].tiers[this.currentLevel - 1].components[componentCount[0] - 1].options">
                                <div v-if="option._inputMeta" class="row user-controls justify-content-between ">
                                    <input type="text " class="col-4 form-control user-added-input " data-toggle="popover-user-added-comp" tabindex="0" data-html="true " :placeholder="option.text" readonly>
                                    <span class="goto ">level <input type="text " :placeholder="option._goTo.tier">component <input type="text " :placeholder="option._goTo.comp"></span>
                                </div>
                                <div v-else class="row user-controls justify-content-between ">
                                    <a href="# " class="btn user-added-buttons " data-toggle="popover-user-added-comp" data-html="true ">{{ option.text }}</a>
                                    <span class="goto ">level <input type="text " :placeholder="option._goTo.tier">component <input type="text " :placeholder="option._goTo.comp"></span>
                                </div>
                            </template>   
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-6 ">

                        </div>
                    </div> 
                </div>
            </div>
        </div>

        
        <div class="overlay" v-show="modals.addBtnModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-8">
                                <input v-model="texts.buttonTxt" type="text" class="form-control popover-input" placeholder="Enter button text " aria-describedby="button-addon1 ">
                                <span v-if="btnAndInputErrMsg" class="text-danger goto-err-msg text-center">{{ btnAndInputErrMsg }}</span>
                            </div>
                        </div>
                        <div class="row user-controls">
                            <!--<span class="goto-curr">(L:1, C:2)</span>-->
                            <span class="goto-title">Go to: </span><span class="goto">level</span> <input v-model="goTo.tier" type="text" class="form-control" placeholder="0 "><span class="goto">component</span><input v-model="goTo.comp" type="text" class="form-control" placeholder="0 ">
                        </div>
                        <span v-if="gotoErrorMsg" class="text-danger goto-err-msg text-center">{{ gotoErrorMsg }}</span>
                        <div class="row modal-controls justify-content-between">
                            <button class="btn col-lg-4" type="button" v-on:click="modals.addBtnModal = !modals.addBtnModal; gotoErrorMsg = null; btnAndInputErrMsg = null">Cancel</button>
                            <button class="btn col-lg-4" type="button" v-on:click="addButton(componentCount[0])">Done</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="overlay" v-show="modals.addInputModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-9">
                                <input v-model="texts.inputTxt" type="text" class="form-control popover-input" placeholder="Enter input identifier text " aria-describedby="button-addon1 ">
                                <span v-if="btnAndInputErrMsg" class="text-danger goto-err-msg text-center">{{ btnAndInputErrMsg }}</span>
                            </div>
                            <div class="col-lg-3 drop-down-col">
                                <div class="dropdown">
                                    <button class="btn dropdown-toggle col-lg-12" type="button" id="dropdownMenuButton" data-toggle="dropdown">Type</button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a :class="['dropdown-item', inputType.text ? 'active' : '']" href="#" v-on:click="inputType.text = 'String'; inputType.number = null; inputType.email = null">Text</a>
                                        <a :class="['dropdown-item', inputType.number ? 'active' : '']" href="#" v-on:click="inputType.number = 'Number'; inputType.text = null; inputType.text = null">Number</a>
                                        <a :class="['dropdown-item', inputType.email ? 'active' : '']" href="#" v-on:click="inputType.email = 'Email'; inputType.number = null; inputType.text = null">Email</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row user-controls">
                            <!--<span class="goto-curr">(L:1, C:2)</span>-->
                            <span class="goto-title">Go to: </span><span class="goto">level</span> <input v-model="goTo.tier" type="text" class="form-control" placeholder="0 "><span class="goto">component</span><input v-model="goTo.comp" type="text" class="form-control" placeholder="0 ">
                        </div>
                        <span v-if="gotoErrorMsg" class="text-danger goto-err-msg text-center">{{ gotoErrorMsg }}</span>
                        <div class="row modal-controls justify-content-between">
                            <button class="btn col-lg-4" type="button" v-on:click="modals.addInputModal = !modals.addInputModal; gotoErrorMsg = null; btnAndInputErrMsg = null">Cancel</button>
                            <button class="btn col-lg-4" type="button" v-on:click="addInput(componentCount[0])">Done</button>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        currentLevel: Number,
        components: Array,
        componentArray: Array
    },
    data: function() {
        return {
            componentObjects: this.componentArray,
            componentCount: [],
            modals: {
                addBtnModal: false,
                addInputModal: false
            },
            texts: {
                quertTxt: [],
                buttonTxt: null,
                inputTxt: null,
            },
            inputType: {
                text: true,
                number: null,
                email: null
            },
            goTo: {
                tier: null,
                comp: null       
            },
            comps: [],
            btnAndInputErrMsg: null,
            gotoErrorMsg: null
        }
    },
    computed: {
        pushComponentCount() {
            this.componentCount.push(this.components.length);
            return this.componentCount; 
        }
    },
    methods: {
        getQuery(index, $event) {
            console.log(this.componentObjects[0], this.currentLevel)
            this.componentObjects[0].tiers[this.currentLevel - 1].components[index - 1].query = $event.target.value;
            // this.componentObjects[index - 1].query = $event.target.value;
            this.$store.commit('set_COMPONENT_LEVEL_DATA', this.componentObjects)
            console.log(index, $event.target.value, this.componentObjects[index - 1].query)
        },
        addButton(index) {
            if(!this.texts.buttonTxt) {
                this.btnAndInputErrMsg = 'Enter button value'
                return;
            }
            if(!this.goTo.tier || !this.goTo.comp) {
                this.gotoErrorMsg = "'Go to' values can not be empty";
                return;
            }
            if(isNaN(this.goTo.tier)  || isNaN(this.goTo.comp)) {
                this.gotoErrorMsg = "'Go to' values can only be numbers";
                return;
            }
            this.componentObjects[0].tiers[this.currentLevel - 1].components[index - 1].options.push({
                opt: ( this.componentObjects[0].tiers[this.currentLevel - 1].components[index - 1].options.length + 1),
                text: this.texts.buttonTxt,
                _goTo: { tier: this.goTo.tier, comp: this.goTo.comp},
                _inputMeta: null
            })
            this.componentObjects[0].tiers[this.currentLevel - 1].components[index - 1]._meta =  {
                _textInput: false, 
                _optionInput: true
            }
            this.$store.commit('set_COMPONENT_LEVEL_DATA', this.componentObjects)
            this.resetValues()
            this.$emit('fromComponent', this.comps);
            this.gotoErrorMsg = null;
            this.btnAndInputErrMsg = null;
            this.modals.addBtnModal = !this.modals.addBtnModal;
        },
        addInput(index) {
            if(!this.texts.inputTxt) {
                this.btnAndInputErrMsg = 'Enter input identifier text'
                return;
            }
            if(!this.goTo.tier || !this.goTo.comp) {
                this.gotoErrorMsg = "'Go to' can not be empty";
                return;
            }
            if(isNaN(this.goTo.tier)  || isNaN(this.goTo.comp)) {
                this.gotoErrorMsg = "'Go to' values can only be numbers";
                return;
            }
            this.componentObjects[0].tiers[this.currentLevel - 1].components[index - 1].options.push({
                opt: ( this.componentObjects[0].tiers[this.currentLevel - 1].components[index - 1].options.length + 1),
                text: this.texts.inputTxt,
                _goTo: { tier: this.goTo.tier, comp: this.goTo.comp},
                _inputMeta: {
                    _dataType: Object.values(this.inputType).find(element => element != null)
                }
            })
            this.componentObjects[0].tiers[this.currentLevel - 1].components[index - 1]._meta =  {
                _textInput: true, 
                _optionInput: false
            }
            this.$store.commit('set_COMPONENT_LEVEL_DATA', this.componentObjects)
            this.resetValues()
            this.$emit('fromComponent', this.comps);
            this.gotoErrorMsg = null;
            this.btnAndInputErrMsg = null;
            this.modals.addInputModal = !this.modals.addInputModal;
        },
        removeComponent(index) {
            console.log("CLICKEEED")
            this.$emit('removeComponent', index - 1)
            console.log(this.componentObjects[0].tiers[this.currentLevel - 1].components.splice([index - 1]))
        },
        resetValues(){
            this.texts.buttonTxt = null
            this.texts.inputTxt = null
            this.inputType.text = true
            this.inputType.number = null
            this.inputType.email = null
            this.goTo.tier = null
            this.goTo.comp = null
        }    
    }
}

</script>
<style scoped>
@import url('https://pro.fontawesome.com/releases/v5.10.0/css/all.css');
.components {
    margin-top: 5px;
}

.btn:focus {
    outline: none !important;
    box-shadow: none;
}

input:focus {
    outline: none !important;
    box-shadow: none;
}

.card {
    padding: 0px;
    font-style: 13px;
    font-family: 'Nunito', sans-serif;
    border-radius: 0rem;
    margin-right: 50px;
    padding-bottom: 0px;
}

.card .card-body {
    font-style: 13px;
    padding-top: 12px;
    padding-bottom: 5px;
    margin: 0px;
}

.card .card-body span{
    height: 30px;
}

.card .card-body span .close-icon {
    position: absolute;
    left: 92%;
    bottom: 87%;
    height: 8px;
    border: 1px solid #007bff;
    padding: 1px 3px 15px 3px;
    color: rgb(3, 204, 204);
}

.card .card-body span:hover {
    cursor: pointer;
}

.card-body .content_input_section div textarea {
    padding-bottom: 0px;
    margin-bottom: 0px;
}

.add-buttons {
    position: relative;
    left: 1%;
    margin-bottom: 5px;
}

.add-buttons .btn {
    margin: 0px 0px 0px 0px;
    padding: 0px;
    color: #1d85f5;
    font-weight: 600;
    font-size: 14px;
    border: white 0px transparent;
}

.add-buttons .btn:hover {
    color: rgb(3, 204, 204);
}

.add-buttons .btn:focus {
    outline: none !important;
    box-shadow: none;
}

textarea {
    margin: 0px;
    position: relative;
    bottom: 9px;
    right: 12px;
    background-color: rgb(253, 253, 253);
    border-color: rgb(185, 255, 255);
}

textarea:focus {
    outline: none !important;
    background-color: white;
    border-color: rgb(159, 250, 250);
}

.card-body .row .user-added-buttons {
    padding: 3px 5px 0px 5px;
    margin: 0px;
    font-size: 13px;
    color: white;
    background-color: #0a76eb;
}

.card-body .row .user-added-input {
    outline: none !important;
    box-shadow: none;
    border-color: rgb(95, 99, 99);
    height: 23px;
    font-size: 13px;
    border-color: rgb(177, 175, 175);
    padding-left: 5px
}

.goto {
    font-size: 13px;
    margin-left: 2px;
    float: right;
}

.goto-err-msg {
    font-size: 12px;
}

.card .goto input {
    font-size: 13px;
    width: 25px;
    height: 20px;
    border: none;
    outline: none !important;
    border-bottom: 1px solid rgb(80, 197, 197);
}

.goto input:focus {
    outline: none !important;
    border-color: rgb(231, 228, 228);
    border-radius: 4px;
}

.goto_text {
    font-size: 13px;
    font-weight: 600;
    padding: 0px;
    margin: 0px;
    position: relative;
    left: 35%;
}

.user-controls {
    margin-bottom: 5px;
}

.fa-plus {
    font-size: 13px;
    margin: 0px 3px 0px 0px;
}

.overlay{
    position: fixed;
    top: 6%;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background: rgba(242, 252, 252, 0.1);
    overflow-y: auto;
}

.overlay .modal-dialog{
    width: 25%;
    border-color: rgb(3, 204, 204);
}

.modal-content{
    border-color: rgb(3, 204, 204);
}

.overlay .modal-content .modal-body{
    padding: 5px 15px 5px 15px;
}

.overlay .modal-content .modal-body .popover-input{
    height: 30px;
}

.overlay .modal-content .modal-body .drop-down-col{
    padding: 0px 10px 0px 0px;
}

.overlay .modal-content .modal-body .dropdown-toggle{
    height: 30px;
    padding: 0px 0px 0px 15px;
    color: rgb(253, 253, 253);
    background-color: rgb(3, 204, 204);
}

.overlay .modal-content .modal-body .dropdown-toggle::before{
    border-color: rgb(3, 204, 204);
}


.overlay .modal-dialog .user-controls input {
    width: 40px;
    height: 30px;
    margin-left: 15px;
    border: none;
    outline: none !important;
    border-bottom: 1px solid rgb(80, 197, 197);
}

.overlay .modal-dialog .user-controls .goto-title {
    font-weight: 600;
    margin-top: 5px;
    margin-left: 15px;
}

.overlay .modal-dialog .user-controls .goto {
    font-size: 15px;
    margin-top: 5px;
    margin-left: 15px;
}

.overlay .modal-dialog .modal-body .modal-controls .btn{
    font-weight: 600;
    color: rgb(80, 197, 197);
}
</style>