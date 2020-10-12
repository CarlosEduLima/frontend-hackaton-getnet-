<template>
  <div>
    <Header title="Feed de Ofertas" icon="mdi-view-dashboard"></Header>
    <v-row dense>
    
        <v-col v-for="(card, index) in posts" :key="index" md="12">
          <Oferta :card="card" />
        </v-col>
      
    </v-row>
    <!--<v-card v-intersect="infiniteScrolling"></v-card>-->
  </div>
</template>

<script>
import api from "~/services/api.js";
import Oferta from "~/components/Oferta";
import Header from "~/components/Header";

export default {
  components: {
    Oferta,
    Header,
  },
  data() {
    return {
      posts: [],
      //page: "",
    };
  },
  methods: {
    /*reloadPosts() {
      console.log("chama");
      api.get("/posts").then((res) => {
        this.posts = res.data.posts;
        //this.page = res.data.items.currentPage;
        console.log(res.data);
      });
    },
   infiniteScrolling(entries, observer, isIntersecting) {
      console.log("fuiChamada");
      setTimeout(() => {
        this.page++;
        console.log("pagina:" + this.page);
        api
          .get(`/posts?page=${this.page}&size=5`)
          .then((res) => {
            if (res.data.items.posts.length > 1) {
              res.data.items.posts.forEach((post) => this.posts.push(post));
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 500);
    },*/
  },

  mounted() {
    api.get("/posts").then((res) => {
      this.posts = res.data.posts;
      //this.page = res.data.items.currentPage;
      console.log(res.data);
    });
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
