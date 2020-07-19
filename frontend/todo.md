# Todo
:heavy_check_mark: Fix preview button bug that only showed preview when clicking on side of button <br>
 :o: Create landing page <br>
  &emsp;&emsp; :o: Modify button media queries <br>
 :heavy_check_mark: Test conditional previewing of tracks <br>
 :o: Remove filtering bug that applies current filter and removes previously applied filters <br>
 :o: Use binary search to find tracks with matching genres from genreFilters <br>
 <!-- :o: Create load screen  -->




## Focuses
 :heavy_check_mark: Holding large user libraries in memory is not a good idea. Better to use an async data store so as not to block code. IndexedDB accomplises that

 :heavy_check_mark: Good idea to not render all filtered items at once so DOM does not get too big



# Changelog (YYYY-MM-DD)

## 2020-06-24
  - Refactored main functionality, now in home.vue
  - Scaffolded landing page (index.vue)
  - Wired landing page button to backend
  - <b style="color:#fc6569">Issues</b>
    - Button width on index.vue needs min-width for small width devices or resize entire button based on viewport


## 2020-06-23
 - Experimented with rendering items using `<v-data-table>` from Vuetify
 - Experimenting with preview urls within `<v-data-table>` for each track
 - Conditionally rendered preview tracks because of unmangeable load times
 - <b style="color:#fc6569">Issues</b>
    - Inconsistent read/write from indexedDB
    - Previewing audio with `<video>` sent all tags into infinite load loop


