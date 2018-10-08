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
      <v-layout row v-if="isSearching">
          <v-flex md8 offset-md2>
            <h2>Searching...</h2>
            <v-progress-linear :indeterminate="true"></v-progress-linear>
          </v-flex>
      </v-layout>
      <v-layout row v-if="!isSearching && searchResults && searchResults.length > 0">
          <v-flex md8 offset-md2>
            <h2>Search Results</h2>
            <v-list two-line>
                <div v-for="(result, index) in searchResults" :key="result.idArtist">
                <v-list-tile avatar :to="'/artist/' + result.idArtist">
                    <v-list-tile-avatar :size="50">
                        <img :src="result.strArtistThumb + '/preview'" />
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
          </v-flex>
      </v-layout>
      <v-layout row v-if="searchPerformed && (searchResults == null || searchResults.length == 0)">
          <v-flex md8 offset-md2>
            <v-alert :value="true" type="error">Sorry, no results were found.  Please try your search again.</v-alert>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
    import axios from "axios";

    export default {
    data: () => ({
        valid: false,
        searchPerformed: false,
        isSearching: false,
        searchField: '',
        searchResults: [],
        searchRules: [
            v => !!v || 'Search is required'
        ]
    }),
    methods: {
        search() {
            this.isSearching = true;

            let search = this;
            axios.get('https://theaudiodb.com/api/v1/json/1/search.php', {
                params: {
                    s: this.searchField
                }
            })
            .then(function (response) {
                search.searchResults = response.data.artists;
                search.searchPerformed = true;
                search.isSearching = false;
            })
            .catch(function (error) {
                console.log(error);
            })
        },
        clear() {
            this.isSearching = false;
            this.searchPerformed = false;
            this.searchField = '';
            this.searchResults = [];
        }
    }
}
</script>
