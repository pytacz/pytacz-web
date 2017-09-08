<template>
    <div class="container">
        <div class="registration-header">
            <h1>Rejestracja</h1>
        </div>
        <form class="form" @submit.prevent="validateBeforeSubmit" role="form">
            <div class="row">
                <div class="form-group col-md-12">
                    <input
                            type="text"
                            class="form-control"
                            name="username"
                            v-validate="'alpha|max:20'"
                            data-vv-as="login"
                            placeholder="Login"
                            v-model="form.username"
                            :class="{'form-control-error': errors.has('username') }">
                    <span class="pre-error" v-show="errors.has('username')">{{ errors.first('username') }}</span>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-12">
                    <input
                            type="text"
                            name="email"
                            v-validate="'email'"
                            class="form-control"
                            placeholder="Email"
                            v-model="form.email"
                            :class="{'form-control-error': errors.has('email') }">
                    <span class="pre-error" v-show="errors.has('email')">{{ errors.first('email') }}</span>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-12">
                    <input
                            type="password"
                            name="password_first"
                            v-validate="'min:8'"
                            data-vv-as="hasło"
                            class="form-control"
                            placeholder="Podaj hasło"
                            v-model="form.password.first"
                            :class="{'form-control-error': errors.has('password_first') }">
                    <span class="pre-error" v-show="errors.has('password_first')">{{ errors.first('password_first') }}</span>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-12">
                    <input
                            type="password"
                            name="password_second"
                            v-validate="'min:8'"
                            data-vv-as="hasło"
                            class="form-control"
                            placeholder="Powtórz hasło"
                            v-model="form.password.second"
                            :class="{'form-control-error': errors.has('password_second') }">
                    <span class="pre-error" v-show="errors.has('password_second')">{{ errors.first('password_second') }}</span>
                </div>
            </div>
            <div class="post-errors">
                <ul class="list-unstyled">
                    <li v-for="error in errorList">{{ error }}</li>
                </ul>
            </div>
            <div>
                <input type="checkbox" v-model="rulesAgreement"> Zgadzam się na <a href="#">warunki korzystania z Pytacz.pl</a>
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
        name: 'Register',
        data() {
            return {
                form: {
                    username: '',
                    email: '',
                    password: {
                        first: '',
                        second: ''
                    }
                },
                rulesAgreement: false,
                errorList: []
            }
        },
        methods: {
            validateBeforeSubmit() {
                this.$validator.validateAll();
                if (!this.errors.any()) {
                    if (this.rulesAgreement) {
                        this.register()
                    } else {
                        var message = 'Musisz zaakceptować regulamin.';
                        if (this.errorList.indexOf(message) == -1) {
                            this.errorList.push(message);
                        }
                    }
                }
            },
            register() {
                this.$auth.register({
                    body: {
                        register: this.form
                    },
                    success: function (res) {
                        if (!res.data.success)
                            this.errorList = res.data.errors;
                        else
                            location.reload(); //TODO email confirmation
                    },
                    error: function (res) {
                        console.log(res.data);
                    },
                    autoLogin: false,
                    rememberMe: false,
                    redirect: false
                });
            }
        }
    }
</script>
<style src="../../css/home/logged-out/register.css" scoped></style>