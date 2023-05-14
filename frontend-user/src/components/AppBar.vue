<template>
  <div class="appbar">

    <v-app-bar color="primary" dark app elevate-on-scroll>

      <!-- AppBar Text Title -->
      <v-toolbar-title class="white--text text-uppercase text-center" style="cursor: pointer" @click="$vuetify.goTo('#trash', {duration:1000})">
        BinBrain
      </v-toolbar-title>

      <v-spacer/>

      <v-btn v-for="(item, index) in drawerItems" :key="index" plain class="ma-2 hidden-sm-and-down" nuxt :to="item.to">
        {{ item.title }}
      </v-btn>


      <!-- Mobile Navigation Icon-->
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <!-- Mobile Navigation Drawer-->
    <v-navigation-drawer v-model="drawer" fixed temporary right>
      <v-list nav>
        <v-list-item-group v-model="group" active-class="primary--text text--accent-4">
          <v-list-item v-for="(item, index) in drawerItems" :key="index" nuxt :to="item.to">
            {{ item.title }}
          </v-list-item>
        </v-list-item-group>
      </v-list>

    </v-navigation-drawer>
  </div>
</template>

<script>

export default {
  data: () => ({
    drawer: false,
    group: false,
    drawerItems: [
      {
        title: "My Bin",
        to: "/",
      },
      {
        title: "Public Bins",
        to: "/publicMap"
      }
    ]
  }),

}
</script>

<style scoped>
.appbar{
  z-index: 100;
}

</style>
