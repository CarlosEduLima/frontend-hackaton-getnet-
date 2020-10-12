<template>
  <div>
    <v-alert
      border="left"
      close-text="Close Alert"
      color="amber accent-4"
      dark
      dismissible
    >
      Atenção! Este carrinho é apenas uma lista elaborada para facilitar a
      organização das suas compras. O Preço Camarada não conclui nenhuma compra,
      apenas divulga as ofertas.
    </v-alert>
    <v-list subheader>
      <v-subheader>Itens do seu carrinho</v-subheader>

      <v-list-item v-for="(item, index) in posts" :key="index">
        <v-list-item-avatar>
          <v-img :src="item.imgs[0].image_url"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <a @click="$router.push(`/posts/${item.id}`)">
            <v-list-item-title v-text="item.name"></v-list-item-title
          ></a>
        </v-list-item-content>

        <div class="ml-1">R$ {{ item.price }}</div>

        <a class="ml-1" @click="deleteFromCart(item, index)">
          <v-icon color="primary">mdi-delete-circle</v-icon></a
        >
      </v-list-item>
    </v-list>
    <v-btn class="mt-2" disabled block>Total: R$ {{ totalPrice }}</v-btn>
    <v-btn class="mt-2" color="primary" to="/" block
      >Continuar comprando <v-icon class="ml-2">mdi-arrow-right</v-icon></v-btn
    >
  </div>
</template>

<script>
import api from "~/services/api.js";

export default {
  data() {
    return {
      posts: [],
      totalPrice: 0,
    };
  },
  methods: {
    deleteFromCart(item, index) {
      api.delete(`cart/${item.id}`).then((res) => {
        console.log(res.data);
        this.posts.splice(index, 1);
        this.totalPrice = this.totalPrice - item.price;
        total;
      });
    },
  },
  mounted() {
    let userId = localStorage.getItem("id");
    api.get(`/user/${userId}/cart`).then((res) => {
      this.posts = res.data.posts;
      console.log(res.data);
      this.posts.forEach((v) => {
        console.log("teucu", this.totalPrice);
        this.totalPrice = v.price + this.totalPrice;
      });
    });
  },
};
</script>

<style lang="scss" scoped>
</style>