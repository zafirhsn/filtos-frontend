<template>
<v-container fluid class="gradient" id="root-container">
  <v-app-bar
    app
    prominent
    :color="css.main"
    elevate-on-scroll
  >
  <v-row class="justify-center mt-5">
    <v-col align="center">

    <img src="../assets/logo.png" style="display:inline-block" id="logo">
    <h1 class=" d-inline-block white--text" id="heading">Filtos</h1>

    </v-col>
  </v-row>
  
  </v-app-bar>


  <!-- <v-row class="my-10">  
    <v-col align="center">
      <img src="../assets/logo.png" style="display:inline-block" id="logo"><h1 id="heading">Filtos</h1>
    </v-col>
  </v-row> -->

  <v-row class="my-10 justify-center">
    <v-col align="center" sm=12 lg=3 xl=2 class="mt-10">
      <p class="landing-copy">1. <strong>Filter</strong> your songs based on given attributes</p>
      <v-img src="../assets/filter-crop2.png" alt="Filter component" 
        height="20rem"
        width="20rem"
        contain
        class="d-block mb-5 mb-sm-10 rounded"
      ></v-img>

    </v-col>

    <v-col align="center" sm=12 lg=3 xl=2 class="mt-10">
      <p class="landing-copy">2. <strong>Select</strong> the songs you want to save</p>
      <v-img src="../assets/select-crop.png" alt="Filter component" 
        height="20rem"
        width="20rem"
        contain
        class="d-block mb-5 mb-sm-10 rounded"
      ></v-img>

    </v-col>

    <v-col align="center" sm=12 lg=3 xl=2 class="mt-10">
      <p class="landing-copy">3. <strong>Save</strong> your songs to a playlist and enjoy</p>
      <v-img src="../assets/save-crop2.png" alt="Filter component" 
        height="20rem"
        width="20rem"
        contain
        class="d-block mb-5 mb-sm-10 rounded"
      ></v-img>
    </v-col>

  </v-row>

  <v-row class="mt-10 justify-center">
    <v-col align="center" cols=12 md=8 lg=6>
      <h1 class="mb-4">Song Attributes</h1>
      <ol class="d-inline-block attr-list" align="left">
        <li><span class="highlight">Genres</span> - A list of the genres the song is associated with. </li>
        <li><span class="highlight">BPM</span> - The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.</li>
        <li><span class="highlight">Energy</span> - Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. A value of 1.0 is most energetic and 0.0 is least energetic</li>
        <li><span class="highlight">Popularity</span> - The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is based, in the most part, on the total number of plays the track has had and how recent those plays are.</li>
        <li><span class="highlight">Danceability</span> - Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable. </li>
        <li><span class="highlight">More coming soon...</span></li>
      </ol>
    </v-col>
  </v-row>


  <v-row class="my-10 justify-center">
    <v-col cols=12 sm=10 md=6 lg=4 align="center" class="px-6"> 
      <v-btn 
        @click="authorize()"
        x-large
        block 
        depressed 
        class="white--text rounded-pill custom-button" 
        color="#1DB954" 
        height="60px"
        id="connect-button">
        <img class="icon" src="../assets//Spotify_Icon_RGB_White.png">Connect to Spotify
      </v-btn>  
    </v-col>
  </v-row>

</v-container>
</template>

<script>
import querystring from 'query-string'

export default {
  data() {
    return {

    }
  },
  watch: {

  },
  computed: {

  },
  methods: {
    authorize() {
      let {state, url} = this.generateAuthorizationString();
      localStorage.setItem("state", state);
      window.location = url;
    },
    generateRandomString() {
      let letters = "abcdefghijklmnopqrstuvwxyz";
      let length = 16;
      let state = [];
      for (let i = 0; i < length; i++) {
        state.push(letters[Math.floor(Math.random() * letters.length)]);
      }
      return state.join("");
    },
    generateAuthorizationString() {
      let state = this.generateRandomString();
      let url  = "https://accounts.spotify.com/authorize?" + 
      querystring.stringify({
        client_id: `${process.env.VUE_APP_CLIENT_ID}`,
        response_type: "code",
        redirect_uri: `${process.env.VUE_APP_FRONTEND_URL}/home`,
        state: state,
        scope: "user-read-private user-read-email user-library-read playlist-modify-public playlist-modify-private"
      });
      return {state, url};
    }
  },
  beforeCreate() {
    //console.log(localStorage.getItem("state"))
  },
  created() {


  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
  #root-container {
    font-family: "Mulish", sans-serif;
    color: black;
  }

  img.icon {
    height: 30px;
    width: auto;
    margin-right: 10px;
  }
  .gradient {
    height: 100%;
    width: 100%;
    background: rgb(255,106,228, 0.7);
    background: linear-gradient(150deg, rgba(255,106,228,0.3) 20%, rgba(73,0,78,0.85) 100%);
  }

  #heading {
    font-weight: 500;
    font-size: 2rem;
  }

  #connect-button {
    font-size: 1rem;
    font-weight: 700;
  }

  #logo {
    height: 3rem;
  }

  div.v-image.v-responsive.d-block.mb-5.mb-sm-10.rounded.theme--light {
    border-style: solid;
    border-width: 1px;
    border-color: black;
  }

  .landing-copy {
    height: 4rem;
    font-size: 1.1rem;
    // color: #ffffff;

    @media screen and (min-width: 600px) {
      font-size: 1.2rem;
    }

  }

  .attr-list {
    font-size: 1.1rem;
    // color: white;

    @media screen and (min-width: 600px) {
      font-size: 1.2rem;
    }

  }

  .highlight {
    font-weight: 700;
    font-size: 1.3rem;

    @media screen and (min-width: 600px) {
      font-size: 1.6rem;
    }
  }

  h1.mb-4 {
    font-weight: 700;
  }

  strong {
    // color: rgba(255,106,228,)
    font-size: 1.6rem;
    font-weight: 700;
  }

</style>