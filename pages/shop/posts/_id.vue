<template>
  <div>
    <Header title="Anúncios da Loja" icon="mdi-view-dashboard"></Header>
    <v-row dense>
      <v-col v-for="(card, index) in posts" :key="index" md="4">
        <Oferta @liked="reloadPosts" :card="card" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import api from "~/services/api.js";
import Oferta from "~/components/Oferta";
export default {
  components: {
    Oferta,
  },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    reloadPosts() {
      console.log("chama");
      api.get("/posts").then((res) => {
        this.posts = res.data.posts;
        console.log(res.data);
      });
    },
  },
  mounted() {
    api.get("/shop/posts/" + this.$route.params.id).then((res) => {
      this.posts = res.data;
      console.log(res.data);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>