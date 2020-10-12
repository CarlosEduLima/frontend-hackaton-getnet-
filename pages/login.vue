<template>
  <div>
    <v-card class="elevation-12">
      <div class="text-center pt-5">
        <v-icon color="primary" x-large>mdi-login</v-icon>
      </div>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="login.user_email"
            label="Nome de Usuário"
            @keyup.enter="postUser"
            name="login"
            append-icon="mdi-account"
            type="text"
          ></v-text-field>
          <v-text-field
            id="password"
            v-model="login.user_password"
            label="Senha"
            @keyup.enter="postUser"
            name="password"
            append-icon="mdi-lock"
            type="password"
          ></v-text-field>
          <small class="text-right">(Esqueci minha senha)</small>
        </v-form>
      </v-card-text>
      <div class="pa-2">
        <v-btn block color="primary" :loading="loading" @click="postUser">Login</v-btn>
        <v-btn to="/user/register" block outlined class="mt-2 mb-2" color="primary">Cadastre-se</v-btn>
      </div>
    </v-card>
    <v-snackbar class="animate__animated animate__shakeX" v-model="error">
      {{ errorMsg }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="error = false">Ok</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import api from "~/services/api.js";
export default {
  layout: "login",
  data() {
    return {
      login: {
        user_email: "",
        user_password: "",
      },
      errorMsg: "",
      error: false,
      loading: false,
    };
  },
  mounted() {
    let token = localStorage.getItem("token", token);
    token ? this.$router.push("/") : this.$router.push("/login");
  },
  methods: {
    postUser() {
      this.loading = true;
      api
        .post("/user/auth", this.login)
        .then((res) => {
          let token = res.data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("email", this.login.user_email);
          localStorage.setItem("id", res.data.user.id);
          api.setAuthToken(token);
          this.loading = false;
          this.$router.push("/");
        })
        .catch((e) => {        
            console.log(e);
            this.error = true;
            this.errorMsg = e.response.data.message;
            this.loading = false;          
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>