<template>
    <div>
        <navbar/>
        <div class="container">
            <div class="header">
                <div class="row header-text-box">
                    <div class="col-lg-10">
                        <hr class="header-title-horizontal-line offset-lg-0 offset-md-0 offset-sm-0">
                        <h2 class="main-title">Build a simple chat bot without any code.</h2>
                        <p class="sub-title">Create easy to use bots for any purpose you desire, customer service, forms, personal assistant....<span class="header-text-box-learn-more">Learn more</span></p>
                    </div>
                </div>
                <div class="header-title text-center">Begin now and get it going in no time.</div>
                <div class="row header-buttons">
                    <div class="mx-auto">
                        <a class="btn how-it-works-btn" href="#" tabindex="-1" aria-disabled="true"><span>How it works</span></a>
                        <a class="btn btn-primary" href="#" tabindex="-1" aria-disabled="true"><span>Start Now</span></a>
                    </div>
                </div>
            </div>
        </div>

        <div class="description">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4">
                        <h5 class="description-card-title">Service Handler</h5>
                        <div class="description-card-text">
                            <p>Create easy to use and manage service handler bots capable of handling hundreds of clients simultaneously.</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <h5 class="description-card-title">Trendy</h5>
                        <div class="description-card-text">
                            <p>Loose the trend, create and use entertaining registration bots for your events.</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <h5 class="description-card-title">Collect Responses</h5>
                        <div class="description-card-text">
                            <p>Use 'botapps' bots to collect data for a survey and download data collected in excel, csv or JSON format.</p>
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-4">
                        <h5 class="description-card-title">Custom Format</h5>
                        <div class="description-card-text">
                            <p>Launch in your prefered layout, as a chat bot or formal flow of form handler bot.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer_div/>
    </div>
</template>
<script>
import navbar from '../components/navbar';
import footer_div from '../components/footer';
export default {
    title: 'botapp',
    components: {
        navbar, footer_div
    }
}
</script>
<style scoped>
* {
    font-family: 'Poppins', sans-serif;
}

body {
    position: relative;
}


/* header items */

.header {
    height: 95vh;
    position: relative;
    top: 26vh;
}

.main-title {
    font-weight: 600;
    color: #383838;
}

.sub-title {
    color: #63636e;
    font-size: 18px;
    letter-spacing: 1px;
}

.header-text-box-learn-more {
    color: rgb(3, 204, 204);
    font-size: 15px;
    font-weight: 500;
    margin-left: 2%;
}

.header-text-box-learn-more:hover {
    color: rgb(1, 165, 165);
    cursor: pointer;
}

.header-buttons {
    position: relative;
    top: 14vh;
}

.header-buttons .how-it-works-btn {
    border-color: #268af5;
    margin-right: 10px;
}

.header-buttons .how-it-works-btn:hover {
    color: rgb(255, 255, 255);
    background-color: #268af5;
    border-color: rgb(255, 255, 255);
}

.header-title {
    position: relative;
    top: 10vh;
    color: #63636e;
    font-size: 20px;
    font-family: 'Nunito', sans-serif;
}

.header-title-horizontal-line {
    width: 100px;
    color: #268af5;
    border: #268af5 3px solid;
    border-radius: 5px;
}


/* description cards */

.description {
    background-color: rgb(245, 249, 252);
    padding: 50px;
}

.description-card-title {
    color: rgb(5, 211, 211);
    font-size: 18px;
    font-weight: 600;
    padding-left: 10px;
}

.description-card-text {
    line-height: 1.7;
    color: #74747c;
    font-size: 15px;
}

.description-card-text p {
    padding-left: 10px;
    padding-right: 10px;
}
</style>