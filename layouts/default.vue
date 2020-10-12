<template>
  <v-app v-if="token">
    <v-app-bar app dark clipped-left color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-autocomplete
        style="margin-right: -5px; position: relative"
        v-model="select"
        :loading="loadingSearch"
        :items="items"
        :search-input.sync="search"
        item-value="id"
        item-text="name"
        return-object
        cache-items
        class="mx-4"
        flat
        prefix
        dense
        hide-no-data
        hide-details
        label="Buscar Estabelecimentos"
        solo-inverted
        prepend-inner-icon="mdi-magnify"
      >
      </v-autocomplete>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4">
      <LeftMenu v-if="!loading" />
    </v-navigation-drawer>

    <v-main>
      <div class="pa-2 bg-default grey lighten-4 fill-height">
        <Loading v-if="loading" />
        <nuxt v-else class="animate__animated animate__fadeIn" />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import api from "~/services/api.js";
import LeftMenu from "~/components/LeftMenu";
import Loading from "~/components/Loading";

export default {
  components: {
    LeftMenu,
    Loading,
  },
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    loadingSearch: false,
    items: [],
    query: {
      shop_name: "",
    },
    search: null,
    select: null,
    token: false,
    loading: true,
  }),
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
  mounted() {
    let token = localStorage.getItem("token", token);
    api.setAuthToken(token);
    this.token = true;
    token ? (this.loading = false) : this.$router.push("/login");
  },
  methods: {
    querySelections(v) {
      this.loadingSearch = true;
      this.query.shop_name = v;
      setTimeout(() => {
        api.post("/search_shop", this.query).then((res) => {
          this.items = res.data.shops;
        });
        this.loadingSearch = false;
      }, 1000);
    },
    navigate(id) {
      console.log(id);
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/override.scss";
</style>
