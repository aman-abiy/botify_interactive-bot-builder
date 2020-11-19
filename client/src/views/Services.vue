<template>
    <div>
        <navbar/>
        <br>
        <br>
        <br>
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-12 offset-lg-1">
                    <div class="card">
                        <div class="card-body">
                            <h2 class="text-center">FREE</h2>
                            <button class="btn btn-primary col-12">Start Now</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 offset-lg-2">
                    <div class="card">
                        <div class="card-body">
                            <h2 class="text-center">CUSTOM</h2>
                            <button class="btn btn-primary col-12">Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer/>
    </div>
</template>
<script>
import navbar from '../components/navbar';
import footer from '../components/footer';
import footer_div from '../components/footer';
export default {
    title: 'Services',
    components: {
        navbar, footer
    }
}
</script>
<style scoped>
.container .row .card .card-body h2 {
    font-weight: 400;
    color: rgb(88, 88, 88);
    font-family: 'Oswald', sans-serif;
}

.container .col-lg-4 {
    margin-top: 20px;
}

</style>