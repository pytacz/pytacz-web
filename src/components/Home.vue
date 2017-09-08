<template>
    <div>
        <div v-if="$auth.check()">
            <home-logged-in></home-logged-in>
        </div>
        <div v-else>
            <home-logged-out></home-logged-out>
        </div>
    </div>
</template>

<script>
    import HomeLoggedIn from '@/components/homepage/LoggedIn'
    import HomeLoggedOut from '@/components/homepage/LoggedOut'

    export default {
        name: 'Home',
        data () {
            return {
                auth: this.$auth
            }
        },
        components: {
            HomeLoggedIn,
            HomeLoggedOut
        }
    }
</script>