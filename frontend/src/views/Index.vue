<template>
<v-container fluid class="gradient">


  <v-row class="my-10 justify-center">  
    <v-col align="center">
      <img src="../assets/logo.png" style="display:inline-block" id="logo"><h1 id="heading">Filtos</h1>
    </v-col>
  </v-row>

  <v-row class="my-10 px-8">
    <v-col align="center">
      <ul class="d-inline-block" id="list">
        <li align="start">Filter your Spotify library by 
          <strong>Genre</strong>, 
          <strong>BPM</strong>, 
          <strong>Energy</strong>, 
          and <strong>Danceability</strong>
        </li>
        <li align="start">Create playlists out of songs you filtered by</li>
        
      </ul>
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
        <img src="../assets//Spotify_Icon_RGB_White.png">Connect to Spotify
      </v-btn>  
    </v-col>
  </v-row>

  <!--  -->
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
    console.log(localStorage.getItem("state"))
  },
  created() {


  },
  mounted() {
    document.cookie=`name={ 'firstname':'zafir','lastname':'hasan' }`;
    // document.cookie="name=suhbat;domain=localhost;max-age=86400"

    // let res = this.$http.get("http://localhost:3000/test",{emulateJSON: true, withCredentials: true}).then(()=> {

    //   res = this.$http.get("http://localhost:3000/test",{emulateJSON: true, withCredentials: true}).then().catch();

    // }).catch();

    // let res1 = this.$http.get("http://localhost:3000/me", {emulateJSON: true, withCredentials: true}).then().catch();

    

  }
}
</script>

<style scoped lang="scss">
  img {
    height: 30px;
    width: auto;
    margin-right: 10px;
  }
  .gradient {
    height: 100%;
    width: 100%;
    background: rgb(255,106,228, 0.7);
    background: linear-gradient(150deg, rgba(255,106,228,0.3) 20%, rgba(73,0,78,1) 100%);
  }

  #heading {
    font-family: 'Mulish', sans-serif;
    font-weight: 500;
    font-size: 4rem;
  }

  #list {
    font-family: 'Mulish', sans-serif;
    font-size: 1.3rem;
    font-weight: 400;
  }

  #connect-button {
    font-family: "Mulish", sans-serif !important;
    font-size: 1rem;
    font-weight: 700;
  }

  #logo {
    height: 8rem;
  }


</style>