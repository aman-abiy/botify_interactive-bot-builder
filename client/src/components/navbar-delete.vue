<template>
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="collapse navbar-collapse container" id="navbarSupportedContent">
            <ul class="navbar-nav offset-lg-11">
                <li class="">
                    <a class="btn delete-btn" tabindex="-1" aria-disabled="true">Delete</a>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
export default {

}
</script>
<style scoped>
nav {
    background-color: #dc3545;
}

.navbar-nav .delete-btn {
    font-size: 16px;
    font-family: 'Nunito', sans-serif;
    letter-spacing: 1px;
    color: rgb(245, 236, 236);
    border-color: rgb(252, 223, 223);
}

.navbar-nav .delete-btn:hover {
    color: #dc3545;
    background-color: rgb(245, 236, 236);
}

.navbar-nav .delete-btn:focus {
    outline: none !important;
    box-shadow: none;
} 
</style>