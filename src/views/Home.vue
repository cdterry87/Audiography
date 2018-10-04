<template>
  <v-container fluid grid-list-md text-xs-center>
      <v-layout row wrap>
          <v-flex md8 offset-md2>
              <v-card>
                <h1>Search</h1>
                <h2>Search for your favorite artists!</h2>
                <v-card-text>
                    <v-flex md6 offset-md3>
                        <v-form v-model="valid" @submit.prevent="search">
                            <v-text-field v-model="searchField" :rules="searchRules" label="Search" required></v-text-field>
                            <v-btn :disabled="!valid" @click="search" color="info">submit</v-btn>
                            <v-btn @click="clear" color="warning">clear</v-btn>
                        </v-form>
                    </v-flex>
                    
                </v-card-text>
              </v-card>
          </v-flex>
      </v-layout>
      <br>
      <v-layout row v-if="searchResults.length > 0">
          <v-flex md8 offset-md2>
            <h2>Search Results</h2>

              <v-card>
                  <v-list two-line>
                      <div v-for="(result, index) in searchResults" :key="result.idArtist">
                        <v-list-tile avatar :to="'/artist/' + result.idArtist">
                            <v-list-tile-avatar :size="50">
                                <img :src="result.strArtistThumb" />
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                    <v-list-tile-title>{{ result.strArtist }}</v-list-tile-title>
                                    <v-list-tile-sub-title>
                                        <v-chip color="indigo" text-color="white" v-if="result.strGenre.length > 0">Genre: {{ result.strGenre }}</v-chip>
                                        <v-chip color="orange" text-color="white" v-if="result.intFormedYear.length > 0">Formed: {{ result.intFormedYear }}</v-chip>
                                        <v-chip color="green" text-color="white" v-if="result.strCountry.length > 0">From: {{ result.strCountry }}</v-chip>
                                        <v-chip color="red" text-color="white" v-if="result.intMembers.length > 0">Members: {{ result.intMembers }}</v-chip>
                                    </v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-divider v-if="index + 1 < searchResults.length" :key="`divider-${index}`"></v-divider>
                      </div>
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
            v => !!v || 'Search is required'
        ]
    }),
    watch: {
        searchResults: function() {
            console.log('search results: ', this.searchResults);
        }
    },
    methods: {
        search() {
            let search = this;
            axios.get('https://theaudiodb.com/api/v1/json/1/search.php', {
                params: {
                    s: this.searchField
                }
            })
            .then(function (response) {
                search.searchResults = response.data.artists;
            })
            .catch(function (error) {
                console.log(error);
            })
        },
        clear() {
            this.searchField = '';
            this.searchResults = [];
        }
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

img.image-full {
    width: 100% !important;
}

.v-list__tile {
    border-bottom: solid 1px #333 !important;
}

.v-chip__content a {
    color: white !important;
}
</style>
