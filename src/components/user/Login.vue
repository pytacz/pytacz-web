<template>
    <div class="container">
        <div class="login-header">
            <h1>Logowanie</h1>
        </div>
        <form class="form" @submit.prevent="login" role="form">
            <div class="row">
                <div class="form-group col-md-12">
                    <input type="text" class="form-control" placeholder="Login" v-model="form._username">
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-12">
                    <input type="password" class="form-control" placeholder="Hasło" v-model="form._password">
                </div>
            </div>
            <div class="row">
                <label for="rememberMe" class="form-group col-xs-4">
                    <input id="rememberMe" type="checkbox" v-model="rememberMe"> Pamiętaj mnie
                </label>
                <div class="col-xs-offset-4 col-xs-4 remind-password">
                    <a href="#">Przypomnij hasło</a>
                </div>
            </div>
            <transition name="fade">
                <div class="alert alert-danger login-error" v-if="error">{{ errorMessage }}</div>
            </transition>
            <button type="submit" class="btn login-button">Zaloguj się</button>
        </form>
        <p>
            <router-link to="/register">Nie mam konta</router-link>
        </p>
    </div>
</template>
<script>
export default {
    name: 'Login',
    data() {
        return {
            form: {
                _username: '',
                _password: ''
            },
            rememberMe: false,
            error: false,
            errorMessage: ''
        }
    },
    methods: {
        login() {
            this.$auth.login({
                body: this.form,
                rememberMe: this.rememberMe,
                fetchUser: true,
                error(res) {
                    this.error = true;
                    this.errorMessage = res.data.message;
                }
            });
        }
    }
}
</script>
<style src="../../css/home/logged-out/login.css" scoped></style>
