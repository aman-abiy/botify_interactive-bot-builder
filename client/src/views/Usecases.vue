<template>
    <div>
        <navbar/>
        <br>
        <br>
        <br>
        <br>
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-12">
                    <div class="card ">
                        <img src="../assets/images/customer-service.jpg" class="card-img-top" style="width:270px; margin-left: 25px;" alt="...">
                        <div class="card-body">
                            <h5 class="">Customer Service</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn">try</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                    <div class="card ">
                        <img src="../assets/images/training-manager.jpg" class="card-img-top" style="width: 330px" alt="...">
                        <div class="card-body">
                            <h5 class="">Training Manager</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn">try</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                    <div class="card">
                        <img src="../assets/images/delivery-service.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="">Delivery Service</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn">try</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <footer/> -->
    </div>
</template>
<script>
import navbar from '../components/navbar';
import footer from '../components/footer';
export default {
    title: 'Usecases',
    components: {
        navbar, footer
    }
}
</script>
<style scoped>
.container .card {
    border-color: transparent;
}

.container .card h5 {
    font-size: 19px;
}

.container .card {
    font-size: 13px;
}

.container .card .btn {
    font-size: 15px;
    color: rgb(3, 204, 204);
    font-weight: 600;
    float: right;
    background-color: rgb(216, 253, 253);
    padding: 5px 8px 5px 8px;
}

.container .card img {
    height: 250px;
}

.container .selected {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>