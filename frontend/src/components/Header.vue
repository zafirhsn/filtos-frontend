<template>
    <v-app-bar 
      fixed 
      elevate-on-scroll
      height="82px" 
      :color=css.main
      class="mb-12"
      app
    >

    <!-- // ^ AVATAR -->
    <v-avatar
      
      class="elevation-5"
    >
      <img 
        :src=profile.images
        alt="Profile Pic"
      >

    </v-avatar>

    <span class="white--text ml-5 hidden-xs-only" id="display_name">{{profile.display_name}}</span>

      <v-spacer></v-spacer>
    <v-btn
      id="logout-button"
      medium
      depressed
      class="white--text"
      :color="css.main"
      :loading="loading"
      @click="logout()"
    >
    Log out
    </v-btn>
    
  </v-app-bar>
</template>

<script>
import {deleteDB } from 'idb';

export default {
  data() {
    return {
      loading: false
    }
  },
  props: {
    profile: Object
  },
  methods: {
    logout() {
      let out = async () => {
        this.loading = true;
        localStorage.clear();
        // await deleteDB("library-store");
        document.cookie = `_session=;max-age=0;domain=${process.env.VUE_APP_COOKIE_DOMAIN}`;
        this.loading = false;
        
        
      }
      out().then(()=> {
        this.$router.push('/')
      }).catch();

    }
  }
}
</script>

<style lang="scss" scoped>

#display_name {
  font-size: 1.3rem;
}

#logout-button {
  height: 100%;
}
  


</style>