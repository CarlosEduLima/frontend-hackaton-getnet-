<template>
  <div>
    <Loading v-if="loading" />
    <div v-else>
      <v-card class="pa-5" v-if="error">{{errorMsg}}</v-card>
      <div v-else>
        <Header title="Minhas Lojas" icon="mdi-store"></Header>
        <div class="text-center pa-2">
          <v-row class="d-flex justify-center" dense>
            <v-col v-for="(shop, index) in shops" :key="index" md="4">
              <v-btn
                :to="'/shop/edit/' + shop.id"
                style="border-radius: 100px; z-index: 1;"
                color="primary"
                large
                class="mt-2 elevation-12"
              >
                <v-icon class="mr-3">mdi-pencil</v-icon>Editar Informações
              </v-btn>
              <Shop :admin="true" :shop="shop" style="margin-top: -22px;" />
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
      loading: true,
      error: false,
    };
  },
  mounted() {
    let userId = localStorage.getItem("id");
    api
      .get("/user/" + userId + "/shops")
      .then((res) => {
        console.log(res.data)
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