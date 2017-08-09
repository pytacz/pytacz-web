<template>
    <div class="container">
        <div class="registration-header">
            <h1>Rejestracja</h1>
        </div>
        <form class="form" role="form">
            <div class="row">
                <div class="form-group col-md-12">
                    <input type="text" class="form-control" placeholder="Login">
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-12">
                    <input type="email" class="form-control" placeholder="Email">
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-12">
                    <input type="password" class="form-control" placeholder="Podaj hasło">
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-12">
                    <input type="password" class="form-control" placeholder="Powtórz hasło">
                </div>
            </div>
            <div>
                <input type="checkbox"> Zgadzam się na <a href="#">warunki korzystania z Pytacz.pl</a>
            </div>
            <button type="submit" class="btn register-button">Zarejestruj się za darmo</button>
        </form>
        <p>
            <router-link to="/login">Mam już konto</router-link>
        </p>
    </div>
</template>
<script>
    export default {
        name: 'Register'
    }
</script>
<style scoped>
    .registration-header {
        text-align: center;
    }
    .register-button {
        margin-top: 2rem;
        color: #2e4148;
        font-size: 2rem;
        font-weight: bold;
        height: 40px;
        background: #f68827;
        width: 100%;
    }
    form {
        margin-top: 3rem;
    }
    p {
        margin-top: 2rem;
        text-align: center;
    }
</style>