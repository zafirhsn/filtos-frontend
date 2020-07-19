<template>
  <v-sheet
    id="root-container"
    elevation=0
    rounded
    :color=css.sheetBackground
    class=""
    @keydown.esc="closeOverlay()"
  >
  <v-container fluid>
    <v-row class="justify-center">
      <v-col align="center">
        <h2 class="mt-0"><strong>Selected Songs ({{selected.length}})</strong></h2>
      </v-col>
    </v-row>

    <v-row class="justify-center mb-3">
      <v-col align="center">
        <div 
          class="rounded-pill grey lighten-2 d-inline-block px-3 py-1 ma-1 elevation-10"
          v-for="(item, index) of selected"
          :key="index"
        >
        <span class="d-inline-block align-content-center">{{item.name}}</span>
        <v-btn
          icon
          small
          class="ml-1"
          @click="deselect(item.id)"
        >
          <v-icon>
            mdi-close-circle
          </v-icon>
          </v-btn>
        
        </div>

      </v-col>
    </v-row>

    <v-row class="justify-center">
      <v-col align="center">
        <v-btn
          medium
          depressed
          class="white--text py-5 mb-5" 
          color="#1DB954"
          :disabled="selectedError || !selected.length"
          @click="editPlaylist()"
          >
          <v-icon class="mr-3">
            mdi-download
          </v-icon>
            Save as Playlist
        </v-btn>

        <v-btn class="py-5 mb-5 ml-3"
          medium
          depressed
          color="error"
          :disabled="!selected.length"
          @click="clearSelected()"
        >
          <v-icon class="mr-3">
            mdi-close-circle
          </v-icon>
          Clear 
        </v-btn>

      </v-col>
    </v-row>

    <v-row v-if="selectedError" class="justify-center">
      <v-col cols=12 sm=10 md=6 align="center">
        <v-alert 
          type="error"
        >Can not select more than 100 songs
        </v-alert>
      </v-col>
    </v-row>

  </v-container>

    <v-overlay 
      :value="overlay"
      class="justify-center"
      dark="false"
      opacity="0.2"
      
    >

    <v-card
      rounded
      id="card"
    >

      <v-app-bar
        height="40px"
        flat
        :color=css.dark

      >
        <v-spacer></v-spacer>

        <v-btn
          icon
          medium
          @click="closeOverlay()"
        ><v-icon
          color="white"
        >
          mdi-close-circle
          </v-icon>
        </v-btn>
      </v-app-bar>

      <v-container fluid>
        <v-row class="justify-center">

          <v-col v-if="!saving" align="center" class="pa-0">


            <v-card-title 
              class="justify-center ma-n2"  
            >
              <span class="text-title black--text" id="save-title">
                Save {{name}}
              </span>
            </v-card-title>

            <v-card-actions>
              <v-container fluid>
                <v-row class="justify-center">
                  <v-col cols=12 class="text--black ma-n4">

                    <v-form v-model="valid">
                      <v-text-field
                        outlined
                        autofocus
                        append-icon="mdi-pencil"
                        background-color="white"
                        color="black"
                        class="text--black"
                        label="Name"
                        v-model="name"
                        :rules=[rules.required,rules.lenName]
                        required
                      >
                      </v-text-field>
                    <!-- </v-col>
                    <v-col sm=10 class="text--black ma-n4"> -->
                      <v-textarea
                        counter=150
                        outlined
                        autogrow
                        background-color="white"
                        color="black"
                        class="text--black"
                        label="Description"
                        v-model="description"
                        placeholder="This is my playlist..."
                        required
                        :rules=[rules.required,rules.lenDesc]
                      >
                      </v-textarea>

                    <v-btn
                      class="white--text"
                      medium
                      block
                      depressed
                      :disabled=!valid
                      :color=css.spotify
                      @click="savePlaylist()"
                    >Save
                    </v-btn>
                  </v-form>


                  </v-col>
                </v-row>

                <!-- <v-row class="justify-center">
                  <v-col align="center" class="ma-n2" sm=10>

                    <v-btn
                      class="white--text"
                      medium
                      block
                      depressed
                      :color=css.spotify
                      @click="savePlaylist()"
                    >Save
                    </v-btn>
                  </v-col>
                </v-row> -->

              </v-container>
            </v-card-actions>
          </v-col>


          <v-col v-if="saving" align="center" class="pa-0">
            <v-card-title 
              class="justify-center ma-n2"  
              v-if="loading"
            >
              <span class="text-subtitle-1 black--text">
                Saving <strong> {{name}} </strong>
              </span>
            </v-card-title>

            <v-card-actions>
              <v-container fluid>
                <v-row class="justify-center">
                  <v-col align="center" class="pa-1">
                          
                    <v-progress-linear v-if="loading"
                      color="#1DB954"
                      rounded
                      height="10px"
                      indeterminate
                      class="my-3"
                    >
                    </v-progress-linear>

                    <v-alert v-if="error"
                      color="error"
                      icon="mdi-alert-circle"
                      rounded
                    >
                    Something went wrong
                    </v-alert>

                    <div v-if="success">
                      <v-icon
                        color="success"
                        icon="mdi-check-circle"
                        size="5rem"
                      >
                      mdi-check-circle
                      </v-icon>
                      <p class="mt-3" id="saved-copy">Saved playlist</p>
                    </div>                
                  </v-col>
                </v-row>
              </v-container>
            </v-card-actions>
          </v-col>

        </v-row>
      </v-container>
    </v-card>

    </v-overlay>
  </v-sheet>
</template>

<script>
export default {
  props: {
    selected: Array
  },
  data() {
    return {
      overlay: false,
      name: "",
      description: "",
      saving: false,
      loading: true,
      progress: 20,
      error: false,
      success: false,
      valid: false,
      selectedError: false,
      rules: {
        required: v => !!v || "Required",
        lenName: v => v.length <= 50 || "Must be 50 characters or less",
        lenDesc: v => v.length <= 150 || "Must be 150 chracters or less"
      }
    }
  },
  watch: {
    selected() {
      if (this.selected.length > 100) {
        this.selectedError = true;
      } else {
        this.selectedError = false;
      }
    }
  },
  methods: {
    clearSelected() {
      this.$emit("clearSelected");
    },
    editPlaylist() {
      // Show user title editing overlay
      this.overlay = true;
    },
    closeOverlay() {
      this.overlay = false
      this.saving = false;
      this.loading = true;
      this.success = false;
      this.name = "";
      this.description = "";
    },
    savePlaylist() {

      // Render indeterminate linear progress loader

      let save = async () => {
        this.saving = true;
        this.loading = true;
        // Create data for backend endpoint
        let profile = JSON.parse(localStorage.getItem("profile"));

        let tracks = [];
        for (let item of this.selected) {
          tracks.push(item.id);
        }

        let data = {
          name: this.name,
          description: this.description,
          id: profile.id,
          tracks: tracks
        }

        let res = await this.$http.post(`${process.env.VUE_APP_BACKEND_URL}/save`, data, {withCredentials: true});
        console.log(res);
        this.loading = false;
        this.success = true;

        // setTimeout(()=> {
        //   this.loading = false;
        //   this.success = true;
        // }, 2000)


        // When playlist is succesfully made, show success message to user
        // setTimeout(()=> {
        //   this.loading = false;
        //   this.success = true;
        // },2000)
      }

      save().then().catch();



    },
    deselect(id) {
      this.$emit("deselect", id)
    }
  }
}
</script>

<style scoped lang="scss">
  #root-container {
    border-style: solid;
    border-width: 1px;
    border-color: #D376E3 !important;
    font-family: 'Mulish', sans-serif;
    font-size: 1rem;
  }

  #save-title {
    font-weight: 700;
  }

  #card {
    width: 330px;

    @media screen and (min-width: 700px) {
      width: 450px;
    }
  }

  #saved-copy {
    font-weight: 700;
    font-size: 1.2rem;
  }
</style>