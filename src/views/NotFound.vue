<template>
  <v-container fluid grid-list-md text-xs-center>
      <v-layout row wrap>
          <v-flex md8 offset-md2>
              <v-card>
                <h1>Sorry :(</h1>
                <h2>The page you are looking for could not be found.</h2>

                <v-btn :to="'/'" color="info">Go Back to Search</v-btn>
              </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
    export default {
        name: 'NotFound'
    }
</script>
