<template>
  <div>
    <Header title="Galeria" icon="mdi-image"/>
    <v-card class="text-center">      
      <Loading v-if="loading" />      
      <v-col v-for="(photo, index) in photos" :key="index" md="4">
        <v-img
          v-if="photo.image_url == null"
          height="290"
          src="https://image.freepik.com/vetores-gratis/construcao-de-loja-vector-icon-ilustracao-edificio-e-marco-icone-conceito_138676-428.jpg"
        />
        <v-img v-else height="290" :src="photo.image_url" />
      </v-col>
    </v-card>
  </div>
</template>

<script>
import Loading from "~/components/Loading";
import api from "~/services/api.js";
import Header from "~/components/Header";



export default {
  components: {
    Loading,
    Header
  },
  data() {
    return {
      photos: [],
      loading: true,
      error: false,
    };
  },
  mounted() {
    api
      .get("/shop/" + this.$route.params.id + "/photos")
      .then((res) => {
        this.photos = res.data.shopPhotos;
        this.loading = false;
        console.log('gallery', res.data);
      })
      .catch((e) => {
        this.error = true;
        this.errorMsg = e.response.data.message;
        this.loading = false;
        console.log("testtsts" + e.response.shopPhotos);
      });
  },
};
</script>

<style lang="scss" scoped>
</style>