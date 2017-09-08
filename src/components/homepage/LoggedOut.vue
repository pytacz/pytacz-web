<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-md-6 info">
                <div class="row info-header">
                    <h1>Lorem Ipsum</h1>
                </div>
                <div class="row info-content">
                    <div class="spacer">
                        Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis.
                        Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. Ut molestie a,
                        ultricies porta urna. Vestibulum commodo volutpat a, convallis ac, laoreet enim. Phasellus fermentum
                        in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna.
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-md-5 col-md-offset-1">
                <div class="hidden-xs visible-sm visible-md visible-lg registration">
                    <span class="registration-header">
                        <h3>Zarejestruj się</h3>
                    </span>
                    <form class="form" @submit.prevent="validateBeforeSubmit" role="form">
                        <div class="row">
                            <div class="form-group col-sm-12 col-md-12 col-lg-6">
                                <input
                                        type="text"
                                        class="form-control"
                                        name="username"
                                        v-validate="'alpha|max:20'"
                                        data-vv-as="login"
                                        placeholder="Login"
                                        v-model="form.username"
                                        :class="{'form-control-error': errors.has('username') }">
                            </div>
                            <div class="form-group col-sm-12 col-md-12 col-lg-6">
                                <input
                                        type="text"
                                        name="email"
                                        v-validate="'email'"
                                        class="form-control"
                                        placeholder="Email"
                                        v-model="form.email"
                                        :class="{'form-control-error': errors.has('email') }">
                            </div>
                            <div class="form-group col-sm-12 col-md-12 col-lg-6">
                                <input
                                        type="password"
                                        name="password_first"
                                        v-validate="'min:8'"
                                        data-vv-as="hasło"
                                        class="form-control"
                                        placeholder="Podaj hasło"
                                        v-model="form.password.first"
                                        :class="{'form-control-error': errors.has('password_first') }">
                            </div>
                            <div class="form-group col-sm-12 col-md-12 col-lg-6">
                                <input
                                        type="password"
                                        name="password_second"
                                        v-validate="'min:8'"
                                        data-vv-as="hasło"
                                        class="form-control"
                                        placeholder="Powtórz hasło"
                                        v-model="form.password.second"
                                        :class="{'form-control-error': errors.has('password_second') }">
                            </div>
                        </div>
                        <ul class="list-unstyled post-errors">
                            <li v-show="errors.has('username')">{{ errors.first('username') }}</li>
                            <li v-show="errors.has('email')">{{ errors.first('email') }}</li>
                            <li v-show="errors.has('password_first')">{{ errors.first('password_first') }}</li>
                            <li v-show="errors.has('password_second')">{{ errors.first('password_second') }}</li>
                        </ul>
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
                </div>
                <div class="visible-xs hidden-sm hidden-md hidden-lg registration-xs">
                    <div class="xs-registration-content">
                        <h1><router-link to="register">Zarejestruj się</router-link></h1>
                        <p>lub</p>
                        <h2><router-link to="login">zaloguj się</router-link></h2>
                    </div>
                </div>
            </div>
        </div> <!-- .row -->
    </div> <!-- .container -->
</template>

<script>
export default {
    name: 'LoggedOut',
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

<style src="../../css/home/logged-out/content.css" scoped></style>