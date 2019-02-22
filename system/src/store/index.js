import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app.js";
import permission from "./modules/premission.js";
import user from "./modules/user.js";
import table from "./modules/table.js";
import getters from "./getters.js";
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    app,
    user,
    table,
    permission
  },
  getters
});
export default store;
//  function createStore() {
//   return store;
// }
