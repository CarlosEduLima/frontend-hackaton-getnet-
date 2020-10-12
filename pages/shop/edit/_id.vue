<template>
  <div>
    <Loading v-if="loading" />
    <div v-else>
      <Header title="Editar Loja" icon="mdi-card-plus"></Header>
      <div class="text-center">
        <v-icon
          v-if="!success"
          style="font-size: 150px"
          class="text-shadow"
          color="primary"
          >mdi-store</v-icon
        >
      </div>

      <v-card v-if="success" class="text-center pa-2">
        <v-icon style="font-size: 150px" color="success"
          >mdi-check-circle-outline</v-icon
        >
        <h1>Pronto!</h1>
        <p>Sua loja foi atualizada com sucesso.</p>
        <v-btn block outlined color="primary" to="/" class="mt-3"
          >Voltar à página inicial</v-btn
        >
        <v-btn block color="primary" to="/user/shops" class="mt-3"
          >Minhas Lojas</v-btn
        >
      </v-card>

      <v-card v-else-if="deleted" class="text-center pa-2">
        <v-icon style="font-size: 150px" color="danger"
          >mdi-check-circle-outline</v-icon
        >
        <h1>Pronto!</h1>
        <p>Sua loja foi excluída com sucesso.</p>
        <v-btn block outlined color="primary" to="/" class="mt-3"
          >Voltar à página inicial</v-btn
        >
        <v-btn block color="primary" to="/user/shops" class="mt-3"
          >Minhas Lojas</v-btn
        >
      </v-card>

      <v-card v-else class="pa-2 text-center">
        <v-text-field label="Nome da loja *" v-model="shop.name" class="mx-2" />
        <v-text-field
          label="Nome do responsável"
          v-model="shop.owner_name"
          class="mx-2"
        />
        <v-text-field label="CNPJ" v-model="shop.cnpj" class="mx-2" />
        <v-select
          label="Categoria *"
          :items="categories"
          item-text="name"
          item-value="id"
          v-model="shop.category_id"
          class="mx-2"
        />
        <v-textarea class="mx-2" label="Descrição" v-model="shop.description" />
        <hr class="dashed" style="margin: 50px 0px" />
        <h3 class="text-center mt-5 mb-5">Contato e Localização</h3>
        <v-text-field
          @keyup="getCep"
          :append-icon="cepIcon"
          :loading="loadingCep"
          label="CEP"
          v-model="shop.cep"
          class="mx-2"
        ></v-text-field>
        <v-select
          label="Estado"
          :disabled="disabledByCep"
          item-text="uf"
          :items="states"
          v-model="shop.state"
          class="mx-2"
        />
        <v-text-field
          label="Cidade"
          :disabled="disabledByCep"
          v-model="shop.city"
          class="mx-2"
        ></v-text-field>
        <v-text-field
          label="Bairro"
          :disabled="disabledByCep"
          v-model="shop.district"
          class="mx-2"
        ></v-text-field>
        <v-text-field
          label="Endereço"
          v-model="shop.address"
          class="mx-2"
        ></v-text-field>
        <hr class="dashed" style="margin: 50px 0px" />
        <h3 class="text-center mt-5">Horário de Funcionamento</h3>
        <v-select
          label="De"
          :items="days"
          v-model="shop.open_day"
          class="mx-2"
        />
        <v-select
          label="À"
          :items="days"
          v-model="shop.close_day"
          class="mx-2"
        />
        <v-dialog
          ref="dialog1"
          v-model="modal1"
          :return-value.sync="shop.open_time"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="shop.open_time"
              class="px-2"
              label="Abertura"
              prepend-icon="mdi-clock-outline"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker v-if="modal1" v-model="shop.open_time" full-width>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal1 = false">Cancel</v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.dialog1.save(shop.open_time)"
              >OK</v-btn
            >
          </v-time-picker>
        </v-dialog>
        <v-dialog
          ref="dialog"
          v-model="modal2"
          :return-value.sync="shop.close_time"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="shop.close_time"
              class="px-2"
              label="Fechamento"
              prepend-icon="mdi-clock"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker v-if="modal2" v-model="shop.close_time" full-width>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.dialog.save(shop.close_time)"
              >OK</v-btn
            >
          </v-time-picker>
        </v-dialog>
        <v-btn block color="primary" @click="postEstablishment"
          ><v-icon class="mr-2 ">mdi-reload</v-icon> Atualizar</v-btn
        >
       
        <AskButton
          @action="deleteEstablishment"
          :alert="'Deseja mesmo excluir esta loja?'"
          text="Excluir Loja"
          class="mt-2"
          icon="mdi-delete"
        />
      </v-card>
      <v-snackbar class="animate__animated animate__shakeX" v-model="error">
        {{ errorMsg }}
        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="error = false"
            >Ok</v-btn
          >
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import Loading from "~/components/Loading";
import Header from "~/components/Header";
import api from "~/services/api.js";
import AskButton from "~/components/AskButton";

export default {
  components: {
    Header,
    Loading,
  },
  data() {
    return {
      shop: {
        name: "Hellraiser .LTDA",
        owner_name: "",
        cnpj: "4353453453445",
        category_id: "",
        open_time: "",
        close_time: "",
        open_day: "",
        close_day: "",
        description: "",
        address: "",
        city: "",
        state: "",
        cep: "",
        district: "",
      },
      success: false,
      deleted: false,
      modal1: false,
      modal2: false,
      error: false,
      loadingPost: false,
      loading: false,
      errorMsg: "",
      categories: [],
      loadingCep: false,
      disabledByCep: false,
      cepIcon: "",
      states: [
        { uf: "AC", name: "Acre" },
        { uf: "AL", name: "Alagoas" },
        { uf: "AP", name: "Amapá" },
        { uf: "AM", name: "Amazonas" },
        { uf: "BA", name: "Bahia" },
        { uf: "CE", name: "Ceará" },
        { uf: "DF", name: "Distrito Federal" },
        { uf: "ES", name: "Espirito Santo" },
        { uf: "GO", name: "Goiás" },
        { uf: "MA", name: "Maranhão" },
        { uf: "MS", name: "Mato Grosso do Sul" },
        { uf: "MT", name: "Mato Grosso" },
        { uf: "MG", name: "Minas Gerais" },
        { uf: "PA", name: "Pará" },
        { uf: "PB", name: "Paraíba" },
        { uf: "PR", name: "Paraná" },
        { uf: "PE", name: "Pernambuco" },
        { uf: "PI", name: "Piauí" },
        { uf: "RJ", name: "Rio de Janeiro" },
        { uf: "RN", name: "Rio Grande do Norte" },
        { uf: "RS", name: "Rio Grande do Sul" },
        { uf: "RO", name: "Rondônia" },
        { uf: "RR", name: "Roraima" },
        { uf: "SC", name: "Santa Catarina" },
        { uf: "SP", name: "São Paulo" },
        { uf: "SE", name: "Sergipe" },
        { uf: "TO", name: "Tocantins" },
      ],
      days: [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
      ],
    };
  },
  mounted() {
    this.loading = true;

    let userId = localStorage.getItem("id");
    this.id = userId;
    userId
      ? api.get("/user/" + userId).then((res) => {
          this.shop.owner_name = res.data.user.name;
        })
      : "";

    api.get("/categories").then((res) => {
      this.categories = res.data.categories;
      console.log("cat", res.data);
      this.categories.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
      this.loading = false;
    });

    api.get("/shops/" + this.$route.params.id).then((res) => {
      console.log("deu", res.data);
      this.shop = res.data;
    });
  },
  methods: {
    postEstablishment() {
      this.loadingPost = true;
      this.shop.cnpj.replace("/", "").replace(".", "");
      api
        .put("/shop/" + this.$route.params.id + "/user/" + this.id, this.shop)
        .then((res) => {
          this.success = true;
          this.loadingPost = false;
          console.log(res.data);
        })
        .catch((e) => {
          this.error = true;
          this.errorMsg = e.response.data.error;
          this.loadingPost = false;
        });
    },
    deleteEstablishment() {
      this.loadingPost = true;
      api
        .delete("/shop/" + this.$route.params.id + "/user/" + this.id)
        .then((res) => {
          this.deleted = true;
          this.loadingPost = false;
          console.log(res.data);
        })
        .catch((e) => console.log(e));
    },
    getCep() {
      this.loadingCep = true;
      if (this.shop.cep.length > 7) {
        this.$axios
          .get(
            `https://viacep.com.br/ws/${this.shop.cep
              .replace("-", "")
              .replace(".", "")}/json/`
          )
          .then((res) => {
            console.log(res.data);
            this.shop.city = res.data.localidade;
            this.shop.district = res.data.bairro;
            this.shop.state = res.data.uf;
            this.shop.address = res.data.logradouro;
            this.loadingCep = false;
            this.disabledByCep = true;
            this.cepIcon = "mdi-check";
          })
          .catch((e) => {
            this.loadingCep = false;
            this.cepIcon = "mdi-close";
            this.disabledByCep = false;
          });
      } else {
        this.loadingCep = false;
        this.cepIcon = "mdi-close";
        this.disabledByCep = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>