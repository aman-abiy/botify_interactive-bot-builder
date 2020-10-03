<template>
    <div>
        <navbar/>
        <br>
        <br>
        <br>
        <div class="container">
            <a href="" class="btn dropdown-toggle" id="downloadDropdown" data-toggle="dropdown">Download<i class="fas fa-download"></i></a>
            <div class="dropdown-menu" aria-labelledby="downloadDropdown">
                <a class="dropdown-item" href="#">Excel <img src='../../../assets/images/excel-icon.png'></a>
                <a class="dropdown-item" href="#">CSV </a>
                <a class="dropdown-item" href="#">JSON</a>
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
                        <td>{{ response._id }}</td>
                        <td>{{ response.createdAt.split('T')[1].slice(0, 8) }}</td>
                        <td>{{ response.createdAt.split('T')[0] }}</td>
                    </tr> 
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import navbar from '@/components/navbar';
import footer from '@/components/footer';
export default {
    data: function() {
        return{
        }
    },
    components: {
        navbar, footer
    },
    computed: {
        allResponse() {
            return this.$store.getters.allResponse
        }
    },
    methods: {
    
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

.container .dropdown-menu a img {
    margin-left: 10px;
    height: 20px;
}

.fa-download {
    margin-left: 7px;
}
</style>