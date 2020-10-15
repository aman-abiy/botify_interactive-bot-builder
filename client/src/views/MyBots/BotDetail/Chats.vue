<template>
    <div>
        <navbar/>
        <br>
        <br>
        <br>
        <div class="container">
            <a href="" class="btn dropdown-toggle" id="downloadDropdown" data-toggle="dropdown">Download<i class="fas fa-download"></i></a>
            <div class="dropdown-menu" aria-labelledby="downloadDropdown">
                <a v-on:click="download('excel')" class="dropdown-item">Excel <img src='../../../assets/images/excel-icon.png'></a>
                <a v-on:click="download('csv')" class="dropdown-item">CSV </a>
                <a v-on:click="download('json')" class="dropdown-item">JSON</a>
            </div>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Id</th>
                        <th scope="col">Time</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody v-for="(response, index) in allResponse.data" v-bind:key="response._id">
                    <tr>
                        <th scope="row">{{ index + 1 }}</th>
                        <td><a v-on:click="getResponse(response._id)" type="button" class="" data-toggle="modal" data-target="#exampleModalScrollable">{{ response._id }}</a></td>
                        <td>{{ response.createdAt.split('T')[1].slice(0, 8) }}</td>
                        <td>{{ response.createdAt.split('T')[0] }}</td>
                    </tr> 
                </tbody>
            </table>
        </div>

        <div class="modal fade" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable" role="document">
                <div class="modal-content container">
                    <p class="offset-5">Id: {{ selectedId }}</p>
                    <div class="container">
                        <template v-for="res in response">
                           <div class="row">
                                <div class="col align-self-start"><span>Q</span>: {{ res.query }}</div>
                                <div class="col align-self-end response"><span>A</span>: {{ res.response.textValue ? res.response.textValue : res.response.selectedValue }}</div>
                            </div>
                            <br>
                            <!-- <div class="row">
                                <div class="col align-self-start"><span>Q</span>: Do yow work on the 1st or 3rd floor?</div>
                                <div class="col align-self-end response"><span>A</span>: 1st floor</div>
                            </div> -->
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import navbar from '@/components/navbar';
import footer from '@/components/footer';
import axios from 'axios';
export default {
    data: function() {
        return{
            selectedId: null
        }
    },
    components: {
        navbar, footer
    },
    computed: {
        allResponse() {
            return this.$store.getters.allResponse
        },
        response() {
            return this.$store.getters.response
        }
    },
    methods: {
        download(fileFormat) {
            console.log('clicked')
            this.$store.dispatch('downloadResponses', { fmt: fileFormat, queryId: this.$route.params.botId})
        },
        getResponse(id) {
            this.selectedId = id
            this.$store.dispatch('getResponse', id)
        }
    },
    created(){
        this.$store.dispatch('getAllResponse', this.$route.params.botId);
    }
}
</script>
<style scoped>
table{
    font-family: 'Nunito', sans-serif;
}

.container .btn {
    padding: 8px 10px 8px 10px;
    margin-bottom: 10px;
    color: #0a67ca;
    border-color: #0a67ca;
    background-color: rgb(240, 248, 248);
    float: right;
    font-family: 'Nunito', sans-serif;
}

.dropdown-menu{
    font-family: 'Nunito', sans-serif;
}

.container .btn:hover {
    color: rgb(240, 248, 248);
    border-color: rgb(240, 248, 248);
    background-color: #0a67ca;
}

.container .btn:focus {
    outline: none !important;
    box-shadow: none;
    color: rgb(240, 248, 248);
    border-color: rgb(240, 248, 248);
    background-color: #0a67ca;
}

.container .dropdown-menu a {
    cursor: pointer;
}

.container .dropdown-menu a img {
    margin-left: 10px;
    height: 20px;
}

.fa-download {
    margin-left: 7px;
}

.container table tbody tr td a:hover {
    color: #007bff;
    text-decoration: underline;
}

.modal-content {
    padding: 20px 10px 20px 20px;
}

.modal .modal-dialog .modal-content .container .row span {
    font-weight: 600;
    font-size: 15px;
    color: #161c2d;
}

.modal .modal-dialog .modal-content .container .row div {
    color: #007bff;
}

.modal .modal-dialog .modal-content .container .row .response {
    color: #037c1d;
}

.modal .modal-dialog .modal-content .container hr {
    border-top: #268af5 1px solid;
    border-radius: 5px;
}
</style>