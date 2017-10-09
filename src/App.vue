<template>
<div id="app">
    <header>
        <nav class="navbar navbar-light navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <span class="navbar-brand">
                        <router-link v-if="$auth.check()" :to="{ name: 'Main' }">Pytacz.pl</router-link>
                        <router-link v-else :to="{ name: 'Home' }">Pytacz.pl</router-link>
                    </span>
                </div>

                <div v-bind:class="{'navbar-collapse, collapse, hidden-xs': !$auth.check()}">
                    <div class="nav navbar-nav navbar-right">
                        <div v-if="$auth.ready()">
                            <div v-if="$auth.check()">
                                <a href="#">Profil</a>
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
        <div v-else class="loading-message">
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

    <div v-show="!$auth.check()">
        <login-modal></login-modal>
    </div>
</div>
</template>

<script>
    import LoginModal from '@/components/modals/Login'

    export default {
        name: 'App',
        methods: {
            logout() {
                this.$auth.logout({
                    makeRequest: false
                });
            }
        },
        components: {
            LoginModal
        }
    }
</script>
<style src="./css/main/content.css"></style>
<style src="./css/main/navbar.css"></style>
<style src="./css/main/footer.css"></style>
<style src="./css/main/login-modal.css"></style>
