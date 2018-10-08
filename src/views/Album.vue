<template>
    <div>
        <v-container grid-list-md text-xs-center v-if="isLoadingAlbum || isLoadingTracks" id="loading">
            <v-layout row wrap>
                <v-flex xs12 md8 offset-md2>
                    <v-card>
                        <h2>Loading Album Information...</h2>
                        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container grid-list-md text-xs-center v-if="!isLoadingAlbum && !isLoadingTracks">
            <v-layout row wrap v-if="details">
                <v-flex xs12 md3>
                    <div v-if="details.strAlbumThumb">
                        <v-card>
                            <v-img :src="details.strAlbumThumb" class="image-full"></v-img>
                        </v-card>
                        <br>
                    </div>
                    <v-card>
                        <router-link :to="'/artist/' + details.idArtist">
                            <h2>{{ details.strArtist }}</h2>
                        </router-link>
                    </v-card>
                    <br>
                    <v-card>
                        <v-card-title>
                            <v-chip color="purple" text-color="white" v-if="details.strGenre.length > 0">Genre: {{ details.strGenre }}</v-chip>
                            <v-chip color="red" text-color="white" v-if="details.strStyle.length > 0">Style: {{ details.strStyle }}</v-chip>
                            <v-chip color="orange" text-color="white" v-if="details.intYearReleased.length > 0">Released: {{ details.intYearReleased }}</v-chip>
                        </v-card-title>
                    </v-card>
                </v-flex>
                <v-flex xs12 md9>
                    <v-card>
                        <v-card-title class="long-text">
                            <h1>{{ details.strAlbum }}</h1>
                            <div v-html="details.strDescriptionEN" class="long-text"></div>
                        </v-card-title>
                    </v-card>
                    
                    <br>

                    <v-card>
                        <v-card-title>
                            <h2>{{ tracks.length }} Tracks</h2>
                        </v-card-title>
                        <v-data-table v-if="tracks" :headers="headers" :items="tracks" hide-actions class="elevation-1">
                            <template slot="items" slot-scope="track">
                                <td class="text-xs-left">{{ track.item.intTrackNumber }}</td>
                                <td class="text-xs-left">{{ track.item.strTrack }}</td>
                                <td class="text-xs-left">{{ durationConversion(track.item.intDuration) }}</td>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Album',
    props: ['id'],
    data: function() {
        return {
            isLoadingAlbum: true,
            isLoadingTracks: true,
            details: '',
            tracks: '',
            headers: [
                {'text': '#', 'value': 'intTrackNumber'},
                {'text': 'Title', 'value': 'strTrack'},
                {'text': 'Duration', 'value': 'intDuration'},
            ]
        }
    },
    created() {
        let album = this;

        //Get album details.
        axios.get('https://theaudiodb.com/api/v1/json/1/album.php', {
            params: {
                m: this.id
            }
        })
        .then(function (response) {
            album.details = response.data.album[0];
            album.isLoadingAlbum = false;
        })
        .catch(function (error) {
            console.log(error);
        })

        //Get track details.
        axios.get('https://theaudiodb.com/api/v1/json/1/track.php', {
            params: {
                m: this.id
            }
        })
        .then(function (response) {
            album.tracks = response.data.track;
            album.isLoadingTracks = false;
        })
        .catch(function (error) {
            console.log(error);
        })
    },
    methods: {
        durationConversion(duration) {
            var minutes = Math.floor(duration / 60000);
            var seconds = ((duration % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }
    }
}
</script>
