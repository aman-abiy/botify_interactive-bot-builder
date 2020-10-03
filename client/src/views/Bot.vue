<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-4 d-none d-lg-block">
                <a class="navbar-brand" href="#">botapp.com</a>
            </div>
            <div class="chat-container col-lg-4 col-md-12 col-sm-12 ">
                <div class="row reply-bot">
                    <img src="../assets/images/avatars/Untitled2.png" alt="">
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
                    <img src="../assets/images/avatars/Untitled2.png" alt="">
                </div>
                <br>
                <br>
                <br>
                <div class="row reply-bot">
                    <img src="../assets/images/avatars/Untitled2.png" alt="">
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
                    <img src="../assets/images/avatars/Untitled2.png" alt="">
                </div>
                <br>
                <br>
                <br>
                <div class="row reply-bot">
                    <img src="../assets/images/avatars/Untitled2.png" alt="">
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
                    <img src="../assets/images/avatars/Untitled2.png" alt="">
                </div>
                <br>
                <br>
                <br>
                <div class="row reply-bot">
                    <img src="../assets/images/avatars/Untitled2.png" alt="">
                    <div class="card-container">
                        <div class="card">
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique unde corporis fugit consectetur nihil laboriosam veniam molestiae iusto velit? Eum magni quas tempora, vero possimus nihil neque corporis error exercitationem.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="input-group col-lg-4 col-md-12 col-sm-12 offset-lg-4">
            <input type="text" class="form-control rounded-0" id="validationDefaultUsername" placeholder="Username" aria-describedby="inputGroupPrepend2" required>
            <div class="input-group-prepend">
                <input type="submit" vlaue="Send" class="btn btn-primary btn-sm" id="inputGroupPrepend2">
            </div>
        </div>
        <!-- <input class="form-control col-lg-4 col-md-12 col-sm-12 offset-lg-4" type="text" placeholder="Default input"> -->

    </div>
</template>
<script>
export default {
    
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