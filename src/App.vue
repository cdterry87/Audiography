<template>
    <v-app>
        <v-toolbar app color="grey darken-3" text-color="white" id="toolbar">
            <router-link :to="'/'"><v-toolbar-title v-text="title"></v-toolbar-title></router-link>
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
a {
    color: inherit !important;
    text-decoration: none;
}

#toolbar a {
    color: white !important;
}

.long-text {
    white-space: pre-wrap;
    text-align: left !important;
}

#copyright {
    text-align: center !important;
    padding-top: 50px;
    padding-bottom: 25px;
}
</style>
