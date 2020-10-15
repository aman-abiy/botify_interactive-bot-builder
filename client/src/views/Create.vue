<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg fixed-top">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <a v-on:click="goBack()" class="btn btn-preview text-primary nav-link" style="padding: 2px 5px 2px 5px; font-size: 15px; margin-left: 5%">Back</a>
                <ul class="navbar-nav offset-lg-8">
                    <li class="nav-item nav-item_auth">
                       <a v-on:click="" class="btn btn-preview text-primary nav-link" style="padding: 2px 5px 2px 5px; font-size: 15px; ">Preview</a>
                    </li>
                    <li class="nav-item nav-item_auth">
                        <a v-on:click="complete()" class="btn btn-complete text-light btn-primary nav-link" style="padding: 2px 5px 2px 5px; font-size: 15px; ">Complete</a>
                    </li>
                </ul>
            </div>
        </nav>
        <!--<navbar/>
        <br>
        <br>
        <br>-->
        <br>
        <br>
        <p>From STORE -> {{componentLevelData}}</p>
        <!-- <div class="finilize-btns offset-lg-10">
            <div class="row">
                <a v-on:click="" class="btn btn-preview text-primary" style="padding: 2px 5px 2px 5px; font-size: 15px; ">Preview</a>
                <a v-on:click="" class="btn btn-complete text-light" style="padding: 2px 5px 2px 5px; font-size: 15px; ">Complete</a>
            </div>
        </div> -->
        <br>
        <div class="row">
            <div class="col-lg-11">
               <template class="row" v-for="(child, index) in children">
                    <component class="" :level="children" @removeLevel="children.splice($event, 1)" :levelsArray="levelsArray" :is="child" :key="child.name" ></component>
                </template>
                <a v-on:click="addLevel()" class="btn text-light add-level " style="padding: 2px 5px 2px 5px; font-size: 13px; ">Add Level</a>
            </div>
        </div>
        
    </div>
</template>
<script>
import level from '@/components/create-bot/level';
import navbar from '@/components/navbar';
import footer from '@/components/footer';
export default {
    components: {
        navbar, level
    },
    data: function() {
        return {
            children: [level],
            levelsArray: [{
                tiers: [{
                    tier: 1,
                    components: [{
                        comp: 1,
                        query: null,
                        options: []
                    }]
                }]
            }]
        }
    },
    computed: {
        componentLevelData() {
            return this.$store.getters.COMPONENT_LEVEL_DATA;
        }
    },
    methods: {
        addLevel() {
            this.children.push(level);
            this.levelsArray[0].tiers.push({
                tier: this.children.length,
                components: [{
                    comp: 1,
                    query: null,
                    options: []
                }]
            })
        },
        goBack() {
            this.$router.go(-1);
        },
        complete() {
            this.$router.push({ name: 'Publish' });
        }
    }
}

</script>
<style scoped>
@import url('https://pro.fontawesome.com/releases/v5.10.0/css/all.css');
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

/* nav */

.navbar {
    background: linear-gradient(to right bottom, rgb(240, 248, 248), rgb(240, 248, 248));
}

.navbar {
    color: #161c2d;
    background-color: rgb(255, 255, 255);
    border-bottom: rgb(239, 241, 241) 2px solid;
}

.nav-item {
    margin-left: 30%;
}

.nav-item a {
    font-weight: 550;
    color: #6b6c6e;
}

/* main */

.finilize-btns .btn-preview{
    font-weight: 600;
    background-color: rgb(217, 247, 247);
    margin-right: 20px;
}

.finilize-btns .btn-complete{
    background-color: #0e80fa;
    margin-right: 50px;
}

.horizontal-separator {
    border-bottom: rgb(239, 241, 241) 2px solid;
}

.components {
    margin-top: 5px;
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

.btn-publish{
    margin-bottom: 10px
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

.add-level {
    padding: 5px;
    background-color: rgb(3, 204, 204);
    border-color: rgb(3, 204, 204)
}
.add-level:hover {
    color: #ffffff;
    background-color: rgb(13, 221, 221);
    border-color: rgb(13, 221, 221);
}

.add-level:focus {
    outline: none !important;
    box-shadow: none;
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