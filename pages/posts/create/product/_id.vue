<template>
  <div>
    <Header title="Criar Oferta" icon="mdi-alert-octagram"></Header>
    <v-card class="pa-5">
      <h2 class="mt-2 mb-5 text-center">Nova oferta em {{ shop.name }}</h2>
      <v-text-field label="Título" v-model="offer.name" />
      <v-text-field label="Marca" v-model="offer.brand" />
      Preço:
      <currency-input
        class="priceInput ml-2 mb-5 mt-2"
        v-model="offer.price"
        currency="BRL"
        auto-decimal-mode
        locale="pt"
      />
      <!--<v-select :items="types" label="Tipo" v-model="offer.type" />-->
      <v-select
        label="Categoria"
        :items="categories"
        item-value="id"
        item-text="category_name"
        v-model="offer.category_id"
      />
      <v-textarea label="Descrição" v-model="offer.description" />
      <v-file-input
        @change="onFileChanged"
        outlined
        show-size
        accept="image/*"
        v-model="selectedFile"
        label="Imagem do serviço"
      ></v-file-input>
      <v-btn block color="primary" @click="submit">Anunciar</v-btn>
    </v-card>
    <v-snackbar class="animate__animated animate__shakeX" v-model="success">
      {{ msg }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="success = false"
          >Ok</v-btn
        >
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import api from "~/services/api.js";
import Loading from "~/components/Loading";
import Header from "~/components/Header";
import { CurrencyInput } from "vue-currency-input";

export default {
  components: { CurrencyInput },
  data() {
    return {
      offer: {
        name: "",
        brand: "",
        price: "",
        price_validity: 20200830,
        timetable: "",
        type: "Produto",
        category_id: 4,
        description: "",
        filename: "",
      },
      shop: "",
      categories: [],
      types: ["Produto", "Serviço", "Oferta"],
      selectedFile: null,
      msg: "",
      success: false,
    };
  },

  mounted() {
    api.get(`/shops/${this.$route.params.id}`).then((res) => {
      console.log(res.data);
      this.shop = res.data;
    });
    api.get("/post/categories").then((res) => {
      this.categories = res.data.categories;
    });
  },
  methods: {
    onFileChanged() {
      console.log(this.selectedFile);
      this.offer.filename = this.selectedFile;
    },
    submit() {
      const formData = new FormData();
      formData.append("filename", this.offer.filename);
      formData.append("brand", this.offer.brand);
      formData.append("name", this.offer.name);
      formData.append("category_id", this.offer.category_id);
      formData.append("description", this.offer.description);
      formData.append("type", this.offer.type);
      formData.append("price", this.offer.price);
      formData.append("price_validity", this.offer.price_validity);
      formData.append("timetable", this.offer.timetable);
      api
        .post(`/post/${this.$route.params.id}`, formData)
        .then((res) => {
          console.log(res.data);
          this.success = true;
          this.msg = "Produto cadastrado com sucesso! Aguarde...";
          setTimeout(() => {
            this.$router.push("/posts/" + res.data.post.id);
          }, 3500);
        })
        .catch((e) => {
          console.log(e)
          this.success = true;
          this.msg = "Produto cadastrado com sucesso! Aguarde...";
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>