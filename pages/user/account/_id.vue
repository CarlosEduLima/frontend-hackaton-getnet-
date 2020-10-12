<template>
  <div>
    <v-row class="d-flex justify-center" dense>
      <v-col md="4">
        <User v-if="user != ''" :user="user" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Loading from "~/components/Loading";
import Header from "~/components/Header";
import User from "~/components/User";
import api from "~/services/api.js";

export default {
  components: {
    Loading,
    User,
  },
  data() {
    return {
      user: "",
      loading: true,
      error: false,
    };
  },
  mounted() {
    api
      .get("/user/" + this.$route.params.id)
      .then((res) => {
        this.user = res.data.user;
        this.loading = false;
        console.log("testtsts", res.data.user);
      })
      .catch((e) => {
        this.error = true;
        this.errorMsg = e.response.data.message;
        this.loading = false;
        console.log("testtsts" + e);
      });
  },
};
</script>

<style lang="scss" scoped>
</style>