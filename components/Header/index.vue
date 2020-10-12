<template>
  <div>
    <v-alert
      border="bottom"
      color="secondary "
      class="text-center elevation-1 px-5"
      dark
    >
      <h3 class="subtitle-1 text-center pr-2 text-shadow">
        <v-row>
          <v-icon x-large class="ml-2">{{ icon }}</v-icon>
          <v-spacer /><div style="margin-top: 6px; font-size: 18px;">{{ title }}</div>
        </v-row>
      </h3>
    </v-alert>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    sticky: { type: String, default: 'none' }
  }
}
</script>

<style>
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 10px;
  width: 100%;
  z-index: 1;
}
</style>
