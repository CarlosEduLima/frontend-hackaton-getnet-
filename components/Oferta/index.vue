<template>
  <div>
    <v-card style="max-width: 700px; margin-left: auto; margin-right: auto;">
      <v-img
        :src="card.imgs[0].image_url"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="320px"
      >
        <v-card-title
          class="text-shadow"
          v-text="`R$ ${card.price}`"
        ></v-card-title>
      </v-img>
      <v-card-subtitle
        >{{ card.name }} - <small>{{ card.brand }}</small></v-card-subtitle
      >
      <v-card-subtitle style="margin-top: -30px; color: #111">{{
        card.location
      }}</v-card-subtitle>
      <v-card-actions>
        <v-btn :to="'/posts/' + card.id" color="secondary" outlined
          >Detalhes</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn @click="like" icon>
          <v-icon v-if="liked" color="pink darken-1">mdi-heart</v-icon>
          <v-icon v-else color="pink darken-1">mdi-heart-outline</v-icon>
          <span v-if="card.post_likes.length > 0" class="subheading">{{
            countLike
          }}</span>
        </v-btn>

        <v-btn @click="addToCart" icon>
          <v-icon>mdi-cart-outline</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import api from "~/services/api.js";
export default {
  data() {
    return {
      liked: false,
      userId: "",
      countLike: "",
    };
  },
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  mounted() {

    let userId = localStorage.getItem("id");
    this.userId = userId;
    let filter = this.card.post_likes.filter((like) => like.user_id == userId);
    this.countLike = this.card.post_likes.length;
    console.log("like", filter);
    if (filter.length > 0) {
      this.liked = true;
    }
  },
  methods: {
    addToCart() {
      api.post(`/cart/post/${this.card.id}/user/${this.userId}`).then((res) => {
        console.log(res.data);
        this.$router.push("/cart");
      });
    },
    like() {
      let userId = localStorage.getItem("id");
      api.post(`/like/post/${this.card.id}/user/${userId}`).then((res) => {
        console.log('likes', res.data);
        this.liked = !this.liked;
        this.countLike = res.data.count.numLikes.numLikes;
        //this.$emit("liked");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>