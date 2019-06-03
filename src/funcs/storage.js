import { sleep } from "./misc";

// STORAGE KEY
const key = 'profiles';

// HANDLE LEGACY ITEMS & FILL HASHMAP
function check() {
   return new Promise((resolve, reject) => {

      // FETCH STORAGE & OBJECTIFY
      let storage = JSON.parse(localStorage.getItem(key));

      // LEGACY KEYS
      const legacy = ['vanilla-questing', 'horde', 'dev'];

      // REMOVE LEGACY KEYS IF THEY EXIST
      legacy.forEach(item => {
         if (localStorage.getItem(item) !== null) {
            localStorage.removeItem(item);
         }
      });

      // IF NO CURRENT STORAGE KEY EXISTS, CREATE IT
      if (localStorage.getItem(key) === null) {
         
         // OVERWRITE STORAGE VAR
         storage = { profiles: [] }

         // SET STORAGE
         localStorage.setItem(key, JSON.stringify(storage));
      
      // IF IT DOES, CHECK THAT ITS CORRECTLY WRITTEN
      } else { storage = convert(storage); }

      // FINALLY RESOLVE

      // GIVE THE PAGE A SECOND TO STABILIZE DIMENSIONS, THEN RESOLVE
      sleep(1000).then(() => {
         resolve(new Map(storage.profiles));
      });
   })
}

// FETCH HASHMAP OF PROFILES
function fetch() {
   const storage = JSON.parse(localStorage.getItem(key));
   return new Map(storage.profiles);
}

// UPDATE STORAGE
function update(hashmap) {
   const stringified = JSON.stringify({ 'profiles': Array.from(hashmap) });
   localStorage.setItem(key, stringified);
}

// CHANGE BLOCK NUM FOR LOADED PROFILE
function change(state, block) {
   if (state.loaded !== null) {

      // RECONSTRUCT DETAILS
      const details = {
         ...state.profiles.get(state.loaded),
         block: block
      }

      // OVERWRITE OLD VALUE & UPDATE STORAGE
      state.profiles.set(state.loaded, details);
      update(state.profiles);
   }
}

// CONVERT OLD STORAGE OBJECT
function convert(storage) {
   let update = false;

   storage.profiles.forEach(profile => {
      if (profile[1].icon !== undefined) {

         // TRANSFORM 'ICON' KEY TO 'RACE'
         profile[1].race = profile[1].icon;
         delete profile[1].icon;

         // MARK TO UPDATE STORAGE
         update = true;
      }
   });

   // UPDATE STORAGE IF NECESSARY
   if (update) {
      localStorage.setItem(key, JSON.stringify(storage));
   }

   return storage;
}

// EXPORT PROFILE OBJECT
function _export() {
   return localStorage.getItem(key);
}

export {
   check,
   fetch,
   update,
   change,
   _export
};