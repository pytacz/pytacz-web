<template>
    <div class="modal" id="loginPopupWindow" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Zamknij</span></button>
                    <h3 class="modal-title" id="modalLabel">Zaloguj się</h3>
                </div>
                <div class="modal-body">
                    <form class="form pop-up-login" @submit.prevent="loginAction" role="form">
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
                            <button type="submit" class="btn col-xs-4 col-xs-offset-4 col-sm-3 col-sm-offset-6 col-md-2 col-md-offset-5">Zaloguj się</button>
                        </div>
                        <div class="row">
                            <a href="#" class="col-md-offset-1 col-md-3">Przypomnij hasło</a>
                        </div>
                    </form>
                </div> <!-- .modal-body -->
            </div> <!-- .modal-content -->
        </div> <!-- .modal-dialog -->
    </div> <!-- .modal -->
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
            }
        },
        mounted: function() {
            const that = this;
            $('#loginPopupWindow').on('shown.bs.modal', function() {
                that.login.error = false;
            });
        }
    }
</script>