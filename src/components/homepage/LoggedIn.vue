<template>
    <div class="container">
        <div class="row wrapper">
            <div class="col-xs-10 col-xs-offset-1 col-md-3 sidebar-nav-fixed sidebar-nav-left">
                <div class="row">
                    <div class="col-md-12 bar">
                        <div class="img-circle profile-pic"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 username-container">
                        <h4 class="username">{{ $auth.user().username }}</h4>
                    </div>
                </div>
                <hr>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <ul class="list-unstyled">
                                <li><a href="#">Ustawienia</a></li>
                                <li><a href="#">Użytkownicy</a></li>
                                <li><a href="#">Test</a></li>
                                <li><a href="#">Quizy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-10 col-xs-offset-1 col-md-6 content">
                <router-view style="width: 100%;"></router-view>
            </div>
            <div class="hidden-sm visible-md visible-lg col-md-2 sidebar-nav-fixed sidebar-nav-right">

            </div>
        </div> <!-- .row .wrapper -->
    </div> <!-- .container -->
</template>
<script>
    export default {
        name: 'LoggedIn'
    }
</script>
<style src="../../css/home/logged-in/template.css" scoped></style>
<style src="../../css/home/logged-in/blocks.css" scoped></style>