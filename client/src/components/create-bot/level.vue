<template>
    <div>
    <div class="level">
            <div class="row level-row justify-content-between">
                <h5 class="level-text "><span v-on:click="removeLevel(levelCount[0])"><i class="fas fa-times close-icon"></i></span> Level: {{levelCount[0]}}</h5>
                <!--<span>{{levelCount[0]}}</span>-->
                <a href="# " v-on:click="addComponent();" class="btn btn-primary add-component offset-lg-9 ">Add Component</a><br>
            </div>
            <!-- <span>{{levelsObject}}</span> -->
            <div class="row ">
                <template class="row" v-for="(child, index) in children">
                    <component class="col-lg-3" :components="children" @removeComponent="children.splice($event, 1)" :currentLevel="levelCount[0]" :componentArray="componentArray" @fromComponent="addTier($event, levelCount[0])" :is="child" :key="child.name" ></component>
                </template>        
            </div>
            <span v-show="false">{{pushLevelCount}}</span>
            <hr class="horizontal-separator ">
        </div>
        
    </div>
</template>
<script>
import component from '@/components/create-bot/component';
import navbar from '@/components/navbar';
import footer from '@/components/footer';
export default {
    props: {
        level: Array,
        levelsArray: Array
    },
    data: function() {
        return {
            levelsObject: this.levelsArray,
            fromComp: null,
            tier: [],
            children: [component],
            levelCount: [],
            componentArray: this.levelsArray
        }
    },
    computed: {
        pushLevelCount() {
            this.levelCount.push(this.level.length);
            return this.levelCount;
        }, 
    },
    components: {
        navbar, component
    },
    methods: {
        addComponent() {
            this.children.push(component)
            // this.componentArray.push({
            //     comp: this.children.length,
            //     query: null,
            //     options: []
            // })
            console.log(this.levelsObject[0].tiers[this.levelCount[0] - 1])
            console.log(this.levelCount[0])
            this.levelsObject[0].tiers[this.levelCount[0] - 1].components.push({
                comp: this.children.length,
                query: null,
                options: []
            })
            this.componentArray = this.levelsObject;
        },
        addTier(compo, level) {
            console.log("TTTTTTTTTTTTTIER", compo)
            this.tier.push(compo, level)
        },
        removeLevel(index) {
            console.log('Deleted, index', index)
            this.$emit('removeLevel', index - 1)
        }
    }
}

</script>
<style scoped>
* {
    font-family: 'Nunito', sans-serif;
}

body {
    background-color: #e8f1fe;
}

.btn:focus {
    outline: none !important;
    box-shadow: none;
}

/* main */

.horizontal-separator {
    border-bottom: rgb(239, 241, 241) 2px solid;
}

.components {
    margin-top: 5px;
}

.level h5 span{
    height: 30px;
}

.level h5 span .close-icon {
    height: 8px;
    padding: 1px 3px 15px 3px;
    color: rgb(3, 204, 204);
}

.level h5 span:hover {
    cursor: pointer;
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
    padding-bottom: 5px;
    margin: 0px;
}

.card-body .content_input_section div textarea {
    padding-bottom: 0px;
    margin-bottom: 0px;
}

.add-buttons {
    position: relative;
    left: 2%;
    bottom: 8px;
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

.level-text {
    color: grey;
}

.level-row {
    margin: 0px;
    padding: 0px;
    height: 23px;
}

.level .add-component {
    padding: 2px 5px 2px 5px;
    font-size: 13px;
    outline: none !important;
    box-shadow: none;
    height: 25px;
    background-color: rgb(3, 204, 204);
    border-color: rgb(3, 204, 204)
}

.level .add-component:hover {
    color: #ffffff;
    background-color: rgb(13, 221, 221);
    border-color: rgb(13, 221, 221);
}

.level .add-component:focus {
    outline: none !important;
    box-shadow: none;
}

.container .add-level {
    padding: 5px;
    background-color: rgb(3, 204, 204);
    border-color: rgb(3, 204, 204)
}

.container .add-level:hover {
    color: #ffffff;
    background-color: rgb(13, 221, 221);
    border-color: rgb(13, 221, 221);
}

.container .add-level:focus {
    outline: none !important;
    box-shadow: none;
}

.card-body .row .user-added-buttons {
    padding: 3px 5px 3px 5px;
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

.goto input {
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

.input-group .popover-input {
    padding: 0px 0px 0px 5px;
    height: 30px;
    font-size: 13px;
    color: black;
}

.input-group .popover-input:focus {
    outline: none !important;
    box-shadow: none;
}

.input-group .btn {
    height: 30px;
    padding: 0px 5px 0px 5px;
}

.input-group .btn:focus {
    outline: none !important;
    box-shadow: none;
}

.input-group .delete-btn {
    height: 30px;
    padding: 0px 0px 0px 8px;
    color: rgb(109, 109, 109);
}

.input-group .delete-btn:focus {
    outline: none !important;
    box-shadow: none;
}
</style>