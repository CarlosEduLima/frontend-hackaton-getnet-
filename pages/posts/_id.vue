<template>
  <div>
    <v-card :loading="loading" class="mx-auto" max-width="374">
      <v-img v-if="!loading" height="250" :src="post.imgs[0].image_url"></v-img>

      <v-card-title>{{ post.name }}</v-card-title>

      <v-card-text>
        <div class="my-4 subtitle-1">
          {{ post.type }}
        </div>

        <div>{{ post.description }}</div>
      </v-card-text>
      <div class="mx-3">
        <v-btn
          v-if="post != ''"
          :to="`/shop/profile/${post.shop_id}`"          
          block
          color="secondary"
          small
          >{{ post.shop_name.name }}</v-btn
        >
      </div>

      <v-divider class="mx-4"></v-divider>

      <v-card-title v-if="post !== ''"
        ><v-icon color="pink darken-1" class="mr-2">mdi-heart</v-icon
        >{{ post.post_likes.length }}</v-card-title
      >

      <v-card-text>
        <v-btn block @click="addToCart(post.id)" outlined color="success"
          ><v-icon class="mr-2">mdi-cart-outline</v-icon> R$
          {{ post.price }}</v-btn
        >
      </v-card-text>

      <v-card-actions>
        <AskButton
          v-if="admin"
          @action="deletePost"
          :alert="'Deseja mesmo excluir esta oferta?'"
          text="Excluir Oferta"
          icon="mdi-delete"
        />
      </v-card-actions>
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
import AskButton from "~/components/AskButton";
export default {
  components: {
    AskButton,
  },
  data() {
    return {
      post: "",
      loading: true,
      admin: false,
      success: false,
      msg: "",
    };
  },
  methods: {
    deletePost() {
      api.delete("/post/" + this.$route.params.id).then((res) => {
        this.success = true;
        this.msg = "Produto excluído com sucesso! Aguarde...";
        setTimeout(() => {
          this.$router.push("/posts/" + res.data.post.id);
        }, 3500);
        console.log(res.data);
      });
    },
    addToCart(id) {
      let userId = localStorage.getItem("id");
      api.post(`/cart/post/${id}/user/${userId}`).then((res) => {
        console.log(res.data);
        this.$router.push("/cart");
      });
    },
  },
  mounted() {
    let userId = localStorage.getItem("id");
    api.get("/posts/post/" + this.$route.params.id).then((res) => {
      console.log(res.data);
      this.post = res.data.post;
      this.loading = false;
      res.data.user == userId ? (this.admin = true) : (this.admin = false);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>