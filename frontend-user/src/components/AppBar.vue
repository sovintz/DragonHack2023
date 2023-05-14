<template>
  <div class="appbar">

    <v-app-bar :color="position[1] > 0 ? 'primary' : 'transparent'" dark app elevate-on-scroll>

      <!-- AppBar Text Title -->
      <v-toolbar-title class="white--text text-uppercase text-center" style="cursor: pointer" @click="$vuetify.goTo('#header', {duration:2000})">
        Sovinc.com
      </v-toolbar-title>

      <v-spacer/>

      <v-btn v-for="(item, index) in $i18n.t('navMenu')" :key="index" plain class="ma-2 hidden-sm-and-down"
             @click="$vuetify.goTo('#' + item.to, {duration:2000})">
        {{ $t(item.title) }}
      </v-btn>

      <v-spacer/>

      <!-- Social icons-->
      <v-btn v-for="icon in icons" :key="icon" class="mx-4 lighten-1 hidden-sm-and-down" icon @click="contact(icon)">
        <v-icon size="24px">
          {{ icon }}
        </v-icon>
      </v-btn>

      <!-- Desktop Language Selector -->
      <v-menu offset-y>
        <!-- dropdown activator & button -->
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ma-2 hidden-sm-and-down" text plain v-bind="attrs" v-on="on">
            {{ $i18n.locale }}
          </v-btn>
        </template>


        <!-- Desktop Dropdown Rendering -->
        <v-list>
          <v-list-item
            v-for="locale in $i18n.locales"
            :key="locale.code"
            :to="switchLocalePath(locale.code)"
            >
            <v-list-item-title v-text="locale.name"/>
          </v-list-item>

        </v-list>
      </v-menu>

      <!-- Mobile Navigation Icon-->
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <!-- Mobile Navigation Drawer-->
    <v-navigation-drawer v-model="drawer" fixed temporary right>
      <v-list nav>
        <v-list-item-group v-model="group" active-class="primary--text text--accent-4">
          <v-list-item v-for="(item, index) in $i18n.t('navMenu')" :key="index"
                       @click="$vuetify.goTo('#' + item.to, {duration:2000}); drawer=false">
            {{ (item.title) }}
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <!-- Mobile Social icons-->
      <div class="mx-auto">
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 lighten-1" icon @click="contact(icon); drawer=false">
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </div>

      <!-- Mobile Language Selector -->
      <!-- Dropdown Activator & Button -->
      <v-list>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="text-uppercase">{{ $i18n.locale }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <!-- Mobile Dropdown Rendering -->
          <v-list-item
            v-for="locale in $i18n.locales"
            :key="locale.code"
            nuxt
            :to="switchLocalePath(locale.code)">
            <v-list-item-content>
              <v-list-item-title v-text="locale.name"/>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

    </v-navigation-drawer>
  </div>
</template>

<script>
import windowScrollPosition from '../mixins/global.js'

export default {
  name: "Projects",
  mixins: [windowScrollPosition('position')],
  data: () => ({
    drawer: false,
    group: null,
    // TODO: move to language
    icons: [
      'mdi-email',
      'mdi-linkedin',
      'mdi-github'
    ],
  }),
  mounted() {
  },
  methods: {
    contact(contact) {
      contact = contact.split('-')[1]
      if (contact === "email") {
        window.open("mailto:lan@sovinc.com", "_blank");
      } else if (contact === "linkedin") {
        window.open("https://www.linkedin.com/in/lan-sovinc/", "_blank");
      } else if (contact === "github") {
        window.open("https://github.com/sovintz", "_blank");
      }
    }
  }
}
</script>

<style scoped>
.appbar{
  z-index: 100;
}

</style>
