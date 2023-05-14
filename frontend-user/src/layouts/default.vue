<template>
  <v-app>
    <AppBar/>
    <v-main class="pt-0">
      <Nuxt/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
export default {

mounted() {
  window.onscroll = () => {
    this.scrollPosition = document.documentElement.scrollTop;
  };
}
}
</script>
