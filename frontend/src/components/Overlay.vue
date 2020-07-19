<template>
  <v-container fluid id="root-container"
  >
    <v-row class="justify-center">
      <v-col align="center" sm=10 md=8 lg=6>
        <v-overlay 
          :value="overlay"
        >

          <v-row class="justify-center">
            <v-col sm=8 md=6 lg=4>
              <v-card 
                color="#fff"
                rounded
              >
                <v-app-bar
                  :color=css.dark
                  height="40px"
                  flat

                >
                <v-spacer></v-spacer>

                <v-btn
                  icon
                  medium
                  @click="closeOverlay()"
                ><v-icon>
                  mdi-close-circle
                  </v-icon>
                </v-btn>
                </v-app-bar>
                <v-card-subtitle
                  
                >
                  <span class="black--text" id="copy">More songs incoming! We were able to grab <strong>2,500</strong> of your songs, but still have a few more to load. Enjoy the app while we load the rest in the background.</span>
                </v-card-subtitle>

                <v-card-actions class="justify-center"> 
                  <v-btn
                    color="success"
                    medium
                    depressed
                    @click="closeOverlay()"
                  >
                  Ok
                  </v-btn>

                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-overlay>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      overlay: true
    }
  },
  methods: {
    closeOverlay() {
      this.overlay = false;
    }
  }
}
</script>

<style  lang="scss" scoped>
  #root-container {
    font-family: 'Mulish', sans-serif;
  }

  #copy {
    font-size: 0.9rem;
  }

</style>