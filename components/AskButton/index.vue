<template>
  <div style="width: 100%">
    <div v-if="spinned">
      <div class="text-center my-2">{{ alert }}</div>
      <v-btn @click="spinned = false" block outlined>Não, cancelar</v-btn>
      <v-btn
        @click="$emit('action')"
        block
        outlined
        color="primary"
        class="mt-2"
        >Sim (Cuidado!)</v-btn
      >
    </div>
    <v-btn v-else @click="spinned = true" block outlined color="danger">
      <v-icon class="mr-2">{{ icon }}</v-icon>
      {{ text }}
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return { spinned: false };
  },
  props: {
    text: {
      type: String,
    },
    icon: {
      type: String,
    },
    alert: {
      type: String,
    },
  },
  methods: {
    spin() {
      console.log("aaaa");
      this.spinned = !this.spinned;
    },
  },
};
</script>
