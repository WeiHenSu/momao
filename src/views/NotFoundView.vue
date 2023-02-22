<template>
    <div class="notfoundBackground d-flex justify-content-center align-items-center vh-100">
        <div class="notfound text-center p-5">
            <img src="../assets/logo3.png" alt="logo" class="w-100 mb-2">
            <h1 class="notfoundText mb-4">404 找不到頁面</h1>
            <router-link to="/" class="btn sty2">回到首頁</router-link>
        </div>
    </div>
</template>

<style>
    .notfoundBackground {
        background-image: url('../assets/img/background2.jpg');
        background-repeat: repeat;
    }
    .notfound {
        box-shadow: 2px 2px 8px 2px #ccc;
        background-color: #fff;
    }
    .notfoundText {
        color: #ED7120;
        font-weight: bold;
    }
    .btn.sty2 {
        background-color: #23316E;
        color: #fff;
        font-weight: bold;
        padding: 10px 25px;
    }
    .btn.sty2:hover {
        opacity: 0.7;
        transition: 0.3s ease all;
    }
</style>
