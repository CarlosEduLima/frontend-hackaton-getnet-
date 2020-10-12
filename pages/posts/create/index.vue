<template>
  <div>
    <Loading v-if="loading" />
    <div v-else>
      <v-card class="pa-5" v-if="error">{{ errorMsg }}</v-card>
      <div class="text-center" v-else>
        <h2 class="mt-5 subtitle">
          Escolha a loja em que deseja cadastrar a sua oferta
        </h2>
        <div class="text-center pa-2">
          <v-row class="d-flex justify-center" dense>
            <v-col v-for="(shop, index) in shops" :key="index" md="4">
              <template>
                <div>
                  <v-img
                    v-if="shop.thumbnail_url == null"
                    height="290"
                    src="https://image.freepik.com/vetores-gratis/construcao-de-loja-vector-icon-ilustracao-edificio-e-marco-icone-conceito_138676-428.jpg"
                  />
                  <v-img v-else height="290" :src="shop.thumbnail_url" />
                  <v-card>
                    <v-card-title>
                      {{ shop.name }}
                    </v-card-title>
                    <div class="pa-2">
                      <v-btn
                        :to="'/posts/create/product/' + shop.id"
                        color="primary"
                        block
                        class="mt-2 elevation-6"
                      >
                        Anunciar Produto
                      </v-btn>

                      <v-btn
                        :to="'/posts/create/service/' + shop.id"
                        color="primary"
                        block
                        class="mt-2 elevation-6"
                      >
                        Anunciar Serviço
                      </v-btn>
                    </div>
                  </v-card>
                </div>
              </template>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "~/components/Loading";
import Header from "~/components/Header";
import Shop from "~/components/Shop";
import api from "~/services/api.js";

export default {
  components: {
    Loading,
    Shop,
  },
  data() {
    return {
      shops: [],
      items: ["Produto", "Serviço"],
      loading: true,
      error: false,
    };
  },
  mounted() {
    let userId = localStorage.getItem("id");
    api
      .get("/user/" + userId + "/shops")
      .then((res) => {
        this.shops = res.data.shops;
        this.loading = false;
      })
      .catch((e) => {
        this.error = true;
        this.errorMsg = e.response.data.message;
        this.loading = false;
        console.log(e.response.data);
      });
  },
};
</script>

<style lang="scss" scoped>
</style>