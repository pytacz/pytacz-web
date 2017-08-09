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
                    <form class="form" role="form">
                        <div class="row">
                            <div class="form-group col-sm-12 col-md-12 col-lg-6">
                                <input type="text" class="form-control" placeholder="Login">
                            </div>
                            <div class="form-group col-sm-12 col-md-12 col-lg-6">
                                <input type="email" class="form-control" placeholder="Email">
                            </div>
                            <div class="form-group col-sm-12 col-md-12 col-lg-6">
                                <input type="password" class="form-control" placeholder="Podaj hasło">
                            </div>
                            <div class="form-group col-sm-12 col-md-12 col-lg-6">
                                <input type="password" class="form-control" placeholder="Powtórz hasło">
                            </div>
                        </div>
                        <div>
                            <input type="checkbox"> Zgadzam się na <a href="#">warunki korzystania z Pytacz.pl</a>
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
    name: 'Home',
    data () {
        return {
            msg: 'Pytacz.pl Home Page'
        }
    }
}
</script>

<style>
    .info {
        min-height: 300px;
    }
    .info-header {
        height: 20%;
    }
    .info-header h1 {
        margin-left: 2rem;
        color: #ff6100;
    }
    .info-content {
        height: 80%;
        font-size: 2rem;
    }
    .spacer {
        margin: 1rem 2rem;
    }
    .register-button {
        color: #2e4148;
        font-size: 2rem;
        font-weight: bold;
        height: 40px;
        background: #f68827;
        width: 100%;
    }
    form > * {
        margin-top: 2rem;
    }
    .registration {
        padding: 15px;
        background: #ffffff;
        border-radius: 10px;
        min-height: 300px;
    }
    .registration-xs {
        min-height: 125px;
        background: #ffffff;
        border-radius: 10px;
    }
    .xs-registration-content {
        text-align: center;
    }
</style>