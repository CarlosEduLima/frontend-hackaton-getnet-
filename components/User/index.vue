<template>
  <div>
    <v-card :loading="loading">
      <v-card-title>{{ user.name }}</v-card-title>
      <v-card-text>{{ user.email }}</v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-actions>
        <v-btn block outlined color="primary"> Atualizar dados </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn
          @click="deleteAccountAsk = !deleteAccountAsk"
          block
          outlined
          color="primary"
        >
          Excluir conta
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="deleteAccountAsk" max-width="300px" persistent>
      <template>
        <v-card class="elevation-16 mx-auto" width="300">
          <v-card-title class="headline"> Excluir conta </v-card-title>
          <v-card-text>
            Ao exluir sua conta seus estabelecimentos e ofertas também serão
            exluídos
            <div class="text-center mt-12">
              <v-form>
                <v-text-field
                  id="password"
                  v-model="password.user_password"
                  label="Senha"
                  name="password"
                  append-icon="mdi-lock"
                  type="password"
                ></v-text-field>
              </v-form>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-space-between">
            <v-btn @click="deleteAccountAsk = false" text>Cancelar</v-btn>
            <v-btn @click="submit" text>Excluir</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>
<script>
import api from "~/services/api.js";
export default {
  props: {
    user: {
      type: Object,
    },
    mini: {
      type: Boolean,
    },
    admin: {
      type: Boolean,
    },
  },
  data: () => ({
    loading: false,
    deleteAccountAsk: false,
    password:{
        user_password: ''
    },
  }),
  methods: {
    submit() {
      api
        .delete(`/user/${this.user.id}`, this.password)
        .then((res) => {
          console.log(res.data);
          this.$router.push("/login");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>