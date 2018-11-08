<template>
    <v-app dark>
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
html,
body {
    height: 100%;
    width: 100%;
    background: #f2f6fa !important;
    overflow-x: hidden;
}

body {
  position: relative
}
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

img.image-full {
    width: 100% !important;
}

.v-list {
    padding: 0 !important;
}

.v-chip__content a {
    color: white !important;
}

#loading .v-progress-circular {
    margin: 25px 50px 50px 50px;
}

#copyright {
    text-align: center !important;
    padding-top: 50px;
    padding-bottom: 25px;
}
</style>
