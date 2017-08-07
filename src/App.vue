<template>
<div id="app">
    <header>
        <nav class="navbar navbar-light navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">Pytacz.pl</a>
                </div>

                <div class="collapse navbar-collapse hidden-xs">
                    <div class="nav navbar-nav navbar-right">
                        <a class="nav-item nav-link" href="#">Zaloguj się</a>
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
                <li><router-link to="Login">Zaloguj się</router-link></li>
                <li><router-link to="Register">Rejestracja</router-link></li>
                <li><a href="https://github.com/pytacz">Github</a></li>
            </ul>
        </div>
    </footer>
</div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style>
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
        box-shadow: inset 0 1px 1px #ff6100, 0 0 10px #ff6100;
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
</style>
