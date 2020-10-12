<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
           <nuxt/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  }
};
</script>

<style>
.v-application--wrap {
  background-image: radial-gradient(
      circle at 52% 37%,
      hsla(165, 0%, 91%, 0.05) 0%,
      hsla(165, 0%, 91%, 0.05) 15%,
      transparent 15%,
      transparent 65%,
      transparent 65%,
      transparent 100%
    ),
    radial-gradient(
      circle at 70% 3%,
      hsla(165, 0%, 91%, 0.05) 0%,
      hsla(165, 0%, 91%, 0.05) 33%,
      transparent 33%,
      transparent 62%,
      transparent 62%,
      transparent 100%
    ),
    radial-gradient(
      circle at 38% 28%,
      hsla(165, 0%, 91%, 0.05) 0%,
      hsla(165, 0%, 91%, 0.05) 15%,
      transparent 15%,
      transparent 94%,
      transparent 94%,
      transparent 100%
    ),
    radial-gradient(
      circle at 12% 92%,
      hsla(165, 0%, 91%, 0.05) 0%,
      hsla(165, 0%, 91%, 0.05) 1%,
      transparent 1%,
      transparent 19%,
      transparent 19%,
      transparent 100%
    ),
    radial-gradient(
      circle at 50% 84%,
      hsla(165, 0%, 91%, 0.05) 0%,
      hsla(165, 0%, 91%, 0.05) 28%,
      transparent 28%,
      transparent 96%,
      transparent 96%,
      transparent 100%
    ),
    radial-gradient(
      circle at 11% 43%,
      hsla(165, 0%, 91%, 0.05) 0%,
      hsla(165, 0%, 91%, 0.05) 20%,
      transparent 20%,
      transparent 63%,
      transparent 63%,
      transparent 100%
    ),
    radial-gradient(
      circle at 45% 11%,
      hsla(165, 0%, 91%, 0.05) 0%,
      hsla(165, 0%, 91%, 0.05) 19%,
      transparent 19%,
      transparent 65%,
      transparent 65%,
      transparent 100%
    ),
    radial-gradient(
      circle at 90% 54%,
      hsla(165, 0%, 91%, 0.05) 0%,
      hsla(165, 0%, 91%, 0.05) 11%,
      transparent 11%,
      transparent 19%,
      transparent 19%,
      transparent 100%
    ),
    radial-gradient(
      circle at 23% 100%,
      hsla(165, 0%, 91%, 0.05) 0%,
      hsla(165, 0%, 91%, 0.05) 35%,
      transparent 35%,
      transparent 86%,
      transparent 86%,
      transparent 100%
    ),
    linear-gradient(0deg, rgb(95, 19, 0), rgb(187, 23, 4));
}
</style>