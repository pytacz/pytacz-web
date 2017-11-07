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
                            <span v-else>
                                <button class="nav-item btn-link" data-toggle="modal" data-target="#loginPopupWindow">Zaloguj się</button>
                            </span>
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
    <vue-progress-bar></vue-progress-bar>
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
        },
        mounted() {
            //  [App.vue specific] When App.vue is finish loading finish the progress bar
            this.$Progress.finish();
        },
        created() {
            //  [App.vue specific] When App.vue is first loaded start the progress bar
            this.$Progress.start();
            //  hook the progress bar to start before we move router-view
            this.$router.beforeEach((to, from, next) => {
                //  does the page we want to go to have a meta.progress object
                if (to.meta.progress !== undefined) {
                    let meta = to.meta.progress;
                    // parse meta tags
                    this.$Progress.parseMeta(meta);
                }
                //  start the progress bar
                this.$Progress.start();
                //  continue to next page
                next()
            });
            //  hook the progress bar to finish after we've finished moving router-view
            this.$router.afterEach((to, from) => {
                //  finish the progress bar
                this.$Progress.finish();
            });

            let authReady = this.$auth.ready();

            if (!authReady) {
                let seconds = 8;

                setInterval(function () {
                    if (!authReady) {
                        seconds--;
                    }
                    if (seconds <= 0) {
                        clearInterval(t);
                        localStorage.clear();
                        sessionStorage.clear();
                        location.reload();
                    }
                }, 1000);
            }
        }
    }
</script>
<style src="./css/main/content.css"></style>
<style src="./css/main/navbar.css"></style>
<style src="./css/main/footer.css"></style>
<style src="./css/modals/login.css"></style>
<style src="./css/main/loader.css"></style>