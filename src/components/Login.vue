<template>
    <div class="container">
        <div class="login-header">
            <h1>Logowanie</h1>
        </div>
        <form class="form" role="form">
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
            <button type="button" class="btn login-button" @click="sendForm">Zaloguj się</button>
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
                }
            }
        },
        methods: {
            sendForm() {
                this.$auth.login({
                    body: this.form
                });
            }
        }
    }
</script>
<style scoped>
    .login-header {
        text-align: center;
    }
    .login-button {
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
