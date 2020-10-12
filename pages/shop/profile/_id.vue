<template>
  <div>
    <v-row class="d-flex justify-center" dense>
      <v-col md="4">
        <Shop v-if="shop != ''" :shop="shop" />
      </v-col>
    </v-row>
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
      shop: "",
      loading: true,
      error: false,
    };
  },
  mounted() {
    api
      .get("/shops/" + this.$route.params.id)
      .then((res) => {
        this.shop = res.data.shop;
        this.loading = false;
        console.log("testtsts", res.data);
      })
      .catch((e) => {
        this.error = true;
        this.errorMsg = e.response.data.message;
        this.loading = false;
        console.log("testtsts" + e.response.shop);
      });
  },
};
</script>

<style lang="scss" scoped>
</style>