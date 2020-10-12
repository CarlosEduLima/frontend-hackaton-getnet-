<template>
  <div>
    <div v-if="loading" style="color: #ccc" class="pa-5">
      Carregando seus dados...
    </div>
    <v-list v-else>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://imgur.com/jdoS5xY.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item>
      <v-list shaped style="padding-top: 0px; padding-bottom: 0px">
        <v-list-group no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{
                name.split(/(\s).+\s/).join("")
              }}</v-list-item-title>
              <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
            </v-list-item-content>
          </template>
          <v-list-item
            style="padding-left: 15px"
            link
            prepend-icon="mdi-account"
            :to="'/user/account/' + id"
          >
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Conta</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            style="padding-left: 15px"
            link
            prepend-icon="mdi-account"
            @click="logOffAsk = !logOffAsk"
          >
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Encerrar sessão</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <hr class="dashed mt-2 mb-2" />
    </v-list>
    <v-list shaped style="padding-top: 0px" dense class="grey lighten-4">
      <template v-for="(item, i) in items">
        <v-row v-if="item.heading" :key="i" align="center">
          <v-col cols="6">
            <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
          </v-col>
          <v-col cols="6" class="text-right">
            <v-btn small text>edit</v-btn>
          </v-col>
        </v-row>
        <v-divider
          v-else-if="item.divider"
          :key="i"
          dark
          class="my-4"
        ></v-divider>
        <v-list-item class="mb-2" :to="item.link" v-else :key="i" link>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">{{
              item.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <v-dialog v-model="logOffAsk" max-width="300px" persistent>
      <v-card class="pa-5 float-center mx-auto">
        <div class="text-center mb-2">
          <h3 class="mb-3">Sair</h3>
          <h3 class="subtitle-1 my-5">Deseja encerrar sua sessão?</h3>
          <v-btn @click="logOff" block color="primary">Sim, quero sair</v-btn>
          <v-btn
            @click="logOffAsk = false"
            block
            outlined
            class="mt-2"
            color="primary"
            >Não, desejo continuar</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import api from "~/services/api.js";
import Loading from "~/components/Loading";

export default {
  components: {
    Loading,
  },
  data() {
    return {
      items: [
        { icon: "mdi-view-dashboard", text: "Feed de Ofertas", link: "/" },
        {
          icon: "mdi-cart",
          text: " Meu Carrinho",
          link: "/cart",
        },
        {
          icon: "mdi-home-plus-outline",
          text: " Cadastrar Loja",
          link: "/shop/register",
        },
        {
          icon: "mdi-alert-octagram",
          text: "Anunciar",
          link: "/posts/create",
        },
        { icon: "mdi-store", text: "Minhas Lojas", link: "/user/shops" },
      ],
      logOffAsk: false,
      id: "",
      name: "",
      email: "",
      loading: true,
    };
  },

  mounted() {
    var userId = localStorage.getItem("id");
    userId
      ? api
          .get("/user/" + userId)
          .then((res) => {
            this.id = res.data.user.id;
            this.name = res.data.user.name;
            this.email = res.data.user.email;
            console.log("ue", res.data);
            this.loading = false;
          })
          .catch((e) => {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("id");
            this.$router.push("/login");
          })
      : "";
  },

  methods: {
    logOff() {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("id");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.theme--light.v-icon {
  color: #015f75 !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
</style>