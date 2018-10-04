<template>
    <div>
        <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
                <v-flex xs12 md3>
                    <v-card>
                        <v-img :src="details.strArtistThumb" aspect-ratio="1"></v-img>
                        <v-card-title>
                                <v-chip color="purple" text-color="white" v-if="details.strGenre.length > 0">Genre: {{ details.strGenre }}</v-chip>
                                <v-chip color="red" text-color="white" v-if="details.intMembers.length > 0">Members: {{ details.intMembers }}</v-chip>
                                <v-chip color="orange" text-color="white" v-if="details.intFormedYear.length > 0">Formed: {{ details.intFormedYear }}</v-chip>
                                <v-chip color="green" text-color="white" v-if="details.strCountry.length > 0">From: {{ details.strCountry }}</v-chip>
                                <v-chip color="primary" text-color="white" v-if="details.strFacebook.length > 0">
                                    <a :href="details.strFacebook" target="_blank">Facebook</a>
                                </v-chip>
                                <v-chip color="info" text-color="white" v-if="details.strTwitter.length > 0">
                                    <a :href="details.strTwitter" target="_blank">Twitter</a>
                                </v-chip>
                                <v-chip color="blue-grey" text-color="white" v-if="details.strWebsite.length > 0">
                                    <a :href="details.strWebsite" target="_blank">www</a>
                                </v-chip>
                        </v-card-title>
                    </v-card>
                </v-flex>
                <v-flex xs12 md9>
                    <v-card>
                        <v-card-title class="long-text">
                            <h1>{{ details.strArtist }}</h1>
                            <div v-html="details.strBiographyEN.trim()"></div>
                        </v-card-title>
                    </v-card>

                    <br>

                    <v-card>
                        <v-card-title>
                            <h2>{{ albums.length }} Albums</h2>
                        </v-card-title>
                        <v-list two-line v-for="(album, index) in albums" :key="album.idAlbum">
                            <v-list-tile>
                                <v-list-tile-avatar>
                                    <img :src="album.strAlbumThumb">
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    {{ album.strAlbum }} ({{ album.intYearReleased }})
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-divider v-if="index + 1 < albums.length" :key="`divider-${index}`"></v-divider>
                        </v-list>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Artist',
    props: ['id'],
    data: function() {
        return {
            details: '',
            albums: '',
        }
    },
    created() {
        let artist = this;

        //Get artist details.
        axios.get('https://theaudiodb.com/api/v1/json/1/artist.php', {
            params: {
                i: this.id
            }
        })
        .then(function (response) {
            artist.details = response.data.artists[0];

            console.log('artist details: ', artist.details);
        })
        .catch(function (error) {
            console.log(error);
        })

        //Get album details.
        axios.get('https://theaudiodb.com/api/v1/json/1/album.php', {
            params: {
                i: this.id
            }
        })
        .then(function (response) {
            artist.albums = response.data.album;

            console.log('artist albums: ', artist.albums);
        })
        .catch(function (error) {
            console.log(error);
        })

    }
}
</script>
