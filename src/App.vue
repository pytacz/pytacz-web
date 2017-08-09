<template>
<div id="app">
    <header>
        <nav class="navbar navbar-light navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <span class="navbar-brand"><router-link :to="{ name: 'Home' }">Pytacz.pl</router-link></span>
                </div>

                <div class="collapse navbar-collapse hidden-xs">
                    <div class="nav navbar-nav navbar-right">
                        <button class="nav-item btn-link" data-toggle="modal" data-target="#loginPopupWindow">Zaloguj się</button>
                    </div>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container -->
        </nav>
    </header>
    <main>
        <router-view></router-view>
    </main>
    <footer>
        <div class="pusher"></div>
        <div class="container footer">
            <ul class="list-inline">
                <li><a href="#">API</a></li>
                <li><router-link to="/login">Zaloguj się</router-link></li>
                <li><router-link to="/register">Rejestracja</router-link></li>
                <li><a href="https://github.com/pytacz">Github</a></li>
            </ul>
        </div>
    </footer>

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
                                <input type="text" class="form-control" placeholder="Login">
                            </div>
                            <div class="form-group col-md-10 col-md-offset-1">
                                <input type="password" class="form-control" placeholder="Hasło">
                            </div>
                        </div>
                        <div class="row pop-up-login-footer">
                            <span  class="col-xs-4 col-sm-3 col-md-3 col-md-offset-1"><input type="checkbox"> Pamiętaj mnie</span>
                            <button type="submit" class="btn col-xs-4 col-xs-offset-4 col-sm-3 col-sm-offset-6 col-md-2 col-md-offset-5">Zaloguj się</button>
                        </div>
                        <div class="row">
                            <a href="#" class="col-md-offset-1 col-md-3">Przypomnij hasło</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
    #loginPopupWindow {
        margin-top: 5rem;
    }
    main {
        padding-top: 100px;
    }
    html {
        position: relative;
        min-height: 100%;
    }
    body {
        background: #e8ecee;
        font-family: sans-serif;
        margin-bottom: 60px;
    }
    nav {
        background: #2e4148;
    }
    .form-control:focus {
        border-color: #ff6100;
        box-shadow: inset 0 1px 1px #ff6100, 0 0 8px #ff6100;
    }
    @media (max-width: 767px) {
        .navbar-header {
            float: left;
            padding: 15px;
            text-align: center;
            width: 100%;
        }
        .navbar-brand {
            float: none;
        }
    }
    .pusher {
        height: 50px;
    }
    .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
        min-height: 60px;
        background: #ffffff;
    }
    footer ul li {
        font-size: 1.5rem;
        font-weight: bold;
        margin: 1rem 2rem;
    }
    .nav-item {
        line-height: 50px;
    }
    nav a:hover {
        text-decoration: none;
        color: #ffffff !important;
    }
    nav a {
        font-weight: bold;
        color: #e8ecee !important;
    }
    .pop-up-login button {
        color: #2e4148;
        font-weight: bold;
        height: 40px;
        background: #f68827;
    }
    .pop-up-login .pop-up-login-footer {
        margin-right: 0.4rem;
    }
</style>
