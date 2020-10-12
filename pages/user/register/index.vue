<template>
  <div>
    <v-card class="elevation-12">
      <v-row>
        <v-col v-if="success">
          <div class="text-center">
            <v-icon x-large color="primary">mdi-account-check</v-icon>
          </div>
          <div class="text-center mt-5">Usuário cadastrado com sucesso!</div>
          <div class="text-center">
            <v-btn to="/login" color="primary" outlined class="mt-5">Fazer Login</v-btn>
          </div>
        </v-col>
        <v-col v-else>
          <div class="pa-2">
            <div class="text-center">
              <v-icon color="primary" x-large>mdi-account-plus</v-icon>
            </div>
            <v-text-field label="Nome" v-model="user.name" class="mx-2" />
            <v-text-field label="E-mail" v-model="user.email" class="mx-2" />
            <v-text-field label="Senha" type="password" v-model="user.password" class="mx-2" />
          </div>
          <div class="pa-2">
            <v-btn block color="primary" @click="postUser">Cadastrar</v-btn>
            <v-btn block color="primary" class="mt-3" outlined to="/login">Voltar ao Login</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <v-snackbar v-model="error">
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
      user: {
        name: "",
        email: "",
        password: "",
      },
      success: false,
      errorMsg: "",
      error: false,
    };
  },
  methods: {
    postUser() {
      api
        .post("/user", this.user)
        .then((res) => {
          this.success = true;
          console.log(res.data);
        })
        .catch((e) => {
          this.error = true;
          this.errorMsg = e.response.data.error;
          console.log(e.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>