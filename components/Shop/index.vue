<template>
  <div>
    <v-card :loading="loading">
      <v-img
        v-if="shop.thumbnail_url == null"
        height="290"
        src="https://image.freepik.com/vetores-gratis/construcao-de-loja-vector-icon-ilustracao-edificio-e-marco-icone-conceito_138676-428.jpg"
      />
      <v-img v-else height="290" :src="shop.thumbnail_url" />
      <v-card-title>{{ shop.name }}</v-card-title>
      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            v-if="rates.avg"
            :value="rates.avg.ratingAverage"
            color="amber"
            background-color="amber lighten-3"
            dense
            readonly
            half-increments
            size="20"
            label="teste"
          />
          <small class="ml-2" style="margin-top: 2px" v-if="rates.avg">
            {{ rates.avg.ratingAverage.toFixed(2) }}
          </small>
          <div v-if="rates.users" class="grey--text ml-4">
            <v-icon>mdi-account</v-icon> {{ rates.users.numConsumers }}
          </div>
        </v-row>
        <v-btn
          v-if="!admin"
          color="primary"
          class="my-5"
          @click="ratingAsk = !ratingAsk"
          >Avaliar esta Loja
        </v-btn>

        <div class="mt-5 mb-2 text-left">
          <b>{{ shop.shop_category.name }}</b>
        </div>

        <div class="text-left">{{ shop.description }}</div>
      </v-card-text>
      <div v-if="!mini">
         <v-divider class="mx-4"></v-divider>

        <v-card-title>Contatos e redes sociais</v-card-title>

        <v-card-text>
          <div v-for="(contact, index) in shop.shop_contact" :key="index" class="text-left ml-1" >
            {{ contact.contact_name }}: {{ contact.value }}
          </div>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>

        <v-card-title>Horário de Funcionamento</v-card-title>

        <v-card-text>
          <div class="text-left ml-1">
            {{ shop.open_day }} a {{ shop.close_day }}
          </div>
          <v-chip-group
            v-model="selection"
            active-class="deep-purple accent-4 white--text"
            column
          >
            <v-chip>{{ shop.open_time }}</v-chip>
            <span class="mr-2 mt-2">às</span>
            <v-chip>{{ shop.close_time }}</v-chip>
          </v-chip-group>
        </v-card-text>
      </div>
      <v-card-actions>
        <v-btn
          :to="'/shop/posts/' + shop.id"
          v-if="admin"
          block
          outlined
          color="primary"
        >
          Anúncios da Loja
        </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn
          @click="addPhotoAsk = !addPhotoAsk"
          v-if="admin"
          block
          outlined
          color="primary"
        >
          Adicionar fotos na galeria
        </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn
          @click="contactAsk = !contactAsk"
          v-if="admin"
          block
          outlined
          color="primary"
        >
          Adicionar contatos
        </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn :to="'/shop/gallery/' + shop.id" block outlined color="primary">
          Galeria
        </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn @click="locAsk = !locAsk" block outlined color="primary">
          Localização
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="ratingAsk" max-width="300px" persistent>
      <template>
        <v-card class="elevation-16 mx-auto" width="300">
          <v-card-title class="headline"> Avalie esta loja </v-card-title>
          <v-card-text>
            Isso irá ajudar outros usuários a saberem mais sobre a qualidade
            desta loja.
            <div class="text-center mt-12">
              <v-rating
                v-model="rated.rate"
                color="yellow darken-3"
                background-color="grey darken-1"
                empty-icon="$ratingFull"
                half-increments
                hover
              ></v-rating>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-space-between">
            <v-btn @click="ratingAsk = false" text>Cancelar</v-btn>
            <v-btn @click="rating" color="primary" text> Avaliar! </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <v-dialog v-model="locAsk" max-width="300px" persistent>
      <template>
        <v-card class="elevation-16 mx-auto" width="300">
          <v-card-title class="headline"> Localização </v-card-title>
          <v-card-text>
            <div class="text-center mt-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5112.928951141477!2d-47.92064130983033!3d-16.252855934441545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93599717a87c4223%3A0xaa78353f16785fab!2sSUPER%20BAR%C3%83O%20-%20LUZIANIA%20-%2019%C2%AA%20LOJA!5e0!3m2!1spt-BR!2sbr!4v1600978325113!5m2!1spt-BR!2sbr"
                width="250"
                height="250"
                frameborder="0"
                style="border: 0"
                allowfullscreen=""
                aria-hidden="false"
                tabindex="0"
              ></iframe>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn @click="locAsk = false" text>Fechar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <v-dialog v-model="addPhotoAsk" max-width="300px" persistent>
      <template>
        <v-card class="elevation-16 mx-auto" width="300">
          <v-card-title class="headline"> Adicionar fotos </v-card-title>
          <v-card-text>
            Aumente o numero de cliente adicionando
            <div class="text-center mt-12">
              <v-file-input
                @change="onFileChanged"
                outlined
                show-size
                accept="image/*"
                v-model="selectedFile"
                label="Foto da oferta"
              ></v-file-input>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-space-between">
            <v-btn @click="addPhotoAsk = false" text>Cancelar</v-btn>
            <v-btn @click="submit" text>Cadastrar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <v-dialog v-model="contactAsk" max-width="300px" persistent>
      <template>
        <v-card class="elevation-16 mx-auto" width="300">
          <v-card-title class="headline"> Adicionar contatos </v-card-title>
          <v-card-text>
            Aumente o numero de cliente adicionando
            <div class="text-center mt-12">
              <v-select :items="items" label="Nome"  v-model="contact.contact_name"  class="mx-2" dense></v-select>
              <v-text-field
                label="Número, usuário..."
                v-model="contact.value"
                class="mx-2"
              ></v-text-field>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-space-between">
            <v-btn @click="contactAsk = false" text>Cancelar</v-btn>
            <v-btn @click="submitContact" text>Cadastrar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <v-snackbar class="animate__animated animate__shakeX" v-model="snack">
      {{ msg }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snack = false">Ok</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import api from "~/services/api.js";
export default {
  props: {
    shop: {
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
    rates: "",
    selection: 1,
    rated: {
      rate: "",
    },
    contact: {
      contact_name: "",
      value: "",
    },
    items: ["Telefone", "WhatsApp", "Instagram", "Facebook"],
    ratingAsk: false,
    contactAsk: false,
    addPhotoAsk: false,
    selectedFile: null,
    filename: "",
    locAsk: false,
    msg: "",
    snack: false,
  }),
  mounted() {
    api
      .get("/shop/" + this.shop.id + "/rate")
      .then((res) => {
        this.rates = res.data.query;
        this.rates.avg.ratingAverage == null
          ? (this.rates.avg.ratingAverage = 0)
          : "";
      })
      .catch((e) => {
        this.error = true;
        this.errorMsg = e.response.data.message;
        this.loading = false;
        console.log(e.response.data);
      });
  },

  methods: {
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
    onFileChanged() {
      console.log(this.selectedFile);
      this.filename = this.selectedFile;
    },
    submit() {
      const formData = new FormData();
      formData.append("filename", this.filename);
      api
        .post(`/shop/${this.shop.id}/photo`, formData)
        .then((res) => {
          console.log(res.data);
          this.success = true;
          this.msg = "Foto adicionada com sucesso! Aguarde...";
          setTimeout(() => {
            this.$router.push("/shop/gallery/" + this.shop.id);
          }, 3500);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    submitContact() {
      api
        .post(`/shop/${this.shop.id}/contact`, this.contact)
        .then((res) => {
          console.log(res.data);
          this.contactAsk = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    rating() {
      let userId = localStorage.getItem("id");
      console.log(this.rated.rate);
      console.log(userId);
      console.log(this.shop.id);
      api
        .post(`/user/${userId}/shop/${this.shop.id}/`, this.rated)
        .then((res) => {
          this.success = true;
          console.log(res.data);
          api
            .get("/shop/" + this.shop.id + "/rate")
            .then((res) => {
              this.rates = res.data.query;
              this.rates.avg.ratingAverage == null
                ? (this.rates.avg.ratingAverage = 0)
                : "";
            })
            .catch((e) => {
              console.log(e.response.data);
            });
          this.ratingAsk = false;
        })
        .catch((e) => {
          this.snack = true;
          this.msg = e.response.data.msg;
          this.ratingAsk = false;
          console.log(e.response);
        });
    },
  },
};
</script>