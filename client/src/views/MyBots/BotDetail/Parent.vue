<template>
    <router-view></router-view>
</template>
<script>
export default {
  
}
</script>
<style scoped>
.bot-id {
    float: right;
}

.card {
    margin-bottom: 20px;
    padding: 15px 15px 15px 20px;
}

.card h4 {
    font-weight: 600;
    margin-left: 10px;
    font-family: 'Nunito', sans-serif;
}

.card h5 {
    font-family: 'Nunito', sans-serif;
}

.horizontal-separator {
    margin-top: 0px;
    padding-top: 0px;
    border-bottom: rgb(5, 211, 211) 2px solid;
}

.card .row {
    margin-right: 15px;
    margin-left: 15px;
}

.card .btn {
    margin: 0px 0px 0px 0px;
    padding: 0px 3px 0px 3px;
    color: #1081fa;
    font-weight: 600;
    font-size: 18px;
    height: 30px;
    background-color: rgb(167, 248, 248);
    border: white 0px transparent;
}

.card .btn:focus {
    outline: none !important;
    box-shadow: none;
}

.active {
    height: 10px;
    width: 10px;
    background-color: rgb(6, 168, 6);
    border-radius: 50%;
    position: relative;
    bottom: 2px;
    left: 5px;
    display: inline-block;
}

.closed {
    height: 10px;
    width: 10px;
    background-color: rgb(209, 9, 9);
    border-radius: 50%;
    position: relative;
    bottom: 2px;
    left: 5px;
    display: inline-block;
}
</style>