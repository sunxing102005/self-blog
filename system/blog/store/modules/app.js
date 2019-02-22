import Cookie from "js-cookie";
import { constRout } from "@/router";
import { getList } from "../../api/content";
const config = {
  state: {
    slug: "",
    articles: { list: [], total: 0, currPage: 1 }
  },
  mutations: {
    setSlug(state, val) {
      state.slug = val;
    },
    setArticles(state, val) {
      // console.log("articles", val);
      state.articles = val;
    }
  },
  actions: {
    fetchArticles({ commit }) {
      return getList().then(res => {
        const articles = {
          list: res.data.content.data,
          total: res.data.content.totalPages,
          currPage: res.data.content.currentPage
        };
        commit("setArticles", articles);
      });
    }
  }
};
export default config;
