<template>
   <div class="footer">
        <div class="container">
            <hr class="footer-horizontal-separator ">
            <div class="row justify-content-between">
                <p class="copyright">2020 botapp.com</p>
                <p class="version">v1.0.0</p>
            </div>
        </div>
    </div>

</template>

<script>
export default {

}
</script>

<style scoped>
.footer {
    color: #adb5bd;
    background-color: #202942;
    padding: 20px;
    float: bottom;
}

.footer-horizontal-separator {
    width: 90%;
    border-bottom: 1px solid grey;
}

.copyright {
    margin-left: 10%;
    font-size: 12px;
    font-weight: 500;
}

.version{
    margin-right: 10%;
    font-size: 12px;
    font-weight: 500;
}

</style>
