import { openDB, deleteDB, wrap, unwrap } from 'idb';

export default {
  methods: {
    async integrate(res) {
      // OpenDB
      const db = await openDB("library-store", 3);
      const tx = db.transaction("library", "readwrite");
      const store = tx.objectStore("library");
      let i = 0;
      let parr = [];
      for (let item of res.items) {
        parr.push(store.add(item));
        i++;
      }
      await Promise.all([parr]);
      //console.log("Added: ", i);
      await tx.done;
      
      let lib = await db.getAll("library");
      //console.log("Total: ", lib.length);
      let max = 0
      let genreSet = new Set();
      for (let item of lib) {
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
      //console.log("integrating more data in indexeddb...")
      return {genres, maxBPM}

    }
  }
}