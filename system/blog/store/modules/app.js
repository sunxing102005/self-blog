import Cookie from "js-cookie";
import { constRout } from "@/router";
const config = {
  state: {
    slug: ""
  },
  mutations: {
    setSlug(state, val) {
      state.slug = val;
    }
  }
};
export default config;
