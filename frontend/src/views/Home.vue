<template>
  <v-container class="px-sm-10" id="root-container" fluid ref="root">

		<comp-error v-if="error" :errorMessage=errorMessage></comp-error>

		<v-container fluid v-if="true || !libLoaded || !error" id="loader-container">
			<v-row class="justify-center" id="loader-row">
				<v-col align="center" align-self="center">

			<v-progress-circular
				size=250
				:value=progress
				width=25
				:color=css.spotify
			>
			{{progress}}
			</v-progress-circular>
				</v-col>
			</v-row>

			<v-row class="justify-center">
				<v-col md="6">
					<v-card
						elevation="24"
						class="mx-auto rounded-lg"
					>
						<v-carousel
							:continuous="true"
							:cycle="true"
							:show-arrows="false"
							:hide-delimiters="true"
							height="250"
						>
							<v-carousel-item
								v-for="(fact, i) in slideFacts"
								:key="i"
								class="align-center"
								>
								<v-sheet
									height="100%"
									class="d-flex align-center pa-4"
									:color="colors[i] + ' lighten-5'"
									tile
								>
									<v-row>
										<v-col>
											<div class="text-h5 font-italic text-center my-auto pa-4">
												{{ fact }}
											</div>
										</v-col>
									</v-row>
								</v-sheet>
							</v-carousel-item>
						</v-carousel>
					</v-card>
				</v-col>
			</v-row>
		</v-container>

		<v-container fluid v-if="false && libLoaded && !error" id="main-container">
			<comp-header
				:profile=profile
			></comp-header>

			<comp-overlay 
				v-if="rest"
			></comp-overlay>


			<v-row class="justify-center mb-10" v-if="rest">
				<v-col align="center" sm="12" md="8" lg="6" v-if="this.restProgress !== 100">
					<p>{{loadedTracks}} / {{totalTracks}} songs</p>
					<v-progress-linear
						height="20px"
						:background-color=css.spotify
						rounded
						background-opacity="0.3"
						:color=css.spotify
						class="mt-5"
						:value="restProgress"
					>
					</v-progress-linear>
				</v-col>
				<v-col align="center" sm="12" md="8" lg="6" v-if="this.restProgress === 100">
					<v-alert
						dismissible
						border="left"
						color="success"
						type="success"
					>
					All your songs are ready to use!
					</v-alert>
				</v-col>
			</v-row>

			<v-row class="justify-center mt-sm-5" id="main">
				<v-col order=1 class="mb-5" cols=12 sm="12" md="10" lg="8">
					<v-sheet
						rounded
						:color=css.sheetBackground
						class="pa-5 pa-sm-15"
					>
						<!-- Genre Filter -->
						<v-row class="justify-center"> 
							<v-col sm="10">
								<v-autocomplete 
									v-model="genreFilters" 
									label="Genres"
									:items="genres" 
									chips 
									deletable-chips 
									multiple 
									outlined
									background-color="white" 
									class="mt-5"
									:disabled="disabled"
									>

									<template v-slot:no-data>
										<span class="mx-4">Select one or more <strong>genres</strong></span>
									</template>

								</v-autocomplete>
							</v-col>
						</v-row>

						<!-- BPM Filter -->
						<v-row class="justify-center mb-5">
							<v-col>
								<v-range-slider 
									v-model="bpmFilter" 
									label="BPM" 
									min="0" 
									:max="maxBPM" 
									:color=css.main
									track-color="#85219650"
									:thumb-color=css.main
									thumb-label="always"
									class="mt-3" 
									:disabled="disabled"> 
								</v-range-slider>
							<!-- {{bpmFilter}}
							{{maxBPM}}
							{{genres.length}} -->
							</v-col>
						</v-row>

						<!-- Energy Filter -->
						<v-row class="justify-center mb-5">
							<v-col>
								<v-range-slider 
									v-model="energyFilter" 
									label="Energy" 
									min="0" 
									max="1" 
									thumb-label="always" 
									:color=css.main
									track-color= "#85219650"
									:thumb-color=css.main
									step=0.25
									ticks="always"
									tick-size="4"
									:tick-labels="tickLabels"
									:disabled="disabled"> 

								<!-- <template v-slot:thumb-label="{value}">
									<span v-if="value = 0">Lowest</span>

								</template> -->
								</v-range-slider>
							</v-col>
						</v-row>

						<!-- Popularity Filter -->
							<v-row class="justify-center mb-5">
								<v-col>
									<v-range-slider 
										v-model="popularityFilter" 
										label="Popularity" 
										min="0" 
										max="100" 
										thumb-label="always" 
										:color=css.main
										track-color= "#85219650"
										:thumb-color=css.main
										step=25
										ticks="always"
										tick-size="4"
										:tick-labels="tickLabels"
										:disabled="disabled"> 
									</v-range-slider>
								</v-col>
							</v-row>

						<!-- Danceability Filter -->
							<v-row class="justify-center mb-5">
								<v-col>
									<v-range-slider 
										v-model="danceabilityFilter" 
										label="Danceability" 
										min="0" 
										max="1" 
										thumb-label="always"
										:color=css.main
										track-color= "#85219650"
										:thumb-color=css.main
										step=0.25
										ticks="always"
										tick-size="4"
										:tick-labels="tickLabels"
										:disabled="disabled"> 
									</v-range-slider>
								</v-col>
							</v-row>

						<!-- Valence Filter -->
							<v-row class="justify-center mb-5">
								<v-col>
									<v-range-slider 
										v-model="valenceFilter" 
										label="Valence" 
										min="0" 
										max="1" 
										thumb-label="always"
										:color=css.main
										track-color= "#85219650"
										:thumb-color=css.main
										step=0.25
										ticks="always"
										tick-size="4"
										:tick-labels="tickLabels"
										:disabled="disabled"> 
									</v-range-slider>
								</v-col>
							</v-row>

						<!-- Apply Filters Button -->
						<v-row class="justify-center mb-5">
							<v-col align="center" sm=6 md=4 lg=2>

							<v-btn 
								@click="applyFilters()" 
								class="my-3 white--text" 
								:color=css.main
								depressed 
								large
								block>
								Apply
							</v-btn>
							</v-col>
						</v-row>
					</v-sheet>
				</v-col>

				<v-col order=2 col=12 sm="12" md="10" lg="8">
					<!-- Data Table -->
					<!-- <v-row class="justify-center">
						<v-col cols="12"> -->
							<v-card
							
							>
								<v-card-title>
									Filtered Songs ({{filteredData.length}})
									<v-spacer></v-spacer>

									<v-text-field
										v-model="search"
										append-icon="mdi-magnify"
										label="Search"
										single-line
										hide-details
										class="my-1"
									></v-text-field>
								</v-card-title>

							<v-data-table 
								v-model="selected" 
								:headers="headers" 
								:items="filteredData" 
								items-per-page="5" 
								:search="search" 
								show-select 
								class="elevation-0">

								<template v-slot:item.preview="{item}">
									<v-icon 
										v-if="!item.isPreview" 
										large 
										:color=css.main 
										@click="preview(item.id, $event)"
									>mdi-play
									</v-icon>

									<div v-if="item.isPreview">
										<video 
											v-if="item.preview_url" 
											controls 
											height="40px" 
											width="250px" 
											class="my-2" 
											autoplay=""
										>
											<source :src="item.preview_url">
										</video>
										<span v-else>Preview not available</span>
									</div>

								</template>

							</v-data-table>
							</v-card>
						<!-- </v-col>
					</v-row> -->
				</v-col>

				<v-col order=3 cols=12 sm="12" md="10" lg="8">
					<!-- <v-row class="justify-center">
						<v-col class="mb-15"> -->
							<!-- Playlist Saver Comp -->
							<comp-playlist-saver
								:selected="selected"
								@deselect="deselect($event)"
								@clearSelected="clearSelected()"
							>
							</comp-playlist-saver>
						<!-- </v-col>
					</v-row> -->
				</v-col>

			</v-row>

		</v-container>

	</v-container>
</template>

<script>
import { openDB } from 'idb';
// import compHeader from '../components/Header';
// import compPlaylistSaver from '../components/PlaylistSaver';
import setupIDB from '../mixins/setupIDB';
import integrate from '../mixins/integrate';
import {timeout, extractOffset} from '../utils';
import queryString from 'query-string';

export default {
	components: {
		compHeader: () => import('../components/Header'),
		compPlaylistSaver: () => import('../components/PlaylistSaver'),
		compOverlay: () => import('../components/Overlay'),
		compError: () => import('../components/Error')
	},
	mixins: [setupIDB, integrate],
	metaInfo: {
		title: "Filtos | Home",
		meta: [
			{ name: 'description', content: 'Filter songs based on genre, energy, danceability, popularity, and more. Select songs to save to a playlist and enjoy.'}
		]
	},
  data() { 
    return {
			libLoaded: false,
			progress:0,
			tickLabels: ["Lowest", "Low", "Average", "High", "Highest"],
      genreFilters: [],
      bpmFilter: [0,0],
			energyFilter: [0,1],
			popularityFilter: [0,100],
			danceabilityFilter: [0,1],
			valenceFilter: [0,1],
      filteredData: [],
      maxBPM: 0,
      genres: [],
      disabled: true,
      headers: [
        { text: "Preview", align: "start", sortable: false, value: "preview"},
        { text: "Track", align: "start", sortable: true, value:"name" },
        { text: "Artist", sortable: true, value:"artist"},
        { text: "BPM", sortable: true, value:"bpm"},
				{ text: "Energy", sortable: true, value: "energy"},
				{ text: "Popularity", sortable: true, value: "popularity"},
				{ text: "Danceability", sortable: true, value: "danceability"},
				{ text: "Valence", sortable: true, value: "valence"}
      ],
      selected: [],
      singleSelect: false,
      search: "",
			rest: false,
			restProgress: 0,
			loadedTracks: 0,
			totalTracks: 0,
			profile: {},
			error: false,
			errorMessage: "",
			slideFacts: [
				"Techno helped unite east and west Germany",
				"Hip hop was founded in the South Bronx",
				"Radiohead was the first major band debuting a pay what you want method for an album release",
				"House music derives its name from the original club called warehouse",
				"Rappers Delight was the first hip hop song released on the radio",
				"Brian Eno was the founder of ambient music",
				"None of the Beatles could write or read music",
				"The most expensive musical instrument sold for $15.9 million",
				"A single violin is made from over 70 individual pieces of wood",
				"Prince Played 27 Instruments on His Debut Album",
				"Dogfish skin was often used in the 18th century to sand violins",
				"In 2016, Mozart sold more CDs than Beyoncé",
				"Finland has the most metal bands per capita",
				"'Jingle Bells' Was Originally a Thanksgiving Song",
				"There are more people in Monaco’s orchestra than in its army",
			],
			colors: [ "red", "purple", "green", "deep-purple", "indigo", "blue", "cyan", "lime", "yellow", "orange"]
    }
  },
  methods: {
		resize() {
			console.log(window.screen);
		},
		clearSelected() {
			this.selected = [];
		},
		deselect(event) {
			let s = [];
			for (let item of this.selected) {
				if (item.id !== event) {
					s.push(item);
				}
			}
			this.selected = s;
			//console.log(s);
		},
    preview(id, event) {
      //console.log(id, event);
      for (let i = 0; i < this.filteredData.length; i++) { 
        if (id === this.filteredData[i].id) this.filteredData[i].isPreview = true;
        else this.filteredData[i].isPreview = false;
      }
      //console.log(id);
      //console.log(this.selected);
      // //console.log(this.previewBools[id])
    },
    applyFilters() {
      this.disabled = true;

      let update = async () => {
        const db = await openDB("library-store", 3);
        let lib = await db.getAll("library");
				this.filteredData = [];
        for (let item of lib) {
					if (typeof item.features === "undefined") continue;
          if (
						this.genreChecker(item.genres, this.genreFilters) &&
						this.featureChecker(Math.round(item.features.tempo), this.bpmFilter) && this.featureChecker(item.features.energy, this.energyFilter) &&
						this.featureChecker(item.popularity, this.popularityFilter) &&
						this.featureChecker(item.features.danceability, this.danceabilityFilter) &&
						this.featureChecker(item.features.valence, this.valenceFilter)
						) {
						
						let artists = item.artists.reduce((str, artist)=> {return str += `${artist.name}, `}, "");
						artists = artists.substring(0, artists.length-2);

            this.filteredData.push({
                id: item.id, 
                name: item.name, 
                artist: artists,
								bpm: item.features.tempo, 
								energy: item.features.energy,
								popularity: item.popularity,
								danceability: item.features.danceability, 
								valence: item.features.valence,
                preview_url: item.preview_url,
                isPreview: false 
              })
          }  
        }
        
      }
      update().then(()=>{
				this.disabled = false;
			}).catch(e => {
				Bugsnag.notify(e);
				this.error = true;
				if (e.status === 429) {
					this.errorMessage = "Looks like we're busy right now, please try again later!"
				} else {
					this.errorMessage = "We're sorry but something went wrong. Please try again later"
				}
			})
    },
    featureChecker(a,filter) {
      return (a >= filter[0] && a <= filter[1]);
    },
    genreChecker(genres, genreFilters) {
      genres.sort();
			genreFilters.sort();

			if (!genreFilters.length) {
				return true;
			}

			let binarySearch = (b, a) => {
				let start=0, end=b.length-1;           
				// Iterate while start not meets end 
				while (start<=end){ 

					// Find the mid index 
					let mid=Math.floor((start + end)/2); 
					// If element is present at mid, return True 
					if (b[mid]===a) return true; 

					// Else look in left or right half accordingly 
					else if (b[mid] < a)  
						start = mid + 1; 
					else
						end = mid - 1; 
				} 
				return false; 
			}
      for (let item of genreFilters) {
				if (binarySearch(genres, item.toLowerCase())) {
					return true;
				}
      }
      return false
    }
	},
  watch: {
		selected(before, after) {
			let ids = [];
			for (let item of this.selected) {
				if (ids.length >= 100) break;
				ids.push(item);
			}

			localStorage.setItem("selected", JSON.stringify(ids));
			//console.log(this.selected);
		}
  },
  computed: {
  },
  beforeCreate() {

	},
	created() {
	},
  mounted() {
		/* 
		When this component is entered, we know a few things. 
		1. There are either queryParams in the url with two (code, state) and cookie may or may not exist
		2. There are no queryparams, but the session cookie is valid
		*/		
		console.log(this.$refs);
		window.addEventListener("resize", ()=> {
			if (window.screen.width < 650) {
				this.tickLabels = [];
			} else {
				this.tickLabels = ["Lowest", "Low", "Average", "High", "Highest"]
			}
		})
		if (window.screen.width < 650) {
			this.tickLabels = [];
		} else {
			this.tickLabels = ["Lowest", "Low", "Average", "High", "Highest"]
		}

	
		let setup = async () => {

			let cookies = document.cookie.split("; ");
      let parsedCookie = {};
      for (let i of cookies) {
        let index = i.indexOf('=');
        let name = i.substring(0,index);
        let value = i.substring(index+1, i.length);
        parsedCookie[name] = value;
      }
		
			// let hashParams = getHashParams();
			let queryParams = queryString.parse(location.search);

			// Check url for queryParams, if it exists, we will send it to backend in exchange for access_token 
			if (Object.keys(queryParams).length && !parsedCookie["_session"]) {
				//console.log("queryParams exist")

				// Open loading screen while data is being requested
				this.libLoaded = false;
				let interval = setInterval(()=>{
					this.progress++;
					if (this.progress >= 100) {
						clearInterval(interval)
						this.progress = 100;
					}
				}, 160)

				// let res = split1;
				// await timeout(15000);

				// We get data and profile from request, along with session cookie
				let res = await this.$http.get(`${process.env.VUE_APP_BACKEND_URL}/me?code=${queryParams.code}&state=${queryParams.state}`, {withCredentials: true});
				res = res.body;

				// Take profile data out from response
				let profile = res.profile;
				localStorage.setItem("profile", JSON.stringify(profile));
				for (let key in profile) {
					this.$set(this.profile, key, profile[key]);
				}

				// When data comes back, go to home, check to see if there are more songs to load
				// If no more songs to load, create indexDB and extract data

				// let data = {total: res.total, items: res.items};
				let data = res.data;

				if (!res.next) {
					let {genres, maxBPM} = await this.setupIDB(data);
					//console.log("No more songs to load next");
					this.genres = genres; 
					this.maxBPM = maxBPM;
					this.$set(this.bpmFilter, 1, maxBPM);
					this.disabled = false;
					this.rest = false;
					this.libLoaded = true;
				}	 
				// If there are more songs to load, render linear progress for songs and alert the user that the rest of their library will be loaded in the background
				else {
					//console.log("There's more data to get...");
					let next = res.next;
					this.libLoaded = true;
					let {genres, maxBPM} = await this.setupIDB(data);
					this.genres = genres; 
					this.maxBPM = maxBPM;
					this.$set(this.bpmFilter, 1, maxBPM);
					this.rest = true;
					this.totalTracks = data.total;
					this.loadedTracks = 2550;

					let tracksLeft = data.total - data.items.length;
					//console.log("These are the tracks left: ", tracksLeft);
					let waitTime = Math.ceil(tracksLeft / 2500) * 20 * 1000;
					let progressInterval = 100 / waitTime;

					this.restProgress = ((data.total - tracksLeft) / data.total) * 100;


					let interval = setInterval(()=>{
						this.restProgress += (progressInterval * 100);
						this.loadedTracks = Math.floor((this.restProgress/100) * this.totalTracks);
						if (this.loadedTracks >= this.totalTracks) this.loadedTracks = this.totalTracks;
						if (this.restProgress >= 100) {
							clearInterval(interval)
						}
					}, 100)


					// let splits = [split2, split3, split4, split5, split6];
					// Get data in while loop
					let counter = 0;
					while (next) {

						// let res = splits[counter];
						// let data = {total: res.total, items: res.items};
						let res = await this.$http.post(`${process.env.VUE_APP_BACKEND_URL}/next`,
						{next: next}, {withCredentials: true});
						res = res.body;
						let data = res.data;

						// Each time data comes back, integrate it with view and viewModel
						this.disabled = true;
						let {genres, maxBPM} = await this.integrate(data);
						this.genres.push(...genres);
						this.genres.sort();
						this.maxBPM = maxBPM;
						this.$set(this.bpmFilter, 1, maxBPM);
						this.disabled = false;
						next = res.next;
						counter++;
						if (!next) this.restProgress = 100;
						// await timeout(15000);
					}
					// After all data is done being integrated alert the user, and close linear progress
					this.restProgress = 100;
				}
			}
			// If there is session cookie
			else {
				this.rest = false;
				this.libLoaded = true;
				const db = await openDB("library-store", 3);
				// If db exists, extract data
				if (db.objectStoreNames.contains("library")) {
					this.libLoaded = true;
					// Load library from db and loop through data to set up maxBPM and genres
					let lib = await db.getAll("library");
					//console.log(lib.length);
					let max = 0
					let genreSet = new Set();
					for (let item of lib) {
						if (typeof item.features === "undefined") continue;
						if (item.features.tempo > max) {
							max = item.features.tempo; 
						}
						for (let genre of item.genres) {
							let g = genre.split("");
							g[0] = g[0].toUpperCase();
							g = g.join("");
							genreSet.add(g)
						}
					}
					let genres = [...genreSet.keys()];
					genres.sort();
					let maxBPM  = max;
					//console.log("library store is populated, no need to populate")
					this.genres = genres; 
					this.maxBPM = maxBPM;
					this.$set(this.bpmFilter, 1, maxBPM);
					this.disabled = false;
					
					let profile = JSON.parse(localStorage.getItem("profile"));
					this.profile = profile;
					let selected = JSON.parse(localStorage.getItem("selected"));
					this.selected = selected;
				}
				// Else, clear localStorage and push index.vue
				else {
					localStorage.clear();
					// TODO: Don't set cookie domain for dev env
					document.cookie=`_session=;max-age=0;domain=${process.env.VUE_APP_COOKIE_DOMAIN}`
					this.$router.push('/');
				}
			}
		}

		setup().then().catch(e => {
			Bugsnag.notify(e);
			this.error = true;
			if (e.status === 429) {
				this.errorMessage = "Looks like we're busy right now, please try again later!"
			} else {
				this.errorMessage = "We're sorry but something went wrong. Please try again later"
			}
		});

	},
	beforeUpdate() {

	}
}
</script>

<style scoped>
#root-container {
	height: 100%;
	font-family: 'Mulish', sans-serif;

}

#loader-container {
	height: 100%
}

#loader-row {
	height: 50%;
}

/* #main {
	width: 100%
} */

#main-container {
	width: 100%;
}

.pa-5.pa-sm-15.v-sheet {
	border-style: solid;
	border-width: 1px;
	border-color: #D376E3 !important;
}

</style>