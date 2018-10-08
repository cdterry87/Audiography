<template>
    <div>
        <v-container grid-list-md text-xs-center v-if="isLoadingArtist || isLoadingAlbums" id="loading">
            <v-layout row wrap>
                <v-flex xs12 md8 offset-md2>
                    <v-card>
                        <h2>Loading Artist Information...</h2>
                        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container grid-list-md text-xs-center v-if="!isLoadingArtist && !isLoadingAlbums">
            <v-layout row wrap v-if="details">
                <v-flex xs12 md3>
                    <div v-if="details.strArtistThumb">
                        <v-card>
                            <v-img :src="details.strArtistThumb" class="image-full"></v-img>
                        </v-card>
                        <br>
                    </div>
                    <v-card>
                        <v-card-title>
                            <v-chip color="purple" text-color="white" v-if="details.strGenre.length > 0">Genre: {{ details.strGenre }}</v-chip>
                            <v-chip color="red" text-color="white" v-if="details.intMembers.length > 0">Members: {{ details.intMembers }}</v-chip>
                            <v-chip color="orange" text-color="white" v-if="details.intFormedYear.length > 0">Formed: {{ details.intFormedYear }}</v-chip>
                            <v-chip color="green" text-color="white" v-if="details.strCountry.length > 0">From: {{ details.strCountry }}</v-chip>
                            <v-chip color="primary" text-color="white" v-if="details.strFacebook.length > 0">
                                <a :href="'http://' + details.strFacebook" target="_blank">Facebook</a>
                            </v-chip>
                            <v-chip color="info" text-color="white" v-if="details.strTwitter.length > 0">
                                <a :href="'http://' + details.strTwitter" target="_blank">Twitter</a>
                            </v-chip>
                            <v-chip color="blue-grey" text-color="white" v-if="details.strWebsite.length > 0">
                                <a :href="'http://' + details.strWebsite" target="_blank">www</a>
                            </v-chip>
                        </v-card-title>
                    </v-card>
                    <br>
                    <v-card v-if="details.strArtistLogo.length > 0">
                        <v-img :src="details.strArtistLogo" class="image-full"></v-img>
                    </v-card>
                    <br>
                    <v-card v-if="details.strArtistWideThumb">
                        <v-img :src="details.strArtistWideThumb" class="image-full"></v-img>
                    </v-card>
                    <br>
                    <v-card v-if="details.strArtistFanart">
                        <v-img :src="details.strArtistFanart" class="image-full"></v-img>
                    </v-card>
                    <br>
                    <v-card v-if="details.strArtistFanart2">
                        <v-img :src="details.strArtistFanart2" class="image-full"></v-img>
                    </v-card>
                    <br>
                    <v-card v-if="details.strArtistFanart3">
                        <v-img :src="details.strArtistFanart3" class="image-full"></v-img>
                    </v-card>
                </v-flex>
                <v-flex xs12 md9>
                    <div v-if="details.strArtistBanner">
                        <v-card>
                            <v-img :src="details.strArtistBanner" class="image-full"></v-img>
                        </v-card>
                        <br>
                    </div>
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
                            <v-list-tile :to="'/album/' + album.idAlbum">
                                <v-list-tile-avatar>
                                    <img :src="album.strAlbumThumb + '/preview'">
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
            isLoadingArtist: true,
            isLoadingAlbums: true,
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
            artist.isLoadingArtist = false;
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
            artist.sortAlbums();
            artist.isLoadingAlbums = false;
        })
        .catch(function (error) {
            console.log(error);
        })

    },
    methods: {
        sortAlbums() {
            return this.albums.sort((a, b) => {
                return b.intYearReleased - a.intYearReleased
            });
        }
    }
}
</script>
