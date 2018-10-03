<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-title v-text="title"></v-toolbar-title>
        </v-toolbar>
        <v-content>
            <router-view/>

            <div id="copyright">Chase Terry &copy; 2018</div>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    data () {
        return {
        title: 'Audiography'
    }
    }
}
</script>

<style>
#copyright {
    text-align: center !important;
    padding-top: 50px;
    padding-bottom: 25px;
}
</style>
