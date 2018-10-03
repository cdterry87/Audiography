<template>
  <v-container fluid grid-list-md text-xs-center>
      <v-layout row wrap>
          <v-flex md6 offset-md3>
              <v-card>
                <h1>Search</h1>
                <v-card-text>
                    <v-form v-model="valid" @submit.prevent="search">
                        <v-text-field v-model="searchField" :rules="searchRules" :counter="3" label="Search" required></v-text-field>
                        <v-btn :disabled="!valid" @click="search">submit</v-btn>
                        <v-btn @click="clear">clear</v-btn>
                    </v-form>
                </v-card-text>
              </v-card>
          </v-flex>
      </v-layout>
      <br>
      <v-layout row v-if="searchResults.length > 0">
          <v-flex md8 offset-md2>
              <v-card>
                  <h2>Search Results</h2>
                  <v-list two-line>
                      <v-list-tile avatar v-for="result in searchResults" :key="result.idArtist">
                          <v-list-tile-avatar>
                                <v-icon>{{ result.strArtistThumb }}</v-icon>
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                                <v-list-tile-title>{{ result.strArtist }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ result.strBiographyEN }}</v-list-tile-sub-title>
                          </v-list-tile-content>
                      </v-list-tile>
                  </v-list>
              </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
    import axios from "axios";

    export default {
    data: () => ({
        valid: false,
        searchField: '',
        searchResults: [],
        searchRules: [
            v => !!v || 'Search is required',
            v => v.length >= 3 || 'Search field must contain at least 3 characters.'
        ]
    }),
    methods: {
        search() {
            let that = this;
            axios.get('https://theaudiodb.com/api/v1/json/1/search.php', {
                params: {
                    s: this.searchField
                }
            })
            .then(function (response) {
                console.log('received response!');
                that.searchResults = response;

                console.log('results', that.searchResults);
            })
            .catch(function (error) {
                console.log(error);
            })
        },
        clear() {
            this.searchField = '';
        }
    },
    created() {
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
