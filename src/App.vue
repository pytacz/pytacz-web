<template>
<div id="app">
    <header>
        <nav class="navbar navbar-light navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <span class="navbar-brand"><router-link :to="{ name: 'Home' }">Pytacz.pl</router-link></span>
                </div>

                <div v-bind:class="{'navbar-collapse, collapse, hidden-xs': !$auth.check()}">
                    <div class="nav navbar-nav navbar-right">
                        <div v-if="$auth.ready()">
                            <div v-if="$auth.check()">
                                <router-link :to="{ name: 'Home' }" class="nav-item btn-link">Profil</router-link>
                                <button class="nav-item btn-link" @click="logout">Wyloguj się</button>
                            </div>
                            <div v-else>
                                <button class="nav-item btn-link" data-toggle="modal" data-target="#loginPopupWindow" @click="login.error = false">Zaloguj się</button>
                            </div>
                        </div>
                    </div>
                </div><!-- .navbar-collapse -->
            </div><!-- .container -->
        </nav>
    </header>
    <main>
        <div v-if="$auth.ready()">
            <router-view></router-view>
        </div>
        <div v-else>
            <h1>Loading...</h1>
        </div>

    </main>
    <footer>
        <div class="pusher"></div>
        <div class="container footer">
            <ul class="list-inline">
                <li><a href="#">API</a></li>
                <li v-cloak v-if="$auth.ready() && !$auth.check()"><router-link to="/login">Zaloguj się</router-link></li>
                <li v-cloak v-if="$auth.ready() && !$auth.check()"><router-link to="/register">Rejestracja</router-link></li>
                <li><a href="https://github.com/pytacz">Github</a></li>
            </ul>
        </div>
    </footer>

    <div v-if="!$auth.check()">
        <div class="modal" id="loginPopupWindow" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Zamknij</span></button>
                        <h3 class="modal-title" id="modalLabel">Zaloguj się</h3>
                    </div>
                    <div class="modal-body">
                        <form class="form pop-up-login" role="form">
                            <div class="row">
                                <div class="form-group col-md-10 col-md-offset-1">
                                    <input type="text" class="form-control" placeholder="Login" v-model="login.form._username">
                                </div>
                                <div class="form-group col-md-10 col-md-offset-1">
                                    <input type="password" class="form-control" placeholder="Hasło" v-model="login.form._password">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-offset-1 col-md-10">
                                    <transition name="fade">
                                        <div class="alert alert-danger login-error" v-if="login.error">{{ login.errorMessage }}</div>
                                    </transition>
                                </div>
                            </div>
                            <div class="row pop-up-login-footer">
                                <label for="rememberMe" class="col-xs-4 col-sm-3 col-md-3 col-md-offset-1">
                                    <input type="checkbox" id="rememberMe" v-model="login.rememberMe"> Pamiętaj mnie
                                </label>
                                <button type="button" class="btn col-xs-4 col-xs-offset-4 col-sm-3 col-sm-offset-6 col-md-2 col-md-offset-5" @click="loginAction">Zaloguj się</button>
                            </div>
                            <div class="row">
                                <a href="#" class="col-md-offset-1 col-md-3">Przypomnij hasło</a>
                            </div>
                        </form>
                    </div> <!-- .modal-body -->
                </div> <!-- .modal-content -->
            </div> <!-- .modal-dialog -->
        </div> <!-- .modal -->
    </div>
</div>
</template>

<script>
    export default {
        name: 'App',
        data () {
            return {
                login: {
                    form: {
                        _username: '',
                        _password: ''
                    },
                    rememberMe: false,
                    error: false,
                    errorMessage: ''
                }
            }
        },
        methods: {
            loginAction() {
                this.$auth.login({
                    body: this.login.form,
                    rememberMe: this.login.rememberMe,
                    fetchUser: true,
                    success() {
                        $('#loginPopupWindow').modal('hide');
                    },
                    error(res) {
                        this.login.error = true;
                        this.login.errorMessage = res.data.message;
                    }
                });
            },
            logout() {
                this.$auth.logout({
                    makeRequest: false
                });
            }
        }
    }
</script>
<style src="./css/main/content.css"></style>
<style src="./css/main/navbar.css"></style>
<style src="./css/main/footer.css"></style>
<style src="./css/main/login-modal.css"></style>
